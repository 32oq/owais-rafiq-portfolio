"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { formatDateShort } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const AUTO_ADVANCE_MS = 4500;

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [[activeIndex, direction], setSlide] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setSlide([(index + testimonials.length) % testimonials.length, dir]);
    },
    [testimonials.length]
  );

  const next = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    intervalRef.current = setInterval(next, AUTO_ADVANCE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, next, testimonials.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  if (!testimonials.length) return null;

  const t = testimonials[activeIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "50%" : "-50%",
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-50%" : "50%",
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] },
    }),
  };

  return (
    <section id="testimonials" className="section-padding bg-surface overflow-hidden">
      <div className="container-section">
        <SectionHeader
          badge="Testimonials"
          title="What others say"
          subtitle="Feedback from colleagues, managers, and clients I've had the privilege of working with."
        />

        {/* ── Carousel ── */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Testimonials carousel"
          aria-live="polite"
        >
          {/* Card track */}
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragStart={(_, info) => setDragStart(info.point.x)}
                onDragEnd={(_, info) => {
                  const delta = info.point.x - dragStart;
                  if (delta < -40) next();
                  else if (delta > 40) prev();
                }}
                className={cn(
                  "relative bg-white dark:bg-[#111113]",
                  "border border-slate-100 dark:border-white/8",
                  "rounded-3xl p-8 sm:p-12",
                  "shadow-xl shadow-slate-200/60 dark:shadow-black/40",
                  "cursor-grab active:cursor-grabbing select-none"
                )}
                style={{ touchAction: "pan-y" }}
              >
                {/* Top gradient accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />

                {/* Giant decorative quote */}
                <div className="absolute top-8 right-8 sm:top-10 sm:right-10 pointer-events-none" aria-hidden="true">
                  <Quote
                    size={64}
                    strokeWidth={1}
                    className="text-indigo-100 dark:text-indigo-900/60 rotate-180"
                  />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < t.rating
                          ? "text-amber-400 fill-current"
                          : "text-slate-200 dark:text-slate-700 fill-current"
                      }
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <blockquote className="relative z-10 text-slate-700 dark:text-slate-300 text-lg sm:text-xl leading-relaxed font-medium mb-8">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-6" />

                {/* Author row */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-200 dark:shadow-indigo-900/50">
                      {t.name.charAt(0)}
                    </div>
                    {/* Active dot */}
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-white dark:border-[#111113]" />
                  </div>

                  {/* Name + role */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 dark:text-slate-100 leading-none">
                      {t.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {t.role} &middot; {t.company}
                    </p>
                  </div>

                  {/* Date */}
                  <time
                    dateTime={t.date}
                    className="text-xs text-slate-400 dark:text-slate-500 font-mono shrink-0"
                  >
                    {formatDateShort(t.date)}
                  </time>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Prev / Next arrows ── */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className={cn(
                  "absolute -left-5 sm:-left-7 top-1/2 -translate-y-1/2 z-10",
                  "h-11 w-11 rounded-full",
                  "flex items-center justify-center",
                  "bg-white dark:bg-slate-900",
                  "border border-slate-200 dark:border-slate-700",
                  "shadow-md shadow-slate-200/60 dark:shadow-black/30",
                  "text-slate-500 dark:text-slate-400",
                  "hover:text-indigo-600 dark:hover:text-indigo-400",
                  "hover:border-indigo-300 dark:hover:border-indigo-700",
                  "hover:shadow-indigo-100 dark:hover:shadow-indigo-950",
                  "hover:-translate-y-1/2 hover:scale-110",
                  "transition-all duration-200"
                )}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className={cn(
                  "absolute -right-5 sm:-right-7 top-1/2 -translate-y-1/2 z-10",
                  "h-11 w-11 rounded-full",
                  "flex items-center justify-center",
                  "bg-white dark:bg-slate-900",
                  "border border-slate-200 dark:border-slate-700",
                  "shadow-md shadow-slate-200/60 dark:shadow-black/30",
                  "text-slate-500 dark:text-slate-400",
                  "hover:text-indigo-600 dark:hover:text-indigo-400",
                  "hover:border-indigo-300 dark:hover:border-indigo-700",
                  "hover:shadow-indigo-100 dark:hover:shadow-indigo-950",
                  "hover:-translate-y-1/2 hover:scale-110",
                  "transition-all duration-200"
                )}
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* ── Dot indicators + progress ── */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full"
                >
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-300",
                      i === activeIndex
                        ? "w-8 h-2.5 bg-gradient-to-r from-indigo-500 to-violet-500"
                        : "w-2.5 h-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                    )}
                  />
                  {/* Auto-play progress bar on active dot */}
                  {i === activeIndex && !isPaused && (
                    <motion.span
                      key={activeIndex}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                      className="absolute inset-0 rounded-full bg-white/40 origin-left"
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Count label */}
          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-3 font-mono tabular-nums">
            {activeIndex + 1} / {testimonials.length}
          </p>
        </div>
      </div>
    </section>
  );
}
