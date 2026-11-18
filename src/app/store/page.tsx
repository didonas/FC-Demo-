"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { productsData } from "@/data/productsData";
import { ProductCategory, Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Filter, ArrowUpDown, ArrowRight, Check } from "lucide-react";

export default function StorePage() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");

  const categories = ["All", "Kits", "Training", "Lifestyle", "Accessories"];
  const sizes = ["All", "XS", "S", "M", "L", "XL", "2XL"];

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let list = [...productsData];

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
      image: product.images.front,
    });
  };

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Hero Campaign Header */}
      <section className="relative py-16 sm:py-24 bg-navy text-porcelain">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/50" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-heading font-black tracking-[0.24em] text-copper uppercase block mb-3">
            Official Club Merchandise Store
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-porcelain tracking-tight">
            Wear the Colours
          </h1>
          <p className="text-sm sm:text-base text-porcelain/80 mt-4 leading-relaxed">
            The complete 2026/27 official matchwear, training collection, and supporter apparel. Engineered with AeroWeave™ technology and finished with the golden crest.
          </p>
        </div>
      </section>

      {/* Filter & Sorting Controls Bar */}
      <section className="sticky top-[80px] md:top-[88px] z-30 bg-porcelain-50/95 backdrop-blur-md border-b border-porcelain-300 py-3.5">
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
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

          {/* Size Filter & Sort Controls */}
          <div className="flex items-center gap-4 text-xs">
            {/* Size Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-navy/60 font-semibold hidden sm:inline">Size:</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-porcelain-300 bg-white text-navy font-semibold focus:outline-none focus:border-copper"
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All Sizes" : `Size ${s}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-navy/60 font-semibold hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg border border-porcelain-300 bg-white text-navy font-semibold focus:outline-none focus:border-copper"
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
      <section className="py-12 sm:py-16">
        <div className="site-container">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-semibold text-navy/60">
              Showing {filteredProducts.length} Official Products
            </span>
            <div className="text-xs text-copper font-medium flex items-center gap-1">
              <span>Free Delivery on orders over ₹2,500</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-3xl bg-white border border-porcelain-300 hover:border-copper/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Product Image Container with Hover Flip */}
                <Link
                  href={`/store/${product.slug}`}
                  className="block relative aspect-[4/5] bg-porcelain-100 overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images.front}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images.back || product.images.detail}
                    alt={`${product.name} alternate view`}
                    className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-navy/90 text-porcelain text-[9px] font-heading font-black uppercase tracking-wider shadow">
                      {product.badge}
                    </span>
                  )}
                </Link>

                {/* Details & Actions */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[10px] tracking-widest text-copper font-semibold uppercase mb-1">
                      <span>{product.collection}</span>
                      <span>{product.category}</span>
                    </div>

                    <Link
                      href={`/store/${product.slug}`}
                      className="font-heading font-bold text-base text-navy hover:text-copper transition-colors line-clamp-2 leading-snug"
                    >
                      {product.name}
                    </Link>

                    {/* Available Sizes List */}
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-navy/50 font-mono">
                      <span>Sizes:</span>
                      {product.sizes.map((sz) => (
                        <span key={sz} className="px-1 bg-porcelain-100 rounded">
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-porcelain-200 flex items-center justify-between">
                    <div>
                      <span className="font-heading font-extrabold text-lg text-navy block leading-none">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-navy/40 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/store/${product.slug}`}
                        className="px-3 py-2 rounded-xl text-xs font-heading font-bold text-navy hover:text-copper transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className="p-2 sm:px-3 sm:py-2 rounded-xl bg-navy hover:bg-copper text-porcelain text-xs font-semibold transition-colors flex items-center gap-1.5 shadow"
                        title="Add to Shopping Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-copper" />
                        <span>Add</span>
                      </button>
                    </div>
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
