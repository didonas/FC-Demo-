import React from "react";
import Link from "next/link";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { ArrowRight, Trophy, Users, Shield, Compass } from "lucide-react";

export const HeritageSection: React.FC = () => {
  const stats = [
    { label: "Years of Heritage", value: "92+", icon: Compass, detail: "Founded 1934 along Chennai's Marina coast" },
    { label: "Major Trophies", value: "24", icon: Trophy, detail: "4x Super League & 2x Asian Continental triumphs" },
    { label: "Global Supporters", value: "12M+", icon: Users, detail: "United under One State, One Passion" },
    { label: "Stadium Capacity", value: "62,500", icon: Shield, detail: "The Meridian acoustic fortress" },
  ];

  return (
    <section className="py-10 sm:py-24 bg-navy text-porcelain relative overflow-hidden">
      {/* Cinematic stadium background overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1800&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/90 to-navy" />

      <div className="site-container relative z-10">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center mb-4">
            <ClubCrest size={64} variant="primary" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-copper" />
            <span className="text-xs font-heading font-black tracking-[0.28em] text-copper uppercase">
              The Art of Belonging
            </span>
            <span className="h-[1px] w-8 bg-copper" />
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-porcelain">
            A Legacy Beyond The Horizon.
          </h2>

          <p className="text-sm sm:text-base text-porcelain/75 mt-5 leading-relaxed">
            From the sandy shores of the Marina in 1934 to the floodlit heights of Asian continental football, Tamilnadu FC represents an unbroken tradition of courage, architectural discipline, and deep community pride.
          </p>

          <div className="mt-8">
            <Link
              href="/club"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-copper hover:bg-copper-400 text-navy font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
            >
              <span>Explore Club History & Philosophy</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-porcelain/15">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-porcelain/5 border border-porcelain/10 backdrop-blur-sm hover:border-copper/40 transition-colors"
            >
              <stat.icon className="w-5 h-5 text-copper mb-4" />
              <div className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-porcelain">
                {stat.value}
              </div>
              <div className="font-heading font-bold text-xs uppercase tracking-wider text-copper mt-2">
                {stat.label}
              </div>
              <p className="text-xs text-porcelain/60 mt-1.5 leading-relaxed">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
