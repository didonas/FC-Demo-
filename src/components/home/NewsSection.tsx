import React from "react";
import Link from "next/link";
import { newsData } from "@/data/newsData";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export const NewsSection: React.FC = () => {
  const featuredArticle = newsData[1]; // Historic Win
  const supportingArticles = [newsData[2], newsData[3], newsData[4]];

  return (
    <section className="py-10 sm:py-16">
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
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

          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy hover:text-copper transition-colors group"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Large Featured Article (7 cols) */}
          <div className="lg:col-span-7">
            <Link
              href={`/news/${featuredArticle.slug}`}
              className="group block rounded-3xl overflow-hidden bg-white border border-porcelain-300 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${featuredArticle.heroImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1 rounded-full bg-copper text-navy text-[10px] font-heading font-black uppercase tracking-wider shadow-md">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
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

                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-navy group-hover:text-copper transition-colors leading-tight">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-sm text-navy/70 mt-3 line-clamp-2 leading-relaxed">
                    {featuredArticle.subtitle}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-porcelain-200 flex items-center justify-between">
                  <span className="text-xs font-heading font-bold text-navy group-hover:text-copper transition-colors uppercase tracking-wider flex items-center gap-1.5">
                    Read Complete Story
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Supporting Articles Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
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
    </section>
  );
};
