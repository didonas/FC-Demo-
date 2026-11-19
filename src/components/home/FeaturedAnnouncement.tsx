"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface AnnouncementSlide {
  id: string;
  category: string;
  headline: string;
  subheadline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  tag?: string;
}

const slides: AnnouncementSlide[] = [
  {
    id: "announcement-1",
    category: "OFFICIAL ANNOUNCEMENT",
    headline: "A new chapter. Together.",
    subheadline: "ONE STATE. ONE PASSION.",
    description:
      "Tamilnadu FC embarks on a bold new journey with renewed sporting ambition, long-term leadership commitment, and the launch of the 2026/27 identity.",
    ctaText: "Discover more",
    ctaLink: "/news/a-new-chapter-together-renewal",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1600&q=85",
    tag: "Club Statement",
  },
  {
    id: "announcement-2",
    category: "OFFICIAL KIT LAUNCH",
    headline: "The 2026/27 Heritage Kit.",
    subheadline: "PORCELAIN & BURNISHED COPPER",
    description:
      "Honouring nine decades of Coromandel coastal football. Woven with subtle Chola stone geometry and tailored for elite athletic performance.",
    ctaText: "Shop the Kit",
    ctaLink: "/store/home-kit-2026-heritage",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=85",
    tag: "New Arrival",
  },
  {
    id: "announcement-3",
    category: "MATCHDAY TICKETING",
    headline: "Coromandel Derby at The Meridian.",
    subheadline: "SATURDAY • 19:30 IST",
    description:
      "Tamilnadu FC host Chennai City FC under the stadium floodlights. Secure your seats in the North Stand or VIP Club suites now.",
    ctaText: "Choose Your Seats",
    ctaLink: "/tickets/match-01",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1600&q=85",
    tag: "Selling Fast",
  },
  {
    id: "announcement-4",
    category: "CAPTAINCY RENEWAL",
    headline: "Arjun Varadhan commits to 2030.",
    subheadline: "#10 • CAPTAIN & PLAYMAKER",
    description:
      "The Madurai-born talisman signs a new four-year contract extension, pledging to guide the club into continental competition.",
    ctaText: "Read Interview",
    ctaLink: "/team/arjun-varadhan",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1600&q=85",
    tag: "Player Exclusive",
  },
];

export const FeaturedAnnouncement: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto rotation
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeSlide = slides[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="py-4 sm:py-8 lg:py-10">
      <div className="site-container">
        {/* Real Madrid-inspired 2/3 + 1/3 Announcement Card */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative rounded-2xl sm:rounded-3xl lg:rounded-[36px] overflow-hidden bg-porcelain-50 border border-porcelain-300 shadow-sm transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[560px]">
            {/* Left Column: 66% High-Impact Cinematic Image */}
            <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-0 lg:min-h-full overflow-hidden bg-navy">
              <div
                key={activeSlide.id + "-img"}
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out transform scale-100 animate-fadeIn"
                style={{ backgroundImage: `url('${activeSlide.image}')` }}
              />

              {/* Gradient blend on right edge for desktop & bottom for mobile */}
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-porcelain-50/90 lg:to-porcelain-50" />
              <div className="absolute inset-0 bg-navy/20" />

              {/* Tag Badge */}
              {activeSlide.tag && (
                <div className="absolute top-4 left-4 sm:top-7 sm:left-7 z-10">
                  <span className="px-3 py-1 rounded-full bg-navy/90 backdrop-blur-md text-porcelain text-[9px] sm:text-xs font-heading font-black tracking-widest uppercase border border-porcelain/20 shadow-md">
                    {activeSlide.tag}
                  </span>
                </div>
              )}

              {/* Mobile Slide Dot Indicator inside image */}
              <div className="absolute bottom-3 left-4 flex lg:hidden items-center gap-1.5 z-10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentIdx === i ? "w-6 bg-copper" : "w-1.5 bg-porcelain/50"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: 34% Clean Editorial Content Panel */}
            <div className="lg:col-span-4 p-5 sm:p-10 lg:p-12 flex flex-col justify-between bg-porcelain-50 z-10 relative">
              <div className="space-y-3 sm:space-y-4">
                {/* Category kicker */}
                <div className="flex items-center gap-2">
                  <span className="h-[2px] w-5 sm:w-6 bg-copper" />
                  <span className="text-[10px] sm:text-xs font-heading font-black tracking-[0.2em] text-copper uppercase">
                    {activeSlide.category}
                  </span>
                </div>

                {/* Main Headline */}
                <h1
                  key={activeSlide.id + "-headline"}
                  className="font-heading font-extrabold text-xl sm:text-3xl lg:text-[34px] leading-tight sm:leading-[1.15] text-navy tracking-tight"
                >
                  {activeSlide.headline}
                </h1>

                {/* Subheadline / Motto */}
                <p className="text-[11px] sm:text-sm font-semibold tracking-wider text-copper uppercase">
                  {activeSlide.subheadline}
                </p>

                {/* Description */}
                <p
                  key={activeSlide.id + "-desc"}
                  className="text-xs sm:text-base text-navy/75 leading-relaxed pt-0.5 line-clamp-3 sm:line-clamp-none"
                >
                  {activeSlide.description}
                </p>
              </div>

              {/* Action Button & Controls */}
              <div className="pt-5 sm:pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5 border-t border-porcelain-200 mt-4 sm:mt-0">
                <Link
                  href={activeSlide.ctaLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg group shrink-0 active:scale-95"
                >
                  <span>{activeSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Desktop Slide Counter & Arrows */}
                <div className="hidden sm:flex items-center gap-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-navy/60">
                    <strong className="text-navy text-sm">
                      0{currentIdx + 1}
                    </strong>{" "}
                    / 0{slides.length}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-full border border-porcelain-300 hover:border-navy hover:bg-porcelain-200 text-navy transition-colors cursor-pointer"
                      aria-label="Previous announcement"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-full border border-porcelain-300 hover:border-navy hover:bg-porcelain-200 text-navy transition-colors cursor-pointer"
                      aria-label="Next announcement"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
