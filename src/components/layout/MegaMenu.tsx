"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ClubCrest } from "@/components/brand/ClubCrest";
import {
  X,
  ArrowRight,
  Shield,
  Users,
  Calendar,
  Ticket,
  Newspaper,
  ShoppingBag,
  Compass,
  ChevronRight,
  Flame,
  Search,
} from "lucide-react";
import { useSearch } from "@/context/SearchContext";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const { openSearch } = useSearch();
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(null);

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const mobileNavItems = [
    {
      title: "First Team Squad",
      kicker: "11 Senior Players",
      href: "/team",
      badge: "2026/27",
      icon: Users,
    },
    {
      title: "Matches & Fixtures",
      kicker: "Super League & Asia",
      href: "/matches",
      badge: "Live Center",
      icon: Calendar,
    },
    {
      title: "The Club & Heritage",
      kicker: "Founded 1934 • 9 Decades",
      href: "/club",
      badge: "History",
      icon: Shield,
    },
    {
      title: "The Meridian Stadium",
      kicker: "62,500 Acoustic Fortress",
      href: "/stadium",
      badge: "Venue",
      icon: Compass,
    },
    {
      title: "Kovil Youth Academy",
      kicker: "Next-Gen Talent",
      href: "/academy",
      badge: "Youth",
      icon: Flame,
    },
    {
      title: "Latest Club News",
      kicker: "Stories & Reports",
      href: "/news",
      badge: "Editorial",
      icon: Newspaper,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/98 backdrop-blur-xl text-porcelain transition-all duration-300">
      {/* Top Bar inside Menu */}
      <div className="border-b border-porcelain/10 sticky top-0 bg-navy/95 backdrop-blur-md z-30">
        <div className="site-container flex items-center justify-between h-16 sm:h-20 md:h-24">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ClubCrest size={38} variant="primary" />
            <div className="flex flex-col">
              <span className="font-heading font-black tracking-[0.14em] text-base sm:text-lg text-porcelain leading-none">
                TAMILNADU <span className="text-copper">FC</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.24em] font-medium text-copper uppercase mt-0.5">
                One State. One Passion.
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-porcelain/10 hover:bg-copper hover:text-navy transition-all text-porcelain text-xs uppercase tracking-widest font-semibold"
            aria-label="Close navigation"
          >
            <span>Close</span>
            <X className="w-4 h-4 text-copper hover:text-navy" />
          </button>
        </div>
      </div>

      {/* MOBILE SPECIFIC NAVIGATION (Visible on screens < 768px) */}
      <div className="md:hidden px-5 py-6 space-y-6">
        {/* Quick Action Cards: Tickets & Shop */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/tickets"
            onClick={onClose}
            className="p-4 rounded-2xl bg-copper text-navy flex flex-col justify-between min-h-[100px] shadow-lg active:scale-98 transition-transform"
          >
            <div className="flex items-center justify-between">
              <Ticket className="w-5 h-5 text-navy" />
              <span className="text-[9px] font-heading font-black tracking-wider uppercase bg-navy/15 px-2 py-0.5 rounded-full">
                From ₹800
              </span>
            </div>
            <div>
              <span className="font-heading font-extrabold text-sm block leading-tight mt-2">
                Match Tickets
              </span>
              <span className="text-[10px] font-medium text-navy/80 block mt-0.5">
                Select Seats & Stand
              </span>
            </div>
          </Link>

          <Link
            href="/store"
            onClick={onClose}
            className="p-4 rounded-2xl bg-white/10 border border-porcelain/15 text-porcelain flex flex-col justify-between min-h-[100px] active:scale-98 transition-transform"
          >
            <div className="flex items-center justify-between">
              <ShoppingBag className="w-5 h-5 text-copper" />
              <span className="text-[9px] font-heading font-bold tracking-wider uppercase text-copper">
                2026/27 Kits
              </span>
            </div>
            <div>
              <span className="font-heading font-extrabold text-sm block leading-tight mt-2 text-porcelain">
                Official Store
              </span>
              <span className="text-[10px] font-medium text-porcelain/70 block mt-0.5">
                Shop Authentic Gear
              </span>
            </div>
          </Link>
        </div>

        {/* Search Quick Button */}
        <button
          onClick={() => {
            onClose();
            openSearch();
          }}
          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-porcelain/5 border border-porcelain/10 text-porcelain/70 text-xs font-medium"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-copper" />
            <span>Search players, matches, tickets...</span>
          </div>
          <span className="text-[10px] font-mono text-copper uppercase">Tap to search</span>
        </button>

        {/* Primary Destination List with Distinct Typography */}
        <div className="space-y-2 pt-2">
          <span className="text-[10px] font-heading font-black tracking-[0.24em] text-copper uppercase block px-1">
            Club Navigation
          </span>
          <div className="divide-y divide-porcelain/10 rounded-2xl bg-porcelain/5 border border-porcelain/10 overflow-hidden">
            {mobileNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between p-4 active:bg-porcelain/10 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-porcelain/10 flex items-center justify-center text-copper group-active:text-porcelain shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-porcelain group-active:text-copper transition-colors leading-tight">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-porcelain/60 block mt-0.5">
                        {item.kicker}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-copper/60 group-active:text-copper transition-colors shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Fan Zone & Supporters Card */}
        <Link
          href="/club#supporters"
          onClick={onClose}
          className="block p-4 rounded-2xl bg-gradient-to-r from-navy via-navy-800 to-copper/20 border border-copper/30"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-heading font-black tracking-widest text-copper uppercase">
              Kavalan Fan Club
            </span>
            <span className="text-[10px] text-copper font-mono">North Stand</span>
          </div>
          <h4 className="font-heading font-extrabold text-base text-porcelain mt-1">
            Join The Marina Wall
          </h4>
          <p className="text-xs text-porcelain/75 mt-0.5 leading-snug">
            Official chants, matchday drums, and supporter culture.
          </p>
        </Link>

        {/* Mobile Social Strip & Safe Area Footer */}
        <div className="pt-4 pb-8 border-t border-porcelain/10 flex items-center justify-between text-xs text-porcelain/60">
          <span className="text-copper font-medium text-[11px] uppercase tracking-wider">Follow TNFC</span>
          <div className="flex items-center gap-3 text-porcelain/80 text-xs">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-copper">X</a>
            <span>•</span>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-copper">Instagram</a>
            <span>•</span>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-copper">YouTube</a>
          </div>
        </div>
      </div>

      {/* DESKTOP & TABLET MEGA MENU (Preserved for screens >= 768px) */}
      <div className="hidden md:block site-container py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Navigation Columns (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: The Club */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-copper uppercase border-b border-porcelain/15 pb-2">
                <Shield className="w-4 h-4" /> Club
              </div>
              <ul className="space-y-2.5 text-sm font-medium">
                <li>
                  <Link
                    href="/club"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    History & Heritage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/club#honours"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    Trophies & Honours
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stadium"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    The Meridian Stadium
                  </Link>
                </li>
                <li>
                  <Link
                    href="/academy"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    Kovil Youth Academy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/club#philosophy"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    Club Philosophy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: First Team */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-copper uppercase border-b border-porcelain/15 pb-2">
                <Users className="w-4 h-4" /> Team
              </div>
              <ul className="space-y-2.5 text-sm font-medium">
                <li>
                  <Link
                    href="/team"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    First Team Squad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team/arjun-varadhan"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    Captain: Arjun Varadhan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/club#leadership"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    Coaching Staff
                  </Link>
                </li>
                <li>
                  <Link
                    href="/matches#standings"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    League Standings
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Matches & Fixtures */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-copper uppercase border-b border-porcelain/15 pb-2">
                <Calendar className="w-4 h-4" /> Matches
              </div>
              <ul className="space-y-2.5 text-sm font-medium">
                <li>
                  <Link
                    href="/matches"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    Fixtures Schedule
                  </Link>
                </li>
                <li>
                  <Link
                    href="/matches#results"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    Latest Results
                  </Link>
                </li>
                <li>
                  <Link
                    href="/matches/tnfc-vs-chennai-city"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    Coromandel Derby Preview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/matches#competitions"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    Asian Champions Cup
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Tickets & Hospitality */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-copper uppercase border-b border-porcelain/15 pb-2">
                <Ticket className="w-4 h-4" /> Tickets
              </div>
              <ul className="space-y-2.5 text-sm font-medium">
                <li>
                  <Link
                    href="/tickets"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    Match Day Tickets
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tickets/match-01"
                    onClick={onClose}
                    className="text-copper font-semibold hover:text-porcelain transition-colors block py-0.5"
                  >
                    Interactive Seating Map
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stadium#hospitality"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    VIP Hospitality Suites
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stadium#tours"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    Stadium Tours
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Featured Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="relative rounded-3xl overflow-hidden border border-porcelain/15 bg-porcelain/5 p-6 flex flex-col justify-between h-full min-h-[340px] group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1000&q=80')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />

              <div className="relative z-10">
                <span className="px-3 py-1 rounded-full bg-copper/90 text-navy font-heading font-black text-[10px] tracking-widest uppercase">
                  Featured Destination
                </span>
              </div>

              <div className="relative z-10 pt-16">
                <h3 className="font-heading font-black text-2xl text-porcelain leading-tight">
                  Experience The Meridian
                </h3>
                <p className="text-xs text-porcelain/80 mt-2 line-clamp-2">
                  62,500 seats overlooking Chennai&apos;s historic coast. Explore matchday tours, hospitality packages, and acoustic architecture.
                </p>
                <Link
                  href="/stadium"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-porcelain text-navy font-heading font-bold text-xs hover:bg-copper hover:text-porcelain transition-colors"
                >
                  Explore The Stadium <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar inside Mega Menu */}
        <div className="mt-14 pt-8 border-t border-porcelain/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-porcelain/70">
            <Link
              href="/store"
              onClick={onClose}
              className="flex items-center gap-2 hover:text-copper transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-copper" /> Official Store
            </Link>
            <Link
              href="/news"
              onClick={onClose}
              className="flex items-center gap-2 hover:text-copper transition-colors"
            >
              <Newspaper className="w-4 h-4 text-copper" /> Club News
            </Link>
            <Link
              href="/club#supporters"
              onClick={onClose}
              className="flex items-center gap-2 hover:text-copper transition-colors"
            >
              <Users className="w-4 h-4 text-copper" /> Kavalan Fan Zone
            </Link>
          </div>

          <div className="flex items-center gap-5 text-sm text-porcelain/60">
            <span className="text-[11px] uppercase tracking-widest text-copper font-medium">Follow TNFC:</span>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-copper transition-colors">
              X (Twitter)
            </a>
            <span>•</span>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-copper transition-colors">
              Instagram
            </a>
            <span>•</span>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-copper transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
