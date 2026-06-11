import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Atomic, durable rate limiter shared across all server instances.
// Each call increments the counter for `key`; the window resets once `resetAt`
// passes. Returns whether the caller has exceeded `limit` within the window.
export const check = mutation({
  args: { key: v.string(), limit: v.number(), windowMs: v.number() },
  handler: async (ctx, { key, limit, windowMs }) => {
    const now = Date.now();
    const existing = await ctx.db
      .query("rateLimits")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();

    if (!existing || now > existing.resetAt) {
      if (existing) {
        await ctx.db.patch(existing._id, { count: 1, resetAt: now + windowMs });
      } else {
        await ctx.db.insert("rateLimits", { key, count: 1, resetAt: now + windowMs });
      }
      return { limited: false };
    }

    const count = existing.count + 1;
    await ctx.db.patch(existing._id, { count });
    return { limited: count > limit };
  },
});
