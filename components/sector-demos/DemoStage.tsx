"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type DemoStep = {
  id: string;
  title: string;
  content: React.ReactNode;
  /** True for the step that shows the human validating — gets the gold
   *  "final" treatment on its step indicator instead of the neutral one. */
  isValidation?: boolean;
};

const AUTOPLAY_MS = 4200;

/**
 * Shared navigation shell for native sector demonstrations — step dots,
 * prev/next, keyboard arrows, optional autoplay that pauses on hover/focus
 * and stops for good on the first manual interaction. This is chrome, not
 * content: every sector's scenes (what's rendered inside each step) are
 * built separately so the demos don't end up as "the same diagram with
 * different labels."
 */
export type DemoStageLabels = {
  prev: string;
  next: string;
  stepsAriaLabel: string;
};

export default function DemoStage({
  steps,
  ariaLabel,
  labels,
  autoPlay = true,
}: {
  steps: DemoStep[];
  ariaLabel: string;
  labels: DemoStageLabels;
  autoPlay?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [userDriving, setUserDriving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (i: number, manual: boolean) => {
      setIndex(Math.max(0, Math.min(steps.length - 1, i)));
      if (manual) setUserDriving(true);
    },
    [steps.length]
  );

  // Autoplay — off entirely under prefers-reduced-motion (manual nav only),
  // paused while hovered/focused, stopped permanently once the visitor
  // drives manually so it never yanks them forward mid-read.
  useEffect(() => {
    if (!autoPlay || reduceMotion || userDriving || hovering) return;
    if (index >= steps.length - 1) return; // holds on the validation step
    const t = setTimeout(() => goTo(index + 1, false), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [autoPlay, reduceMotion, userDriving, hovering, index, steps.length, goTo]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(index + 1, true);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(index - 1, true);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [index, goTo]);

  const step = steps[index];

  return (
    <div
      ref={containerRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      className="relative w-full outline-none"
    >
      <div
        className="relative w-full flex items-center justify-center px-6 py-10 max-[600px]:px-4 max-[600px]:py-8"
        style={{ aspectRatio: "16 / 9" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex items-center justify-center"
            aria-live="polite"
          >
            {step.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step dots double as "go back" — every earlier (or later) step is
          directly reachable, not just next/prev. */}
      <div className="flex items-center justify-center gap-2 pb-4" role="tablist" aria-label={labels.stepsAriaLabel}>
        {steps.map((s, i) => {
          const isActive = i === index;
          const isDone = i < index;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={s.title}
              data-cursor="link"
              onClick={() => goTo(i, true)}
              className="cursor-pointer rounded-full transition-all duration-300"
              style={{
                width: isActive ? 22 : 8,
                height: 8,
                background:
                  isActive || (s.isValidation && isDone)
                    ? "var(--gold)"
                    : isDone
                      ? "var(--gold-border)"
                      : "var(--border)",
              }}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3 pb-1">
        <button
          type="button"
          data-cursor="link"
          disabled={index === 0}
          onClick={() => goTo(index - 1, true)}
          className="text-[12px] font-medium px-3 py-1.5 rounded-md transition-opacity disabled:opacity-30 disabled:cursor-default cursor-pointer"
          style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
        >
          &larr; {labels.prev}
        </button>
        <span className="text-[11px]" style={{ color: "var(--text-dim)" }}>
          {index + 1} / {steps.length}
        </span>
        <button
          type="button"
          data-cursor="link"
          disabled={index === steps.length - 1}
          onClick={() => goTo(index + 1, true)}
          className="text-[12px] font-medium px-3 py-1.5 rounded-md transition-opacity disabled:opacity-30 disabled:cursor-default cursor-pointer"
          style={{ color: "var(--gold-light)", border: "1px solid var(--gold-border)" }}
        >
          {labels.next} &rarr;
        </button>
      </div>
    </div>
  );
}
