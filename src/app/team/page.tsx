"use client";

import React, { useState } from "react";
import Link from "next/link";
import { playersData } from "@/data/playersData";
import { ArrowRight, User } from "lucide-react";

export default function TeamPage() {
  const [selectedPosition, setSelectedPosition] = useState<string>("All");

  const positions = [
    { label: "All Players", value: "All", count: playersData.length },
    {
      label: "Goalkeepers",
      value: "Goalkeeper",
      count: playersData.filter((p) => p.position === "Goalkeeper").length,
    },
    {
      label: "Defenders",
      value: "Defender",
      count: playersData.filter((p) => p.position === "Defender").length,
    },
    {
      label: "Midfielders",
      value: "Midfielder",
      count: playersData.filter((p) => p.position === "Midfielder").length,
    },
    {
      label: "Forwards",
      value: "Forward",
      count: playersData.filter((p) => p.position === "Forward").length,
    },
  ];

  const filteredPlayers =
    selectedPosition === "All"
      ? playersData
      : playersData.filter((p) => p.position === selectedPosition);

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Hero Banner */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 bg-navy text-porcelain">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/60" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-heading font-black tracking-[0.24em] text-copper uppercase block mb-3">
            First Team Squad • 2026/27
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-porcelain tracking-tight">
            The Men of Tamil Nadu
          </h1>
          <p className="text-sm sm:text-base text-porcelain/80 mt-4 leading-relaxed">
            United by heritage, driven by ambition. Meet the senior squad competing across domestic and continental championships under manager Gabriel Santana.
          </p>
        </div>
      </section>

      {/* Official Squad Photograph Showcase */}
      <section className="relative z-20 -mt-10 sm:-mt-16 mb-4 sm:mb-8">
        <div className="site-container">
          <div className="rounded-3xl overflow-hidden bg-navy border-2 border-porcelain-300 shadow-2xl relative group">
            <div className="relative aspect-[16/9] w-full bg-navy flex items-center justify-center overflow-hidden">
              <img
                src="/images/team/squad-2026.webp"
                alt="Tamilnadu FC Official First Team Squad 2026/27"
                className="w-full h-full object-cover sm:object-contain bg-navy"
                loading="eager"
              />
              {/* Subtle gradient vignette at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent pointer-events-none" />

              {/* Squad Photo Caption Banner */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-porcelain">
                <div>
                  <span className="text-[10px] sm:text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block">
                    Official Squad Photograph 2026/27
                  </span>
                  <h2 className="font-heading font-bold text-base sm:text-xl text-porcelain">
                    Tamilnadu Football Club • First Team XI
                  </h2>
                </div>
                <div className="flex items-center gap-3 text-[11px] sm:text-xs text-porcelain/75 font-heading">
                  <span className="px-3 py-1 rounded-full bg-navy/80 border border-porcelain/20 backdrop-blur-sm">
                    11 Players
                  </span>
                  <span className="hidden md:inline-block text-porcelain/60">
                    The Meridian Stadium • Chennai
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Position Filter Bar */}
      <section className="sticky top-16 md:top-[88px] z-30 bg-porcelain-50/95 backdrop-blur-md border-b border-porcelain-300 py-3 shadow-sm">
        <div className="site-container flex items-center justify-start sm:justify-center overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto py-1 px-1">
            {positions.map((pos) => (
              <button
                key={pos.value}
                onClick={() => setSelectedPosition(pos.value)}
                className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95 ${
                  selectedPosition === pos.value
                    ? "bg-navy text-porcelain shadow-sm"
                    : "bg-porcelain-200/70 hover:bg-porcelain-300 text-navy/80 hover:text-navy"
                }`}
              >
                <span>{pos.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedPosition === pos.value
                      ? "bg-copper text-porcelain"
                      : "bg-porcelain-300 text-navy/70"
                  }`}
                >
                  {pos.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Players Grid */}
      <section className="py-8 sm:py-20">
        <div className="site-container">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-8">
            {filteredPlayers.map((player) => (
              <Link
                key={player.id}
                href={`/team/${player.slug}`}
                className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-porcelain-300 hover:border-copper/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
              >
                {/* Image Aspect Container */}
                <div className="relative aspect-[4/5] bg-navy overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${player.portraitImage}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-navy/80 backdrop-blur-md text-porcelain text-[8px] sm:text-[10px] font-heading font-bold tracking-widest uppercase border border-porcelain/15">
                      {player.position}
                    </span>
                    <span className="font-heading font-black text-xl sm:text-4xl text-porcelain/40 group-hover:text-copper transition-colors">
                      #{player.shirtNumber}
                    </span>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 text-porcelain">
                    <span className="text-[9px] sm:text-[10px] tracking-widest text-copper font-semibold uppercase block">
                      {player.role}
                    </span>
                    <h3 className="font-heading font-extrabold text-sm sm:text-xl text-porcelain mt-0.5 group-hover:text-copper transition-colors truncate">
                      {player.name}
                    </h3>
                  </div>
                </div>

                {/* Player Quick Stats Snapshot with refined vertical spacing */}
                <div className="p-3 sm:p-5 bg-white space-y-2.5 sm:space-y-4">
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center p-2 sm:px-3 sm:py-3.5 bg-porcelain-50 rounded-xl sm:rounded-2xl border border-porcelain-200">
                    <div>
                      <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-navy/60 font-semibold block leading-tight truncate">
                        Apps
                      </span>
                      <strong className="font-heading font-bold text-xs sm:text-sm text-navy block mt-0.5">
                        {player.stats.appearances}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-navy/60 font-semibold block leading-tight truncate">
                        {player.position === "Goalkeeper" ? "Clean" : "Goals"}
                      </span>
                      <strong className="font-heading font-bold text-xs sm:text-sm text-copper block mt-0.5">
                        {player.position === "Goalkeeper"
                          ? player.stats.cleanSheets || 0
                          : player.stats.goals}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-navy/60 font-semibold block leading-tight truncate">
                        {player.position === "Goalkeeper" ? "Rate" : "Assists"}
                      </span>
                      <strong className="font-heading font-bold text-xs sm:text-sm text-navy block mt-0.5">
                        {player.position === "Goalkeeper"
                          ? `${player.stats.passingAccuracy}%`
                          : player.stats.assists}
                      </strong>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[10px] sm:text-xs text-navy/70 pt-2 border-t border-porcelain-200">
                    <span className="truncate">
                      Age: <strong>{player.age}</strong> • {player.height}
                    </span>
                    <span className="font-heading font-bold text-navy group-hover:text-copper transition-colors flex items-center gap-1 uppercase tracking-wider text-[10px] sm:text-[11px] self-end sm:self-auto">
                      Profile <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching & Technical Staff */}
      <section className="py-16 sm:py-24 bg-porcelain-100/70 border-t border-porcelain-200">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block mb-1">
              Technical Bench
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
              Coaching & Sporting Direction
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-3xl bg-white border border-porcelain-300 shadow-sm text-center">
              <div className="w-20 h-20 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <User className="w-10 h-10 text-navy/60" />
              </div>
              <span className="text-[10px] font-semibold text-copper tracking-widest uppercase block">
                Head Coach
              </span>
              <h3 className="font-heading font-extrabold text-lg text-navy mt-1">
                Gabriel Santana
              </h3>
              <p className="text-xs text-navy/70 mt-2 leading-relaxed">
                Tactical architect of the club&apos;s vertical possession and relentless counter-pressing structure.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-porcelain-300 shadow-sm text-center">
              <div className="w-20 h-20 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <User className="w-10 h-10 text-navy/60" />
              </div>
              <span className="text-[10px] font-semibold text-copper tracking-widest uppercase block">
                Assistant Coach
              </span>
              <h3 className="font-heading font-extrabold text-lg text-navy mt-1">
                S. Venkatesh
              </h3>
              <p className="text-xs text-navy/70 mt-2 leading-relaxed">
                Former national team forward overseeing offensive dead-ball plays and transitional finishing.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-porcelain-300 shadow-sm text-center">
              <div className="w-20 h-20 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <User className="w-10 h-10 text-navy/60" />
              </div>
              <span className="text-[10px] font-semibold text-copper tracking-widest uppercase block">
                Goalkeeping Coach
              </span>
              <h3 className="font-heading font-extrabold text-lg text-navy mt-1">
                Davide Rossi
              </h3>
              <p className="text-xs text-navy/70 mt-2 leading-relaxed">
                Italian specialist in spatial anticipation, shot-stopping reflexes, and sweeping distribution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
