import React from "react";
import Link from "next/link";
import { playersData } from "@/data/playersData";
import { ArrowRight, Shield } from "lucide-react";

export const SquadSection: React.FC = () => {
  const squadPreview = playersData.slice(0, 6);

  return (
    <section className="py-10 sm:py-16 bg-porcelain-100/60 border-y border-porcelain-200">
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
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

          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy hover:text-copper transition-colors group"
          >
            <span>Explore Full Squad</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Squad Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
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
                <div className="absolute top-2 right-3 font-heading font-black text-3xl sm:text-4xl text-porcelain/30 group-hover:text-copper/60 transition-colors pointer-events-none">
                  {player.shirtNumber}
                </div>

                {/* Bottom details inside portrait */}
                <div className="relative z-10 p-3 sm:p-4 text-center w-full">
                  <span className="text-[10px] sm:text-xs font-heading font-black text-copper uppercase tracking-wider block">
                    #{player.shirtNumber} • {player.position}
                  </span>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-porcelain truncate mt-0.5">
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
