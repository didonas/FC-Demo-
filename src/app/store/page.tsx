"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { productsData } from "@/data/productsData";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { ProductImagePlaceholder } from "@/components/store/ProductImagePlaceholder";

// Category Collection Banners mapped directly to the extracted high-res PDF images
const categoryBanners: Record<
  string,
  {
    image: string;
    badge: string;
    title: string;
    description: string;
  }
> = {
  All: {
    image: "/images/store/banner-shop-collection.jpg",
    badge: "Official Club Merchandise Store",
    title: "Wear the Colours",
    description:
      "The complete 2026/27 official matchwear, training collection, and supporter apparel. Engineered with AeroWeave™ technology and finished with the golden crest.",
  },
  "Match Kits": {
    image: "/images/store/banner-official-kits.jpg",
    badge: "Official Kits Collection",
    title: "The Match Kits",
    description:
      "2026/27 official player kits engineered with high-performance AeroWeave™ technology. Built for matchday glory.",
  },
  Training: {
    image: "/images/store/banner-training-merchandise.jpg",
    badge: "Training & Performance Collection",
    title: "The Training Range",
    description:
      "High-performance drill tops, tracksuits, and training gear engineered for high-intensity pitch work.",
  },
  Accessories: {
    image: "/images/store/banner-matchday-merchandise.jpg",
    badge: "Matchday Merchandise Collection",
    title: "Supporter Essentials",
    description:
      "Matchday knitted bar scarves, structured caps, commemorative footballs, and accessories.",
  },
  Fanwear: {
    image: "/images/store/banner-shop-collection.jpg",
    badge: "Club Fanwear Collection",
    title: "Everyday Supporter Style",
    description:
      "Premium heavyweight hoodies, graphic tees, and streetwear for the Tamil Nadu faithful.",
  },
};

