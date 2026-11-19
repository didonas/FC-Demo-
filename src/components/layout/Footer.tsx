"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { ArrowRight, Check, MapPin, Mail, Phone } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const partners = [
    { name: "BAY MARINE LOGISTICS", tier: "Principal Partner" },
    { name: "COROMANDEL AIR", tier: "Official Airline" },
    { name: "TAMIL TELECOM 5G", tier: "Official Technology Partner" },
    { name: "INDIAN OIL & GAS", tier: "Energy Partner" },
    { name: "CHOLA FINANCIAL", tier: "Official Banking Partner" },
  ];

  return (
    <footer className="bg-navy text-porcelain border-t border-porcelain/10">
      {/* Official Partners Strip */}
      <div className="border-b border-porcelain/10 py-8 bg-navy-900/40">
        <div className="site-container">
          <div className="text-center mb-6">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-copper uppercase">
              Official Club Global Partners
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20 opacity-80">
            {partners.map((partner) => (
              <div key={partner.name} className="flex flex-col items-center">
                <span className="font-heading font-black tracking-widest text-sm sm:text-base text-porcelain/90 hover:text-copper transition-colors">
                  {partner.name}
                </span>
                <span className="text-[9px] tracking-wider text-copper/80 uppercase mt-0.5">
                  {partner.tier}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="site-container py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Slogan Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <ClubCrest size={52} variant="primary" />
              <div className="flex flex-col">
                <span className="font-heading font-black tracking-[0.14em] text-xl text-porcelain">
                  TAMILNADU <span className="text-copper">FC</span>
                </span>
                <span className="text-[10px] tracking-[0.24em] font-medium text-copper uppercase mt-0.5">
                  One State. One Passion.
                </span>
              </div>
            </div>

            <p className="text-sm text-porcelain/70 leading-relaxed max-w-sm">
              The premier professional football club of Tamil Nadu. Competing with honour, architectural precision, and the relentless spirit of the Coromandel Coast.
            </p>

            <div className="space-y-2 text-xs text-porcelain/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-copper shrink-0" />
                <span>The Meridian Stadium, Marina Promenade, Chennai 600004</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-copper shrink-0" />
                <span>contact@tamilnadufc.com (Demonstration Platform)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-copper shrink-0" />
                <span>+91 44 2841 1934</span>
              </div>
            </div>
          </div>

          {/* Nav Links Column 1: Football (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-copper">
              The Club
            </h4>
            <ul className="space-y-2 text-sm text-porcelain/75">
              <li>
                <Link href="/club" className="hover:text-copper transition-colors">
                  History & Heritage
                </Link>
              </li>
              <li>
                <Link href="/club#honours" className="hover:text-copper transition-colors">
                  Trophy Cabinet
                </Link>
              </li>
              <li>
                <Link href="/club#philosophy" className="hover:text-copper transition-colors">
                  Philosophy
                </Link>
              </li>
              <li>
                <Link href="/stadium" className="hover:text-copper transition-colors">
                  The Meridian Stadium
                </Link>
              </li>
              <li>
                <Link href="/academy" className="hover:text-copper transition-colors">
                  The Kovil Academy
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2: Squad & Matches (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-copper">
              Match Centre
            </h4>
            <ul className="space-y-2 text-sm text-porcelain/75">
              <li>
                <Link href="/team" className="hover:text-copper transition-colors">
                  First Team Squad
                </Link>
              </li>
              <li>
                <Link href="/matches" className="hover:text-copper transition-colors">
                  Fixtures & Results
                </Link>
              </li>
              <li>
                <Link href="/matches#standings" className="hover:text-copper transition-colors">
                  League Standings
                </Link>
              </li>
              <li>
                <Link href="/tickets" className="hover:text-copper transition-colors">
                  Buy Match Tickets
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-copper transition-colors">
                  Official News
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Fan Community (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-copper">
              Stay Connected
            </h4>
            <p className="text-xs text-porcelain/70 leading-relaxed">
              Subscribe to the official Mariner Dispatch for exclusive squad announcements, priority matchday tickets, and kit releases.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-copper/20 border border-copper/40 text-xs text-copper flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Thank you for joining the Mariners family!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 sm:py-2.5 rounded-full bg-porcelain/10 border border-porcelain/20 text-base sm:text-xs text-porcelain placeholder-porcelain/40 focus:outline-none focus:border-copper"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-copper hover:bg-copper-400 text-navy font-heading font-bold text-xs transition-colors shrink-0 flex items-center gap-1"
                >
                  Join <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="pt-2">
              <span className="text-[10px] tracking-widest text-copper/80 uppercase font-semibold block mb-2">
                Official Club Store
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <Link href="/store" className="text-porcelain/70 hover:text-copper transition-colors underline">
                  2026/27 Heritage Kits
                </Link>
                <span>•</span>
                <Link href="/store" className="text-porcelain/70 hover:text-copper transition-colors underline">
                  Training Collection
                </Link>
                <span>•</span>
                <Link href="/store" className="text-porcelain/70 hover:text-copper transition-colors underline">
                  Match Scarves
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Disclaimer */}
        <div className="mt-14 pt-8 border-t border-porcelain/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-porcelain/50">
          <p>
            © 2026 TAMILNADU FOOTBALL CLUB. All rights reserved.
          </p>

          <p className="text-center md:text-right max-w-xl text-[11px] text-porcelain/40">
            Fictional football club digital demonstration platform. All fixtures, players, ticket booking and merchandise checkouts are simulated for design and evaluation purposes.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/club" className="hover:text-copper transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/club" className="hover:text-copper transition-colors">Terms of Use</Link>
            <span>•</span>
            <Link href="/club" className="hover:text-copper transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
