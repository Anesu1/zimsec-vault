import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const ALLOWED_SUBJECTS = [
  "Mathematics",
  "English Language",
  "Agriculture, Science & Technology",
  "Social Science",
  "Ndebele Language",
  "Family & Religious Studies (FRS)",
];

const ALLOWED_MODES = ["flashcards", "quiz", "socratic", "homework_helper"] as const;
type Mode = (typeof ALLOWED_MODES)[number];

export async function POST(req: NextRequest) {
  // Soft auth: log warning in dev, block in production if token missing
  const sessionToken = req.headers.get("x-session-token");
  if (!sessionToken && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { subject, topic, rawContent, masteryPercent, mode } = body as {
    subject: string;
    topic: string;
    rawContent: string;
    masteryPercent: number;
    mode: Mode;
  };

  // Input validation
  if (!subject || !ALLOWED_SUBJECTS.includes(subject)) {
    return NextResponse.json({ error: "Invalid subject" }, { status: 400 });
  }
  if (!topic || typeof topic !== "string" || topic.length > 300) {
    return NextResponse.json({ error: "Invalid topic" }, { status: 400 });
  }
  if (!rawContent || typeof rawContent !== "string") {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }

  // Cap content length to prevent prompt injection via large payloads
  const safeContent = rawContent.slice(0, 3000);
  const safeTopic = topic.replace(/[`"\\]/g, "").slice(0, 300);
  const mastery = typeof masteryPercent === "number" ? Math.max(0, Math.min(100, masteryPercent)) : 50;
  const resolvedMode: Mode = ALLOWED_MODES.includes(mode) ? mode : mastery < 60 ? "flashcards" : "quiz";

  const prompts: Record<Mode, string> = {
    flashcards: `You are a ZIMSEC Grade 7 exam tutor. A student needs foundational help (mastery: ${mastery}%).
Generate exactly 5 flashcard pairs for: Subject: ${subject}, Topic: ${safeTopic}.
Source material: ${safeContent}
Return ONLY a valid JSON array (no prose): [{"front":"...","back":"...","topic":"${safeTopic}"}]`,

    quiz: `You are a ZIMSEC Grade 7 exam tutor. A student is ready for exam-level questions (mastery: ${mastery}%).
Generate exactly 5 multiple-choice questions for: Subject: ${subject}, Topic: ${safeTopic}.
Source material: ${safeContent}
Return ONLY a valid JSON array: [{"id":"q1","question":"...","options":["A. ...","B. ...","C. ...","D. ..."],"answer":"A","explanation":"..."}]`,

    socratic: `You are a Socratic tutor for a ZIMSEC Grade 7 student.
Subject: ${subject}. Topic: ${safeTopic}.
Ask ONE short leading question (max 15 words) to guide the student toward understanding.
Do not give the answer. Output only the question, no punctuation prefix.`,

    homework_helper: `You are a brutally honest ZIMSEC Grade 7 Homework Helper and Socratic tutor. 
Your goal is to guide the student using the Socratic method (ask leading questions, do not give direct answers) and verify their answers.
- If the student's answer or logic is wrong, be brutally honest (e.g., "That is incorrect because...", "You are making a basic mistake here").
- Strict Scope Control: You ONLY answer school, syllabus, or academic questions based on verified ZIMSEC materials. If the student asks anything else (e.g., games, music, movies, slang, or unrelated topics), immediately refuse to answer in a firm, direct tone and tell them to focus on schoolwork.

Verified Materials context for this session:
${safeContent}

Student's input: ${safeTopic}
`
  };

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompts[resolvedMode] }],
      temperature: 0.35,
      max_tokens: 1024,
    });

    const text = completion.choices[0]?.message?.content ?? "";

    if (resolvedMode === "socratic" || resolvedMode === "homework_helper") {
      return NextResponse.json({ text: text.trim() });
    }

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Model returned non-JSON", raw: text }, { status: 502 });
    }

    try {
      const items = JSON.parse(jsonMatch[0]);
      return NextResponse.json({ items, mode: resolvedMode });
    } catch {
      return NextResponse.json({ error: "JSON parse failed", raw: text }, { status: 502 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Groq error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
