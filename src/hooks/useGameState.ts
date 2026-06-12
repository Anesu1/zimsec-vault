"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export interface UserState {
  username: string;
  currentLevel: number;
  lifetimeMedals: number;
  screenTimeBalanceMinutes: number;
  currentStreak: number;
  completedDays: Record<string, boolean>;
}

export interface BlockConfig {
  name: string;
  duration: number;
  type: "recharge" | "study" | "break" | "active_recall" | "boss_fight" | "jubilee" | "saturday_mock" | "sunday_rest";
}

const REGULAR_DAILY_BLOCKS: BlockConfig[] = [
  { name: "30-Minute Brain Recharge", duration: 30 * 60, type: "recharge" },
  { name: "Subject Block 1", duration: 35 * 60, type: "study" },
  { name: "Intermission", duration: 10 * 60, type: "break" },
  { name: "Subject Block 2", duration: 30 * 60, type: "study" },
  { name: "Active Recall Teach-Back", duration: 15 * 60, type: "active_recall" },
  { name: "Boss Fight Quiz", duration: 15 * 60, type: "boss_fight" },
];

const DEFAULT_USER: UserState = {
  username: "",
  currentLevel: 1,
  lifetimeMedals: 0,
  screenTimeBalanceMinutes: 0,
  currentStreak: 0,
  completedDays: {},
};

const TODAY = new Date().toISOString().split("T")[0];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const getTodayName = () => DAY_NAMES[new Date().getDay()];

