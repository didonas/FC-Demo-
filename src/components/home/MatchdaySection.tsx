"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { matchesData } from "@/data/matchesData";
import { Calendar, MapPin, Ticket, ArrowRight, Shield } from "lucide-react";

export const MatchdaySection: React.FC = () => {
  const nextMatch = matchesData[0]; // tnfc-vs-chennai-city

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 12,
    minutes: 45,
    seconds: 28,
  });

  useEffect(() => {
    // Set match date: 5 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 4);
    targetDate.setHours(19, 30, 0, 0);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 sm:py-12">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-[2px] w-6 bg-copper" />
              <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase">
                Match Centre
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy">
              Upcoming Matchday
            </h2>
          </div>

          <Link
            href="/matches"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy hover:text-copper transition-colors group"
          >
            <span>Full Fixtures & Standings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Master Matchday Card */}
        <div className="rounded-3xl overflow-hidden bg-white border border-porcelain-300 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Match Details & Teams (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                {/* Competition Bar */}
                <div className="flex items-center justify-between pb-6 border-b border-porcelain-200">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-navy text-porcelain text-[10px] font-heading font-bold uppercase tracking-wider">
                      {nextMatch.competition}
                    </span>
                    <span className="text-xs font-semibold text-copper">
                      {nextMatch.roundOrMatchday}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-navy/60">
                    <Calendar className="w-3.5 h-3.5 text-copper" />
                    <span>Sat, 23 Nov 2026 • 7:30 PM IST</span>
                  </div>
                </div>

                {/* Teams Clash Presentation */}
                <div className="py-8 sm:py-10 grid grid-cols-5 items-center text-center">
                  {/* Home Team: Tamilnadu FC */}
                  <div className="col-span-2 flex flex-col items-center group">
                    <div className="w-16 h-20 sm:w-20 sm:h-24 flex items-center justify-center transition-transform group-hover:scale-105">
                      <ClubCrest size={64} variant="primary" />
                    </div>
                    <span className="font-heading font-extrabold text-base sm:text-lg text-navy mt-3 leading-tight">
                      TAMILNADU FC
                    </span>
                    <span className="text-[10px] tracking-widest text-copper font-bold uppercase mt-0.5">
                      Home • 1st
                    </span>
                  </div>

                  {/* VS Badge */}
                  <div className="col-span-1 flex flex-col items-center">
                    <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-porcelain flex items-center justify-center font-heading font-black text-sm text-copper border border-porcelain-300 shadow-inner">
                      VS
                    </span>
                  </div>

                  {/* Away Team: Chennai City FC */}
                  <div className="col-span-2 flex flex-col items-center group">
                    <div className="w-16 h-20 sm:w-20 sm:h-24 flex items-center justify-center">
                      <svg
                        width="60"
                        height="74"
                        viewBox="0 0 100 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform group-hover:scale-105"
                      >
                        <path
                          d="M50 4 L90 20 V65 C90 92 50 116 50 116 C50 116 10 92 10 65 V20 L50 4 Z"
                          fill="#D97706"
                          stroke="#102738"
                          strokeWidth="4"
                        />
                        <circle cx="50" cy="50" r="22" fill="#102738" />
                        <path
                          d="M50 35 L58 55 H42 Z"
                          fill="#FFFFFF"
                        />
                        <text
                          x="50"
                          y="92"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="13"
                          fontWeight="900"
                          fontFamily="sans-serif"
                        >
                          CCFC
                        </text>
                      </svg>
                    </div>
                    <span className="font-heading font-extrabold text-base sm:text-lg text-navy mt-3 leading-tight">
                      CHENNAI CITY FC
                    </span>
                    <span className="text-[10px] tracking-widest text-navy/60 font-bold uppercase mt-0.5">
                      Away • 8th
                    </span>
                  </div>
                </div>

                {/* Venue & Broadcast */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-navy/70 bg-porcelain-50 p-4 rounded-2xl border border-porcelain-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-copper shrink-0" />
                    <span>The Meridian Stadium, Marina Coast, Chennai</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-copper">
                    <span>Broadcast: Star Sports 1 HD • JioCinema</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-6 mt-6 border-t border-porcelain-200 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={`/tickets/${nextMatch.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Ticket className="w-4 h-4 text-copper" />
                  <span>Choose Your Seats (From ₹{nextMatch.ticketStartingPrice})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/matches/${nextMatch.slug}`}
                  className="text-xs font-heading font-bold uppercase tracking-wider text-navy/70 hover:text-navy transition-colors underline"
                >
                  Match Preview & Tactical Lineup
                </Link>
              </div>
            </div>

            {/* Right Column: Countdown Timer & Stadium Atmosphere (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[320px] bg-navy flex flex-col justify-between p-6 sm:p-8 overflow-hidden text-porcelain">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity hover:opacity-50 transition-opacity duration-700"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent" />

              {/* Top pill */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-copper/90 text-navy font-heading font-black text-[10px] tracking-widest uppercase">
                  Match Countdown
                </span>
                <span className="text-xs text-porcelain/70 font-mono">
                  Kickoff 19:30 IST
                </span>
              </div>

              {/* Center: Live Digits Timer */}
              <div className="relative z-10 py-6">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-porcelain/10 backdrop-blur-md rounded-2xl p-3 border border-porcelain/10">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-porcelain block">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] font-semibold tracking-widest uppercase text-copper block mt-1">
                      Days
                    </span>
                  </div>
                  <div className="bg-porcelain/10 backdrop-blur-md rounded-2xl p-3 border border-porcelain/10">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-porcelain block">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] font-semibold tracking-widest uppercase text-copper block mt-1">
                      Hours
                    </span>
                  </div>
                  <div className="bg-porcelain/10 backdrop-blur-md rounded-2xl p-3 border border-porcelain/10">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-porcelain block">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] font-semibold tracking-widest uppercase text-copper block mt-1">
                      Mins
                    </span>
                  </div>
                  <div className="bg-porcelain/10 backdrop-blur-md rounded-2xl p-3 border border-porcelain/10">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-copper block">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] font-semibold tracking-widest uppercase text-copper block mt-1">
                      Secs
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom: Recent Results Teaser */}
              <div className="relative z-10 pt-4 border-t border-porcelain/15">
                <div className="flex items-center justify-between text-xs text-porcelain/70 mb-2">
                  <span className="font-heading font-bold text-[11px] tracking-wider uppercase text-copper">
                    Latest Result
                  </span>
                  <span>15 Nov 2026</span>
                </div>
                <div className="flex items-center justify-between font-heading font-bold text-sm text-porcelain">
                  <span>TAMILNADU FC</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs border border-green-500/30">
                    3 - 1 WIN
                  </span>
                  <span className="text-porcelain/70">KERALA BLASTERS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
