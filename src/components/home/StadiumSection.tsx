import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Users, Sparkles, Compass } from "lucide-react";

export const StadiumSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-20">
      <div className="site-container">
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-navy text-porcelain p-8 sm:p-14 lg:p-20 border border-porcelain-300 shadow-xl">
          {/* Panoramic background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-luminosity hover:scale-105 transition-transform duration-1000"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1800&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-6 bg-copper" />
              <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase">
                The Home Fortress
              </span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-porcelain leading-tight">
              The Meridian Stadium.
            </h2>

            <p className="text-sm sm:text-base text-porcelain/80 mt-4 leading-relaxed">
              62,500 seats rising along the Marina coast. Designed with cantilevered acoustic roofs that capture every chant, roar, and heartbeat of the Kavalan Ultras.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 my-6 border-y border-porcelain/15 text-xs">
              <div>
                <span className="text-copper font-heading font-bold block text-sm">62,500</span>
                <span className="text-porcelain/60">Seating Capacity</span>
              </div>
              <div>
                <span className="text-copper font-heading font-bold block text-sm">Marina Coast</span>
                <span className="text-porcelain/60">Chennai, India</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-copper font-heading font-bold block text-sm">SISGrass Hybrid</span>
                <span className="text-porcelain/60">Elite Playing Surface</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/stadium"
                className="px-6 py-3.5 rounded-full bg-porcelain hover:bg-copper hover:text-porcelain text-navy font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
              >
                <span>Explore Venue & Tours</span>
              </Link>
              <Link
                href="/tickets"
                className="px-6 py-3.5 rounded-full bg-porcelain/15 hover:bg-porcelain/25 text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-colors border border-porcelain/20"
              >
                <span>Matchday Tickets</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
