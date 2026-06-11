"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGameState } from "../hooks/useGameState";
import {
  Play, Pause, ShieldAlert, LogOut, BookOpen,
  ShieldCheck, AlertTriangle, Trophy, Clock, Lock,
  CheckCircle2, XCircle, Eye, MessageSquare, Send,
  Calendar, TrendingUp, ArrowLeft
} from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { curriculumData, type Question, type Paper2Question } from "../lib/curriculumData";

const COLORS = [
  { name: "red",    hex: "#ef4444", label: "Red" },
  { name: "orange", hex: "#f97316", label: "Orange" },
  { name: "yellow", hex: "#eab308", label: "Yellow" },
  { name: "green",  hex: "#22c55e", label: "Green" },
  { name: "blue",   hex: "#3b82f6", label: "Blue" },
  { name: "purple", hex: "#a855f7", label: "Purple" },
  { name: "pink",   hex: "#ec4899", label: "Pink" },
  { name: "teal",   hex: "#14b8a6", label: "Teal" },
  { name: "black",  hex: "#1e293b", label: "Black" },
  { name: "white",  hex: "#e2e8f0", label: "Silver" },
  { name: "coral",  hex: "#fb7185", label: "Coral" },
  { name: "indigo", hex: "#6366f1", label: "Indigo" },
];

// Session timing — 50 min focused reading + 40 min practice = 1h30 total
const READING_SECONDS = 3000;
const EXAM_SECONDS = 2400;
const CHECKPOINT_INTERVAL_SECONDS = 600; // unskippable attention check every 10 min of reading
const DEMO_READING_SECONDS = 120;
const DEMO_EXAM_SECONDS = 60;
const DEMO_CHECKPOINT_INTERVAL = 60;

// Per-session rotation — each session draws a fresh subset of questions and
// study sections; nothing repeats until the whole pool has been used.
const QUIZ_PER_SESSION = 8;
const PAPER2_PER_SESSION = 3;
const READING_SECTIONS_PER_SESSION = 5;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function pickRotation<T>(items: T[], count: number, storageKey: string, idOf: (item: T) => string): T[] {
  if (items.length <= count) return shuffle(items);
  let seen: string[] = [];
  try {
    seen = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
  } catch {
    seen = [];
  }
  let pool = items.filter((it) => !seen.includes(idOf(it)));
  if (pool.length < count) {
    // Pool exhausted — start a new rotation, carrying the leftover unseen items
    seen = [];
    const carryIds = pool.map(idOf);
    const refill = shuffle(items.filter((it) => !carryIds.includes(idOf(it)))).slice(0, count - pool.length);
    pool = [...pool, ...refill];
  }
  const chosen = shuffle(pool).slice(0, count);
  localStorage.setItem(storageKey, JSON.stringify([...seen, ...chosen.map(idOf)]));
  return chosen;
}

