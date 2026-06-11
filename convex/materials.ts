import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getBySubject = query({
  args: { subject: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("verifiedMaterials")
      .withIndex("by_subject", (q) => q.eq("subject", args.subject))
      .collect();
  },
});

export const getBySubjectTopic = query({
  args: { subject: v.string(), topic: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("verifiedMaterials")
      .withIndex("by_subject_topic", (q) =>
        q.eq("subject", args.subject).eq("topic", args.topic)
      )
      .first();
  },
});

export const addMaterial = mutation({
  args: {
    subject: v.string(),
    topic: v.string(),
    rawContent: v.string(),
    difficulty: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("verifiedMaterials", {
      subject: args.subject,
      topic: args.topic,
      rawContent: args.rawContent,
      difficulty: args.difficulty,
    });
  },
});
