import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getDailyQuest = query({
  args: { userId: v.id("users"), date: v.string() },
  handler: async (ctx, { userId, date }) => {
    return await ctx.db
      .query("dailyQuests")
      .withIndex("by_user_date", (q) => q.eq("userId", userId).eq("date", date))
      .first();
  },
});

export const getUserQuests = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("dailyQuests")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(30);
  },
});

export const createQuest = mutation({
  args: {
    userId: v.id("users"),
    date: v.string(),
    subject: v.string(),
    taskType: v.union(v.literal("FLASHCARDS"), v.literal("QUIZ")),
    questions: v.any(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("dailyQuests")
      .withIndex("by_user_date", (q) => q.eq("userId", args.userId).eq("date", args.date))
      .first();
    if (existing) return existing._id;

    return await ctx.db.insert("dailyQuests", {
      userId: args.userId,
      date: args.date,
      subject: args.subject,
      taskType: args.taskType,
      questions: args.questions,
      isCompleted: false,
      focusViolations: 0,
      checkpointsPassed: 0,
    });
  },
});

export const completeQuest = mutation({
  args: {
    questId: v.id("dailyQuests"),
    score: v.optional(v.number()),
    focusViolations: v.optional(v.number()),
    checkpointsPassed: v.optional(v.number()),
  },
  handler: async (ctx, { questId, score, focusViolations, checkpointsPassed }) => {
    const quest = await ctx.db.get(questId);
    if (!quest) throw new Error("Quest not found");
    if (quest.isCompleted) return;

    await ctx.db.patch(questId, {
      isCompleted: true,
      completedAt: Date.now(),
      score,
      focusViolations: focusViolations ?? 0,
      checkpointsPassed: checkpointsPassed ?? 0,
    });

    // Auto-mint 60 minutes of screen time on completion
    const user = await ctx.db.get(quest.userId);
    if (user) {
      const medals = user.lifetimeMedals + 1;
      const level = medals >= 10 ? 3 : medals >= 5 ? 2 : 1;
      await ctx.db.patch(quest.userId, {
        screenTimeBalanceMinutes: user.screenTimeBalanceMinutes + 60,
        lifetimeMedals: medals,
        currentLevel: level,
      });
    }
  },
});

export const recordFocusViolation = mutation({
  args: { questId: v.id("dailyQuests") },
  handler: async (ctx, { questId }) => {
    const quest = await ctx.db.get(questId);
    if (!quest || quest.isCompleted) return;
    await ctx.db.patch(questId, { focusViolations: quest.focusViolations + 1 });
  },
});
