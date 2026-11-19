"use client";

import React, { useState } from "react";
import { Trophy as TrophyType } from "@/data/clubData";
import { Trophy, Award, Shield, Globe } from "lucide-react";

interface ClubHonoursSectionProps {
  trophies: TrophyType[];
}

export const ClubHonoursSection: React.FC<ClubHonoursSectionProps> = ({ trophies }) => {
  const [activeCategory, setActiveCategory] = useState<"all" | "league" | "cups" | "continental">("all");

  const categories = [
    { id: "all" as const, label: "All Silverware (17)" },
    { id: "league" as const, label: "League (4)" },
    { id: "cups" as const, label: "National Cups (11)" },
    { id: "continental" as const, label: "Continental (2)" },
  ];

  const filteredTrophies = trophies.filter((t) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "league") return t.id === "super-league";
    if (activeCategory === "cups") return t.id === "federation-cup" || t.id === "durand-cup";
    if (activeCategory === "continental") return t.id === "asian-challenge";
    return true;
  });

  const getTrophyIcon = (icon: string) => {
    switch (icon) {
      case "trophy":
        return <Trophy className="w-6 h-6 text-copper" />;
      case "award":
        return <Award className="w-6 h-6 text-copper" />;
      case "shield":
        return <Shield className="w-6 h-6 text-copper" />;
      default:
        return <Globe className="w-6 h-6 text-copper" />;
    }
  };

  return (
    <section id="honours" className="py-12 sm:py-24">
      <div className="site-container">
        {/* Real Madrid-inspired Club Statistics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-porcelain-300 text-center shadow-sm">
            <span className="font-heading font-black text-2xl sm:text-4xl text-navy block">
              1934
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-copper block mt-1">
              Founding Year
            </span>
            <span className="text-[10px] text-navy/50 hidden sm:block mt-0.5">Chennai Marina Coast</span>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-porcelain-300 text-center shadow-sm">
            <span className="font-heading font-black text-2xl sm:text-4xl text-copper block">
              62,500
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-navy block mt-1">
              Stadium Capacity
            </span>
            <span className="text-[10px] text-navy/50 hidden sm:block mt-0.5">The Meridian Fortress</span>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-porcelain-300 text-center shadow-sm">
            <span className="font-heading font-black text-2xl sm:text-4xl text-navy block">
              17
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-copper block mt-1">
              Major Titles
            </span>
            <span className="text-[10px] text-navy/50 hidden sm:block mt-0.5">National & Continental</span>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-porcelain-300 text-center shadow-sm">
            <span className="font-heading font-black text-2xl sm:text-4xl text-copper block">
              100%
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-navy block mt-1">
              Coromandel Pride
            </span>
            <span className="text-[10px] text-navy/50 hidden sm:block mt-0.5">One State. One Passion.</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[2px] w-6 bg-copper" />
            <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase">
              Trophy Cabinet
            </span>
            <span className="h-[2px] w-6 bg-copper" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-navy">
            Honours & Silverware
          </h2>
          <p className="text-xs sm:text-sm text-navy/70 mt-2">
            A proud record of national and continental championships won across ninety years.
          </p>

          {/* Real Madrid-inspired Category Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pt-6 px-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-navy text-porcelain shadow-sm"
                    : "bg-porcelain-200/70 hover:bg-porcelain-300 text-navy/80 hover:text-navy"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trophies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredTrophies.map((trophy) => (
            <div
              key={trophy.id}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-porcelain-300 shadow-sm text-center flex flex-col justify-between hover:border-copper/40 hover:shadow-md transition-all"
            >
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-copper/15 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  {getTrophyIcon(trophy.icon)}
                </div>
                <span className="font-heading font-black text-3xl sm:text-4xl text-navy block">
                  {trophy.count}x
                </span>
                <h3 className="font-heading font-bold text-sm sm:text-base text-navy mt-1.5 sm:mt-2">
                  {trophy.name}
                </h3>
                <p className="text-xs text-navy/60 mt-1.5 sm:mt-2 leading-relaxed">
                  {trophy.description}
                </p>
              </div>

              <div className="pt-3.5 sm:pt-4 mt-4 sm:mt-6 border-t border-porcelain-200">
                <span className="text-[9px] sm:text-[10px] tracking-wider font-semibold text-copper uppercase block">
                  Winning Years
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2">
                  {trophy.years.map((yr) => (
                    <span
                      key={yr}
                      className="px-2 py-0.5 rounded bg-porcelain-100 text-[10px] sm:text-[11px] font-mono font-bold text-navy"
                    >
                      {yr}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
