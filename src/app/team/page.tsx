"use client";

import React, { useState } from "react";
import Link from "next/link";
import { playersData } from "@/data/playersData";
import { clubData } from "@/data/clubData";
import { PlayerPosition } from "@/types";
import { ArrowRight, User } from "lucide-react";

export default function TeamPage() {
  const [selectedPosition, setSelectedPosition] = useState<string>("All");

  const positions = ["All", "Goalkeeper", "Defender", "Midfielder", "Forward"];

  const filteredPlayers =
    selectedPosition === "All"
      ? playersData
      : playersData.filter((p) => p.position === selectedPosition);

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-16 sm:py-24 bg-navy text-porcelain">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/50" />

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

      {/* Position Filter Bar */}
      <section className="sticky top-[80px] md:top-[88px] z-30 bg-porcelain-50/95 backdrop-blur-md border-b border-porcelain-300 py-4">
        <div className="site-container flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {positions.map((pos) => (
              <button
                key={pos}
                onClick={() => setSelectedPosition(pos)}
                className={`px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedPosition === pos
                    ? "bg-navy text-porcelain shadow-sm"
                    : "bg-porcelain-200/70 hover:bg-porcelain-300 text-navy/80 hover:text-navy"
                }`}
              >
                {pos === "All" ? "All Players" : `${pos}s`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Players Grid */}
      <section className="py-12 sm:py-20">
        <div className="site-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredPlayers.map((player) => (
              <Link
                key={player.id}
                href={`/team/${player.slug}`}
                className="group rounded-3xl overflow-hidden bg-white border border-porcelain-300 hover:border-copper/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
              >
                {/* Image Aspect Container */}
                <div className="relative aspect-[4/5] bg-navy overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${player.portraitImage}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-navy/80 backdrop-blur-md text-porcelain text-[10px] font-heading font-bold tracking-widest uppercase border border-porcelain/15">
                      {player.position}
                    </span>
                    <span className="font-heading font-black text-3xl sm:text-4xl text-porcelain/40 group-hover:text-copper transition-colors">
                      #{player.shirtNumber}
                    </span>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-porcelain">
                    <span className="text-[10px] tracking-widest text-copper font-semibold uppercase block">
                      {player.role}
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-porcelain mt-0.5 group-hover:text-copper transition-colors">
                      {player.name}
                    </h3>
                  </div>
                </div>

                {/* Player Quick Stats Snapshot */}
                <div className="p-5 bg-white space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center py-2 bg-porcelain-50 rounded-2xl border border-porcelain-200">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-navy/50 font-medium block">
                        Appearances
                      </span>
                      <strong className="font-heading font-bold text-sm text-navy block mt-0.5">
                        {player.stats.appearances}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-navy/50 font-medium block">
                        {player.position === "Goalkeeper" ? "Clean Sheets" : "Goals"}
                      </span>
                      <strong className="font-heading font-bold text-sm text-copper block mt-0.5">
                        {player.position === "Goalkeeper"
                          ? player.stats.cleanSheets || 0
                          : player.stats.goals}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-navy/50 font-medium block">
                        {player.position === "Goalkeeper" ? "Saves Rate" : "Assists"}
                      </span>
                      <strong className="font-heading font-bold text-sm text-navy block mt-0.5">
                        {player.position === "Goalkeeper"
                          ? `${player.stats.passingAccuracy}%`
                          : player.stats.assists}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-navy/70 pt-2 border-t border-porcelain-200">
                    <span>Age: <strong>{player.age}</strong> • {player.height}</span>
                    <span className="font-heading font-bold text-navy group-hover:text-copper transition-colors flex items-center gap-1 uppercase tracking-wider text-[11px]">
                      Profile <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
