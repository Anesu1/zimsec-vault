"use client";

import { useEffect } from "react";

interface Options {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  staggerSelector?: string;
  staggerDelay?: number;
}

export function useScrollAnimation({
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
  once = true,
  staggerSelector,
  staggerDelay = 80,
}: Options = {}) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("animated");
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe all .animate-on-scroll elements
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // Apply stagger delays to a child selector if provided
    if (staggerSelector) {
      document.querySelectorAll(staggerSelector).forEach((el, i) => {
        (el as HTMLElement).style.animationDelay = `${i * staggerDelay}ms`;
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, once, staggerSelector, staggerDelay]);
}
