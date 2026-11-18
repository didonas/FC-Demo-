import React from "react";
import Link from "next/link";
import { FeaturedAnnouncement } from "@/components/home/FeaturedAnnouncement";
import { MatchdaySection } from "@/components/home/MatchdaySection";
import { NewsSection } from "@/components/home/NewsSection";
import { SquadSection } from "@/components/home/SquadSection";
import { MerchandiseSection } from "@/components/home/MerchandiseSection";
import { HeritageSection } from "@/components/home/HeritageSection";
import { StadiumSection } from "@/components/home/StadiumSection";
import { Ticket, ArrowRight, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* 1. Opening Announcement Card (Real Madrid Benchmark) */}
      <FeaturedAnnouncement />

      {/* 2. Match Centre / Upcoming Matchday Panel with Countdown */}
      <MatchdaySection />

      {/* 3. Latest News & Editorial Grid */}
      <NewsSection />

      {/* 4. First Team Squad Preview ("Meet the Team") */}
      <SquadSection />

      {/* 5. Official Store & Kit Collection ("Wear the Colours") */}
      <MerchandiseSection />

      {/* 6. Club Heritage & The Art of Belonging */}
      <HeritageSection />

      {/* 7. The Meridian Stadium Experience */}
      <StadiumSection />

      {/* 8. Final Promotional Call to Action Banner */}
      <section className="py-12 sm:py-16">
        <div className="site-container">
          <div className="rounded-3xl bg-gradient-to-r from-navy via-navy to-navy-900 p-8 sm:p-12 text-porcelain flex flex-col md:flex-row items-center justify-between gap-6 border border-copper/30 shadow-lg">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase">
                Be Part of the Next Match
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-porcelain">
                Tickets Now Available for All Upcoming Fixtures
              </h2>
              <p className="text-xs sm:text-sm text-porcelain/70 max-w-xl">
                Experience the Coromandel Derby live at The Meridian Stadium. General, Premium Club, and VIP hospitality tickets available.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/tickets"
                className="px-6 py-3.5 rounded-full bg-copper hover:bg-copper-400 text-navy font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>Book Tickets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/store"
                className="px-6 py-3.5 rounded-full bg-porcelain/15 hover:bg-porcelain/25 text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-colors border border-porcelain/20"
              >
                <span>Shop Kits</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
