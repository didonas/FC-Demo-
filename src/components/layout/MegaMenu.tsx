"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { X, ArrowRight, Shield, Users, Ticket, Newspaper, ShoppingBag, ChevronRight, Search, Calendar } from "lucide-react";
import { useSearch } from "@/context/SearchContext";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const { openSearch } = useSearch();

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

  const handleSearchClick = () => {
    onClose();
    setTimeout(() => {
      openSearch();
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/98 backdrop-blur-2xl text-porcelain transition-all duration-300">
      {/* Top Bar inside Mega Menu */}
      <div className="border-b border-porcelain/10 sticky top-0 bg-navy/95 backdrop-blur-md z-10">
        <div className="site-container flex items-center justify-between h-16 sm:h-24">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ClubCrest size={38} variant="primary" />
            <div className="flex flex-col">
              <span className="font-heading font-black tracking-[0.14em] text-base sm:text-lg text-porcelain">
                TAMILNADU <span className="text-copper">FC</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.24em] font-medium text-copper uppercase">
                One State. One Passion.
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-porcelain/10 hover:bg-porcelain/20 transition-all text-porcelain text-xs uppercase tracking-widest font-heading font-bold active:scale-95 cursor-pointer"
            aria-label="Close navigation"
          >
            <span>Close</span>
            <X className="w-4 h-4 text-copper" />
          </button>
        </div>
      </div>

      {/* DEDICATED REAL MADRID-INSPIRED MOBILE MENU (< 768px) */}
      <div className="block md:hidden px-4 py-6 space-y-6">
        {/* Fast Search Bar */}
        <button
          onClick={handleSearchClick}
          className="w-full py-3 px-4 rounded-2xl bg-porcelain/10 border border-porcelain/15 flex items-center justify-between text-xs text-porcelain/70 active:scale-98 transition-transform cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-copper" />
            <span>Search players, matches, tickets...</span>
          </div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-porcelain/15 text-copper font-bold">
            Search
          </span>
        </button>

        {/* Fast Action Cards (Real Madrid inspired quick links) */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/tickets"
            onClick={onClose}
            className="p-4 rounded-2xl bg-gradient-to-br from-copper/25 to-copper/10 border border-copper/30 flex flex-col justify-between active:scale-95 transition-transform"
          >
            <Ticket className="w-5 h-5 text-copper mb-2" />
            <div>
              <strong className="font-heading font-black text-xs uppercase tracking-wider text-porcelain block">
                Match Tickets
              </strong>
              <span className="text-[10px] text-porcelain/70 mt-0.5 block">
                From ₹800 • Seating Map
              </span>
            </div>
          </Link>

          <Link
            href="/store"
            onClick={onClose}
            className="p-4 rounded-2xl bg-gradient-to-br from-porcelain/15 to-porcelain/5 border border-porcelain/15 flex flex-col justify-between active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-5 h-5 text-copper mb-2" />
            <div>
              <strong className="font-heading font-black text-xs uppercase tracking-wider text-porcelain block">
                Official Store
              </strong>
              <span className="text-[10px] text-porcelain/70 mt-0.5 block">
                2026/27 Kits & Merch
              </span>
            </div>
          </Link>
        </div>

        {/* Primary Destination Stack */}
        <div className="space-y-1.5 pt-2 border-t border-porcelain/10">
          <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-copper block px-2 mb-2">
            Club Navigation
          </span>
          {[
            { name: "The Club", href: "/club", subtitle: "Heritage, 1934 History & Silverware" },
            { name: "First Team", href: "/team", subtitle: "Senior Squad, Roster & Profiles" },
            { name: "Matches & Results", href: "/matches", subtitle: "Fixtures, Scores & ISL Standings" },
            { name: "Matchday Tickets", href: "/tickets", subtitle: "The Meridian Stadium & VIP Seating" },
            { name: "Club News", href: "/news", subtitle: "Editorial Stories & Announcements" },
            { name: "Official Store", href: "/store", subtitle: "Jerseys, Training & Accessories" },
            { name: "The Meridian Stadium", href: "/stadium", subtitle: "62,500 Acoustic Fortress Tours" },
            { name: "Kovil Youth Academy", href: "/academy", subtitle: "Grassroots & Player Pathway" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-porcelain/10 active:bg-porcelain/15 transition-all group"
            >
              <div>
                <strong className="font-heading font-black text-base text-porcelain group-hover:text-copper transition-colors block">
                  {item.name}
                </strong>
                <span className="text-[11px] text-porcelain/60 block mt-0.5">
                  {item.subtitle}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-copper group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          ))}
        </div>

        {/* Kavalan Fan Zone Banner */}
        <div className="p-4 rounded-2xl bg-navy border border-copper/30 relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-heading font-black tracking-widest text-copper uppercase block">
                Official Supporters Club
              </span>
              <strong className="font-heading font-bold text-sm text-porcelain block mt-0.5">
                Kavalan Ultras Family
              </strong>
            </div>
            <Link
              href="/club#supporters"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-full bg-copper text-navy text-[11px] font-heading font-bold uppercase tracking-wider"
            >
              Join Us
            </Link>
          </div>
        </div>

        {/* Mobile Social Bar */}
        <div className="pt-4 border-t border-porcelain/10 flex items-center justify-between text-xs text-porcelain/60 px-2 pb-6">
          <span className="text-[10px] uppercase font-bold text-copper tracking-wider">
            Follow TNFC
          </span>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-copper transition-colors">
              X
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

      {/* DESKTOP MEGA MENU CONTENT (>= 768px) — 100% PRESERVED */}
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

            {/* Column 2: Squad & Staff */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-copper uppercase border-b border-porcelain/15 pb-2">
                <Users className="w-4 h-4" /> Squad
              </div>
              <ul className="space-y-2.5 text-sm font-medium">
                <li>
                  <Link
                    href="/team"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    First Team Players
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team/arjun-varadhan"
                    onClick={onClose}
                    className="text-copper font-semibold hover:text-porcelain transition-colors block py-0.5"
                  >
                    #10 Arjun Varadhan (C)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team#technical-staff"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    Head Coach Gabriel Santana
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    onClick={onClose}
                    className="text-porcelain/80 hover:text-copper transition-colors block py-0.5"
                  >
                    Squad Statistics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Matches */}
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
                    Fixtures & Results
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
                <li>
                  <Link
                    href="/matches/tnfc-vs-chennai-city"
                    onClick={onClose}
                    className="text-copper font-semibold hover:text-porcelain transition-colors block py-0.5"
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
