"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import { playersData } from "@/data/playersData";
import { matchesData } from "@/data/matchesData";
import { productsData } from "@/data/productsData";
import { newsData } from "@/data/newsData";
import { Search, X, ArrowRight, User, Calendar, ShoppingBag, FileText } from "lucide-react";

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const matchedPlayers = playersData
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.position.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          p.shirtNumber.toString() === q
      )
      .slice(0, 3);

    const matchedMatches = matchesData
      .filter(
        (m) =>
          m.homeTeam.name.toLowerCase().includes(q) ||
          m.awayTeam.name.toLowerCase().includes(q) ||
          m.competition.toLowerCase().includes(q) ||
          m.stadium.toLowerCase().includes(q)
      )
      .slice(0, 3);

    const matchedProducts = productsData
      .filter(
        (pr) =>
          pr.name.toLowerCase().includes(q) ||
          pr.category.toLowerCase().includes(q) ||
          pr.collection.toLowerCase().includes(q)
      )
      .slice(0, 3);

    const matchedNews = newsData
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q) ||
          n.subtitle.toLowerCase().includes(q)
      )
      .slice(0, 3);

    const totalCount =
      matchedPlayers.length +
      matchedMatches.length +
      matchedProducts.length +
      matchedNews.length;

    return {
      players: matchedPlayers,
      matches: matchedMatches,
      products: matchedProducts,
      news: matchedNews,
      totalCount,
    };
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-navy/95 backdrop-blur-md text-porcelain transition-all duration-300">
      {/* Search Header */}
      <div className="border-b border-porcelain/15">
        <div className="site-container flex items-center justify-between py-6">
          <div className="flex items-center gap-4 flex-1 max-w-3xl">
            <Search className="w-6 h-6 text-copper" />
            <input
              type="text"
              autoFocus
              placeholder="Search players, matches, tickets, kits, or news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-xl sm:text-2xl text-porcelain placeholder-porcelain/40 focus:outline-none font-heading"
            />
          </div>
          <button
            onClick={closeSearch}
            className="p-2 rounded-full hover:bg-porcelain/10 transition-colors text-porcelain/80 hover:text-porcelain"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Search Content */}
      <div className="flex-1 overflow-y-auto py-8">
        <div className="site-container max-w-4xl">
          {!query && (
            <div className="py-12">
              <span className="text-xs font-semibold tracking-widest text-copper uppercase">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2.5 mt-4">
                {[
                  "Heritage Home Kit",
                  "Arjun Varadhan",
                  "Tickets vs Chennai City",
                  "The Meridian Stadium",
                  "Kovil Academy",
                  "Raghav Dhar",
                  "Away Jersey",
                  "Durand Cup",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 rounded-full bg-porcelain/10 hover:bg-copper/20 hover:text-copper text-sm transition-colors border border-porcelain/10"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results && results.totalCount === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-porcelain/70">
                No matching results found for &ldquo;<span className="text-copper">{query}</span>&rdquo;
              </p>
              <p className="text-sm text-porcelain/50 mt-2">
                Try searching for player names, kit collections, or upcoming fixtures.
              </p>
            </div>
          )}

          {results && results.totalCount > 0 && (
            <div className="space-y-8">
              {/* Players */}
              {results.players.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-copper uppercase mb-3">
                    <User className="w-4 h-4" /> Players ({results.players.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {results.players.map((p) => (
                      <Link
                        key={p.id}
                        href={`/team/${p.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 p-3 rounded-xl bg-porcelain/5 hover:bg-porcelain/10 border border-porcelain/10 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-copper/20 flex items-center justify-center font-heading font-black text-copper">
                          #{p.shirtNumber}
                        </div>
                        <div>
                          <p className="font-heading font-bold text-sm text-porcelain group-hover:text-copper transition-colors">
                            {p.name}
                          </p>
                          <p className="text-xs text-porcelain/60">{p.position}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {results.products.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-copper uppercase mb-3">
                    <ShoppingBag className="w-4 h-4" /> Official Store ({results.products.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {results.products.map((pr) => (
                      <Link
                        key={pr.id}
                        href={`/store/${pr.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 p-3 rounded-xl bg-porcelain/5 hover:bg-porcelain/10 border border-porcelain/10 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-porcelain/10 flex items-center justify-center overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={pr.images.front}
                            alt={pr.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-heading font-bold text-sm text-porcelain truncate group-hover:text-copper transition-colors">
                            {pr.name}
                          </p>
                          <p className="text-xs text-copper font-medium">₹{pr.price.toLocaleString("en-IN")}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matches */}
              {results.matches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-copper uppercase mb-3">
                    <Calendar className="w-4 h-4" /> Matches & Tickets ({results.matches.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {results.matches.map((m) => (
                      <Link
                        key={m.id}
                        href={`/matches/${m.slug}`}
                        onClick={closeSearch}
                        className="p-3.5 rounded-xl bg-porcelain/5 hover:bg-porcelain/10 border border-porcelain/10 transition-colors block group"
                      >
                        <div className="text-[10px] tracking-wider text-copper font-medium uppercase">
                          {m.competition} • {m.date}
                        </div>
                        <div className="font-heading font-bold text-base text-porcelain group-hover:text-copper transition-colors mt-1">
                          {m.homeTeam.name} vs {m.awayTeam.name}
                        </div>
                        <div className="text-xs text-porcelain/60 mt-0.5">
                          {m.stadium}, {m.city}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* News */}
              {results.news.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-copper uppercase mb-3">
                    <FileText className="w-4 h-4" /> News & Editorial ({results.news.length})
                  </div>
                  <div className="space-y-2">
                    {results.news.map((n) => (
                      <Link
                        key={n.id}
                        href={`/news/${n.slug}`}
                        onClick={closeSearch}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-porcelain/5 hover:bg-porcelain/10 border border-porcelain/10 transition-colors group"
                      >
                        <div>
                          <span className="text-[10px] font-semibold tracking-wider text-copper uppercase">
                            {n.category}
                          </span>
                          <h4 className="font-heading font-bold text-sm text-porcelain group-hover:text-copper transition-colors mt-0.5">
                            {n.title}
                          </h4>
                        </div>
                        <ArrowRight className="w-4 h-4 text-copper opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
