"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { X, ArrowRight, Compass, Shield, Users, Calendar, Ticket, Newspaper, ShoppingBag } from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/98 backdrop-blur-xl text-porcelain transition-all duration-300">
      {/* Top Bar inside Mega Menu */}
      <div className="border-b border-porcelain/10">
        <div className="site-container flex items-center justify-between h-20 sm:h-24">
          <div className="flex items-center gap-3">
            <ClubCrest size={46} variant="primary" />
            <div className="flex flex-col">
              <span className="font-heading font-black tracking-[0.14em] text-lg text-porcelain">
                TAMILNADU <span className="text-copper">FC</span>
              </span>
              <span className="text-[9px] tracking-[0.24em] font-medium text-copper uppercase">
                One State. One Passion.
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-porcelain/10 transition-colors text-porcelain/80 hover:text-porcelain text-xs uppercase tracking-widest font-semibold"
            aria-label="Close navigation"
          >
            <span>Close</span>
            <X className="w-5 h-5 text-copper" />
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="site-container py-12 sm:py-16">
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
