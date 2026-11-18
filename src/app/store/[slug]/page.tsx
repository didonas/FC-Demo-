"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { productsData } from "@/data/productsData";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, ArrowRight, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw, Sparkles, X, Info } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const { addItem } = useCart();

  const [activeImageKey, setActiveImageKey] = useState<"front" | "back" | "detail" | "lifestyle">("front");
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  // Customization state (Name & Number printing)
  const [isCustomized, setIsCustomized] = useState(false);
  const [customName, setCustomName] = useState("VARADHAN");
  const [customNumber, setCustomNumber] = useState("10");

  const customizationFee = 499;
  const unitPrice = isCustomized ? product.price + customizationFee : product.price;

  const galleryImages = [
    { key: "front" as const, label: "Front View", url: product.images.front },
    { key: "back" as const, label: "Back View", url: product.images.back },
    { key: "detail" as const, label: "Craft Detail", url: product.images.detail },
    ...(product.images.lifestyle
      ? [{ key: "lifestyle" as const, label: "Lifestyle View", url: product.images.lifestyle }]
      : []),
  ];

  const activeImage =
    galleryImages.find((img) => img.key === activeImageKey)?.url || product.images.front;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: unitPrice,
      size: selectedSize,
      quantity,
      image: product.images.front,
      customization: isCustomized
        ? { name: customName.toUpperCase(), number: customNumber }
        : undefined,
    });
  };

  const relatedProducts = productsData
    .filter(
      (p) =>
        p.id !== product.id &&
        p.category === product.category &&
        p.isPublished !== false &&
        p.status !== "draft"
    )
    .slice(0, 3);

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Top Breadcrumb */}
      <div className="site-container py-4 border-b border-porcelain-300">
        <Link
          href="/store"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy/70 hover:text-copper transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Official Store
        </Link>
      </div>

      {/* Main Product Showcase Section */}
      <section className="py-10 sm:py-16">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left: Multi-Angle Image Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Image Display with Optional Live Customizer Overlay */}
              <div className="rounded-3xl overflow-hidden bg-white border border-porcelain-300 shadow-md aspect-[4/5] relative flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Live Customizer Preview Overlay (when Back view is active or user customized) */}
                {isCustomized && (activeImageKey === "back" || activeImageKey === "front") && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-navy select-none pt-8">
                    <span className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl tracking-widest text-navy/90 drop-shadow-md">
                      {customNumber || "10"}
                    </span>
                    <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-[0.25em] text-navy/90 uppercase drop-shadow mt-1">
                      {customName || "PLAYER"}
                    </span>
                  </div>
                )}

                {product.badge && (
                  <span className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-navy/90 text-porcelain text-[10px] font-heading font-black uppercase tracking-wider shadow">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Gallery Thumbnail Selector */}
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((img) => (
                  <button
                    key={img.key}
                    onClick={() => setActiveImageKey(img.key)}
                    className={`rounded-2xl overflow-hidden aspect-[4/3] border-2 transition-all bg-white ${
                      activeImageKey === img.key
                        ? "border-copper shadow-md ring-2 ring-copper/30"
                        : "border-porcelain-300 hover:border-navy/40 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Details, Customizer & Add to Bag (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Category & Collection */}
              <div>
                <div className="flex items-center gap-2 text-xs font-heading font-black tracking-widest text-copper uppercase mb-2">
                  <span>{product.collection}</span>
                  <span>•</span>
                  <span>{product.category}</span>
                </div>

                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-navy leading-tight">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-heading font-black text-3xl text-navy">
                    ₹{unitPrice.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && !isCustomized && (
                    <span className="text-sm text-navy/40 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                  <span className="text-xs text-green-700 font-semibold bg-green-100 px-2.5 py-0.5 rounded-full">
                    Official Authenticated Matchwear
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-navy/75 leading-relaxed border-t border-porcelain-200 pt-4">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="space-y-2 pt-2 border-t border-porcelain-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading font-bold text-navy uppercase tracking-wider">
                    Select Size: <strong className="text-copper">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-copper font-medium hover:underline flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" /> Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-11 rounded-xl text-xs font-heading font-bold transition-all ${
                        selectedSize === sz
                          ? "bg-navy text-porcelain ring-2 ring-copper shadow-sm"
                          : "bg-white hover:bg-porcelain-200 text-navy border border-porcelain-300"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Name & Number Printing (For Kits) */}
              {product.customizable && (
                <div className="p-4 rounded-2xl bg-white border border-porcelain-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-heading font-bold text-navy">
                      <input
                        type="checkbox"
                        checked={isCustomized}
                        onChange={(e) => {
                          setIsCustomized(e.target.checked);
                          if (e.target.checked) setActiveImageKey("back");
                        }}
                        className="w-4 h-4 rounded text-copper focus:ring-copper"
                      />
                      <span>Add Official Name & Number (+₹{customizationFee})</span>
                    </label>
                    <span className="text-[10px] font-bold text-copper uppercase">
                      Player Specification
                    </span>
                  </div>

                  {isCustomized && (
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-porcelain-200">
                      <div>
                        <label className="text-[10px] font-bold text-navy/60 uppercase block mb-1">
                          Shirt Name
                        </label>
                        <input
                          type="text"
                          maxLength={12}
                          value={customName}
                          onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                          placeholder="e.g. VARADHAN"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 font-heading font-bold text-navy uppercase focus:outline-none focus:border-copper"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-navy/60 uppercase block mb-1">
                          Shirt Number
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={99}
                          value={customNumber}
                          onChange={(e) => setCustomNumber(e.target.value)}
                          placeholder="10"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 font-heading font-bold text-navy focus:outline-none focus:border-copper"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity & Add to Bag CTA */}
              <div className="pt-2 space-y-3">
                <div className="flex gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-porcelain-300 rounded-full bg-white px-3 py-2">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-navy hover:text-copper px-2 text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-heading font-bold text-navy">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-navy hover:text-copper px-2 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 px-6 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-copper" />
                    <span>Add to Bag • ₹{(unitPrice * quantity).toLocaleString("en-IN")}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Quality & Delivery Assurance Pills */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-porcelain-200 text-center text-[10px] text-navy/70">
                <div className="p-3 rounded-2xl bg-white border border-porcelain-200">
                  <Truck className="w-4 h-4 text-copper mx-auto mb-1" />
                  <span>Free Shipping on ₹2,500+</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-porcelain-200">
                  <ShieldCheck className="w-4 h-4 text-copper mx-auto mb-1" />
                  <span>Official Authenticated</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-porcelain-200">
                  <RotateCcw className="w-4 h-4 text-copper mx-auto mb-1" />
                  <span>14-Day Free Exchange</span>
                </div>
              </div>

              {/* Product Specifications List */}
              <div className="p-5 rounded-2xl bg-white border border-porcelain-300 space-y-2">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-navy">
                  Technical Specifications & Fabric
                </h4>
                <ul className="space-y-1.5 text-xs text-navy/75 pt-1">
                  {product.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-copper shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-porcelain rounded-3xl p-6 sm:p-8 shadow-2xl border border-porcelain-300 space-y-4">
            <div className="flex items-center justify-between border-b border-porcelain-200 pb-3">
              <h3 className="font-heading font-extrabold text-lg text-navy">
                Official Kit Size Guide
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1 rounded-full hover:bg-porcelain-200 text-navy/60 hover:text-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-navy/70">
              Measurements in centimeters. For an athletic slim fit, select your true size. For a relaxed supporter fit, consider ordering one size up.
            </p>

            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-porcelain-200 text-navy font-heading font-bold">
                  <th className="p-2.5">Size</th>
                  <th className="p-2.5">Chest (cm)</th>
                  <th className="p-2.5">Waist (cm)</th>
                  <th className="p-2.5">Length (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-porcelain-200 font-medium">
                <tr><td className="p-2.5 font-bold">XS</td><td className="p-2.5">86 - 91</td><td className="p-2.5">71 - 76</td><td className="p-2.5">69</td></tr>
                <tr><td className="p-2.5 font-bold">S</td><td className="p-2.5">91 - 96</td><td className="p-2.5">76 - 81</td><td className="p-2.5">71</td></tr>
                <tr><td className="p-2.5 font-bold">M</td><td className="p-2.5">96 - 102</td><td className="p-2.5">81 - 86</td><td className="p-2.5">73</td></tr>
                <tr><td className="p-2.5 font-bold">L</td><td className="p-2.5">102 - 108</td><td className="p-2.5">86 - 92</td><td className="p-2.5">75</td></tr>
                <tr><td className="p-2.5 font-bold">XL</td><td className="p-2.5">108 - 116</td><td className="p-2.5">92 - 100</td><td className="p-2.5">77</td></tr>
                <tr><td className="p-2.5 font-bold">2XL</td><td className="p-2.5">116 - 124</td><td className="p-2.5">100 - 108</td><td className="p-2.5">79</td></tr>
              </tbody>
            </table>

            <div className="pt-2 text-right">
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="px-5 py-2 rounded-full bg-navy text-porcelain text-xs font-semibold"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 sm:py-16 border-t border-porcelain-200">
          <div className="site-container">
            <h3 className="font-heading font-extrabold text-xl text-navy mb-6">
              Complete the Matchday Look
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/store/${rel.slug}`}
                  className="group p-4 rounded-2xl bg-white border border-porcelain-300 hover:border-copper/40 shadow-sm transition-all flex items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-xl bg-porcelain-100 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.images.front}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-copper font-semibold block">
                      {rel.category}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-navy group-hover:text-copper transition-colors truncate mt-0.5">
                      {rel.name}
                    </h4>
                    <span className="font-heading font-bold text-xs text-navy block mt-1">
                      ₹{rel.price.toLocaleString("en-IN")}
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
