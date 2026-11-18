"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { ClubTimelineEvent } from "@/data/clubData";
import { Trophy, ArrowDown, Check } from "lucide-react";

interface ClubHistoryTimelineProps {
  timeline: ClubTimelineEvent[];
}

export const ClubHistoryTimeline: React.FC<ClubHistoryTimelineProps> = ({ timeline }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set([0]));
  const [activeMilestone, setActiveMilestone] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setPrefersReducedMotion(true);
      // Immediately reveal all milestones and complete line
      setRevealedIndices(new Set(timeline.map((_, i) => i)));
      setScrollProgress(1);
    }

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setRevealedIndices(new Set(timeline.map((_, i) => i)));
        setScrollProgress(1);
      }
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [timeline]);

  // Scroll Progress and Active Milestone calculation via requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Timeline line starts filling when top of container reaches 65% of viewport
    const startPoint = windowHeight * 0.65;
    // Timeline reaches 100% when bottom reaches 40% of viewport
    const totalSpan = rect.height;
    const currentScrolled = startPoint - rect.top;

    let progress = currentScrolled / totalSpan;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;
    setScrollProgress(progress);

    // Calculate active milestone based on element proximity to viewport focal zone (40% from top)
    const focalY = windowHeight * 0.42;
    let closestIdx = 0;
    let minDistance = Infinity;

    milestoneRefs.current.forEach((el, idx) => {
      if (!el) return;
      const elRect = el.getBoundingClientRect();
      const elCenter = elRect.top + elRect.height * 0.5;
      const dist = Math.abs(elCenter - focalY);

      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }

      // Automatically reveal when top enters bottom 85% of viewport
      if (elRect.top < windowHeight * 0.85) {
        setRevealedIndices((prev) => {
          if (prev.has(idx)) return prev;
          const next = new Set(prev);
          next.add(idx);
          return next;
        });
      }
    });

    setActiveMilestone(closestIdx);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Initial check on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [handleScroll, prefersReducedMotion]);

  // IntersectionObserver for robust fallback reveal
  useEffect(() => {
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setRevealedIndices((prev) => {
                if (prev.has(index)) return prev;
                const next = new Set(prev);
                next.add(index);
                return next;
              });
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -15% 0px",
        threshold: 0.15,
      }
    );

    milestoneRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section id="history" className="py-16 sm:py-24 bg-porcelain-100/70 border-y border-porcelain-200 relative overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[2px] w-6 bg-copper" />
            <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase">
              Chronicle of Glory
            </span>
            <span className="h-[2px] w-6 bg-copper" />
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
            Nine Decades of Heritage
          </h2>
          <p className="text-xs sm:text-sm text-navy/70 mt-2 leading-relaxed">
            From colonial beachside matches in 1934 to continental conquests in the 21st century.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Desktop Central Spine Track */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-4 bottom-28 w-[2px] bg-navy/15 pointer-events-none"
          >
            {/* Animated Burnished Copper Progress Line */}
            <div
              className="w-full bg-copper transition-all duration-150 ease-out origin-top shadow-[0_0_8px_rgba(183,122,89,0.35)]"
              style={{
                height: `${scrollProgress * 100}%`,
              }}
            />
          </div>

          {/* Mobile & Tablet Side Gutter Track (Positioned cleanly on the left) */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute left-5 sm:left-7 -translate-x-1/2 top-4 bottom-28 w-[2px] bg-navy/15 pointer-events-none"
          >
            {/* Animated Burnished Copper Progress Line */}
            <div
              className="w-full bg-copper transition-all duration-150 ease-out origin-top shadow-[0_0_8px_rgba(183,122,89,0.35)]"
              style={{
                height: `${scrollProgress * 100}%`,
              }}
            />
          </div>

          {/* Milestone Items List */}
          <div className="space-y-16 sm:space-y-24 lg:space-y-32">
            {timeline.map((event, index) => {
              const isRevealed = prefersReducedMotion || revealedIndices.has(index);
              const isActive = activeMilestone === index;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={event.year}
                  data-index={index}
                  ref={(el) => {
                    milestoneRefs.current[index] = el;
                  }}
                  className="relative group"
                >
                  {/* Desktop Central Node */}
                  <div
                    aria-hidden="true"
                    className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none"
                  >
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 bg-white ${
                        isActive
                          ? "border-copper bg-copper text-porcelain ring-4 ring-copper/25 shadow-lg scale-110"
                          : isRevealed
                          ? "border-copper bg-white text-copper shadow-md"
                          : "border-navy/20 bg-porcelain-100 text-navy/40"
                      }`}
                    >
                      {isRevealed && !isActive ? (
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full bg-current" />
                      )}
                    </div>
                  </div>

                  {/* Mobile & Tablet Side Gutter Node */}
                  <div
                    aria-hidden="true"
                    className="lg:hidden absolute left-5 sm:left-7 -translate-x-1/2 top-3 sm:top-4 z-20 flex items-center justify-center pointer-events-none"
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 bg-white ${
                        isActive
                          ? "border-copper bg-copper text-porcelain ring-4 ring-copper/25 shadow-md scale-105"
                          : isRevealed
                          ? "border-copper bg-white text-copper shadow-sm"
                          : "border-navy/20 bg-porcelain-100 text-navy/40"
                      }`}
                    >
                      {isRevealed && !isActive ? (
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-current" />
                      )}
                    </div>
                  </div>

                  {/* Milestone Content Grid */}
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center pl-12 sm:pl-16 lg:pl-0 ${
                      !isEven ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Photograph Column */}
                    <div
                      className={`lg:col-span-6 ${
                        isEven
                          ? "lg:pr-14 xl:lg:pr-20"
                          : "lg:order-2 lg:pl-14 xl:lg:pl-20"
                      }`}
                    >
                      <div
                        className={`rounded-3xl overflow-hidden aspect-[16/10] bg-navy relative border transition-all duration-700 ${
                          isRevealed
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-6 scale-[0.98]"
                        } ${
                          isActive
                            ? "border-copper/70 shadow-xl"
                            : "border-porcelain-300 shadow-md hover:border-copper/40"
                        }`}
                        style={{
                          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                          transitionDelay: prefersReducedMotion ? "0ms" : "180ms",
                        }}
                      >
                        <img
                          src={event.image}
                          alt={`Tamilnadu FC ${event.year} — ${event.title}`}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent pointer-events-none" />

                        {/* Corner Year Pill Overlay */}
                        <div className="absolute top-4 right-4 z-10">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md border transition-colors ${
                              isActive
                                ? "bg-copper text-porcelain border-copper/50"
                                : "bg-navy/80 text-porcelain/90 border-porcelain/15"
                            }`}
                          >
                            {event.year}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Text Column */}
                    <div
                      className={`lg:col-span-6 space-y-4 ${
                        isEven
                          ? "lg:pl-14 xl:lg:pl-20"
                          : "lg:order-1 lg:pr-14 xl:lg:pr-20"
                      }`}
                    >
                      {/* Milestone Year Header */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`h-[2px] transition-all duration-500 ${
                              isActive ? "w-8 bg-copper" : "w-4 bg-copper/50"
                            }`}
                          />
                          <span className="text-[10px] font-heading font-black tracking-[0.2em] text-copper uppercase">
                            Milestone 0{index + 1}
                          </span>
                        </div>

                        <span
                          className={`font-heading font-black text-4xl sm:text-5xl lg:text-6xl block transition-all duration-500 tracking-tight ${
                            isRevealed
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-5"
                          } ${
                            isActive
                              ? "text-copper"
                              : "text-navy"
                          }`}
                          style={{
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                            transitionDelay: prefersReducedMotion ? "0ms" : "60ms",
                          }}
                        >
                          {event.year}
                        </span>
                      </div>

                      {/* Milestone Title */}
                      <h3
                        className={`font-heading font-extrabold text-2xl sm:text-3xl text-navy transition-all duration-500 leading-snug ${
                          isRevealed
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-5"
                        }`}
                        style={{
                          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                          transitionDelay: prefersReducedMotion ? "0ms" : "120ms",
                        }}
                      >
                        {event.title}
                      </h3>

                      {/* Milestone Description */}
                      <p
                        className={`text-sm sm:text-base text-navy/75 leading-relaxed transition-all duration-500 ${
                          isRevealed
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-5"
                        }`}
                        style={{
                          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                          transitionDelay: prefersReducedMotion ? "0ms" : "200ms",
                        }}
                      >
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Natural Transition into Honours & Silverware */}
          <div className="pt-16 sm:pt-20 lg:pt-24 text-center relative z-20">
            <div className="inline-flex flex-col items-center">
              {/* Terminal Trophy Node */}
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-md ${
                  scrollProgress >= 0.95
                    ? "bg-copper border-copper text-porcelain ring-4 ring-copper/25"
                    : "bg-white border-porcelain-300 text-copper/70 hover:border-copper"
                }`}
              >
                <Trophy className="w-5 h-5" />
              </div>

              {/* Transition Caption and Link */}
              <div className="mt-4">
                <span className="text-[10px] font-heading font-black tracking-[0.24em] text-copper uppercase block">
                  The Silverware Era
                </span>
                <p className="text-xs sm:text-sm text-navy/70 mt-1 max-w-sm mx-auto leading-relaxed">
                  Over nine decades of triumphs, immortalized in the trophy cabinet.
                </p>
                <a
                  href="#honours"
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-navy hover:text-copper uppercase tracking-wider mt-3 transition-colors group"
                >
                  <span>Explore Honours & Silverware</span>
                  <ArrowDown className="w-3.5 h-3.5 text-copper group-hover:translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
