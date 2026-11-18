import React from "react";
import Link from "next/link";
import { clubData } from "@/data/clubData";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { MapPin, Users, Ticket, ArrowRight, ShieldCheck, Compass, Sparkles, Coffee, Train } from "lucide-react";
import { TourBookingButton } from "@/components/stadium/TourBookingButton";

export const metadata = {
  title: "The Meridian Stadium Experience | TAMILNADU FC",
  description: "Explore The Meridian Stadium — 62,500 acoustic fortress overlooking Chennai's Marina coast. Stadium tours, hospitality, and matchday access.",
};

export default function StadiumPage() {
  const stands = [
    {
      name: "North Stand (The Marina Wall)",
      capacity: "16,200",
      description: "Home of the Kavalan Ultras. A steep, continuous wall of vocal support with acoustic amplification.",
      badge: "Ultras & Chanting",
    },
    {
      name: "West Stand (Grandstand & Suites)",
      capacity: "14,800",
      description: "Houses the 84 executive luxury hospitality suites, player tunnel, media tribune, and directors box.",
      badge: "VIP & Hospitality",
    },
    {
      name: "East Stand (Bay View)",
      capacity: "17,500",
      description: "Spectacular sideline panoramic views overlooking both the pitch and the Bay of Bengal coast.",
      badge: "Premium Sideline",
    },
    {
      name: "South Stand (The Chola End)",
      capacity: "14,000",
      description: "Family enclosure, youth academy seating, and community supporter clubs.",
      badge: "Family & Community",
    },
  ];

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Stadium Hero Banner */}
      <section className="relative py-20 sm:py-32 bg-navy text-porcelain overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />

        <div className="site-container relative z-10 text-center max-w-4xl mx-auto">
          <span className="text-xs font-heading font-black tracking-[0.24em] text-copper uppercase block mb-3">
            Marina Promenade • Chennai, India
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-porcelain tracking-tight leading-tight">
            The Meridian Stadium
          </h1>
          <p className="text-sm sm:text-base text-porcelain/80 mt-4 leading-relaxed max-w-2xl mx-auto">
            62,500 seats designed with cantilevered acoustic engineering, hybrid SISGrass turf, and coastal panoramic views. The beating heart of football in Tamil Nadu.
          </p>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tickets"
              className="px-7 py-3.5 rounded-full bg-copper hover:bg-copper-400 text-navy font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              Book Match Tickets
            </Link>
            <a
              href="#tours"
              className="px-7 py-3.5 rounded-full bg-porcelain/15 hover:bg-porcelain/25 text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-colors border border-porcelain/20"
            >
              Book Stadium Tour
            </a>
          </div>
        </div>
      </section>

      {/* Stadium Architectural Highlights */}
      <section className="py-16 sm:py-24">
        <div className="site-container">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block mb-1">
              Engineering & Architecture
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
              Built for Atmospheric Power
            </h2>
            <p className="text-sm text-navy/75 mt-2 leading-relaxed">
              Designed by Foster + Coromandel Studio and opened in 2014, The Meridian combines acoustic sound capture with maritime airflow management to keep players and supporters comfortable in coastal humidity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-3">
              <span className="font-mono font-bold text-xs text-copper tracking-widest uppercase block">
                01 • Acoustic Roof
              </span>
              <h3 className="font-heading font-extrabold text-xl text-navy">
                Cantilevered Sound Shell
              </h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                The curved PTFE membrane reflects supporter chanting downward onto the pitch, generating vocal sound pressure exceeding 118 decibels during derbies.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-3">
              <span className="font-mono font-bold text-xs text-copper tracking-widest uppercase block">
                02 • Playing Surface
              </span>
              <h3 className="font-heading font-extrabold text-xl text-navy">
                SISGrass Hybrid Turf
              </h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                Natural Bermuda grass reinforced with 20 million synthetic fibers and sub-surface vacuum drainage capable of absorbing torrential monsoon downpours.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-3">
              <span className="font-mono font-bold text-xs text-copper tracking-widest uppercase block">
                03 • Sustainable Canopy
              </span>
              <h3 className="font-heading font-extrabold text-xl text-navy">
                Solar & Rain Harvesting
              </h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                3,200 solar panels generate 40% of matchday energy needs while massive subterranean cisterns recycle rainwater for pitch irrigation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Stands Breakdown */}
      <section className="py-16 sm:py-24 bg-porcelain-100/70 border-y border-porcelain-200">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block mb-1">
              Stadium Blueprint
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
              The Four Historic Stands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stands.map((stand) => (
              <div
                key={stand.name}
                className="p-6 rounded-3xl bg-white border border-porcelain-300 shadow-sm flex flex-col justify-between hover:border-copper/40 hover:shadow-md transition-all"
              >
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-copper/15 text-copper text-[10px] font-heading font-bold uppercase tracking-wider inline-block mb-3">
                    {stand.badge}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-navy">
                    {stand.name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-copper block mt-1">
                    Capacity: {stand.capacity}
                  </span>
                  <p className="text-xs text-navy/70 mt-3 leading-relaxed">
                    {stand.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-porcelain-200">
                  <Link
                    href="/tickets"
                    className="text-xs font-heading font-bold uppercase tracking-wider text-navy hover:text-copper transition-colors flex items-center gap-1"
                  >
                    View Seats <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP & Hospitality Suites */}
      <section id="hospitality" className="py-16 sm:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block">
                VIP & Hospitality
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-navy leading-tight">
                The Coromandel Suites & Captain&apos;s Lounge
              </h2>
              <p className="text-sm text-navy/75 leading-relaxed">
                Elevate your matchday with unrivaled luxury. Indulge in private chef dining, champagne service on arrival, personal concierge assistance, and private balcony seats directly adjacent to the directors box.
              </p>

              <div className="space-y-3 text-xs text-navy/80">
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-copper shrink-0" />
                  <span>Curated South Indian culinary experiences by award-winning chefs</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-copper shrink-0" />
                  <span>Direct private subterranean VIP parking & express lift</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-copper shrink-0" />
                  <span>Exclusive post-match meet-and-greet with players and management</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/tickets"
                  className="px-6 py-3.5 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow"
                >
                  <span>Explore Hospitality Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-navy relative border border-porcelain-300 shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80')`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stadium Tours Booking Section */}
      <section id="tours" className="py-16 sm:py-24 bg-navy text-porcelain">
        <div className="site-container max-w-4xl text-center space-y-6">
          <span className="text-xs font-heading font-black tracking-[0.24em] text-copper uppercase block">
            Behind the Scenes
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-porcelain">
            Book The Official Stadium Tour
          </h2>
          <p className="text-sm sm:text-base text-porcelain/80 max-w-2xl mx-auto leading-relaxed">
            Walk through the player tunnel, sit in manager Gabriel Santana&apos;s dugout chair, explore the first-team changing room, and gaze upon the 1934 historical trophy vault.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
            <div className="p-6 rounded-2xl bg-porcelain/10 border border-porcelain/15">
              <span className="text-copper font-heading font-bold text-xs uppercase block">Standard Tour</span>
              <strong className="text-lg text-porcelain block mt-1">₹450 / Person</strong>
              <span className="text-xs text-porcelain/60 block mt-2">75-minute guided stadium exploration with access to tunnel & museum.</span>
            </div>

            <div className="p-6 rounded-2xl bg-porcelain/10 border border-porcelain/15">
              <span className="text-copper font-heading font-bold text-xs uppercase block">Legend Tour</span>
              <strong className="text-lg text-porcelain block mt-1">₹950 / Person</strong>
              <span className="text-xs text-porcelain/60 block mt-2">Guided by a former Tamilnadu FC club legend with photo opportunity.</span>
            </div>

            <div className="p-6 rounded-2xl bg-porcelain/10 border border-porcelain/15">
              <span className="text-copper font-heading font-bold text-xs uppercase block">Matchday Warmup Tour</span>
              <strong className="text-lg text-porcelain block mt-1">₹1,450 / Person</strong>
              <span className="text-xs text-porcelain/60 block mt-2">Watch the first-team squad warm up pitchside 90 minutes before kickoff.</span>
            </div>
          </div>

          <div className="pt-6">
            <TourBookingButton />
          </div>
        </div>
      </section>

      {/* Getting There & Transit Guide */}
      <section className="py-16 sm:py-24">
        <div className="site-container max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block mb-1">
              Matchday Travel
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-navy">
              Getting to The Meridian
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-2">
              <Train className="w-5 h-5 text-copper mb-2" />
              <h3 className="font-heading font-bold text-base text-navy">Metro Direct Link</h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                Meridian Metro Station (Blue Line) exits directly into the North and West stadium turnstiles. Trains run every 3 minutes on matchdays.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-2">
              <Compass className="w-5 h-5 text-copper mb-2" />
              <h3 className="font-heading font-bold text-base text-navy">Marina Coastal Shuttle</h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                Complimentary electric shuttle buses run continuously from Central Railway Station and Marina Promenade car parks 3 hours prior to kickoff.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-2">
              <ShieldCheck className="w-5 h-5 text-copper mb-2" />
              <h3 className="font-heading font-bold text-base text-navy">Reserved Parking</h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                Multi-tier parking facilities available in Zones A, B, and VIP underground. Advance booking via the ticketing portal is recommended.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
