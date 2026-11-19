"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { newsData } from "@/data/newsData";
import { ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

export const NewsSection: React.FC = () => {
  const featuredArticle = newsData[1]; // Historic Win
  const supportingArticles = [newsData[2], newsData[3], newsData[4]];
  const mobileRailRef = useRef<HTMLDivElement>(null);

  const scrollRail = (direction: "left" | "right") => {
    if (mobileRailRef.current) {
      const scrollAmount = mobileRailRef.current.clientWidth * 0.8;
      mobileRailRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-6 sm:py-16">
      <div className="site-container">
        {/* Main Section Header */}
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-[2px] w-6 bg-copper" />
            <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase">
              From the Heart of Tamil Nadu
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy">
            Latest Club Stories
          </h2>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Main Large Featured Article (7 cols) - Completely Unchanged on Desktop */}
          <div className="lg:col-span-7">
            <Link
              href={`/news/${featuredArticle.slug}`}
              className="group block rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-porcelain-300 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${featuredArticle.heroImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                  <span className="px-3 py-1 rounded-full bg-copper text-navy text-[10px] font-heading font-black uppercase tracking-wider shadow-md">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-navy/60 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-copper" />
                      {featuredArticle.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-copper" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg sm:text-2xl text-navy group-hover:text-copper transition-colors leading-tight">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-navy/70 mt-2.5 sm:mt-3 line-clamp-2 leading-relaxed">
                    {featuredArticle.subtitle}
                  </p>
                </div>

                <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-porcelain-200 flex items-center justify-between">
                  <span className="text-xs font-heading font-bold text-navy group-hover:text-copper transition-colors uppercase tracking-wider flex items-center gap-1.5">
                    Read Complete Story
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Supporting Articles: Real Madrid-inspired Dual Presentation */}
          <div className="lg:col-span-5 flex flex-col w-full">
            {/* Subtle Section Heading: LATEST NEWS + VIEW ALL */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-porcelain-200">
              <div className="flex items-center gap-2">
                <span className="h-[2px] w-4 bg-copper" />
                <span className="text-xs font-heading font-black tracking-[0.2em] text-navy uppercase">
                  Latest News
                </span>
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile Prev/Next arrows (Real Madrid inspired) */}
                <div className="flex lg:hidden items-center gap-1">
                  <button
                    onClick={() => scrollRail("left")}
                    className="p-1 rounded-full border border-porcelain-300 hover:bg-porcelain-200 text-navy transition-colors active:scale-95"
                    aria-label="Previous story"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => scrollRail("right")}
                    className="p-1 rounded-full border border-porcelain-300 hover:bg-porcelain-200 text-navy transition-colors active:scale-95"
                    aria-label="Next story"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Link
                  href="/news"
                  className="inline-flex items-center gap-1 text-[11px] font-heading font-bold uppercase tracking-wider text-navy/70 hover:text-copper transition-colors group"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-copper" />
                </Link>
              </div>
            </div>

            {/* A. MOBILE ONLY (< lg): Horizontal News Rail with Partially Visible Next Card (Real Madrid UX) */}
            <div
              ref={mobileRailRef}
              className="flex lg:hidden gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3 -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {supportingArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group w-[78vw] max-w-[300px] shrink-0 snap-start rounded-2xl bg-white border border-porcelain-300 shadow-sm hover:border-copper/40 transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${article.heroImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-navy/90 text-copper text-[9px] font-heading font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-navy/50 mb-1">
                        <span>{article.publishDate}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h4 className="font-heading font-bold text-sm text-navy group-hover:text-copper transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                    </div>

                    <div className="pt-3 mt-3 border-t border-porcelain-200 flex items-center justify-between text-[11px] font-heading font-bold text-copper uppercase tracking-wider">
                      <span>Read Story</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* B. DESKTOP ONLY (>= lg): Natural Content-Based Stacking with 18-20px Gap (100% PRESERVED) */}
            <div className="hidden lg:flex flex-col gap-[18px]">
              {supportingArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group p-5 rounded-2xl bg-white border border-porcelain-300 shadow-sm hover:border-copper/40 hover:shadow-md transition-all flex gap-4 items-center"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-24 rounded-xl overflow-hidden bg-navy shrink-0 relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${article.heroImage}')` }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-copper uppercase tracking-wider mb-1">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.publishDate}</span>
                    </div>

                    <h4 className="font-heading font-bold text-sm sm:text-base text-navy group-hover:text-copper transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h4>

                    <span className="text-[11px] font-medium text-navy/50 mt-1 block">
                      {article.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
