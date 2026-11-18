import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsData } from "@/data/newsData";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Bookmark } from "lucide-react";
import { ShareButton } from "@/components/ui/ShareButton";

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return newsData.map((item) => ({
    slug: item.slug,
  }));
}

export default async function NewsArticlePage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = newsData.find((n) => n.slug === slug);

  if (!article) {
    notFound();
  }

  const related = newsData
    .filter((n) => n.id !== article.id)
    .slice(0, 3);

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Top Breadcrumb */}
      <div className="site-container py-4 border-b border-porcelain-300">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy/70 hover:text-copper transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>
      </div>

      {/* Article Header */}
      <article className="py-10 sm:py-16">
        <div className="site-container max-w-4xl">
          <div className="space-y-4 text-center sm:text-left mb-8 sm:mb-12">
            <span className="px-3.5 py-1.5 rounded-full bg-copper text-navy text-xs font-heading font-black tracking-widest uppercase inline-block">
              {article.category}
            </span>

            <h1 className="font-heading font-black text-3xl sm:text-5xl text-navy leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-navy/70 leading-relaxed max-w-3xl">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-navy/60 pt-4 border-t border-porcelain-200">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-copper" />
                {article.publishDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-copper" />
                {article.readTime}
              </span>
              <span>•</span>
              <span className="text-copper font-medium">Tamilnadu FC Press Office</span>
            </div>
          </div>

          {/* Large Hero Photography */}
          <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-navy relative border border-porcelain-300 shadow-xl mb-12">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${article.heroImage}')` }}
            />
          </div>

          {/* Formatted Article Body */}
          <div className="space-y-6 text-sm sm:text-base text-navy/85 leading-relaxed max-w-3xl mx-auto font-sans">
            {article.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Editorial Quote Block */}
            {article.quote && (
              <div className="my-10 p-8 rounded-3xl bg-white border-l-4 border-copper border-y border-r border-porcelain-300 shadow-sm space-y-3">
                <p className="font-heading italic text-lg sm:text-xl text-navy leading-snug">
                  &ldquo;{article.quote.text}&rdquo;
                </p>
                <div className="pt-2">
                  <strong className="font-heading font-bold text-sm text-copper block uppercase tracking-wider">
                    {article.quote.author}
                  </strong>
                  <span className="text-xs text-navy/60 block">
                    {article.quote.role}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Social Share Bar */}
          <div className="mt-14 pt-8 border-t border-porcelain-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-navy/70">
              <Share2 className="w-4 h-4 text-copper" />
              <span className="font-semibold uppercase tracking-wider">Share Story:</span>
              <div className="flex items-center gap-3 font-medium">
                <ShareButton />
                <span>•</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-copper transition-colors underline"
                >
                  X (Twitter)
                </a>
              </div>
            </div>

            <Link
              href="/store"
              className="font-heading font-bold uppercase tracking-wider text-copper hover:text-navy transition-colors flex items-center gap-1"
            >
              Shop 2026/27 Official Kits <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>

      {/* Related Stories */}
      {related.length > 0 && (
        <section className="py-12 sm:py-16 bg-porcelain-100/70 border-t border-porcelain-200">
          <div className="site-container max-w-5xl">
            <h3 className="font-heading font-extrabold text-2xl text-navy mb-8">
              Related Club Stories
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.slug}`}
                  className="group rounded-2xl overflow-hidden bg-white border border-porcelain-300 hover:border-copper/40 shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] bg-navy overflow-hidden relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${rel.heroImage}')` }}
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-copper uppercase tracking-wider block mb-1">
                        {rel.category}
                      </span>
                      <h4 className="font-heading font-bold text-sm text-navy group-hover:text-copper transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="text-[11px] text-navy/50 block mt-3">
                      {rel.publishDate}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
