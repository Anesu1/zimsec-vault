"use client";

import { useState, useEffect, useRef } from "react";
import { curriculumData, type SubjectMaterials } from "../lib/curriculumData";

interface GeneratedItems {
  flashcards: SubjectMaterials["flashcards"];
  quiz: SubjectMaterials["quiz"];
  source: "groq" | "static";
}

const cache = new Map<string, GeneratedItems>();

export function useGroqQuestions(
  subject: string,
  masteryPercent: number,
  sessionToken: string
): { materials: SubjectMaterials | null; loading: boolean } {
  const [materials, setMaterials] = useState<SubjectMaterials | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!subject) return;

    const cacheKey = `${subject}:${masteryPercent < 60 ? "low" : "high"}`;
    const staticData = curriculumData[subject];

    // Return cached result immediately
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey)!;
      setTimeout(() => {
        setMaterials({
          readingMaterial: staticData?.readingMaterial ?? "",
          flashcards: cached.flashcards,
          quiz: cached.quiz,
          paper2: staticData?.paper2 ?? [],
        });
      }, 0);
      return;
    }

    // Fall back to static data while Groq loads
    if (staticData) setMaterials(staticData);

    // Pick a representative topic from the static data
    const topic = staticData?.flashcards[0]?.topic ?? subject;
    // Use the static rawContent as the seed for generation
    const rawContent = staticData
      ? [
          ...staticData.flashcards.map((f) => `${f.front} — ${f.back}`),
          ...staticData.quiz.map((q) => q.question),
        ].join("\n")
      : subject;

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true);

    const mode = masteryPercent < 60 ? "flashcards" : "quiz";

    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(sessionToken ? { "x-session-token": sessionToken } : {}),
      },
      body: JSON.stringify({ subject, topic, rawContent, masteryPercent, mode }),
      signal: abortRef.current.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.items || !Array.isArray(data.items)) return;

        const generated: GeneratedItems = {
          flashcards:
            mode === "flashcards"
              ? data.items
              : staticData?.flashcards ?? [],
          quiz:
            mode === "quiz"
              ? data.items
              : staticData?.quiz ?? [],
          source: "groq",
        };

        cache.set(cacheKey, generated);
        setMaterials({
          readingMaterial: staticData?.readingMaterial ?? "",
          flashcards: generated.flashcards,
          quiz: generated.quiz,
          paper2: staticData?.paper2 ?? [],
        });
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          // Silently fall back to static data already set above
          console.warn("[Groq] Falling back to static data:", err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => abortRef.current?.abort();
  }, [subject, masteryPercent, sessionToken]);

  return { materials, loading };
}
