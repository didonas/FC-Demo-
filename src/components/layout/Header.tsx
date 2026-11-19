"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { MegaMenu } from "./MegaMenu";
import { useSearch } from "@/context/SearchContext";
import { useCart } from "@/context/CartContext";
import { Menu, Search, ShoppingBag, User, ArrowRight } from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { openSearch } = useSearch();
  const { openCart, itemsCount } = useCart();

  const navLinks = [
    { name: "Club", href: "/club" },
    { name: "Team", href: "/team" },
    { name: "Matches", href: "/matches" },
    { name: "Tickets", href: "/tickets" },
    { name: "News", href: "/news" },
    { name: "Shop", href: "/store" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-porcelain-50/95 backdrop-blur-md border-b border-porcelain-300 transition-all duration-200">
        <div className="site-container">
          <div className="flex items-center justify-between h-20 md:h-[88px]">
            {/* LEFT: Hamburger Menu + Club Crest + Wordmark */}
            <div className="flex items-center gap-3 sm:gap-5">
              <button
                onClick={() => setIsMegaMenuOpen(true)}
                className="p-2.5 rounded-full hover:bg-porcelain-200 text-navy transition-colors flex items-center justify-center group"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-navy group-hover:text-copper transition-colors" />
              </button>

              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
                <ClubCrest size={46} variant="primary" />
                <div className="flex flex-col text-left">
                  <span className="font-heading font-black tracking-[0.14em] text-base sm:text-lg text-navy leading-none group-hover:text-copper transition-colors">
                    TAMILNADU <span className="text-copper">FC</span>
                  </span>
                  <span className="text-[9px] tracking-[0.22em] font-medium text-copper uppercase mt-0.5 hidden sm:block">
                    One State. One Passion.
                  </span>
                </div>
              </Link>
            </div>

            {/* CENTRE: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-xs font-heading font-bold uppercase tracking-[0.16em] transition-colors py-1 ${
                      isActive ? "text-copper" : "text-navy/80 hover:text-navy"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-copper rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT: Utility Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Trigger */}
              <button
                onClick={openSearch}
                className="p-2 sm:p-2.5 rounded-full hover:bg-porcelain-200 text-navy transition-colors relative flex items-center justify-center"
                aria-label="Search"
                title="Search (Ctrl+K)"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-navy" />
              </button>

              {/* Account Demo Modal Trigger */}
              <Link
                href="/club#supporters"
                className="p-2 sm:p-2.5 rounded-full hover:bg-porcelain-200 text-navy transition-colors hidden sm:flex items-center justify-center"
                aria-label="Fan Account"
                title="Kavalan Fan Club"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-navy" />
              </Link>

              {/* Shopping Bag with Item Count Badge */}
              <button
                onClick={openCart}
                className="p-2 sm:p-2.5 rounded-full hover:bg-porcelain-200 text-navy transition-colors relative flex items-center justify-center"
                aria-label={`Shopping bag with ${itemsCount} items`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-navy" />
                {itemsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-copper text-porcelain text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {itemsCount}
                  </span>
                )}
              </button>

              {/* Buy Tickets CTA */}
              <Link
                href="/tickets"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow"
              >
                <span>Buy Tickets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mega Menu Overlay */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />
    </>
  );
};
