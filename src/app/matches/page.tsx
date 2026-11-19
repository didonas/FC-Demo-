"use client";

import React, { useState } from "react";
import Link from "next/link";
import { matchesData, standingsTable } from "@/data/matchesData";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { Calendar, MapPin, Ticket, ArrowRight, Trophy, CheckCircle2 } from "lucide-react";

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState<"fixtures" | "results" | "standings">("fixtures");
  const [selectedCompetition, setSelectedCompetition] = useState<string>("All");

  const competitions = ["All", "Indian Super League", "Asian Champions Cup"];

  const filteredUpcoming = matchesData
    .filter((m) => m.status === "Upcoming")
    .filter(
      (m) =>
        selectedCompetition === "All" || m.competition === selectedCompetition
    );

  const filteredResults = matchesData
    .filter((m) => m.status === "Finished")
    .filter(
      (m) =>
        selectedCompetition === "All" || m.competition === selectedCompetition
    );

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 bg-navy text-porcelain">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/50" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-heading font-black tracking-[0.24em] text-copper uppercase block mb-3">
            Match Centre • 2026/27 Season
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-porcelain tracking-tight">
            Fixtures & Standings
          </h1>
          <p className="text-sm sm:text-base text-porcelain/80 mt-4 leading-relaxed">
            Track Tamilnadu FC across the Indian Super League, Asian Champions Cup, and national cup competitions.
          </p>
        </div>
      </section>

      {/* Main Tabs Navigation Bar */}
      <section className="sticky top-16 md:top-[88px] z-30 bg-porcelain-50/95 backdrop-blur-md border-b border-porcelain-300 py-2.5 sm:py-3.5">
        <div className="site-container flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          {/* Main Tab Controls */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {[
              { id: "fixtures", label: "Upcoming Fixtures" },
              { id: "results", label: "Recent Results" },
              { id: "standings", label: "League Standings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-navy text-porcelain shadow-sm"
                    : "bg-porcelain-200/70 hover:bg-porcelain-300 text-navy/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Competition Filter */}
          {activeTab !== "standings" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-navy/60 font-medium hidden md:inline">Competition:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                {competitions.map((comp) => (
                  <button
                    key={comp}
                    onClick={() => setSelectedCompetition(comp)}
                    className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                      selectedCompetition === comp
                        ? "bg-copper text-navy font-bold"
                        : "bg-porcelain-200 text-navy/70 hover:text-navy"
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tab 1: Upcoming Fixtures */}
      {activeTab === "fixtures" && (
        <section className="py-12 sm:py-16">
          <div className="site-container max-w-5xl space-y-6">
            {filteredUpcoming.map((match) => (
              <div
                key={match.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm hover:border-copper/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-porcelain-200">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-navy text-porcelain text-[10px] font-heading font-bold uppercase tracking-wider">
                      {match.competition}
                    </span>
                    <span className="text-xs font-semibold text-copper">
                      {match.roundOrMatchday}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-navy/70">
                    <Calendar className="w-3.5 h-3.5 text-copper" />
                    <span>{match.date} • {match.kickoffTime}</span>
                  </div>
                </div>

                {/* Match Teams Row */}
                <div className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-7 items-center gap-4 text-center">
                  {/* Home Team */}
                  <div className="md:col-span-3 flex items-center justify-center md:justify-end gap-4">
                    <span className="font-heading font-extrabold text-lg sm:text-xl text-navy order-2 md:order-1">
                      {match.homeTeam.name}
                    </span>
                    <div className="w-12 h-14 flex items-center justify-center order-1 md:order-2">
                      {match.homeTeam.isHome ? (
                        <ClubCrest size={48} variant="primary" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-porcelain-200 flex items-center justify-center font-heading font-black text-navy text-xs">
                          {match.homeTeam.shortName}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* VS / Time */}
                  <div className="md:col-span-1 flex flex-col items-center">
                    <span className="px-3 py-1 rounded-full bg-porcelain-100 border border-porcelain-300 font-heading font-bold text-xs text-copper">
                      VS
                    </span>
                    <span className="text-[10px] font-mono text-navy/50 mt-1">19:30 IST</span>
                  </div>

                  {/* Away Team */}
                  <div className="md:col-span-3 flex items-center justify-center md:justify-start gap-4">
                    <div className="w-12 h-14 flex items-center justify-center">
                      {!match.awayTeam.isHome && match.awayTeam.name === "TAMILNADU FC" ? (
                        <ClubCrest size={48} variant="primary" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-copper/20 flex items-center justify-center font-heading font-black text-copper text-xs border border-copper/30">
                          {match.awayTeam.shortName}
                        </div>
                      )}
                    </div>
                    <span className="font-heading font-extrabold text-lg sm:text-xl text-navy">
                      {match.awayTeam.name}
                    </span>
                  </div>
                </div>

                {/* Venue & Action Buttons */}
                <div className="pt-5 sm:pt-6 border-t border-porcelain-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 text-xs text-navy/60">
                    <MapPin className="w-4 h-4 text-copper" />
                    <span>{match.stadium}, {match.city}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/matches/${match.slug}`}
                      className="text-xs font-heading font-bold uppercase tracking-wider text-navy/70 hover:text-navy underline"
                    >
                      Match Details
                    </Link>
                    {match.ticketsAvailable && (
                      <Link
                        href={`/tickets/${match.id}`}
                        className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-full bg-navy hover:bg-copper text-porcelain text-xs font-heading font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <Ticket className="w-3.5 h-3.5 text-copper" />
                        <span>Tickets From ₹{match.ticketStartingPrice}</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 2: Recent Results */}
      {activeTab === "results" && (
        <section className="py-12 sm:py-16">
          <div className="site-container max-w-5xl space-y-6">
            {filteredResults.map((match) => (
              <div
                key={match.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center justify-between pb-6 border-b border-porcelain-200">
                  <span className="px-3 py-1 rounded-full bg-navy text-porcelain text-[10px] font-heading font-bold uppercase tracking-wider">
                    {match.competition} • {match.roundOrMatchday}
                  </span>
                  <span className="text-xs text-navy/60">{match.date}</span>
                </div>

                <div className="py-6 sm:py-8 grid grid-cols-7 items-center text-center">
                  <div className="col-span-3 flex items-center justify-end gap-3">
                    <span className="font-heading font-extrabold text-base sm:text-xl text-navy">
                      {match.homeTeam.name}
                    </span>
                  </div>
                  <div className="col-span-1 flex flex-col items-center">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-navy">
                      {match.homeScore} - {match.awayScore}
                    </span>
                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest mt-1">
                      Full Time
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center justify-start gap-3">
                    <span className="font-heading font-extrabold text-base sm:text-xl text-navy">
                      {match.awayTeam.name}
                    </span>
                  </div>
                </div>

                {match.report && (
                  <p className="text-xs sm:text-sm text-navy/70 italic bg-porcelain-50 p-4 rounded-2xl border border-porcelain-200 leading-relaxed mb-4">
                    &ldquo;{match.report}&rdquo;
                  </p>
                )}

                <div className="pt-4 border-t border-porcelain-200 flex items-center justify-between text-xs text-navy/60">
                  <span>{match.stadium}, {match.city}</span>
                  <Link
                    href={`/matches/${match.slug}`}
                    className="font-heading font-bold text-navy hover:text-copper transition-colors uppercase tracking-wider flex items-center gap-1"
                  >
                    Full Match Report <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 3: League Standings Table */}
      {activeTab === "standings" && (
        <section id="standings" className="py-12 sm:py-16">
          <div className="site-container max-w-5xl">
            <div className="rounded-3xl overflow-hidden bg-white border border-porcelain-300 shadow-sm">
              <div className="p-6 bg-porcelain-50 border-b border-porcelain-200 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-navy">
                    Indian Super League Standings
                  </h3>
                  <span className="text-xs text-navy/60">Season 2026/27 • Matchday 13</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                  <span className="text-navy/70">AFC Champions League Spot</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[580px] text-left text-xs sm:text-sm">
                  <thead className="bg-porcelain-100/70 border-b border-porcelain-200 text-[11px] font-heading font-bold text-navy/70 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4 text-center">Pos</th>
                      <th className="py-3 px-4">Club</th>
                      <th className="py-3 px-3 text-center">PL</th>
                      <th className="py-3 px-3 text-center">W</th>
                      <th className="py-3 px-3 text-center">D</th>
                      <th className="py-3 px-3 text-center">L</th>
                      <th className="py-3 px-3 text-center">GF</th>
                      <th className="py-3 px-3 text-center">GA</th>
                      <th className="py-3 px-3 text-center">GD</th>
                      <th className="py-3 px-4 text-center font-black text-navy">PTS</th>
                      <th className="py-3 px-4 text-center hidden md:table-cell">Form</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-porcelain-200 font-medium">
                    {standingsTable.map((row) => {
                      const isTNFC = row.team === "TAMILNADU FC";
                      return (
                        <tr
                          key={row.position}
                          className={`${
                            isTNFC
                              ? "bg-copper/10 font-bold border-l-4 border-l-copper"
                              : "hover:bg-porcelain-50"
                          } transition-colors`}
                        >
                          <td className="py-3.5 px-4 text-center font-heading font-bold text-navy">
                            {row.position}
                          </td>
                          <td className="py-3.5 px-4 font-heading font-bold text-navy flex items-center gap-2">
                            {isTNFC && (
                              <span className="w-2 h-2 rounded-full bg-copper" />
                            )}
                            {row.team}
                          </td>
                          <td className="py-3.5 px-3 text-center text-navy/80">{row.played}</td>
                          <td className="py-3.5 px-3 text-center text-navy/80">{row.won}</td>
                          <td className="py-3.5 px-3 text-center text-navy/80">{row.drawn}</td>
                          <td className="py-3.5 px-3 text-center text-navy/80">{row.lost}</td>
                          <td className="py-3.5 px-3 text-center text-navy/80">{row.goalsFor}</td>
                          <td className="py-3.5 px-3 text-center text-navy/80">{row.goalsAgainst}</td>
                          <td className="py-3.5 px-3 text-center text-navy/80">
                            {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                          </td>
                          <td className="py-3.5 px-4 text-center font-heading font-black text-base text-navy">
                            {row.points}
                          </td>
                          <td className="py-3.5 px-4 text-center hidden md:table-cell">
                            <div className="flex items-center justify-center gap-1">
                              {row.form.map((f, i) => (
                                <span
                                  key={i}
                                  className={`w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center ${
                                    f === "W"
                                      ? "bg-green-600 text-white"
                                      : f === "D"
                                      ? "bg-amber-500 text-white"
                                      : "bg-red-600 text-white"
                                  }`}
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
