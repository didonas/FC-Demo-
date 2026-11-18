"use client";

import React from "react";
import Link from "next/link";
import { productsData } from "@/data/productsData";
import { useCart } from "@/context/CartContext";
import { ArrowRight, ShoppingBag, Check } from "lucide-react";
import { ProductImagePlaceholder } from "@/components/store/ProductImagePlaceholder";

export const MerchandiseSection: React.FC = () => {
  const { addItem } = useCart();
  const featuredKits = productsData
    .filter(
      (p) =>
        (p.category === "Match Kits" || p.category === "Kits") &&
        p.isPublished !== false &&
        p.status !== "draft"
    )
    .slice(0, 3);
  const scarf = productsData.find((p) => p.id === "acc-scarf") || productsData[3];

  const handleQuickAdd = (product: typeof productsData[0]) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: product.sizes[1] || "M",
      quantity: 1,
      image: product.images.front,
    });
  };

  return (
    <section className="py-12 sm:py-20">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-[2px] w-6 bg-copper" />
              <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase">
                Official Collection
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy">
              Wear the Colours
            </h2>
            <p className="text-xs sm:text-sm text-navy/70 mt-1 max-w-lg">
              Explore the 2026/27 official match kits, woven with coastal heritage and high-performance craft.
            </p>
          </div>

          <Link
            href="/store"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy hover:text-copper transition-colors group"
          >
            <span>Visit Official Store</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Campaign Hero Banner */}
        <div className="rounded-3xl overflow-hidden bg-navy text-porcelain mb-8 sm:mb-10 relative min-h-[380px] sm:min-h-[440px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-luminosity hover:opacity-70 transition-opacity duration-700"
            style={{
              backgroundImage: `url('/images/store/banner-shop-collection.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />

          <div className="relative z-10 p-8 sm:p-14 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-copper text-navy text-[10px] font-heading font-black tracking-widest uppercase">
              The Heritage Kit
            </span>
            <h3 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-porcelain mt-4 leading-tight">
              Tradition. Pride. Tamil Nadu.
            </h3>
            <p className="text-xs sm:text-sm text-porcelain/80 mt-3 leading-relaxed">
              Crafted in porcelain ivory with deep Atlantic navy accents and burnished copper details. Designed for players and supporters who carry the state in their hearts.
            </p>
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/store/home-kit-2026-heritage"
                className="px-6 py-3.5 rounded-full bg-copper hover:bg-copper-400 text-navy font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
              >
                Shop The Heritage Kit (₹4,499)
              </Link>
              <Link
                href="/store"
                className="px-6 py-3.5 rounded-full bg-porcelain/15 hover:bg-porcelain/25 text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-colors border border-porcelain/20"
              >
                View All Kits
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Featured Products Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...featuredKits, scarf].map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-white border border-porcelain-300 hover:border-copper/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <Link href={`/store/${product.slug}`} className="block relative aspect-[4/5] bg-porcelain-100 overflow-hidden">
                {product.images.front ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={product.images.front}
                    alt={product.name}
                    className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ProductImagePlaceholder productName={product.name} size="sm" />
                )}
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-navy/90 text-porcelain text-[9px] font-heading font-bold uppercase tracking-wider shadow z-10">
                    {product.badge}
                  </span>
                )}
              </Link>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] tracking-widest text-copper font-semibold uppercase block mb-1">
                    {product.category}
                  </span>
                  <Link
                    href={`/store/${product.slug}`}
                    className="font-heading font-bold text-sm sm:text-base text-navy hover:text-copper transition-colors line-clamp-2 leading-snug"
                  >
                    {product.name}
                  </Link>
                </div>

                <div className="pt-4 mt-4 border-t border-porcelain-200 flex items-center justify-between">
                  <span className="font-heading font-extrabold text-sm sm:text-base text-navy">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-navy hover:bg-copper text-porcelain text-xs font-semibold transition-colors flex items-center gap-1"
                    title="Add to Shopping Bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
