"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { playersData } from "@/data/playersData";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export const SquadSection: React.FC = () => {
  const squadPreview = playersData.slice(0, 6);
  const mobileRailRef = useRef<HTMLDivElement>(null);

  const scrollRail = (direction: "left" | "right") => {
    if (mobileRailRef.current) {
      const scrollAmount = mobileRailRef.current.clientWidth * 0.75;
      mobileRailRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 sm:py-16 bg-porcelain-100/60 border-y border-porcelain-200">
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-[2px] w-6 bg-copper" />
              <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase">
                First Team
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy">
              Meet the Squad
            </h2>
            <p className="text-xs sm:text-sm text-navy/70 mt-1 max-w-lg">
              A blend of seasoned experience, youth, and unwavering passion defending the crest.
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            {/* Mobile Rail Scroll Controls (Real Madrid UX) */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={() => scrollRail("left")}
                className="p-1.5 rounded-full border border-porcelain-300 hover:bg-porcelain-200 text-navy transition-colors active:scale-95 cursor-pointer"
                aria-label="Previous player"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollRail("right")}
                className="p-1.5 rounded-full border border-porcelain-300 hover:bg-porcelain-200 text-navy transition-colors active:scale-95 cursor-pointer"
                aria-label="Next player"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy hover:text-copper transition-colors group"
            >
              <span>Explore Full Squad</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-copper" />
            </Link>
          </div>
        </div>

        {/* 1. MOBILE ONLY (< lg): Real Madrid Horizontal Player Rail with Peek */}
        <div
          ref={mobileRailRef}
          className="flex lg:hidden gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {squadPreview.map((player) => (
            <Link
              key={player.id}
              href={`/team/${player.slug}`}
              className="group w-[58vw] max-w-[240px] shrink-0 snap-start block rounded-2xl overflow-hidden bg-white border border-porcelain-300 hover:border-copper/50 shadow-sm transition-all flex flex-col justify-between"
            >
              {/* Portrait Container */}
              <div className="relative aspect-[3/4] bg-gradient-to-b from-navy/5 to-navy/20 overflow-hidden flex items-end justify-center">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${player.portraitImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

                {/* Big Shirt Number Backdrop */}
                <div className="absolute top-2 right-2.5 font-heading font-black text-3xl text-porcelain/35 group-hover:text-copper/60 transition-colors pointer-events-none">
                  #{player.shirtNumber}
                </div>

                {/* Bottom details inside portrait */}
                <div className="relative z-10 p-3 text-center w-full">
                  <span className="text-[10px] font-heading font-black text-copper uppercase tracking-wider block">
                    {player.position}
                  </span>
                  <h3 className="font-heading font-extrabold text-sm text-porcelain truncate mt-0.5">
                    {player.name}
                  </h3>
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="p-2.5 bg-white text-center border-t border-porcelain-200">
                <span className="text-[10px] tracking-wider font-semibold text-navy/70 group-hover:text-copper transition-colors uppercase flex items-center justify-center gap-1">
                  View Profile <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-copper" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 2. DESKTOP ONLY (>= lg): Approved 6-Column Grid (100% PRESERVED) */}
        <div className="hidden lg:grid grid-cols-6 gap-5">
          {squadPreview.map((player) => (
            <Link
              key={player.id}
              href={`/team/${player.slug}`}
              className="group block rounded-2xl overflow-hidden bg-white border border-porcelain-300 hover:border-copper/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Portrait Container */}
              <div className="relative aspect-[3/4] bg-gradient-to-b from-navy/5 to-navy/20 overflow-hidden flex items-end justify-center">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${player.portraitImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

                {/* Big Shirt Number Backdrop */}
                <div className="absolute top-2 right-3 font-heading font-black text-4xl text-porcelain/30 group-hover:text-copper/60 transition-colors pointer-events-none">
                  {player.shirtNumber}
                </div>

                {/* Bottom details inside portrait */}
                <div className="relative z-10 p-4 text-center w-full">
                  <span className="text-xs font-heading font-black text-copper uppercase tracking-wider block">
                    #{player.shirtNumber} • {player.position}
                  </span>
                  <h3 className="font-heading font-extrabold text-base text-porcelain truncate mt-0.5">
                    {player.name}
                  </h3>
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="p-3 bg-white text-center border-t border-porcelain-200">
                <span className="text-[10px] tracking-wider font-semibold text-navy/60 group-hover:text-copper transition-colors uppercase flex items-center justify-center gap-1">
                  View Profile <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
