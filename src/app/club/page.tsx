import React from "react";
import Link from "next/link";
import { clubData } from "@/data/clubData";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { ClubHistoryTimeline } from "@/components/club/ClubHistoryTimeline";
import { Trophy, Award, Shield, Globe, Users, ArrowRight, Compass, CheckCircle } from "lucide-react";

export const metadata = {
  title: "The Club — History, Heritage & Philosophy | TAMILNADU FC",
  description: "Discover the 90-year history, philosophy, trophies, and supporter culture of Tamilnadu Football Club.",
};

export default function ClubPage() {
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
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 bg-navy text-porcelain overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />

        <div className="site-container relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center mb-6">
            <ClubCrest size={72} variant="primary" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-copper" />
            <span className="text-xs font-heading font-black tracking-[0.26em] text-copper uppercase">
              Founded 1934 • Chennai
            </span>
            <span className="h-[1px] w-8 bg-copper" />
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-porcelain tracking-tight leading-tight">
            One State. One Passion.
          </h1>

          <p className="text-sm sm:text-base text-porcelain/80 mt-5 leading-relaxed max-w-2xl mx-auto">
            {clubData.overview}
          </p>
        </div>
      </section>

      {/* Philosophy & Pillars */}
      <section id="philosophy" className="py-16 sm:py-24">
        <div className="site-container">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[2px] w-6 bg-copper" />
              <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase">
                Sporting Identity
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
              {clubData.philosophy.title}
            </h2>
            <p className="text-sm text-navy/75 mt-3 leading-relaxed">
              {clubData.philosophy.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {clubData.philosophy.pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm hover:border-copper/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono font-bold text-xs text-copper tracking-widest uppercase block mb-3">
                    Pillar 0{idx + 1}
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-navy">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-navy/70 mt-3 leading-relaxed">
                    {pillar.detail}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-porcelain-200 flex items-center gap-2 text-xs font-semibold text-copper">
                  <CheckCircle className="w-4 h-4" /> Core Sporting Doctrine
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Timeline */}
      <ClubHistoryTimeline timeline={clubData.timeline} />

      {/* Trophy Cabinet / Honours */}
      <section id="honours" className="py-16 sm:py-24">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="h-[2px] w-6 bg-copper" />
              <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase">
                Trophy Cabinet
              </span>
              <span className="h-[2px] w-6 bg-copper" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
              Honours & Silverware
            </h2>
            <p className="text-xs sm:text-sm text-navy/70 mt-2">
              A proud record of national and continental championships won across ninety years.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubData.trophies.map((trophy) => (
              <div
                key={trophy.id}
                className="p-6 rounded-3xl bg-white border border-porcelain-300 shadow-sm text-center flex flex-col justify-between hover:border-copper/40 hover:shadow-md transition-all"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-copper/15 flex items-center justify-center mx-auto mb-4">
                    {getTrophyIcon(trophy.icon)}
                  </div>
                  <span className="font-heading font-black text-4xl text-navy block">
                    {trophy.count}x
                  </span>
                  <h3 className="font-heading font-bold text-base text-navy mt-2">
                    {trophy.name}
                  </h3>
                  <p className="text-xs text-navy/60 mt-2 leading-relaxed">
                    {trophy.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-porcelain-200">
                  <span className="text-[10px] tracking-wider font-semibold text-copper uppercase block">
                    Winning Years
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
                    {trophy.years.map((yr) => (
                      <span
                        key={yr}
                        className="px-2 py-0.5 rounded bg-porcelain-100 text-[11px] font-mono font-bold text-navy"
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

      {/* Leadership & Executive Board */}
      <section id="leadership" className="py-16 sm:py-24 bg-porcelain-100/70 border-t border-porcelain-200">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="h-[2px] w-6 bg-copper" />
              <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase">
                Club Governance
              </span>
              <span className="h-[2px] w-6 bg-copper" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
              Executive Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubData.board.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl overflow-hidden bg-white border border-porcelain-300 shadow-sm flex flex-col justify-between"
              >
                <div className="aspect-[4/3] bg-navy relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${member.image}')` }}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider text-copper uppercase block mb-1">
                      {member.role}
                    </span>
                    <h3 className="font-heading font-bold text-base text-navy">
                      {member.name}
                    </h3>
                    <p className="text-xs text-navy/70 mt-2 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supporters Culture: The Kavalan Ultras */}
      <section id="supporters" className="py-16 sm:py-24 bg-navy text-porcelain relative overflow-hidden">
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-heading font-black tracking-[0.24em] text-copper uppercase">
                Supporters Culture
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-porcelain leading-tight">
                Kavalargal: The Guardians of The Meridian.
              </h2>
              <p className="text-sm sm:text-base text-porcelain/80 leading-relaxed">
                Filling the North Stand at every home match, the Kavalan Ultras generate the deafening vocal power known as &apos;The Marina Wall&apos;. Armed with rhythmic Thavil drums and sea-tinted banners, they stand unbroken for 90 minutes.
              </p>
              <div className="p-5 rounded-2xl bg-porcelain/10 border border-porcelain/15">
                <span className="text-[10px] tracking-widest text-copper uppercase font-bold block mb-2">
                  Official Matchday Chants
                </span>
                <ul className="space-y-1.5 text-xs text-porcelain/85 font-mono">
                  {clubData.supporters.chants.map((chant, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-copper">›</span> &ldquo;{chant}&rdquo;
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2">
                <Link
                  href="/tickets"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-copper text-navy font-heading font-bold text-xs uppercase tracking-wider hover:bg-copper-400 transition-colors"
                >
                  Join the North Stand <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-navy relative border border-porcelain/20 shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80')`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
