"use client";

import React, { useState } from "react";
import Link from "next/link";
import { newsData } from "@/data/newsData";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function NewsHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Official Announcement",
    "Match Report",
    "Interview",
    "Club News",
    "Academy",
  ];

  const filteredNews =
    selectedCategory === "All"
      ? newsData
      : newsData.filter((item) => item.category === selectedCategory);

  const featured = filteredNews[0] || newsData[0];
  const rest = filteredNews.slice(1);

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 bg-navy text-porcelain">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/50" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-heading font-black tracking-[0.24em] text-copper uppercase block mb-3">
            Press Room & Editorial Dispatch
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-porcelain tracking-tight">
            Official Club News
          </h1>
          <p className="text-sm sm:text-base text-porcelain/80 mt-4 leading-relaxed">
            Stay informed with official club announcements, tactical match reports, exclusive player interviews, and academy milestones.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs Bar */}
      <section className="sticky top-[80px] md:top-[88px] z-30 bg-porcelain-50/95 backdrop-blur-md border-b border-porcelain-300 py-3.5">
        <div className="site-container flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-navy text-porcelain shadow-sm"
                    : "bg-porcelain-200/70 hover:bg-porcelain-300 text-navy/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Story & Articles Grid */}
      <section className="py-12 sm:py-20">
        <div className="site-container">
          {/* Big Lead Story */}
          {featured && (
            <div className="mb-12">
              <Link
                href={`/news/${featured.slug}`}
                className="group block rounded-3xl overflow-hidden bg-white border border-porcelain-300 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
                  <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[360px] bg-navy overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${featured.heroImage}')` }}
                    />
                    <div className="absolute top-5 left-5">
                      <span className="px-3.5 py-1.5 rounded-full bg-copper text-navy text-[10px] font-heading font-black uppercase tracking-wider shadow">
                        {featured.category}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-navy/60 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-copper" />
                          {featured.publishDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-copper" />
                          {featured.readTime}
                        </span>
                      </div>

                      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy group-hover:text-copper transition-colors leading-tight">
                        {featured.title}
                      </h2>

                      <p className="text-sm text-navy/75 mt-4 leading-relaxed line-clamp-3">
                        {featured.subtitle}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-porcelain-200 flex items-center justify-between">
                      <span className="text-xs font-heading font-bold text-navy group-hover:text-copper uppercase tracking-wider flex items-center gap-1.5">
                        Read Full Story
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid of Remaining Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {rest.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group rounded-3xl overflow-hidden bg-white border border-porcelain-300 hover:border-copper/40 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-navy overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${article.heroImage}')` }}
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-navy/90 text-porcelain text-[9px] font-heading font-bold uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-navy/50 font-semibold mb-2">
                      <span>{article.publishDate}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-heading font-bold text-base sm:text-lg text-navy group-hover:text-copper transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-navy/70 mt-2 line-clamp-2 leading-relaxed">
                      {article.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-porcelain-200">
                    <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-navy group-hover:text-copper flex items-center gap-1">
                      Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
