import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

function makeHash(username: string, color: string): string {
  const raw = `${username.toLowerCase()}:${color.toLowerCase()}`;
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = Math.imul(31, h) + raw.charCodeAt(i) | 0;
  }
  return `v1:${Math.abs(h).toString(36)}:${btoa(raw).replace(/=/g, "")}`;
}

export const register = mutation({
  args: { username: v.string(), favoriteColor: v.string() },
  handler: async (ctx, { username, favoriteColor }) => {
    const name = username.trim();
    if (name.length < 2) throw new Error("Name too short");

    const existing = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", name))
      .first();
    if (existing) throw new Error("That name is taken — pick another!");

    const userId = await ctx.db.insert("users", {
      username: name,
      passwordHash: makeHash(name, favoriteColor),
      currentLevel: 1,
      lifetimeMedals: 0,
      screenTimeBalanceMinutes: 0,
      currentStreak: 0,
      longestStreak: 0,
    });

    const token = `${userId}:${Date.now()}:${Math.random().toString(36).slice(2)}`;
    await ctx.db.insert("sessions", { userId, token, expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30 });
    return { userId, token, username: name };
  },
});

export const login = mutation({
  args: { username: v.string(), favoriteColor: v.string() },
  handler: async (ctx, { username, favoriteColor }) => {
    const name = username.trim();
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", name))
      .first();
    if (!user) throw new Error("No account found with that name");
    if (makeHash(name, favoriteColor) !== user.passwordHash)
      throw new Error("Wrong colour — try again!");

    const token = `${user._id}:${Date.now()}:${Math.random().toString(36).slice(2)}`;
    await ctx.db.insert("sessions", { userId: user._id, token, expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30 });
    return { userId: user._id, token, username: user.username };
  },
});

export const getSession = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();
    if (!session || session.expiresAt < Date.now()) return null;
    const user = await ctx.db.get(session.userId);
    if (!user) return null;
    return {
      userId: user._id,
      username: user.username,
      currentLevel: user.currentLevel,
      lifetimeMedals: user.lifetimeMedals,
      screenTimeBalanceMinutes: user.screenTimeBalanceMinutes,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
    };
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();
    if (session) await ctx.db.delete(session._id);
  },
});

export const updateScreenTime = mutation({
  args: { userId: v.id("users"), amount: v.number() },
  handler: async (ctx, { userId, amount }) => {
    const user = await ctx.db.get(userId);
    if (!user) throw new Error("User not found");
    const newBalance = Math.max(0, user.screenTimeBalanceMinutes + amount);
    await ctx.db.patch(userId, { screenTimeBalanceMinutes: newBalance });
    return newBalance;
  },
});

export const awardMedal = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db.get(userId);
    if (!user) throw new Error("User not found");
    const medals = user.lifetimeMedals + 1;
    const level = medals >= 10 ? 3 : medals >= 5 ? 2 : 1;
    await ctx.db.patch(userId, { lifetimeMedals: medals, currentLevel: level });
  },
});

export const updateStreak = mutation({
  args: { userId: v.id("users"), date: v.string() },
  handler: async (ctx, { userId, date }) => {
    const user = await ctx.db.get(userId);
    if (!user) throw new Error("User not found");
    const newStreak = user.currentStreak + 1;
    await ctx.db.patch(userId, {
      currentStreak: newStreak,
      longestStreak: Math.max(user.longestStreak, newStreak),
      lastActiveDate: date,
    });
  },
});
