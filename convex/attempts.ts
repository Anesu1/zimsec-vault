import { mutation, query, type QueryCtx, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";

// Resolve a session token to its userId, or null if missing/expired.
async function userIdFromToken(ctx: QueryCtx | MutationCtx, token: string) {
  const session = await ctx.db
    .query("sessions")
    .withIndex("by_token", (q) => q.eq("token", token))
    .first();
  if (!session || session.expiresAt < Date.now()) return null;
  return session.userId;
}

// Record one practice attempt for the authenticated student.
export const record = mutation({
  args: {
    token: v.string(),
    subject: v.string(),
    paperType: v.string(),
    mode: v.string(),
    score: v.number(),
    totalQuestions: v.number(),
    percentage: v.number(),
    violations: v.number(),
    passed: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await userIdFromToken(ctx, args.token);
    if (!userId) return null;
    return await ctx.db.insert("attempts", {
      userId,
      subject: args.subject,
      paperType: args.paperType,
      mode: args.mode,
      score: args.score,
      totalQuestions: args.totalQuestions,
      percentage: args.percentage,
      violations: args.violations,
      passed: args.passed,
      createdAt: Date.now(),
    });
  },
});

// List the authenticated student's attempts (most recent first).
export const list = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const userId = await userIdFromToken(ctx, token);
    if (!userId) return [];
    return await ctx.db
      .query("attempts")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(200);
  },
});

// Clear the authenticated student's history (parent "clear audit log" action).
export const clear = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const userId = await userIdFromToken(ctx, token);
    if (!userId) return;
    const rows = await ctx.db
      .query("attempts")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    for (const row of rows) await ctx.db.delete(row._id);
  },
});
