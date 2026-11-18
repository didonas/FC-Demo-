import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { playersData } from "@/data/playersData";
import { matchesData } from "@/data/matchesData";
import { ArrowLeft, ArrowRight, Shield, Award, Calendar, CheckCircle, ShoppingBag } from "lucide-react";

interface PlayerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return playersData.map((player) => ({
    slug: player.slug,
  }));
}

export default async function PlayerProfilePage({ params }: PlayerPageProps) {
  const { slug } = await params;
  const player = playersData.find((p) => p.slug === slug);

  if (!player) {
    notFound();
  }

  const nextMatch = matchesData[0];

  // Teammates for recommendation
  const otherPlayers = playersData
    .filter((p) => p.slug !== player.slug)
    .slice(0, 3);

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Top Breadcrumb */}
      <div className="site-container py-4 border-b border-porcelain-300">
        <Link
          href="/team"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy/70 hover:text-copper transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Squad
        </Link>
      </div>

      {/* Hero Section: Real Madrid Editorial Benchmark (PDF Page 19) */}
      <section className="relative overflow-hidden bg-porcelain-50 border-b border-porcelain-300">
        <div className="site-container py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Player Info & Quote (6 cols) */}
            <div className="lg:col-span-6 space-y-6 z-10">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-navy text-porcelain text-xs font-heading font-bold tracking-widest uppercase">
                  {player.position}
                </span>
                <span className="text-xs font-semibold tracking-wider text-copper uppercase">
                  {player.role}
                </span>
              </div>

              {/* Bold Player Name & Giant Shirt Number */}
              <div>
                <span className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl text-copper block leading-none">
                  #{player.shirtNumber}
                </span>
                <h1 className="font-heading font-black text-4xl sm:text-6xl text-navy uppercase tracking-tight mt-1 leading-none">
                  {player.name}
                </h1>
              </div>

              {/* Editorial Quote Box */}
              <div className="p-6 rounded-2xl bg-white border-l-4 border-copper border-y border-r border-porcelain-300 shadow-sm">
                <p className="text-sm sm:text-base italic text-navy/80 leading-relaxed">
                  &ldquo;{player.quote}&rdquo;
                </p>
                <span className="text-[11px] font-heading font-bold tracking-widest text-copper uppercase block mt-3">
                  — {player.name}, {player.role}
                </span>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-porcelain-100 p-4 rounded-2xl border border-porcelain-200">
                <div>
                  <span className="text-[10px] uppercase text-navy/50 font-medium block">Nationality</span>
                  <strong className="text-navy font-bold block mt-0.5">{player.nationality}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-navy/50 font-medium block">Age</span>
                  <strong className="text-navy font-bold block mt-0.5">{player.age} Years</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-navy/50 font-medium block">Height / Weight</span>
                  <strong className="text-navy font-bold block mt-0.5">{player.height} • {player.weight}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-navy/50 font-medium block">Preferred Foot</span>
                  <strong className="text-navy font-bold block mt-0.5">{player.preferredFoot}</strong>
                </div>
              </div>

              {/* Shop Jersey CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/store/home-kit-2026-heritage"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-copper" />
                  <span>Shop #{player.shirtNumber} {player.name} Jersey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: High-Res Portrait & Next Match Widget (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-navy relative border border-porcelain-300 shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${player.actionImage || player.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />

                {/* Floating Next Game Widget (matches reference PDF Page 19) */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-navy/95 backdrop-blur-md border border-porcelain/20 text-porcelain shadow-lg">
                  <div className="flex items-center justify-between text-[10px] font-heading font-bold text-copper uppercase tracking-wider mb-2">
                    <span className="px-2 py-0.5 rounded bg-copper/20 text-copper">Next Match</span>
                    <span>Tomorrow 19:30 IST</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-heading font-extrabold text-porcelain">
                    <span>{nextMatch.homeTeam.name}</span>
                    <span className="text-copper text-xs px-2">VS</span>
                    <span>{nextMatch.awayTeam.name}</span>
                  </div>
                  <div className="text-[11px] text-porcelain/60 mt-1">
                    {nextMatch.stadium} • {nextMatch.competition}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Season Performance Statistics */}
      <section className="py-12 sm:py-16">
        <div className="site-container">
          <div className="mb-8">
            <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block mb-1">
              2026/27 Campaign
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy">
              Season Performance Metrics
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-porcelain-300 text-center shadow-sm">
              <span className="text-[10px] uppercase font-bold text-navy/50 tracking-wider block">Appearances</span>
              <span className="font-heading font-black text-3xl sm:text-4xl text-navy block mt-1">
                {player.stats.appearances}
              </span>
              <span className="text-[11px] text-navy/60 block mt-1">Matches played</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-porcelain-300 text-center shadow-sm">
              <span className="text-[10px] uppercase font-bold text-navy/50 tracking-wider block">
                {player.position === "Goalkeeper" ? "Clean Sheets" : "Goals"}
              </span>
              <span className="font-heading font-black text-3xl sm:text-4xl text-copper block mt-1">
                {player.position === "Goalkeeper" ? player.stats.cleanSheets || 0 : player.stats.goals}
              </span>
              <span className="text-[11px] text-navy/60 block mt-1">
                {player.position === "Goalkeeper" ? "Shutouts" : "Direct strikes"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-porcelain-300 text-center shadow-sm">
              <span className="text-[10px] uppercase font-bold text-navy/50 tracking-wider block">Assists</span>
              <span className="font-heading font-black text-3xl sm:text-4xl text-navy block mt-1">
                {player.stats.assists}
              </span>
              <span className="text-[11px] text-navy/60 block mt-1">Goal contributions</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-porcelain-300 text-center shadow-sm">
              <span className="text-[10px] uppercase font-bold text-navy/50 tracking-wider block">Minutes</span>
              <span className="font-heading font-black text-3xl sm:text-4xl text-navy block mt-1">
                {player.stats.minutesPlayed}
              </span>
              <span className="text-[11px] text-navy/60 block mt-1">On pitch</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-porcelain-300 text-center shadow-sm">
              <span className="text-[10px] uppercase font-bold text-navy/50 tracking-wider block">Pass Accuracy</span>
              <span className="font-heading font-black text-3xl sm:text-4xl text-copper block mt-1">
                {player.stats.passingAccuracy}%
              </span>
              <span className="text-[11px] text-navy/60 block mt-1">Completed passes</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-porcelain-300 text-center shadow-sm">
              <span className="text-[10px] uppercase font-bold text-navy/50 tracking-wider block">Tackles / Match</span>
              <span className="font-heading font-black text-3xl sm:text-4xl text-navy block mt-1">
                {player.stats.tacklesPerMatch || 2.4}
              </span>
              <span className="text-[11px] text-navy/60 block mt-1">Defensive actions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tactical Attributes Radar & Biography */}
      <section className="py-12 sm:py-16 bg-porcelain-100/70 border-t border-porcelain-200">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Bio Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block mb-1">
                  Player Biography
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy">
                  About {player.name}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-navy/80 leading-relaxed">
                {player.bio}
              </p>

              {/* Career Milestones */}
              <div className="pt-6 border-t border-porcelain-200">
                <h3 className="font-heading font-bold text-base text-navy mb-4">
                  Career Milestones & Honours
                </h3>
                <div className="space-y-4">
                  {player.careerTimeline.map((item) => (
                    <div key={item.year + item.clubOrMilestone} className="flex gap-4 items-start">
                      <span className="font-mono font-bold text-sm text-copper shrink-0 w-12 pt-0.5">
                        {item.year}
                      </span>
                      <div className="flex-1 pb-3 border-b border-porcelain-200">
                        <h4 className="font-heading font-bold text-sm text-navy">
                          {item.clubOrMilestone}
                        </h4>
                        <p className="text-xs text-navy/60 mt-0.5">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tactical Attributes Column (5 cols) */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-5">
                <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block">
                  Technical Ratings
                </span>
                <h3 className="font-heading font-bold text-lg text-navy">
                  Tactical Attribute Breakdown
                </h3>

                <div className="space-y-4 pt-2">
                  {[
                    { label: "Pace / Speed", value: player.attributes.pace },
                    { label: "Shooting & Finishing", value: player.attributes.shooting },
                    { label: "Passing & Vision", value: player.attributes.passing },
                    { label: "Dribbling & Agility", value: player.attributes.dribbling },
                    { label: "Defending & Positioning", value: player.attributes.defending },
                    { label: "Physical & Stamina", value: player.attributes.physical },
                  ].map((attr) => (
                    <div key={attr.label}>
                      <div className="flex justify-between text-xs font-medium text-navy mb-1">
                        <span>{attr.label}</span>
                        <span className="font-heading font-bold text-copper">{attr.value} / 100</span>
                      </div>
                      <div className="w-full bg-porcelain-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-navy h-full rounded-full transition-all duration-700"
                          style={{ width: `${attr.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teammates Showcase */}
      <section className="py-12 sm:py-16 border-t border-porcelain-200">
        <div className="site-container">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading font-bold text-xl text-navy">
              More First Team Players
            </h3>
            <Link
              href="/team"
              className="text-xs font-heading font-bold uppercase tracking-wider text-copper hover:text-navy transition-colors flex items-center gap-1"
            >
              View Full Squad <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherPlayers.map((other) => (
              <Link
                key={other.id}
                href={`/team/${other.slug}`}
                className="group p-4 rounded-2xl bg-white border border-porcelain-300 hover:border-copper/40 shadow-sm transition-all flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-xl bg-navy overflow-hidden shrink-0 relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${other.portraitImage}')` }}
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-copper uppercase tracking-wider">
                    #{other.shirtNumber} • {other.position}
                  </span>
                  <h4 className="font-heading font-bold text-base text-navy group-hover:text-copper transition-colors">
                    {other.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