export default function StorePage() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");

  const categories = ["All", "Match Kits", "Training", "Fanwear", "Accessories"];
  const sizes = ["All", "XS", "S", "M", "L", "XL", "2XL"];

  const currentBanner = categoryBanners[selectedCategory] || categoryBanners.All;

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let list = productsData.filter((p) => p.isPublished !== false && p.status !== "draft");

    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedSize !== "All") {
      list = list.filter((p) => p.sizes.includes(selectedSize as any));
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      list.sort((a, b) => (b.badge === "New Arrival" ? 1 : -1));
    }

    return list;
  }, [selectedCategory, selectedSize, sortBy]);

  const handleQuickAdd = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: product.sizes[1] || "M",
      quantity: 1,
      image: product.images.front || "/images/store/home-jersey-isolated.jpg",
    });
  };

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Hero Campaign Header with Dynamic Category Collection Banner */}
      <section className="relative py-12 sm:py-24 bg-navy text-porcelain overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-luminosity transition-all duration-700"
          style={{
            backgroundImage: `url('${currentBanner.image}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/60" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto">
          <span className="text-[10px] sm:text-xs font-heading font-black tracking-[0.24em] text-copper uppercase block mb-2 sm:mb-3">
            {currentBanner.badge}
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-6xl text-porcelain tracking-tight">
            {currentBanner.title}
          </h1>
          <p className="text-xs sm:text-base text-porcelain/80 mt-3 sm:mt-4 leading-relaxed">
            {currentBanner.description}
          </p>
        </div>
      </section>

      {/* Filter & Sorting Controls Bar */}
      <section className="sticky top-16 md:top-[88px] z-30 bg-porcelain-50/95 backdrop-blur-md border-b border-porcelain-300 py-3">
        <div className="site-container flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 overflow-hidden">
          {/* Category Tabs: Horizontally swipeable on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full md:w-auto py-0.5 px-0.5 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 active:scale-95 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-navy text-porcelain shadow-sm"
                    : "bg-porcelain-200/70 hover:bg-porcelain-300 text-navy/80 hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Size Filter & Sort Controls: Clean side-by-side on mobile */}
          <div className="flex items-center justify-between md:justify-end gap-3 text-xs w-full md:w-auto pt-1 md:pt-0 border-t md:border-t-0 border-porcelain-200">
            {/* Size Selector */}
            <div className="flex items-center gap-1.5 flex-1 md:flex-none">
              <span className="text-navy/60 font-semibold text-[11px] hidden sm:inline">Size:</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full md:w-auto px-3 py-1.5 rounded-xl border border-porcelain-300 bg-white text-navy font-semibold text-xs focus:outline-none focus:border-copper"
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All Sizes" : `Size ${s}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5 flex-1 md:flex-none">
              <span className="text-navy/60 font-semibold text-[11px] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full md:w-auto px-3 py-1.5 rounded-xl border border-porcelain-300 bg-white text-navy font-semibold text-xs focus:outline-none focus:border-copper"
              >
                <option value="featured">Featured</option>
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Listings Grid */}
      <section className="py-8 sm:py-16">
        <div className="site-container">
          <div className="flex items-center justify-between mb-6 sm:mb-8 text-xs">
            <span className="font-semibold text-navy/70">
              Showing {filteredProducts.length} Official Products
            </span>
            <span className="text-copper font-medium hidden sm:inline">
              Free Delivery on orders over ₹2,500
            </span>
          </div>

          {/* Clean 2-column mobile grid, 4-column desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl sm:rounded-3xl bg-white border border-porcelain-300 hover:border-copper/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Product Image Container */}
                <Link
                  href={`/store/${product.slug}`}
                  className="block relative aspect-[4/5] bg-porcelain-100 overflow-hidden"
                >
                  {product.images.front ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images.front}
                        alt={product.name}
                        className={`w-full h-full ${
                          product.imageFit === "contain"
                            ? "object-contain p-2 sm:p-4"
                            : "object-cover object-center"
                        } transition-opacity duration-500 ${
                          product.images.back ? "group-hover:opacity-0" : ""
                        }`}
                      />
                      {product.images.back && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={product.images.back}
                          alt={`${product.name} alternate view`}
                          className={`w-full h-full ${
                            product.imageFit === "contain"
                              ? "object-contain p-2 sm:p-4"
                              : "object-cover object-center"
                          } absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                        />
                      )}
                    </>
                  ) : (
                    <ProductImagePlaceholder productName={product.name} />
                  )}

                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-navy/90 text-porcelain text-[8px] sm:text-[9px] font-heading font-black uppercase tracking-wider shadow z-10">
                      {product.badge}
                    </span>
                  )}
                </Link>

                {/* Details & Actions */}
                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[8px] sm:text-[10px] tracking-widest text-copper font-semibold uppercase mb-1">
                      <span className="truncate">{product.collection}</span>
                      <span className="truncate hidden sm:inline">{product.category}</span>
                    </div>

                    <Link
                      href={`/store/${product.slug}`}
                      className="font-heading font-bold text-xs sm:text-base text-navy hover:text-copper transition-colors line-clamp-2 leading-snug"
                    >
                      {product.name}
                    </Link>

                    {/* Available Sizes List */}
                    <div className="flex items-center gap-1 mt-1.5 text-[9px] sm:text-[10px] text-navy/50 font-mono">
                      <span>Sizes:</span>
                      {product.sizes.slice(0, 4).map((sz) => (
                        <span key={sz} className="px-1 bg-porcelain-100 rounded">
                          {sz}
                        </span>
                      ))}
                      {product.sizes.length > 4 && <span>+</span>}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-porcelain-200 flex items-center justify-between">
                    <div>
                      <span className="font-heading font-extrabold text-sm sm:text-lg text-navy">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] sm:text-xs text-navy/40 line-through ml-1 sm:ml-2">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="p-1.5 sm:p-2.5 rounded-full bg-porcelain-200 hover:bg-copper hover:text-navy text-navy transition-colors shadow-sm active:scale-90 cursor-pointer"
                      title="Quick Add to Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
