import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    passwordHash: v.string(),
    currentLevel: v.number(),
    lifetimeMedals: v.number(),
    screenTimeBalanceMinutes: v.number(),
    currentStreak: v.number(),
    longestStreak: v.number(),
    lastActiveDate: v.optional(v.string()),
  }).index("by_username", ["username"]),

  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
  })
    .index("by_token", ["token"])
    .index("by_user", ["userId"]),

  dailyQuests: defineTable({
    userId: v.id("users"),
    date: v.string(),
    subject: v.string(),
    taskType: v.union(v.literal("FLASHCARDS"), v.literal("QUIZ")),
    questions: v.any(),
    isCompleted: v.boolean(),
    score: v.optional(v.number()),
    focusViolations: v.number(),
    checkpointsPassed: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user_date", ["userId", "date"])
    .index("by_user", ["userId"]),

  verifiedMaterials: defineTable({
    subject: v.string(),
    topic: v.string(),
    rawContent: v.string(),
    summaryContent: v.optional(v.string()),
    difficulty: v.string(),
  })
    .index("by_subject", ["subject"])
    .index("by_subject_topic", ["subject", "topic"]),

  medals: defineTable({
    userId: v.id("users"),
    medalId: v.string(),
    label: v.string(),
    earnedAt: v.number(),
  }).index("by_user", ["userId"]),

  rateLimits: defineTable({
    key: v.string(),
    count: v.number(),
    resetAt: v.number(),
  }).index("by_key", ["key"]),

  // Per-student practice history (parent audit log + mastery is derived from this)
  attempts: defineTable({
    userId: v.id("users"),
    subject: v.string(),
    paperType: v.string(),
    mode: v.string(), // "quick" | "exam" | "demo"
    score: v.number(),
    totalQuestions: v.number(),
    percentage: v.number(),
    violations: v.number(),
    passed: v.boolean(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  // Per-student record of when each question / reading section was last shown,
  // so nothing repeats for a month unless the whole pool has been covered.
  studyRotation: defineTable({
    userId: v.id("users"),
    bucket: v.string(), // e.g. "Mathematics|Paper 1|quiz"
    itemId: v.string(), // question id or reading-section key
    shownAt: v.number(),
  }).index("by_user_bucket", ["userId", "bucket"]),
});
