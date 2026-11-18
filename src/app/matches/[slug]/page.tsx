import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { matchesData } from "@/data/matchesData";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Tv, Ticket, Shield, Users, Clock } from "lucide-react";

interface MatchPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return matchesData.map((m) => ({
    slug: m.slug,
  }));
}

export default async function MatchDetailPage({ params }: MatchPageProps) {
  const { slug } = await params;
  const match = matchesData.find((m) => m.slug === slug);

  if (!match) {
    notFound();
  }

  const isFinished = match.status === "Finished";

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Top Breadcrumb */}
      <div className="site-container py-4 border-b border-porcelain-300">
        <Link
          href="/matches"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy/70 hover:text-copper transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Match Centre
        </Link>
      </div>

      {/* Hero Match Clash Header */}
      <section className="py-12 sm:py-16 bg-navy text-porcelain relative overflow-hidden">
        <div className="site-container relative z-10 max-w-5xl">
          {/* Competition & Status Pill */}
          <div className="flex items-center justify-between pb-6 border-b border-porcelain/15">
            <span className="px-3.5 py-1 rounded-full bg-copper text-navy text-xs font-heading font-black tracking-widest uppercase">
              {match.competition} • {match.roundOrMatchday}
            </span>
            <span className="text-xs text-porcelain/70 font-mono">
              {match.date} • {match.kickoffTime}
            </span>
          </div>

          {/* Teams Header Grid */}
          <div className="py-10 grid grid-cols-7 items-center text-center">
            {/* Home Team */}
            <div className="col-span-3 flex flex-col items-center">
              <div className="w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center">
                {match.homeTeam.isHome ? (
                  <ClubCrest size={72} variant="primary" />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-porcelain/15 flex items-center justify-center font-heading font-black text-porcelain text-xl border border-porcelain/20">
                    {match.homeTeam.shortName}
                  </div>
                )}
              </div>
              <h1 className="font-heading font-black text-xl sm:text-3xl text-porcelain mt-3 leading-tight">
                {match.homeTeam.name}
              </h1>
              <span className="text-xs text-copper tracking-widest uppercase font-semibold mt-1">
                Home
              </span>
            </div>

            {/* Score or VS */}
            <div className="col-span-1 flex flex-col items-center">
              {isFinished ? (
                <div>
                  <span className="font-heading font-black text-4xl sm:text-6xl text-porcelain">
                    {match.homeScore} - {match.awayScore}
                  </span>
                  <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest block mt-1">
                    Full Time
                  </span>
                </div>
              ) : (
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-porcelain/10 flex items-center justify-center border border-porcelain/20">
                  <span className="font-heading font-black text-sm sm:text-lg text-copper">
                    VS
                  </span>
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="col-span-3 flex flex-col items-center">
              <div className="w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center">
                {!match.awayTeam.isHome && match.awayTeam.name === "TAMILNADU FC" ? (
                  <ClubCrest size={72} variant="primary" />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-copper/20 flex items-center justify-center font-heading font-black text-copper text-xl border border-copper/30">
                    {match.awayTeam.shortName}
                  </div>
                )}
              </div>
              <h2 className="font-heading font-black text-xl sm:text-3xl text-porcelain mt-3 leading-tight">
                {match.awayTeam.name}
              </h2>
              <span className="text-xs text-porcelain/60 tracking-widest uppercase font-semibold mt-1">
                Away
              </span>
            </div>
          </div>

          {/* Key Match Details Bar */}
          <div className="pt-6 border-t border-porcelain/15 flex flex-wrap items-center justify-between gap-4 text-xs text-porcelain/75">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-copper" />
              <span>{match.stadium}, {match.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-copper" />
              <span>Broadcast: {match.broadcast}</span>
            </div>
            {match.ticketsAvailable && (
              <Link
                href={`/tickets/${match.id}`}
                className="px-5 py-2.5 rounded-full bg-copper hover:bg-copper-400 text-navy font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow"
              >
                <Ticket className="w-4 h-4" />
                <span>Book Tickets (From ₹{match.ticketStartingPrice})</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Main Content: Tactical Board + Preview Analysis */}
      <section className="py-12 sm:py-16">
        <div className="site-container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Preview Analysis & Events (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Preview or Report */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-4">
                <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block">
                  {isFinished ? "Match Report" : "Tactical Preview"}
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-navy">
                  {isFinished ? "The Story of the Match" : "Match Preview & Analysis"}
                </h3>
                <p className="text-sm sm:text-base text-navy/80 leading-relaxed">
                  {isFinished ? match.report : match.preview}
                </p>
              </div>

              {/* Match Events Timeline (if finished) */}
              {match.events && match.events.length > 0 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-4">
                  <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block">
                    Timeline
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-navy">
                    Key Match Events
                  </h3>
                  <div className="space-y-3 pt-2">
                    {match.events.map((evt, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-xs pb-3 border-b border-porcelain-200">
                        <span className="font-mono font-bold text-copper w-8">
                          {evt.minute}&apos;
                        </span>
                        <div className="flex-1">
                          <strong className="text-navy">{evt.player}</strong>
                          <span className="text-navy/60"> ({evt.team})</span>
                          {evt.detail && (
                            <span className="text-copper block text-[11px]">{evt.detail}</span>
                          )}
                        </div>
                        <span className="px-2 py-0.5 rounded bg-porcelain-100 text-[10px] font-bold text-navy uppercase">
                          {evt.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Head-to-Head Stats */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-4">
                <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block">
                  Historical Record
                </span>
                <h3 className="font-heading font-extrabold text-xl text-navy">
                  Head-to-Head Statistics
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center pt-2">
                  <div className="p-4 rounded-2xl bg-porcelain-50 border border-porcelain-200">
                    <span className="text-[10px] uppercase text-navy/60 font-bold block">TNFC Wins</span>
                    <span className="font-heading font-black text-2xl sm:text-3xl text-navy block mt-1">7</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-porcelain-50 border border-porcelain-200">
                    <span className="text-[10px] uppercase text-navy/60 font-bold block">Draws</span>
                    <span className="font-heading font-black text-2xl sm:text-3xl text-copper block mt-1">3</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-porcelain-50 border border-porcelain-200">
                    <span className="text-[10px] uppercase text-navy/60 font-bold block">Opponent Wins</span>
                    <span className="font-heading font-black text-2xl sm:text-3xl text-navy block mt-1">2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Tactical Pitch Lineup (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block">
                      Starting XI
                    </span>
                    <h3 className="font-heading font-extrabold text-lg text-navy">
                      Tamilnadu FC (4-3-3)
                    </h3>
                  </div>
                  <span className="text-xs text-navy/60">Manager: Gabriel Santana</span>
                </div>

                {/* Simulated Green Tactical Football Pitch */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1b5030] to-[#123620] border-2 border-[#388556] p-4 shadow-inner">
                  {/* Pitch markings */}
                  <div className="absolute inset-2 border border-white/40 rounded-lg pointer-events-none" />
                  <div className="absolute top-1/2 left-2 right-2 h-[1px] bg-white/40 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/40 pointer-events-none" />
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-14 border border-white/40 rounded-b-lg pointer-events-none" />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-14 border border-white/40 rounded-t-lg pointer-events-none" />

                  {/* Starting XI Player Pins */}
                  {match.lineupTNFC ? (
                    match.lineupTNFC.startingXI.map((pl) => (
                      <div
                        key={pl.number}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                        style={{ left: `${pl.x}%`, top: `${pl.y}%` }}
                      >
                        <div className="w-7 h-7 rounded-full bg-navy border-2 border-copper text-porcelain font-heading font-black text-[10px] flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                          {pl.number}
                        </div>
                        <span className="text-[9px] font-heading font-bold text-white bg-navy/80 px-1.5 py-0.5 rounded shadow mt-0.5 whitespace-nowrap">
                          {pl.name.split(" ")[0]}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full text-white/70 text-xs">
                      Lineup announced 60 mins before kickoff
                    </div>
                  )}
                </div>

                {/* Substitutes List */}
                {match.lineupTNFC?.substitutes && (
                  <div className="pt-2">
                    <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-copper block mb-1">
                      Available Substitutes:
                    </span>
                    <p className="text-xs text-navy/70 leading-relaxed">
                      {match.lineupTNFC.substitutes.join(" • ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
