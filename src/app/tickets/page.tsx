import React from "react";
import Link from "next/link";
import { matchesData } from "@/data/matchesData";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { Ticket, Calendar, MapPin, ArrowRight, Shield, Star, Users, Check } from "lucide-react";

export const metadata = {
  title: "Official Match Tickets & Hospitality | TAMILNADU FC",
  description: "Book official matchday tickets, premium club seats, and VIP hospitality at The Meridian Stadium.",
};

export default function TicketsPage() {
  const upcomingMatches = matchesData.filter((m) => m.status === "Upcoming");

  const ticketTiers = [
    {
      id: "general",
      name: "General Admission",
      stands: "North Stand (Marina Ultras) & South Stand",
      price: 800,
      description: "Atmospheric, passionate, unreserved chanting sections behind the goals.",
      features: [
        "Unbeatable vocal atmosphere in the Marina Wall",
        "Direct concourse access with street food kiosks",
        "Official matchday digital programme",
      ],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium Club",
      stands: "East Stand (Bay View) & West Stand Upper",
      price: 2200,
      description: "Exceptional sideline panoramic views with padded seating and club lounge access.",
      features: [
        "Centred midfield sightlines on halfway line",
        "Dedicated fast-track turnstiles",
        "Access to the Coromandel Club bar & terrace",
        "Complimentary halftime refreshments",
      ],
      popular: true,
    },
    {
      id: "vip",
      name: "VIP Directors Box",
      stands: "West Stand Executive Tier",
      price: 5500,
      description: "Five-star luxury hospitality with fine dining, reserved parking, and player lounge access.",
      features: [
        "Luxury leather heated armchairs in private suite",
        "Three-course curated South Indian fine dining",
        "VIP subterranean parking with private lift",
        "Post-match coach & player appearance",
        "Commemorative signed match scarf",
      ],
      popular: false,
    },
  ];

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-navy text-porcelain">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/50" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-heading font-black tracking-[0.24em] text-copper uppercase block mb-3">
            The Meridian Stadium • Chennai
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-porcelain tracking-tight">
            Official Match Tickets
          </h1>
          <p className="text-sm sm:text-base text-porcelain/80 mt-4 leading-relaxed">
            Experience the deafening roar of 62,500 supporters along the Marina coast. Select your fixture and pick your exact seat on our interactive stadium map.
          </p>
        </div>
      </section>

      {/* Fixture Selection List (Step 1) */}
      <section className="py-12 sm:py-16">
        <div className="site-container max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block mb-1">
                Step 01
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy">
                Select Your Fixture
              </h2>
            </div>
            <span className="text-xs font-semibold text-navy/60 hidden sm:block">
              {upcomingMatches.length} Matches Available
            </span>
          </div>

          <div className="space-y-5">
            {upcomingMatches.map((match) => (
              <div
                key={match.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm hover:border-copper/50 hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6"
              >
                {/* Match Details */}
                <div className="space-y-2 text-center md:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 rounded-full bg-navy text-porcelain text-[10px] font-heading font-bold uppercase tracking-wider">
                      {match.competition}
                    </span>
                    <span className="text-xs font-semibold text-copper">
                      {match.roundOrMatchday}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-navy">
                    {match.homeTeam.name} vs {match.awayTeam.name}
                  </h3>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-navy/70 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-copper" />
                      {match.date} • {match.kickoffTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-copper" />
                      {match.stadium}, {match.city}
                    </span>
                  </div>
                </div>

                {/* Price & Book Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-end gap-4 shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-porcelain-200">
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-navy/50 tracking-wider block">
                      Starting From
                    </span>
                    <span className="font-heading font-black text-2xl text-navy block">
                      ₹{match.ticketStartingPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <Link
                    href={`/tickets/${match.id}`}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                  >
                    <Ticket className="w-4 h-4 text-copper" />
                    <span>Choose Seats</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Categories Comparison (Step 4 preview) */}
      <section className="py-12 sm:py-20 bg-porcelain-100/70 border-t border-porcelain-200">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block mb-1">
              Ticket Categories
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
              Matchday Experience Tiers
            </h2>
            <p className="text-xs sm:text-sm text-navy/70 mt-2">
              Choose between electric supporter atmosphere, premium midfield sightlines, or luxury executive hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {ticketTiers.map((tier) => (
              <div
                key={tier.id}
                className={`p-7 sm:p-8 rounded-3xl bg-white border ${
                  tier.popular
                    ? "border-copper shadow-lg ring-2 ring-copper/30 relative"
                    : "border-porcelain-300 shadow-sm"
                } flex flex-col justify-between`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-copper text-navy text-[10px] font-heading font-black uppercase tracking-wider shadow">
                    Most Popular
                  </span>
                )}

                <div>
                  <span className="text-[10px] font-semibold text-copper tracking-widest uppercase block">
                    {tier.stands}
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-navy mt-1">
                    {tier.name}
                  </h3>
                  <div className="mt-4 pb-4 border-b border-porcelain-200">
                    <span className="font-heading font-black text-3xl sm:text-4xl text-navy">
                      ₹{tier.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-navy/60 block mt-0.5">per seat / match</span>
                  </div>

                  <p className="text-xs text-navy/75 mt-4 leading-relaxed">
                    {tier.description}
                  </p>

                  <ul className="space-y-2.5 text-xs text-navy/80 mt-6 pt-4 border-t border-porcelain-200">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6">
                  <Link
                    href={`/tickets/${upcomingMatches[0].id}`}
                    className={`w-full py-3 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                      tier.popular
                        ? "bg-copper hover:bg-copper-400 text-navy"
                        : "bg-navy hover:bg-copper text-porcelain"
                    }`}
                  >
                    <span>Select on Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
