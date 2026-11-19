"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { playersData } from "@/data/playersData";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export const SquadSection: React.FC = () => {
  const squadPreview = playersData.slice(0, 6);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 180;
    scrollContainerRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-8 sm:py-16 bg-porcelain-100/60 border-y border-porcelain-200 overflow-hidden">
      <div className="site-container">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-[2px] w-6 bg-copper" />
              <span className="text-[10px] sm:text-xs font-heading font-black tracking-[0.2em] text-copper uppercase">
                First Team
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-xl sm:text-3xl text-navy">
              Meet the Squad
            </h2>
            <p className="text-xs sm:text-sm text-navy/70 mt-1 max-w-lg hidden sm:block">
              A blend of seasoned experience, youth, and unwavering passion defending the crest.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile swipe scroll arrows */}
            <div className="flex lg:hidden items-center gap-1.5">
              <button
                onClick={() => scroll("left")}
                className="w-8 h-8 rounded-full border border-porcelain-300 bg-white flex items-center justify-center text-navy active:bg-copper active:text-porcelain transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-8 h-8 rounded-full border border-porcelain-300 bg-white flex items-center justify-center text-navy active:bg-copper active:text-porcelain transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy hover:text-copper transition-colors group shrink-0"
            >
              <span>Explore Full Squad</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Mobile Horizontal Snap Rail + Desktop 6-Column Grid */}
        <div
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-6 gap-3.5 sm:gap-5 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory py-2 -mx-5 px-5 sm:mx-0 sm:px-0"
        >
          {squadPreview.map((player) => (
            <Link
              key={player.id}
              href={`/team/${player.slug}`}
              className="group block rounded-2xl overflow-hidden bg-white border border-porcelain-300 hover:border-copper/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-[150px] sm:w-[170px] lg:w-auto shrink-0 snap-start active:scale-98"
            >
              {/* Portrait Container */}
              <div className="relative aspect-[3/4] bg-gradient-to-b from-navy/5 to-navy/20 overflow-hidden flex items-end justify-center">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${player.portraitImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

                {/* Big Shirt Number Backdrop */}
                <div className="absolute top-2 right-2.5 font-heading font-black text-2xl sm:text-4xl text-porcelain/35 group-hover:text-copper/60 transition-colors pointer-events-none">
                  #{player.shirtNumber}
                </div>

                {/* Bottom details inside portrait */}
                <div className="relative z-10 p-2.5 sm:p-4 text-center w-full">
                  <span className="text-[9px] sm:text-xs font-heading font-black text-copper uppercase tracking-wider block">
                    {player.position}
                  </span>
                  <h3 className="font-heading font-extrabold text-xs sm:text-base text-porcelain truncate mt-0.5">
                    {player.name}
                  </h3>
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="p-2 sm:p-3 bg-white text-center border-t border-porcelain-200">
                <span className="text-[9px] sm:text-[10px] tracking-wider font-semibold text-navy/70 group-hover:text-copper transition-colors uppercase flex items-center justify-center gap-1">
                  View Profile <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