// Rotate the #### sections of a study guide, keeping the ### title block and
// curriculum order so the reading stays coherent.
function pickReadingRotation(material: string, storageKey: string): string {
  const parts = material.split(/\n(?=#### )/);
  const header = parts[0];
  const sections = parts.slice(1);
  if (sections.length <= READING_SECTIONS_PER_SESSION) return material;
  const chosen = pickRotation(sections, READING_SECTIONS_PER_SESSION, storageKey, (s) => s.slice(0, 40));
  const ordered = sections.filter((s) => chosen.includes(s));
  return [header, ...ordered].join("\n");
}

interface ActivityEntry {
  timestamp: string;
  subject: string;
  paperType: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  violations: number;
  passed: boolean;
}

function AuthScreen({
  authError,
  onRegister,
  onLogin,
}: {
  authError: string;
  onRegister: (u: string, c: string) => void;
  onLogin: (u: string, c: string) => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register") onRegister(username, selectedColor);
    else onLogin(username, selectedColor);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0070d1]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0070d1]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0070d1] rounded-lg mb-4 border border-white/10">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-light text-white tracking-tight">ZIMSEC Study Chamber</h1>
          <p className="text-xs text-slate-400 font-semibold mt-2">Grade 7 Exam Security & Practice Vault</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
          <div className="flex bg-white/5 rounded-full p-1 mb-6 border border-white/5">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  mode === m ? "bg-[#0070d1] text-white shadow-md" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] font-bold text-[#53b1ff] uppercase tracking-wider block mb-1.5">
                What&apos;s your name?
              </label>
              <input
                type="text"
                placeholder="e.g. MathWarrior99"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm font-bold text-white outline-none focus:border-[#0070d1] transition-all"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#53b1ff] uppercase tracking-wider block mb-2">
                What&apos;s your favourite colour?
              </label>
              <div className="grid grid-cols-6 gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.label}
                    aria-pressed={selectedColor === c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-full aspect-square rounded-lg border-2 transition-all cursor-pointer min-h-11 ${
                      selectedColor === c.name
                        ? "border-[#0070d1] scale-110 shadow-lg"
                        : "border-transparent hover:scale-105 hover:border-white/20"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
              {selectedColor && (
                <p className="text-[10px] text-slate-400 font-bold mt-1.5 text-center">
                  Selected: {COLORS.find((c) => c.name === selectedColor)?.label}
                </p>
              )}
            </div>

            {authError && (
              <p className="text-rose-400 text-xs font-bold bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#0070d1] hover:bg-[#0064b7] text-white font-bold rounded-full text-sm transition-all cursor-pointer"
            >
              {mode === "login" ? "Start Learning →" : "Create My Account →"}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-slate-500 mt-4 font-semibold">
          No email needed · Just your name + favourite colour
        </p>
      </div>
    </div>
  );
}

// Spaced Repetition week-checking utility
function isSameWeek(dateStr1: string, dateStr2: string): boolean {
  if (!dateStr1 || !dateStr2) return false;
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  
  const getStartOfWeek = (d: Date) => {
    const temp = new Date(d);
    const day = temp.getDay();
    const diff = temp.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(temp.setDate(diff)).toDateString();
  };
  
  return getStartOfWeek(d1) === getStartOfWeek(d2);
}

// Custom parser to strip markdown characters like #, *, and render standard HTML
function formatReadingText(text: string) {
  if (!text) return null;
  const lines = text.split("\n");
  return lines.map((line, idx) => {
    let cleanLine = line.trim();
    if (!cleanLine) return <div key={idx} className="h-2" />;
    
    // Headers
    if (cleanLine.startsWith("####")) {
      return <h5 key={idx} className="text-xs font-bold text-[#53b1ff] tracking-wide mt-3 mb-1 uppercase">{cleanLine.replace(/####/g, "").trim()}</h5>;
    }
    if (cleanLine.startsWith("###")) {
      return <h4 key={idx} className="text-xs font-bold text-[#53b1ff] tracking-wider mt-4 mb-2 uppercase border-b border-white/10 pb-1">{cleanLine.replace(/###/g, "").trim()}</h4>;
    }
    if (cleanLine.startsWith("##")) {
      return <h3 key={idx} className="text-sm font-bold text-white mt-5 mb-3 border-b border-white/20 pb-1.5">{cleanLine.replace(/##/g, "").trim()}</h3>;
    }
    if (cleanLine.startsWith("#")) {
      return <h2 key={idx} className="text-base font-bold text-[#53b1ff] mt-6 mb-4">{cleanLine.replace(/#/g, "").trim()}</h2>;
    }

    // List item check
    const isListItem = cleanLine.startsWith("-") || cleanLine.startsWith("*");
    if (isListItem) {
      cleanLine = cleanLine.substring(1).trim();
    }

    // Bold replacement (**bold**)
    const processedParts = cleanLine.includes("**") ? cleanLine.split("**") : [cleanLine];
    const elements = processedParts.map((part, pIdx) => {
      if (pIdx % 2 === 1) {
        return <strong key={pIdx} className="text-[#53b1ff] font-bold">{part}</strong>;
      }
      return part;
    });

    if (isListItem) {
      return (
        <li key={idx} className="list-disc ml-5 text-slate-300 text-xs leading-relaxed my-1">
          {elements}
        </li>
      );
    }

    return (
      <p key={idx} className="text-xs text-slate-300 leading-relaxed my-1.5">
        {elements}
      </p>
    );
  });
}

// Custom Visual Diagrams and SVG Models
function SyllabusVisuals({ subject }: { subject: string }) {
  if (subject === "Mathematics") {
    return (
      <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col items-center gap-3 my-4">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Mathematics Geometry Models</span>
        <div className="flex flex-wrap justify-center gap-6 p-2 w-full">
          {/* Rectangle Area Model */}
          <div className="flex flex-col items-center gap-1.5">
            <svg width="120" height="80" className="overflow-visible">
              <rect x="10" y="15" width="100" height="50" rx="6" fill="url(#mathGrad)" stroke="#0070d1" strokeWidth="2" />
              <text x="60" y="45" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Area = L × W</text>
              <text x="60" y="8" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">Length (12m)</text>
              <text x="-2" y="43" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90 0 43)">Width (8m)</text>
            </svg>
            <span className="text-[9px] text-slate-400 font-bold">Area Rectangle Model</span>
          </div>

          {/* Triangle Angles Sum */}
          <div className="flex flex-col items-center gap-1.5">
            <svg width="100" height="80" className="overflow-visible">
              <polygon points="50,15 10,70 90,70" fill="url(#mathGrad2)" stroke="#a855f7" strokeWidth="2" />
              <text x="50" y="30" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">A</text>
              <text x="25" y="65" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">B</text>
              <text x="75" y="65" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">C</text>
              <text x="50" y="52" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">Sum = 180°</text>
            </svg>
            <span className="text-[9px] text-slate-400 font-bold">Triangle Sum Rule</span>
          </div>

          {/* Hexagon (6 sides) */}
          <div className="flex flex-col items-center gap-1.5">
            <svg width="80" height="80" className="overflow-visible">
              <polygon points="40,10 70,25 70,60 40,75 10,60 10,25" fill="url(#mathGrad3)" stroke="#3b82f6" strokeWidth="2" />
              <text x="40" y="48" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">6 Sides</text>
            </svg>
            <span className="text-[9px] text-slate-400 font-bold">Hexagon (Geometry)</span>
          </div>
        </div>

        {/* Gradients */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="mathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0070d1" />
              <stop offset="100%" stopColor="#004d8d" />
            </linearGradient>
            <linearGradient id="mathGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="mathGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (subject === "Agriculture, Science & Technology") {
    return (
      <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col items-center gap-3 my-4">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Crop Rotation & Soil Science Models</span>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full p-2">
          {/* Crop Rotation Wheel */}
          <div className="flex flex-col items-center gap-1.5">
            <svg width="120" height="120" className="overflow-visible">
              <circle cx="60" cy="60" r="45" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,3" />
              
              <circle cx="60" cy="15" r="15" fill="#1e293b" stroke="#f5a623" strokeWidth="2" />
              <text x="60" y="18" fill="#f5a623" fontSize="7" fontWeight="bold" textAnchor="middle">Maize</text>

              <circle cx="105" cy="60" r="15" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
              <text x="105" y="63" fill="#22c55e" fontSize="7" fontWeight="bold" textAnchor="middle">Beans</text>

              <circle cx="60" cy="105" r="15" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="60" y="108" fill="#3b82f6" fontSize="7" fontWeight="bold" textAnchor="middle">Roots</text>

              <circle cx="15" cy="60" r="15" fill="#1e293b" stroke="#fb7185" strokeWidth="2" />
              <text x="15" y="63" fill="#fb7185" fontSize="7" fontWeight="bold" textAnchor="middle">Fallow</text>
            </svg>
            <span className="text-[9px] text-slate-400 font-bold">4-Year Crop Rotation Cycle</span>
          </div>

          {/* Soil Layer Profile */}
          <div className="flex flex-col items-center gap-1.5 w-full max-w-[180px]">
            <div className="w-full border border-white/10 rounded-lg overflow-hidden text-[9px] font-bold">
              <div className="bg-amber-950 p-2.5 text-amber-200 border-b border-white/5">Topsoil (Organic Loam)</div>
              <div className="bg-amber-800 p-2.5 text-amber-100 border-b border-white/5">Subsoil (Silt & Clay)</div>
              <div className="bg-slate-700 p-2.5 text-slate-300">Parent Rock (Sand & Gravel)</div>
            </div>
            <span className="text-[9px] text-slate-400 font-bold mt-1">Soil Horizons Profile</span>
          </div>
        </div>
      </div>
    );
  }

  if (subject === "English Language") {
    return (
      <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col items-center gap-3 my-4">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Formal Letter Layout Blocks</span>
        <div className="w-full max-w-[260px] border border-white/10 p-4 rounded-lg bg-black/20 font-mono text-[8px] space-y-2 text-white/40">
          <div className="text-right text-[#53b1ff]">Your Address (Sender) & Date</div>
          <div className="text-left text-[#53b1ff] mt-2">Recipient Address (Receiver)</div>
          <div className="text-left font-bold text-white mt-1">Salutation: Dear Sir/Madam,</div>
          <div className="text-center border border-dashed border-white/20 p-2.5 text-white/80 my-1 font-sans">
            Subject: APPLICATION FOR...<br />
            [ Letter Body paragraphs expressing clear requests ]
          </div>
          <div className="text-left font-bold text-white">Yours faithfully,</div>
          <div className="text-left text-slate-500">[Signature]</div>
        </div>
      </div>
    );
  }

  if (subject === "Social Science") {
    return (
      <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col items-center gap-3 my-4">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Zimbabwe Heritage & Architecture</span>
        <div className="flex justify-center items-center gap-6 p-2 w-full">
          {/* Great Zimbabwe Wall representation */}
          <div className="flex flex-col items-center gap-1.5">
            <svg width="120" height="70" className="overflow-visible">
              <path d="M 10 60 Q 30 10 60 10 T 110 60" fill="none" stroke="#94a3b8" strokeWidth="8" strokeDasharray="4,2" />
              <rect x="52" y="10" width="16" height="42" fill="url(#stoneGrad)" stroke="#475569" strokeWidth="1" />
              <text x="60" y="66" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">Conical Tower & Walls</text>
            </svg>
            <span className="text-[9px] text-slate-400 font-bold">Great Zimbabwe Stone Architecture</span>
          </div>
        </div>
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="stoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return null;
}

export default function Home() {
  const {
    isAuthenticated, authError, register, login, logout,
    user, sessionToken, currentDay, activeSubjects, blocks,
    currentBlock, currentBlockIndex,
    questCompleted, tokensJustEarned,
    dismissQuestComplete, recordQuizScore,
  } = useGameState();

  // Selected config for the ZIMSEC Study Chamber
  const [selectedSubject, setSelectedSubject] = useState<string>("Mathematics");
  const [selectedPaper, setSelectedPaper] = useState<"Paper 1" | "Paper 2">("Paper 1");
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true); // Default to demo/testing mode for quick evaluation

  const materials = curriculumData[selectedSubject] || curriculumData["Mathematics"];
  const getReadingMaterial = () => {
    if (!materials) return "";
    if (selectedPaper === "Paper 1" && materials.readingMaterialPaper1) {
      return materials.readingMaterialPaper1;
    }
    if (selectedPaper === "Paper 2" && materials.readingMaterialPaper2) {
      return materials.readingMaterialPaper2;
    }
    return materials.readingMaterial;
  };

  // Chamber phase workflow
  const [chamberPhase, setChamberPhase] = useState<"setup" | "reading" | "exam" | "results">("setup");
  const [chamberTimer, setChamberTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  
  // Anti-cheat stats
  const [violations, setViolations] = useState<number>(0);
  const [showCheatAlert, setShowCheatAlert] = useState<boolean>(false);
  const [mouseLeaveWarning, setMouseLeaveWarning] = useState<boolean>(false);
  
  // Random checkpoint validation during reading
  const [checkpointVisible, setCheckpointVisible] = useState<boolean>(false);
  const [checkpointQuestion, setCheckpointQuestion] = useState<string>("");
  const [checkpointAnswer, setCheckpointAnswer] = useState<string>("");
  const [checkpointInput, setCheckpointInput] = useState<string>("");

  // Exam answers
  const [paper1Answers, setPaper1Answers] = useState<Record<string, string>>({});
  const [paper2Answers, setPaper2Answers] = useState<Record<string, string>>({});

  // This session's rotated selection of questions and study sections
  const [sessionQuiz, setSessionQuiz] = useState<Question[]>([]);
  const [sessionPaper2, setSessionPaper2] = useState<Paper2Question[]>([]);
  const [sessionReading, setSessionReading] = useState<string>("");
  
  // Dashboard UI toggle
  const [showDashboard, setShowDashboard] = useState<boolean>(false);

  // Parent audit and activity log state
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>([]);

  useEffect(() => {
    const savedLog = localStorage.getItem("zimsec_activity_log");
    if (savedLog) {
      try {
        setActivityLog(JSON.parse(savedLog));
      } catch (e) {
        console.warn("Failed to load activity log", e);
      }
    }
  }, []);

  const addActivityEntry = (entry: Omit<ActivityEntry, "timestamp">) => {
    const newEntry: ActivityEntry = {
      ...entry,
      timestamp: new Date().toLocaleTimeString() + " (" + new Date().toLocaleDateString() + ")"
    };
    const updated = [newEntry, ...activityLog];
    setActivityLog(updated);
    localStorage.setItem("zimsec_activity_log", JSON.stringify(updated));
  };

  // Spaced Repetition Mastery state - tracking by key 'subject:paperType'
  const [masteredPapers, setMasteredPapers] = useState<Record<string, { dateLearned: string; score: number }>>({});

  useEffect(() => {
    const saved = localStorage.getItem("zimsec_mastered_papers");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const clean: typeof parsed = {};
        const todayStr = new Date().toISOString().split("T")[0];
        
        Object.keys(parsed).forEach((key) => {
          if (isSameWeek(parsed[key].dateLearned, todayStr)) {
            clean[key] = parsed[key];
          }
        });
        setMasteredPapers(clean);
        localStorage.setItem("zimsec_mastered_papers", JSON.stringify(clean));
      } catch (e) {
        console.warn("Failed to load mastered papers", e);
      }
    }
  }, []);

  const markPaperAsMastered = (subject: string, paper: string, score: number) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const key = `${subject}:${paper}`;
    const updated = {
      ...masteredPapers,
      [key]: { dateLearned: todayStr, score }
    };
    setMasteredPapers(updated);
    localStorage.setItem("zimsec_mastered_papers", JSON.stringify(updated));
  };

  // Homework Helper Chat State
  const [chatInput, setChatInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<{ sender: "student" | "tutor"; text: string }[]>([
    { 
      sender: "tutor", 
      text: "Greetings. I am your Socratic Homework Helper. Ask me any ZIMSEC question. Remember: I use only verified school syllabus material, I will guide you with questions instead of giving answers, and I will be brutally honest if you are wrong. No games, no distractions." 
    }
  ]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, chatLoading]);

  const sendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatHistory((prev) => [...prev, { sender: "student", text: userMessage }]);
    setChatLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-token": sessionToken || "dev-token",
        },
        body: JSON.stringify({
          subject: selectedSubject,
          topic: userMessage,
          rawContent: getReadingMaterial(),
          mode: "homework_helper",
        }),
      });

      if (!response.ok) {
        throw new Error("Tutor connection failed");
      }

      const data = await response.json();
      setChatHistory((prev) => [...prev, { sender: "tutor", text: data.text }]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "tutor", text: "I am having trouble connecting to my knowledge base. Please study your revision materials and try again." },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Automatically select the scheduled subject of the day
  useEffect(() => {
    if (activeSubjects && activeSubjects.length > 0) {
      // Pick first subject where at least one paper format (Paper 1 or Paper 2) is not mastered yet
      const nonMastered = activeSubjects.find(sub => !masteredPapers[`${sub}:Paper 1`] || !masteredPapers[`${sub}:Paper 2`]);
      setSelectedSubject(nonMastered || activeSubjects[0]);
    }
  }, [activeSubjects, masteredPapers]);

  // Adjust paper type automatically based on what has been mastered
  useEffect(() => {
    const p1Mastered = !!masteredPapers[`${selectedSubject}:Paper 1`];
    const p2Mastered = !!masteredPapers[`${selectedSubject}:Paper 2`];
    
    // Auto toggle to the unmastered format if one is already done
    if (p1Mastered && !p2Mastered) {
      setSelectedPaper("Paper 2");
    } else if (!p1Mastered && p2Mastered) {
      setSelectedPaper("Paper 1");
    }
  }, [selectedSubject, masteredPapers]);

  // Sound Synthesizer on violation
  const playViolationSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.6);
      
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      console.warn("Audio Context failed to start", e);
    }
  };

  // Visibility and focus change cheat protection
  useEffect(() => {
    if (chamberPhase !== "reading" && chamberPhase !== "exam") return;

    const triggerViolation = () => {
      if (isTimerRunning) {
        setIsTimerRunning(false);
        setViolations((prev) => prev + 1);
        setShowCheatAlert(true);
        playViolationSound();
      }
    };

    const handleBlur = () => {
      triggerViolation();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerViolation();
      }
    };

    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [chamberPhase, isTimerRunning]);

  // Scoring details

  const getResults = () => {
    const isPaper1 = selectedPaper === "Paper 1";
    let score = 0;
    let totalQuestions = 0;
    const details: any[] = [];

    if (isPaper1) {
      totalQuestions = sessionQuiz.length;
      sessionQuiz.forEach((q) => {
        const studentAns = paper1Answers[q.id];
        const isCorrect = studentAns === q.answer;
        if (isCorrect) score++;
        details.push({
          question: q.question,
          studentAnswer: studentAns ? `${studentAns}` : "Not Answered",
          correctAnswer: q.answer,
          isCorrect,
          explanation: q.explanation,
        });
      });
    } else {
      // Paper 2 Simulated AI evaluation
      totalQuestions = sessionPaper2.length;
      sessionPaper2.forEach((q) => {
        const studentAns = paper2Answers[q.id] || "";
        const lowerAns = studentAns.toLowerCase();
        
        // Match percentage of keywords found
        let matches = 0;
        q.keywords.forEach((keyword) => {
          if (lowerAns.includes(keyword.toLowerCase())) {
            matches++;
          }
        });
        
        const isCorrect = matches >= Math.ceil(q.keywords.length * 0.4); // Need at least 40% keywords correct
        if (isCorrect) score++;
        details.push({
          question: q.question,
          studentAnswer: studentAns || "Not Answered",
          sampleAnswer: q.sampleAnswer,
          isCorrect,
          explanation: q.explanation,
          keywordsMissed: q.keywords.filter(kw => !lowerAns.includes(kw.toLowerCase())),
        });
      });
    }

    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const isCleanScore = violations < 3; // Cheat check
    const passed = percentage >= 70 && isCleanScore;

    return {
      score,
      totalQuestions,
      percentage,
      details,
      passed,
      cheated: !isCleanScore,
    };
  };

  const gradeExam = () => {
    setChamberPhase("results");
    setIsTimerRunning(false);

    // Evaluate results and lock in mastery ONLY IF it is a pass (>= 70% and not flagged for cheating)
    const report = getResults();
    if (report.passed) {
      markPaperAsMastered(selectedSubject, selectedPaper, report.score);
    }

    // Add to parent activity log
    addActivityEntry({
      subject: selectedSubject,
      paperType: selectedPaper,
      score: report.score,
      totalQuestions: report.totalQuestions,
      percentage: report.percentage,
      violations: violations,
      passed: report.passed
    });
  };

  // Calculate stats for Parent Audit
  const getSubjectTries = (sub: string, paper: string) => {
    return activityLog.filter(x => x.subject === sub && x.paperType === paper).length;
  };

  const getCheatedSessionsCount = () => {
    return activityLog.filter(x => x.violations >= 3).length;
  };

  const getPassedPapersCount = () => {
    return Object.keys(masteredPapers).length;
  };

  // Main countdown timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && chamberTimer > 0) {
      interval = setInterval(() => {
        setChamberTimer((prev) => {
          const next = prev - 1;
          
          // Unskippable attention checkpoint every 10 minutes of reading
          const checkpointInterval = isDemoMode ? DEMO_CHECKPOINT_INTERVAL : CHECKPOINT_INTERVAL_SECONDS;
          if (chamberPhase === "reading" && next > 0 && next % checkpointInterval === 0) {
            triggerCheckpoint();
          }

          if (next <= 0) {
            setIsTimerRunning(false);
            if (chamberPhase === "reading") {
              // Automatically move to exam phase
              setChamberPhase("exam");
              setIsTimerRunning(true);
              setChamberTimer(isDemoMode ? DEMO_EXAM_SECONDS : EXAM_SECONDS); // 1m demo vs 50m practice
            } else if (chamberPhase === "exam") {
              // Automatically finish exam
              gradeExam();
            }
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, chamberTimer, chamberPhase, isDemoMode]);

  const triggerCheckpoint = () => {
    setIsTimerRunning(false);
    
    // Choose a random simple arithmetic question
    const num1 = Math.floor(Math.random() * 8) + 2;
    const num2 = Math.floor(Math.random() * 8) + 2;
    setCheckpointQuestion(`What is ${num1} + ${num2}?`);
    setCheckpointAnswer(String(num1 + num2));
    setCheckpointInput("");
    setCheckpointVisible(true);
  };

  const handleCheckpointSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkpointInput.trim() === checkpointAnswer) {
      setCheckpointVisible(false);
      setIsTimerRunning(true);
    } else {
      // Wrong verification answer = cheat violation
      setViolations((prev) => prev + 1);
      playViolationSound();
      setCheckpointVisible(false);
      setIsTimerRunning(true);
    }
  };

  const startStudySession = () => {
    setViolations(0);
    setShowCheatAlert(false);
    setMouseLeaveWarning(false);
    setCheckpointVisible(false);
    setPaper1Answers({});
    setPaper2Answers({});

    // Draw this session's questions and study sections from the rotation pool
    const rotationBase = `zimsec_rotation_${selectedSubject}_${selectedPaper}`;
    if (selectedPaper === "Paper 1") {
      setSessionQuiz(pickRotation(materials.quiz, QUIZ_PER_SESSION, `${rotationBase}_quiz`, (q) => q.id));
      setSessionPaper2([]);
    } else {
      setSessionPaper2(pickRotation(materials.paper2, PAPER2_PER_SESSION, `${rotationBase}_p2`, (q) => q.id));
      setSessionQuiz([]);
    }
    setSessionReading(pickReadingRotation(getReadingMaterial(), `${rotationBase}_reading`));

    // Reading phase duration: 2 minutes for demo, 50 minutes for real ZIMSEC Prep
    setChamberTimer(isDemoMode ? DEMO_READING_SECONDS : READING_SECONDS);
    setChamberPhase("reading");
    setIsTimerRunning(false); // Student must click unblur button to start
  };

  // Go home to the setup room and fully reset the session state
  const resetToSetup = () => {
    setChamberPhase("setup");
    setIsTimerRunning(false);
    setChamberTimer(0);
    setViolations(0);
    setShowCheatAlert(false);
    setCheckpointVisible(false);
    setPaper1Answers({});
    setPaper2Answers({});
    setSessionQuiz([]);
    setSessionPaper2([]);
    setSessionReading("");
  };

  const examReport = chamberPhase === "results" ? getResults() : null;

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const levelName = user.currentLevel === 3 ? "Exam Elite" : user.currentLevel === 2 ? "Syllabus Survivor" : "Initiate";
  const xpPerLevel = user.currentLevel === 1 ? 5 : 10;
  const xpInLevel = user.lifetimeMedals % xpPerLevel;
  const xpProgress = (xpInLevel / xpPerLevel) * 100;

  const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayKeys: Record<string, string> = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  const containerRef = useRef<HTMLDivElement>(null);
  useScrollAnimation({ threshold: 0.12, once: true, staggerSelector: ".stat-card", staggerDelay: 80 });

  if (!isAuthenticated) {
    return <AuthScreen authError={authError} onRegister={register} onLogin={login} />;
  }

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-black text-white relative pb-12">
      {/* Background visual graphics */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#121314] to-black -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#0070d1]/5 rounded-full blur-[140px] pointer-events-none" />

      <main className="p-4 md:p-6 flex flex-col items-center justify-start max-w-5xl mx-auto gap-6 relative z-10">
        
        {/* ── Header Toolbar ── */}
        <div className="w-full bg-white/5 border border-white/10 py-3 px-6 rounded-full flex items-center justify-between text-xs font-bold anim-panel shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-[#0070d1] rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user.username.charAt(0).toUpperCase()}
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-white text-sm">{user.username}</span>
              <span className="text-[9px] text-[#53b1ff] font-bold tracking-wider uppercase">{levelName}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-orange-400 font-extrabold text-xs">{user.currentStreak} Day Streak</span>
            <span className="text-white/15">|</span>
            <button
              onClick={() => setShowDashboard((v) => !v)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                showDashboard
                  ? "bg-[#0070d1] text-white"
                  : "bg-white/8 text-white/70 hover:bg-white/15"
              }`}
            >
              {showDashboard ? "Study Chamber →" : "Parent Progress Centre"}
            </button>
            <button
              onClick={logout}
              title="Log out"
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-rose-400 hover:border-rose-400/30 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ══════════════ PROGRESS DASHBOARD (PARENT AUDIT CENTRE) ══════════════ */}
        {showDashboard && (() => {
          // Helper computations for parent dashboard
          const todayDateStr = new Date().toLocaleDateString();
          const attemptsToday = activityLog.filter(log => log.timestamp.includes(todayDateStr));
          const passedToday = attemptsToday.some(log => log.passed);
          const triesTodayCount = attemptsToday.length;
          const violationsToday = attemptsToday.reduce((acc, log) => acc + log.violations, 0);

          const totalPossiblePapers = Object.keys(curriculumData).length * 2;
          const totalMastered = Object.keys(masteredPapers).length;
          const overallMasteryPercent = totalPossiblePapers > 0 ? Math.round((totalMastered / totalPossiblePapers) * 100) : 0;

          const averageScore = activityLog.length > 0
            ? Math.round(activityLog.reduce((sum, log) => sum + log.percentage, 0) / activityLog.length)
            : 0;

          const focusCompliantSessions = activityLog.filter(log => log.violations === 0).length;
          const focusCompliancePercent = activityLog.length > 0
            ? Math.round((focusCompliantSessions / activityLog.length) * 100)
            : 100;

          return (
            <div className="w-full flex flex-col gap-6 anim-panel">
              
              {/* Parent header */}
              <div className="bg-[#121314] border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-[#53b1ff] font-bold tracking-widest uppercase">Parental Control & Audit Panel</span>
                  <h2 className="text-xl font-bold text-white mt-1">ZIMSEC Academic Progress & Integrity Center</h2>
                  <p className="text-xs text-white/50 mt-1">Real-time supervision of test scores, focus compliance, and subject completion.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-center min-w-[100px]">
                    <span className="text-[9px] text-white/40 font-bold uppercase">Mastery Rate</span>
                    <div className="text-lg font-bold text-[#53b1ff] mt-0.5">{overallMasteryPercent}%</div>
                    <span className="text-[8px] text-slate-400 font-bold">{totalMastered}/{totalPossiblePapers} Papers</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-center min-w-[100px]">
                    <span className="text-[9px] text-white/40 font-bold uppercase">Average Score</span>
                    <div className="text-lg font-bold text-white mt-0.5">{averageScore}%</div>
                    <span className="text-[8px] text-slate-400 font-bold">Over all sessions</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-center min-w-[100px]">
                    <span className="text-[9px] text-white/40 font-bold uppercase">Focus Health</span>
                    <div className={`text-lg font-bold mt-0.5 ${focusCompliancePercent >= 80 ? "text-emerald-400" : "text-rose-400"}`}>
                      {focusCompliancePercent}%
                    </div>
                    <span className="text-[8px] text-slate-400 font-bold">Secure Sessions</span>
                  </div>
                </div>
              </div>

              {/* Today's Learning Summary Box */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-lg flex flex-col gap-1.5 relative overflow-hidden">
                  <span className="text-[9px] text-white/40 font-bold uppercase">Date Studied</span>
                  <div className="text-sm font-bold text-white mt-1">{new Date().toDateString()}</div>
                  <span className="text-[8px] text-[#53b1ff] font-bold">Daily target reset at midnight</span>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-lg flex flex-col gap-1.5 relative overflow-hidden">
                  <span className="text-[9px] text-white/40 font-bold uppercase">Passed Today?</span>
                  <div className={`text-sm font-bold mt-1 uppercase ${passedToday ? "text-emerald-400" : triesTodayCount > 0 ? "text-amber-400" : "text-slate-400"}`}>
                    {passedToday ? "Passed Paper!" : triesTodayCount > 0 ? "Tried, No Pass Yet" : "No Attempts Today"}
                  </div>
                  <span className="text-[8px] text-slate-400 font-bold">Requires {">= 70% & clean focus"}</span>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-lg flex flex-col gap-1.5 relative overflow-hidden">
                  <span className="text-[9px] text-white/40 font-bold uppercase">Tries Today</span>
                  <div className="text-lg font-bold text-white mt-1">{triesTodayCount}</div>
                  <span className="text-[8px] text-slate-400 font-bold">Practice repeats count as tries</span>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-lg flex flex-col gap-1.5 relative overflow-hidden">
                  <span className="text-[9px] text-white/40 font-bold uppercase">Today's Focus Alerts</span>
                  <div className={`text-lg font-bold mt-1 ${violationsToday > 0 ? "text-rose-400 animate-pulse font-extrabold" : "text-emerald-400"}`}>
                    {violationsToday}
                  </div>
                  <span className="text-[8px] text-slate-400 font-bold">{violationsToday > 0 ? "Child lost window focus" : "Perfect study focus!"}</span>
                </div>
              </div>

              {/* Subject Syllabus Mastery Grid */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-[#53b1ff] flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Weekly Syllabus Mastery Breakdown</span>
                  </h3>
                  <span className="text-[9px] text-slate-400 font-bold">Passes lock in mastery status for the week</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(curriculumData).map((sub) => {
                    const p1Key = `${sub}:Paper 1`;
                    const p2Key = `${sub}:Paper 2`;
                    
                    const p1Mastered = !!masteredPapers[p1Key];
                    const p2Mastered = !!masteredPapers[p2Key];
                    
                    // Attempts count
                    const p1TriesTotal = activityLog.filter(x => x.subject === sub && x.paperType === "Paper 1").length;
                    const p1TriesToday = attemptsToday.filter(x => x.subject === sub && x.paperType === "Paper 1").length;
                    
                    const p2TriesTotal = activityLog.filter(x => x.subject === sub && x.paperType === "Paper 2").length;
                    const p2TriesToday = attemptsToday.filter(x => x.subject === sub && x.paperType === "Paper 2").length;

                    // Best scores
                    const p1Best = activityLog
                      .filter(x => x.subject === sub && x.paperType === "Paper 1")
                      .reduce((max, log) => Math.max(max, log.percentage), 0);
                    
                    const p2Best = activityLog
                      .filter(x => x.subject === sub && x.paperType === "Paper 2")
                      .reduce((max, log) => Math.max(max, log.percentage), 0);

                    return (
                      <div key={sub} className="bg-black/20 p-4 rounded-lg border border-white/5 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold text-white">{sub}</h4>
                          <span className="text-[9px] text-white/40 font-bold">
                            {(p1Mastered ? 1 : 0) + (p2Mastered ? 1 : 0)}/2 Complete
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {/* Paper 1 check */}
                          <div className={`p-3 rounded-lg border flex flex-col gap-1 ${
                            p1Mastered 
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                              : p1TriesTotal > 0 
                              ? "bg-amber-500/10 border-amber-500/20 text-amber-400" 
                              : "bg-white/5 border-white/10 text-white/30"
                          }`}>
                            <div className="flex justify-between items-center text-[10px] font-bold">
                              <span>Paper 1 (MCQ)</span>
                              <span>{p1Mastered ? "Passed" : p1TriesTotal > 0 ? "Retrying" : "Not Started"}</span>
                            </div>
                            <div className="flex justify-between text-[8px] text-slate-400 mt-2 font-bold">
                              <span>Tries Today: {p1TriesToday} (Total: {p1TriesTotal})</span>
                              {p1TriesTotal > 0 && <span>Best: {p1Best}%</span>}
                            </div>
                          </div>

                          {/* Paper 2 check */}
                          <div className={`p-3 rounded-lg border flex flex-col gap-1 ${
                            p2Mastered 
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                              : p2TriesTotal > 0 
                              ? "bg-amber-500/10 border-amber-500/20 text-amber-400" 
                              : "bg-white/5 border-white/10 text-white/30"
                          }`}>
                            <div className="flex justify-between items-center text-[10px] font-bold">
                              <span>Paper 2 (Written)</span>
                              <span>{p2Mastered ? "Passed" : p2TriesTotal > 0 ? "Retrying" : "Not Started"}</span>
                            </div>
                            <div className="flex justify-between text-[8px] text-slate-400 mt-2 font-bold">
                              <span>Tries Today: {p2TriesToday} (Total: {p2TriesTotal})</span>
                              {p2TriesTotal > 0 && <span>Best: {p2Best}%</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Parent Audit Log List */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
                <h3 className="text-sm font-bold text-[#53b1ff] flex items-center gap-2 border-b border-white/10 pb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Audit Trail: Detailed Learning Session History</span>
                </h3>

                {activityLog.length === 0 ? (
                  <div className="text-center py-8 text-xs text-white/30 font-bold">
                    No practice sessions recorded yet. Start a study session to begin tracking.
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {activityLog.map((log, index) => {
                      const hasCheated = log.violations >= 3;
                      const isToday = log.timestamp.includes(todayDateStr);
                      return (
                        <div 
                          key={index} 
                          className={`p-4 rounded-lg border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                            hasCheated 
                              ? "bg-rose-500/5 border-rose-500/20" 
                              : log.passed 
                              ? "bg-emerald-500/5 border-emerald-500/15" 
                              : "bg-white/5 border-white/10"
                          } ${isToday ? "border-[#0070d1]/40" : ""}`}
                        >
                          {/* Session Metadata */}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{log.subject}</span>
                              <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded font-bold text-white/60 uppercase">{log.paperType}</span>
                              {isToday && (
                                <span className="text-[8px] bg-[#0070d1]/20 border border-[#0070d1]/30 px-1.5 py-0.5 rounded font-bold text-[#53b1ff] uppercase">
                                  Today
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-white/40 mt-1 font-medium">{log.timestamp}</p>
                          </div>

                          {/* Attempts & Performance Stats */}
                          <div className="flex items-center gap-6">
                            {/* Score percentage */}
                            <div className="text-center">
                              <span className="text-[9px] text-white/40 font-bold uppercase">Percentage Score</span>
                              <p className={`text-sm font-bold mt-0.5 ${log.passed ? "text-emerald-400" : "text-rose-400"}`}>
                                {log.percentage}%
                              </p>
                              <span className="text-[8px] text-white/30 block mt-0.5">({log.score}/{log.totalQuestions} items)</span>
                            </div>

                            {/* Focus Violations */}
                            <div className="text-center">
                              <span className="text-[9px] text-white/40 font-bold uppercase">Focus Violations</span>
                              <p className={`text-sm font-bold mt-0.5 ${log.violations > 0 ? "text-rose-400 font-extrabold" : "text-slate-300"}`}>
                                {log.violations}
                              </p>
                              <span className="text-[8px] text-white/30 block mt-0.5">Tab/Window exits</span>
                            </div>

                            {/* Status Badge */}
                            <div className={`px-2.5 py-1 rounded-lg border text-[9px] font-bold uppercase ${
                              hasCheated 
                                ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                                : log.passed 
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                                : "bg-white/10 border-white/20 text-white/60"
                            }`}>
                              {hasCheated ? "Cheating Flag" : log.passed ? "Passed" : "Failed"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Clear data button */}
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to clear the parental history log?")) {
                    localStorage.removeItem("zimsec_activity_log");
                    setActivityLog([]);
                  }
                }}
                className="py-2.5 px-4 bg-white/5 border border-white/10 hover:bg-rose-500/10 hover:border-rose-500/20 rounded-lg text-xs font-bold text-rose-400 self-end transition-all cursor-pointer"
              >
                Clear Parental Audit Log
              </button>
            </div>
          );
        })()}

        {/* ══════════════ MAIN WORKSPACE: STUDY CHAMBER ══════════════ */}
        {!showDashboard && (
          <div className="w-full flex flex-col gap-6">

            {/* Chamber Status Bar */}
            <div className="w-full bg-[#121314] border border-white/10 p-4 rounded-lg flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3">
                {chamberPhase !== "setup" && (
                  <button
                    onClick={resetToSetup}
                    title="Back to Chamber Setup (abandons this session)"
                    aria-label="Back to Chamber Setup"
                    className="w-10 h-10 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white flex items-center justify-center rounded-full transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div className="w-10 h-10 bg-[#0070d1]/10 border border-[#0070d1]/20 text-[#53b1ff] flex items-center justify-center rounded-lg font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-wide">
                    {chamberPhase === "setup" && "Chamber Setup Room"}
                    {chamberPhase === "reading" && "Phase 1: Focused Study Reading"}
                    {chamberPhase === "exam" && `Phase 2: ZIMSEC ${selectedPaper} Practise`}
                    {chamberPhase === "results" && "Phase 3: AI Marking Certificate"}
                  </h2>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    {chamberPhase === "setup" && "Configure subject and timer strictness"}
                    {chamberPhase === "reading" && `Active Reading Countdown • Click Start to unblur`}
                    {chamberPhase === "exam" && `Answer questions before countdown ends`}
                    {chamberPhase === "results" && "See your marks and security performance log"}
                  </p>
                </div>
              </div>

              {/* Security Status Badge */}
              {(chamberPhase === "reading" || chamberPhase === "exam") && (
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold border ${
                    violations === 0 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                    violations < 3 ? "bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse" :
                    "bg-rose-500/10 border-rose-500/30 text-rose-400 animate-bounce"
                  }`}>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>
                      {violations === 0 ? "SECURE FOCUS" :
                       violations < 3 ? `WARNING: ${violations} FOCUS LOSSES` :
                       "COMPROMISED DETECTED"}
                    </span>
                  </div>

                  {/* Chamber Countdown clock */}
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-[#53b1ff] font-mono text-lg font-bold">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(chamberTimer)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* ── PHASE 0: SETUP ── */}
            {chamberPhase === "setup" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Configuration details */}
                <div className="md:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-6 shadow-xl">
                  <h3 className="text-lg font-bold text-[#53b1ff] border-b border-white/10 pb-2 flex items-center gap-2">
                    Choose Your Study Syllabus
                  </h3>

                  {/* Subject Grid */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {activeSubjects.length > 0 ? `Today's Scheduled Subjects (${currentDay})` : "Open Practice Subjects (Weekend Mode)"}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(activeSubjects.length > 0 ? activeSubjects : Object.keys(curriculumData)).map((sub) => {
                        // A subject is mastered only if BOTH Paper 1 and Paper 2 are completed
                        const p1Mastered = !!masteredPapers[`${sub}:Paper 1`];
                        const p2Mastered = !!masteredPapers[`${sub}:Paper 2`];
                        const isAllMastered = p1Mastered && p2Mastered;
                        const isSaturday = currentDay === "Saturday";
                        const isLocked = isAllMastered && !isSaturday;
                        
                        return (
                          <button
                            key={sub}
                            disabled={isLocked}
                            onClick={() => setSelectedSubject(sub)}
                            className={`p-3 text-xs font-bold rounded-lg text-left border transition-all ${
                              isLocked
                                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400/50 opacity-60 cursor-not-allowed"
                                : selectedSubject === sub
                                ? "bg-[#0070d1]/10 border-[#0070d1] text-[#53b1ff] cursor-pointer"
                                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 cursor-pointer"
                            }`}
                          >
                            <div className="flex justify-between items-center w-full">
                              <span>{sub}</span>
                              {isAllMastered && (
                                <span className="text-[9px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 border border-emerald-500/30">
                                  {isLocked ? "Mastered ✓" : "Polish Mode"}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Paper Select */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Exam Format</label>
                      <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                        {(["Paper 1", "Paper 2"] as const).map((paper) => {
                          const isPaperMastered = !!masteredPapers[`${selectedSubject}:${paper}`];
                          const isSaturday = currentDay === "Saturday";
                          const isLocked = isPaperMastered && !isSaturday;
                          
                          return (
                            <button
                              key={paper}
                              disabled={isLocked}
                              onClick={() => setSelectedPaper(paper)}
                              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                isLocked
                                  ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400/50 opacity-60 cursor-not-allowed"
                                  : selectedPaper === paper
                                  ? "bg-[#0070d1] text-white"
                                  : "text-white/60 hover:text-white"
                              }`}
                            >
                              {paper === "Paper 1" ? "Paper 1 (MCQ)" : "Paper 2 (Written)"}
                              {isPaperMastered && <span className="text-[8px]">✓</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Session Duration</label>
                      <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                        <button
                          onClick={() => setIsDemoMode(false)}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            !isDemoMode
                              ? "bg-[#0070d1] text-white"
                              : "text-white/60 hover:text-white"
                          }`}
                        >
                          Exam (90m)
                        </button>
                        <button
                          onClick={() => setIsDemoMode(true)}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isDemoMode
                              ? "bg-[#0070d1] text-white"
                              : "text-white/60 hover:text-white"
                          }`}
                        >
                          Quick (2m)
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={startStudySession}
                    className="w-full py-4 bg-[#0070d1] hover:bg-[#0064b7] text-white font-bold rounded-lg text-sm transition-all cursor-pointer uppercase tracking-widest mt-4"
                  >
                    Enter Study Chamber
                  </button>
                </div>

                {/* Socratic AI Homework Helper Box */}
                <div className="md:col-span-1 bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-3 shadow-xl h-[480px] overflow-hidden">
                  <h3 className="text-sm font-bold text-[#53b1ff] flex items-center gap-2 border-b border-white/10 pb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Socratic Homework Helper</span>
                  </h3>

                  {/* Chat bubbles */}
                  <div className="flex-1 overflow-y-auto p-2 bg-black/20 rounded-lg space-y-3 flex flex-col min-h-0 text-xs">
                    {chatHistory.map((msg, i) => (
                      <div 
                        key={i} 
                        className={`p-2.5 rounded-lg max-w-[85%] leading-relaxed ${
                          msg.sender === "student" 
                            ? "bg-[#0070d1]/10 border border-[#0070d1]/20 text-[#53b1ff] self-end"
                            : "bg-white/5 border border-white/10 text-white/90 self-start"
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg self-start text-white/50 animate-pulse">
                        Tutor is thinking...
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>

                  {/* Chat Input form */}
                  <form onSubmit={sendChatMessage} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask homework query..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#0070d1]"
                    />
                    <button
                      type="submit"
                      disabled={chatLoading}
                      className="p-2.5 bg-[#0070d1] hover:bg-[#0064b7] text-white rounded-lg flex items-center justify-center transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ── PHASE 1: Timed Focus Reading ── */}
            {chamberPhase === "reading" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Main reading content */}
                <div 
                  className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl flex flex-col gap-6"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ userSelect: 'none' }}
                >
                  
                  {/* Control Panel Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] text-[#53b1ff] font-bold tracking-widest uppercase">ZIMSEC Syllabus Revision Guide</span>
                      <h3 className="text-xl font-bold mt-1">{selectedSubject} Overview</h3>
                    </div>

                    {!isTimerRunning && (
                      <button
                        onClick={() => setIsTimerRunning(true)}
                        className="px-6 py-3 bg-[#0070d1] hover:bg-[#0064b7] text-white font-bold rounded-full text-xs flex items-center gap-2 cursor-pointer uppercase tracking-wider transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        Start Reading Countdown
                      </button>
                    )}
                    {isTimerRunning && (
                      <button
                        onClick={() => setIsTimerRunning(false)}
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/15 font-bold rounded-full text-xs flex items-center gap-2 cursor-pointer transition-all"
                      >
                        <Pause className="w-3.5 h-3.5 fill-white" />
                        Pause Reading
                      </button>
                    )}
                  </div>

                  {/* The Reading Text with dynamic Blur depending on timer activity */}
                  <div className="relative min-h-[300px] bg-black/20 rounded-lg p-6 border border-white/5">
                    <div className={`transition-all duration-300 text-slate-300 leading-relaxed text-sm ${
                      isTimerRunning ? "blur-0 select-none pointer-events-none" : "blur-lg select-none pointer-events-none"
                    }`}>
                      {/* Render paragraphs of study guide and diagrams */}
                      <div className="space-y-4">
                        {formatReadingText(sessionReading || getReadingMaterial())}
                        <SyllabusVisuals subject={selectedSubject} />
                      </div>
                    </div>

                    {/* Blur Overlay when Timer is Paused */}
                    {!isTimerRunning && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-lg p-6 text-center z-20 backdrop-blur-md">
                        <Lock className="w-12 h-12 text-[#53b1ff] mb-3 animate-pulse" />
                        <h4 className="text-base font-bold text-white">Study Material Locked</h4>
                        <p className="text-xs text-white/50 max-w-xs mt-1">
                          Click the &quot;Start Reading Countdown&quot; button to unblur and reveal the syllabus material.
                        </p>
                        <button
                          onClick={() => setIsTimerRunning(true)}
                          className="mt-4 px-6 py-2.5 bg-[#0070d1] hover:bg-[#0064b7] text-white font-bold rounded-full text-xs cursor-pointer uppercase tracking-widest"
                        >
                          Reveal Material
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Socratic AI Homework Helper Box during Reading */}
                <div className="md:col-span-1 bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-3 shadow-xl h-[480px] overflow-hidden">
                  <h3 className="text-sm font-bold text-[#53b1ff] flex items-center gap-2 border-b border-white/10 pb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Socratic Homework Helper</span>
                  </h3>

                  <div className="flex-1 overflow-y-auto p-2 bg-black/20 rounded-lg space-y-3 flex flex-col min-h-0 text-xs">
                    {chatHistory.map((msg, i) => (
                      <div 
                        key={i} 
                        className={`p-2.5 rounded-lg max-w-[85%] leading-relaxed ${
                          msg.sender === "student" 
                            ? "bg-[#0070d1]/10 border border-[#0070d1]/20 text-[#53b1ff] self-end"
                            : "bg-white/5 border border-white/10 text-white/90 self-start"
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg self-start text-white/50 animate-pulse">
                        Tutor is thinking...
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>

                  <form onSubmit={sendChatMessage} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask homework query..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#0070d1]"
                    />
                    <button
                      type="submit"
                      disabled={chatLoading}
                      className="p-2.5 bg-[#0070d1] hover:bg-[#0064b7] text-white rounded-lg flex items-center justify-center transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ── PHASE 2: EXAM QUIZ ── */}
            {chamberPhase === "exam" && (
              <div 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-6"
                onContextMenu={(e) => e.preventDefault()}
                style={{ userSelect: 'none' }}
              >
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] text-[#53b1ff] font-bold tracking-widest uppercase">ZIMSEC PRACTICE TEST</span>
                    <h3 className="text-xl font-bold mt-1">{selectedSubject} — {selectedPaper}</h3>
                  </div>

                  <button
                    onClick={gradeExam}
                    className="px-6 py-3 bg-[#0070d1] hover:bg-[#0064b7] text-white font-bold rounded-full text-xs flex items-center gap-2 cursor-pointer uppercase tracking-wider transition-all"
                  >
                    Submit Practice Paper
                  </button>
                </div>

                {/* PAPER 1 MCQ ENGINE */}
                {selectedPaper === "Paper 1" && (
                  <div className="flex flex-col gap-6">
                    {sessionQuiz.map((q, idx) => (
                      <div key={q.id} className="bg-white/5 border border-white/10 p-5 rounded-lg flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-white leading-relaxed">{q.question}</h4>
                        </div>

                        {/* MCQ options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {q.options.map((opt) => {
                            const optionLetter = opt.trim().charAt(0); // "A", "B", etc.
                            const isSelected = paper1Answers[q.id] === optionLetter;
                            return (
                              <button
                                key={opt}
                                onClick={() => setPaper1Answers(prev => ({ ...prev, [q.id]: optionLetter }))}
                                className={`p-3.5 rounded-lg border text-left text-xs font-bold transition-all cursor-pointer ${
                                  isSelected 
                                    ? "bg-[#0070d1]/10 border-[#0070d1] text-[#53b1ff]"
                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* PAPER 2 WRITTEN SECTION */}
                {selectedPaper === "Paper 2" && (
                  <div className="flex flex-col gap-6">
                    {sessionPaper2.map((q, idx) => (
                      <div key={q.id} className="bg-white/5 border border-white/10 p-5 rounded-lg flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-white leading-relaxed">{q.question}</h4>
                        </div>

                        <textarea
                          placeholder="Type your structured explanation answer here... (be sure to use relevant keywords/formulas)"
                          value={paper2Answers[q.id] || ""}
                          onChange={(e) => setPaper2Answers(prev => ({ ...prev, [q.id]: e.target.value }))}
                          rows={4}
                          className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-xs text-white outline-none focus:border-[#0070d1] transition-all resize-none"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── PHASE 3: CERTIFICATE RESULTS ── */}
            {chamberPhase === "results" && examReport && (
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
                
                {/* Result header */}
                <div className="text-center py-6 border-b border-white/10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-3">
                    {examReport.passed ? (
                      <Trophy className="w-8 h-8 text-[#f5a623]" />
                    ) : (
                      <BookOpen className="w-8 h-8 text-[#53b1ff]" />
                    )}
                  </div>
                  
                  <span className="text-[10px] text-white/40 font-bold tracking-widest uppercase">ZIMSEC PERFORMANCE AUDIT</span>
                  <h3 className="text-2xl font-light mt-1">Practice Complete!</h3>

                  {/* Status Banner */}
                  <div className={`mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold border ${
                    examReport.passed 
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                      : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                  }`}>
                    {examReport.passed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>YOU DID GREAT! (Passed Practice)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>YOU HAVE FAILED (Needs Improvement)</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Score Grid stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                    <span className="text-[9px] text-white/40 font-bold uppercase">Percentage Marks</span>
                    <p className={`text-3xl font-light mt-1 ${examReport.passed ? "text-emerald-400" : "text-rose-400"}`}>
                      {examReport.percentage}%
                    </p>
                    <span className="text-[10px] text-white/30 mt-1 block">Score: {examReport.score} / {examReport.totalQuestions}</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                    <span className="text-[9px] text-white/40 font-bold uppercase">Anti-Cheat Audit</span>
                    <p className={`text-3xl font-light mt-1 ${!examReport.cheated ? "text-emerald-400" : "text-rose-400"}`}>
                      {!examReport.cheated ? "PASSED" : "FAILED"}
                    </p>
                    <span className="text-[10px] text-white/30 mt-1 block">{violations} Cheat Alerts triggered</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                    <span className="text-[9px] text-white/40 font-bold uppercase">Rewards status</span>
                    <p className="text-3xl font-light mt-1 text-[#53b1ff]">
                      {examReport.passed ? "+10m" : "None"}
                    </p>
                    <span className="text-[10px] text-white/30 mt-1 block">{examReport.passed ? "Earned Screen Tokens" : "Pass required"}</span>
                  </div>
                </div>

                {/* Security warning if cheated */}
                {examReport.cheated && (
                  <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-lg flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-rose-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-rose-400 uppercase">Cheating Flag Activated</h4>
                      <p className="text-[11px] text-white/70 mt-0.5">
                        This session registered {violations} focus violations (leaving the browser window or clicking onto other apps). The score has been flagged for parent review.
                      </p>
                    </div>
                  </div>
                )}

                {/* Detailed Marks evaluation list */}
                <div className="flex flex-col gap-4 mt-2">
                  <h4 className="text-sm font-bold text-white/80">Question-by-Question Marking Report</h4>

                  {examReport.details.map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white/40">{idx + 1}.</span>
                          <p className="text-xs font-bold text-white">{item.question}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                          item.isCorrect 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                            : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                        }`}>
                          {item.isCorrect ? "Correct" : "Incorrect"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-black/20 p-3 rounded-lg">
                        <div>
                          <span className="text-[9px] text-white/30 font-bold uppercase">Student&apos;s Answer</span>
                          <p className="text-white font-semibold mt-0.5 whitespace-pre-wrap">{item.studentAnswer}</p>
                        </div>
                        {selectedPaper === "Paper 1" ? (
                          <div>
                            <span className="text-[9px] text-white/30 font-bold uppercase">Correct Option</span>
                            <p className="text-[#53b1ff] font-semibold mt-0.5">{item.correctAnswer}</p>
                          </div>
                        ) : (
                          <div>
                            <span className="text-[9px] text-white/30 font-bold uppercase">Model Examiner Answer Keys</span>
                            <p className="text-emerald-400 font-semibold mt-0.5 whitespace-pre-wrap">{item.sampleAnswer}</p>
                            {item.keywordsMissed && item.keywordsMissed.length > 0 && (
                              <p className="text-[10px] text-rose-400 mt-1 font-bold">
                                Missing concepts: {item.keywordsMissed.join(", ")}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <p className="text-[11px] text-white/50 leading-relaxed bg-white/5 p-2.5 rounded-lg">
                        <strong>Explanation:</strong> {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Conditional Actions: Lock mastery on Pass, allow immediate Retake on Fail */}
                {examReport.passed ? (
                  <button
                    onClick={resetToSetup}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer text-center shadow-lg shadow-emerald-500/10"
                  >
                    Claim Reward & Lock In Mastery
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={startStudySession}
                      className="flex-1 py-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer text-center shadow-lg shadow-rose-500/10"
                    >
                      Retake Chamber Prep (Repeat Test)
                    </button>
                    <button
                      onClick={resetToSetup}
                      className="py-4 px-6 bg-white/10 hover:bg-white/15 text-white font-bold rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer text-center border border-white/10"
                    >
                      Return to Setup
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Anti-Cheat Interruption Overlay ── */}
        {showCheatAlert && (
          <div className="fixed inset-0 bg-black/85 flex flex-col items-center justify-center z-50 p-4 backdrop-blur-md">
            <div className="max-w-md w-full bg-[#121314] border border-rose-500/30 p-8 rounded-2xl text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-rose-500" />
              
              <ShieldAlert className="w-16 h-16 text-rose-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-light text-white mb-2">SECURITY PROTOCOL INTERRUPTED</h2>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Focus Chamber detected you left the browser window or changed tabs. This violation has been added to the security log.
              </p>

              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg mb-6">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block mb-1">Focus Violations Recorded</span>
                <span className="text-2xl font-light text-white">{violations}</span>
              </div>

              <button
                onClick={() => {
                  setShowCheatAlert(false);
                  setIsTimerRunning(true);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow-lg shadow-rose-500/20 uppercase tracking-wider transition-all"
              >
                Resume Focus Session
              </button>
            </div>
          </div>
        )}

        {/* ── Attention Verification Checkpoint Overlay ── */}
        {checkpointVisible && (
          <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4 backdrop-blur-lg">
            <div className="max-w-sm w-full bg-[#121314] border border-[#0070d1]/30 p-6 rounded-2xl text-center shadow-2xl">
              <Eye className="w-8 h-8 text-[#53b1ff] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">Attention Check!</h3>
              <p className="text-xs text-white/50 mb-4">Are you still reading? Solve this simple task to prove you are active:</p>

              <form onSubmit={handleCheckpointSubmit} className="flex flex-col gap-3">
                <div className="bg-black/30 border border-white/10 p-4 rounded-lg text-base font-bold text-[#53b1ff]">
                  {checkpointQuestion}
                </div>

                <input
                  type="text"
                  placeholder="Your answer..."
                  value={checkpointInput}
                  onChange={(e) => setCheckpointInput(e.target.value)}
                  autoFocus
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold text-center text-sm outline-none focus:border-[#0070d1] transition-all"
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0070d1] hover:bg-[#0064b7] text-white font-bold rounded-lg text-xs uppercase tracking-widest cursor-pointer"
                >
                  Verify Attention
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
