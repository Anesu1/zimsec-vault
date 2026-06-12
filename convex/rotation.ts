import { mutation, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";

const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

async function userIdFromToken(ctx: MutationCtx, token: string) {
  const session = await ctx.db
    .query("sessions")
    .withIndex("by_token", (q) => q.eq("token", token))
    .first();
  if (!session || session.expiresAt < Date.now()) return null;
  return session.userId;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Choose `count` items from `itemIds` that this student has NOT seen in the
// last 30 days. If too few unseen-recently items remain (i.e. everything has
// been covered this month), fall back to the least-recently-shown items so the
// cycle continues. Records the chosen items as shown "now".
export const pick = mutation({
  args: {
    token: v.string(),
    bucket: v.string(),
    itemIds: v.array(v.string()),
    count: v.number(),
  },
  handler: async (ctx, { token, bucket, itemIds, count }) => {
    if (itemIds.length <= count) return itemIds; // nothing to rotate

    const userId = await userIdFromToken(ctx, token);
    if (!userId) return shuffle(itemIds).slice(0, count); // unauthenticated fallback

    const now = Date.now();
    const rows = await ctx.db
      .query("studyRotation")
      .withIndex("by_user_bucket", (q) => q.eq("userId", userId).eq("bucket", bucket))
      .collect();
    const shownAt = new Map(rows.map((r) => [r.itemId, r.shownAt] as const));

    // Eligible = never shown, or shown more than a month ago.
    const eligible = itemIds.filter((id) => {
      const t = shownAt.get(id);
      return t === undefined || now - t > MONTH_MS;
    });

    let chosen: string[];
    if (eligible.length >= count) {
      // Prefer never-shown items first, then oldest, then randomise the tie.
      const ranked = shuffle(eligible).sort(
        (a, b) => (shownAt.get(a) ?? 0) - (shownAt.get(b) ?? 0)
      );
      chosen = ranked.slice(0, count);
    } else {
      // Everything has been covered this month — cycle by least-recently-shown.
      chosen = [...itemIds]
        .sort((a, b) => (shownAt.get(a) ?? 0) - (shownAt.get(b) ?? 0))
        .slice(0, count);
    }

    // Stamp chosen items as shown now (upsert).
    for (const id of chosen) {
      const existing = rows.find((r) => r.itemId === id);
      if (existing) await ctx.db.patch(existing._id, { shownAt: now });
      else await ctx.db.insert("studyRotation", { userId, bucket, itemId: id, shownAt: now });
    }

    return chosen;
  },
});