export function useGameState() {
  // ── Auth state ──────────────────────────────────────────────────────────────
  const [sessionToken, setSessionToken] = useState<string>("");
  const [convexUserId, setConvexUserId] = useState<Id<"users"> | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [user, setUser] = useState<UserState>(DEFAULT_USER);

  // ── Convex mutations ────────────────────────────────────────────────────────
  const convexRegister = useMutation(api.users.register);
  const convexLogin = useMutation(api.users.login);
  const convexLogout = useMutation(api.users.logout);
  const convexCompleteQuest = useMutation(api.quests.completeQuest);
  const convexCreateQuest = useMutation(api.quests.createQuest);
  const convexRecordViolation = useMutation(api.quests.recordFocusViolation);
  const convexRecordAttempt = useMutation(api.attempts.record);
  const convexClearAttempts = useMutation(api.attempts.clear);
  const convexPickRotation = useMutation(api.rotation.pick);

  // Stable refs so timer effect doesn't re-register on mutation reference changes
  const completeQuestRef = useRef(convexCompleteQuest);
  const recordViolationRef = useRef(convexRecordViolation);
  useEffect(() => { completeQuestRef.current = convexCompleteQuest; }, [convexCompleteQuest]);
  useEffect(() => { recordViolationRef.current = convexRecordViolation; }, [convexRecordViolation]);

  // ── Real-time session query (skips when no token) ────────────────────────
  const sessionData = useQuery(
    api.users.getSession,
    sessionToken ? { token: sessionToken } : "skip"
  );

  // ── Per-student practice history (skips when no token) ───────────────────
  const attemptsData = useQuery(
    api.attempts.list,
    sessionToken ? { token: sessionToken } : "skip"
  );

  // ── Game state ──────────────────────────────────────────────────────────────
  const [currentDay, setCurrentDay] = useState<string>("Monday");
  const [activeSubjects, setActiveSubjects] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<BlockConfig[]>(REGULAR_DAILY_BLOCKS);
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(REGULAR_DAILY_BLOCKS[0].duration);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [cheatFrozen, setCheatFrozen] = useState<boolean>(false);
  const [questCompleted, setQuestCompleted] = useState<boolean>(false);
  const [tokensJustEarned, setTokensJustEarned] = useState<number>(0);

  // Quest tracking refs (used inside timer effect without re-registering)
  const currentQuestIdRef = useRef<Id<"dailyQuests"> | null>(null);
  const focusViolationsRef = useRef<number>(0);
  const checkpointsPassedRef = useRef<number>(0);
  const quizScoreRef = useRef<number>(0);
  const currentDayRef = useRef<string>("Monday");
  const userRef = useRef<UserState>(DEFAULT_USER);
  const convexUserIdRef = useRef<Id<"users"> | null>(null);

  useEffect(() => { currentDayRef.current = currentDay; }, [currentDay]);
  useEffect(() => { userRef.current = user; }, [user]);
  useEffect(() => { convexUserIdRef.current = convexUserId; }, [convexUserId]);

  const subjectRotation: Record<string, string[]> = {
    Monday: ["Mathematics", "Agriculture, Science & Technology"],
    Tuesday: ["English Language", "Social Science"],
    Wednesday: ["Ndebele Language", "Family & Religious Studies (FRS)"],
    Thursday: ["Mathematics", "Agriculture, Science & Technology"],
    Friday: [],
    Saturday: ["Mathematics", "Social Science"],
    Sunday: [],
  };

  // ── Mount: restore session from localStorage ────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("zimsec_token") ?? "";
    const savedUser = localStorage.getItem("zimsec_user");
    if (token) {
      setSessionToken(token);
      setIsAuthenticated(true);
    }
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as UserState;
        setUser(parsed);
        userRef.current = parsed;
      } catch { /* ignore corrupt cache */ }
    }
    configureBlocksForDay(getTodayName());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sync Convex session → local state (Convex is source of truth) ──────────
  useEffect(() => {
    if (sessionData === undefined) return; // still loading
    if (sessionData === null) {
      // Token expired or invalid — force re-login
      localStorage.removeItem("zimsec_token");
      setSessionToken("");
      setIsAuthenticated(false);
      setUser(DEFAULT_USER);
      return;
    }
    setConvexUserId(sessionData.userId);
    convexUserIdRef.current = sessionData.userId;
    const synced: UserState = {
      username: sessionData.username,
      currentLevel: sessionData.currentLevel,
      lifetimeMedals: sessionData.lifetimeMedals,
      screenTimeBalanceMinutes: sessionData.screenTimeBalanceMinutes,
      currentStreak: sessionData.currentStreak,
      completedDays: userRef.current.completedDays,
    };
    setUser(synced);
    userRef.current = synced;
    localStorage.setItem("zimsec_user", JSON.stringify(synced));
  }, [sessionData]);

  const saveUserLocally = (updated: UserState) => {
    setUser(updated);
    userRef.current = updated;
    localStorage.setItem("zimsec_user", JSON.stringify(updated));
  };

  const cleanErrorMessage = (err: any): string => {
    if (!err) return "";
    const msg = err instanceof Error ? err.message : String(err);
    
    // Look for "Uncaught Error: " and extract the main message
    const uncaughtMatch = msg.match(/Uncaught Error:\s*([^\n]+)/i);
    if (uncaughtMatch && uncaughtMatch[1]) {
      // Clean trailing stack location if present
      return uncaughtMatch[1].split(" at ")[0].trim();
    }
    
    return msg
      .replace(/\[CONVEX[^\]]*\]/g, "")
      .replace(/Server Error/gi, "")
      .replace(/Called by client/gi, "")
      .split(" at ")[0]
      .trim();
  };

  // ── Auth: register ──────────────────────────────────────────────────────────
  const register = async (username: string, favoriteColor: string) => {
    setAuthError("");
    const name = username.trim();
    if (name.length < 2) { setAuthError("Name must be at least 2 characters"); return; }
    if (!favoriteColor) { setAuthError("Pick your favourite colour!"); return; }

    try {
      const result = await convexRegister({ username: name, favoriteColor });
      localStorage.setItem("zimsec_token", result.token);
      setSessionToken(result.token);
      setConvexUserId(result.userId);
      const newUser: UserState = { ...DEFAULT_USER, username: result.username };
      saveUserLocally(newUser);
      setIsAuthenticated(true);
    } catch (err) {
      setAuthError(cleanErrorMessage(err) || "Registration failed");
    }
  };

  // ── Auth: login ─────────────────────────────────────────────────────────────
  const login = async (username: string, favoriteColor: string) => {
    setAuthError("");
    try {
      const result = await convexLogin({ username: username.trim(), favoriteColor });
      localStorage.setItem("zimsec_token", result.token);
      setSessionToken(result.token);
      setConvexUserId(result.userId);
      setIsAuthenticated(true);
    } catch (err) {
      setAuthError(cleanErrorMessage(err) || "Login failed");
    }
  };

  // ── Auth: logout ────────────────────────────────────────────────────────────
  const logout = async () => {
    if (sessionToken) convexLogout({ token: sessionToken }).catch(() => {});
    localStorage.removeItem("zimsec_token");
    localStorage.removeItem("zimsec_user");
    setSessionToken("");
    setConvexUserId(null);
    setIsAuthenticated(false);
    setUser(DEFAULT_USER);
  };

  // ── Block / day configuration ───────────────────────────────────────────────
  const configureBlocksForDay = (day: string) => {
    setCurrentDay(day);
    currentDayRef.current = day;
    setActiveSubjects(subjectRotation[day] || []);
    focusViolationsRef.current = 0;
    checkpointsPassedRef.current = 0;
    quizScoreRef.current = 0;
    currentQuestIdRef.current = null;

    let dayBlocks: BlockConfig[];
    if (day === "Friday") {
      dayBlocks = [{ name: "Friday Night Jubilee 🎉", duration: 0, type: "jubilee" }];
    } else if (day === "Saturday") {
      dayBlocks = [{ name: "Saturday 2-Hour Mock Raid ⚔️", duration: 120 * 60, type: "saturday_mock" }];
    } else if (day === "Sunday") {
      dayBlocks = [{ name: "Sunday Rest & Sync 💤", duration: 0, type: "sunday_rest" }];
    } else {
      dayBlocks = REGULAR_DAILY_BLOCKS;
    }
    setBlocks(dayBlocks);
    setCurrentBlockIndex(0);
    setTimerSeconds(dayBlocks[0].duration);
    setIsTimerActive(false);
    setQuestCompleted(false);
  };

  // ── Anti-cheat: freeze timer on tab leave ───────────────────────────────────
  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden) return;
      if (isTimerActive && blocks[currentBlockIndex]?.type !== "recharge") {
        setIsTimerActive(false);
        setCheatFrozen(true);
        focusViolationsRef.current += 1;
        // Fire-and-forget violation record if quest exists
        if (currentQuestIdRef.current) {
          recordViolationRef.current({ questId: currentQuestIdRef.current }).catch(() => {});
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isTimerActive, blocks, currentBlockIndex]);

  // ── Countdown timer engine ──────────────────────────────────────────────────
  useEffect(() => {
    let id: NodeJS.Timeout | null = null;

    if (isTimerActive && timerSeconds > 0) {
      id = setInterval(() => setTimerSeconds((s) => s - 1), 1000);
    } else if (timerSeconds === 0 && blocks[currentBlockIndex]?.duration > 0) {
      if (currentBlockIndex < blocks.length - 1) {
        const next = currentBlockIndex + 1;
        setCurrentBlockIndex(next);
        setTimerSeconds(blocks[next].duration);
        setIsTimerActive(false);
      } else {
        // ── All blocks complete ──────────────────────────────────────────────
        setIsTimerActive(false);
        setQuestCompleted(true);
        const earned = 60;
        setTokensJustEarned(earned);

        // Update local state optimistically
        const cur = userRef.current;
        const medals = cur.lifetimeMedals + 1;
        const updated: UserState = {
          ...cur,
          screenTimeBalanceMinutes: cur.screenTimeBalanceMinutes + earned,
          lifetimeMedals: medals,
          currentStreak: cur.currentStreak + 1,
          completedDays: { ...cur.completedDays, [currentDayRef.current]: true },
          currentLevel: medals >= 10 ? 3 : medals >= 5 ? 2 : 1,
        };
        saveUserLocally(updated);

        // Persist to Convex
        if (currentQuestIdRef.current) {
          completeQuestRef.current({
            questId: currentQuestIdRef.current,
            score: quizScoreRef.current,
            focusViolations: focusViolationsRef.current,
            checkpointsPassed: checkpointsPassedRef.current,
          }).catch(console.error);
        }
      }
    }

    return () => { if (id) clearInterval(id); };
  }, [isTimerActive, timerSeconds, currentBlockIndex, blocks]);

  // ── Public helpers ──────────────────────────────────────────────────────────
  const startTimer = () => setIsTimerActive(true);
  const pauseTimer = () => setIsTimerActive(false);
  const skipBlock = () => setTimerSeconds(0);

  const dismissQuestComplete = () => {
    setQuestCompleted(false);
    configureBlocksForDay(currentDayRef.current);
  };

  const setQuestId = (id: Id<"dailyQuests">) => {
    currentQuestIdRef.current = id;
  };

  const recordCheckpointPassed = () => {
    checkpointsPassedRef.current += 1;
  };

  const recordQuizScore = (score: number) => {
    quizScoreRef.current = score;
  };

  return {
    // Auth
    isAuthenticated,
    authError,
    sessionToken,
    convexUserId,
    register,
    login,
    logout,
    // User data
    user,
    // Game
    currentDay,
    activeSubjects,
    blocks,
    currentBlock: blocks[currentBlockIndex] || blocks[0],
    currentBlockIndex,
    timerSeconds,
    isTimerActive,
    cheatFrozen,
    questCompleted,
    tokensJustEarned,
    // Actions
    setCheatFrozen,
    startTimer,
    pauseTimer,
    skipBlock,
    dismissQuestComplete,
    changeMockDay: configureBlocksForDay,
    setQuestId,
    recordCheckpointPassed,
    recordQuizScore,
    // Convex helpers for page
    convexCreateQuest,
    // Per-student practice history
    attempts: attemptsData ?? [],
    recordAttempt: convexRecordAttempt,
    clearAttempts: convexClearAttempts,
    pickRotation: convexPickRotation,
    TODAY,
  };
}
