"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { productsData } from "@/data/productsData";
import { useCart } from "@/context/CartContext";
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  X,
  Info,
} from "lucide-react";
import { ProductImagePlaceholder } from "@/components/store/ProductImagePlaceholder";

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
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

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
  ].filter((img) => Boolean(img.url));

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
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
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
    <div className="bg-[#F4F1E9] min-h-screen pb-24 md:pb-0">
      {/* Top Breadcrumb */}
      <div className="site-container py-3.5 border-b border-porcelain-300">
        <Link
          href="/store"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy/70 hover:text-copper transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Official Store
        </Link>
      </div>

      {/* Main Product Showcase Section */}
      <section className="py-6 sm:py-16">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            {/* Left: Multi-Angle Image Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
              {/* Main Image Display with Live Customizer Overlay */}
              <div className="rounded-3xl overflow-hidden bg-white border border-porcelain-300 shadow-md aspect-[4/5] relative flex items-center justify-center">
                {activeImage ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={activeImage}
                    alt={product.name}
                    className={`w-full h-full ${
                      product.imageFit === "contain"
                        ? "object-contain p-4 sm:p-6"
                        : "object-cover object-center"
                    } transition-all duration-300`}
                  />
                ) : (
                  <ProductImagePlaceholder productName={product.name} size="lg" />
                )}

                {/* Live Customizer Preview Overlay */}
                {isCustomized && (activeImageKey === "back" || activeImageKey === "front") && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-navy select-none pt-8">
                    <span className="font-heading font-black text-5xl sm:text-7xl lg:text-8xl tracking-widest text-navy/90 drop-shadow-md">
                      {customNumber || "10"}
                    </span>
                    <span className="font-heading font-extrabold text-base sm:text-2xl tracking-[0.25em] text-navy/90 uppercase drop-shadow mt-1">
                      {customName || "PLAYER"}
                    </span>
                  </div>
                )}

                {product.badge && (
                  <span className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3 py-1 rounded-full bg-navy/90 text-porcelain text-[9px] sm:text-[10px] font-heading font-black uppercase tracking-wider shadow z-10">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Gallery Thumbnail Selector with touch-friendly buttons */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {galleryImages.map((img) => (
                    <button
                      key={img.key}
                      onClick={() => setActiveImageKey(img.key)}
                      className={`rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] border-2 transition-all bg-white active:scale-95 ${
                        activeImageKey === img.key
                          ? "border-copper shadow-md ring-2 ring-copper/30"
                          : "border-porcelain-300 hover:border-navy/40 opacity-70 hover:opacity-100"
                      }`}
                      aria-label={img.label}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={img.label}
                        className={`w-full h-full ${
                          product.imageFit === "contain" ? "object-contain p-1" : "object-cover"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Buy Panel & Specs (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Product Header */}
              <div className="space-y-2 border-b border-porcelain-200 pb-5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-navy text-porcelain text-[9px] font-heading font-bold uppercase tracking-wider">
                    {product.category}
                  </span>
                  <span className="text-xs font-semibold text-copper">
                    {product.collection}
                  </span>
                </div>

                <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-navy tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Pricing display */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="font-heading font-black text-2xl sm:text-3xl text-navy">
                    ₹{unitPrice.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm sm:text-base text-navy/40 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                  {isCustomized && (
                    <span className="text-xs font-semibold text-copper bg-copper/15 px-2 py-0.5 rounded-full">
                      +₹{customizationFee} Name & Number
                    </span>
                  )}
                </div>
              </div>

              {/* Size Selector with clear touch targets */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading font-bold uppercase tracking-wider text-navy">
                    Select Size: <strong className="text-copper">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-copper hover:underline font-semibold flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" /> Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center active:scale-95 ${
                        selectedSize === size
                          ? "bg-navy text-porcelain shadow-md ring-2 ring-copper"
                          : "bg-white border border-porcelain-300 text-navy hover:border-copper"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Official Customizer Toggle (Jerseys & Kits only) */}
              {(product.category === "Match Kits" || product.category === "Kits") && (
                <div className="p-4 rounded-2xl bg-white border border-porcelain-300 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-copper" />
                      <span className="font-heading font-bold text-xs uppercase tracking-wider text-navy">
                        Official Player Print
                      </span>
                    </div>
                    <button
                      onClick={() => setIsCustomized(!isCustomized)}
                      className={`px-3 py-1 rounded-full text-xs font-heading font-bold uppercase transition-all ${
                        isCustomized
                          ? "bg-copper text-navy shadow-sm"
                          : "bg-porcelain-200 text-navy/70 hover:bg-porcelain-300"
                      }`}
                    >
                      {isCustomized ? "Applied (+₹499)" : "Add (+₹499)"}
                    </button>
                  </div>

                  {isCustomized && (
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-porcelain-200 animate-fadeIn">
                      <div>
                        <label className="text-[10px] font-heading font-bold uppercase text-navy/60 block mb-1">
                          Name (Max 12)
                        </label>
                        <input
                          type="text"
                          maxLength={12}
                          value={customName}
                          onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                          className="w-full px-3 py-2 rounded-xl bg-porcelain-50 border border-porcelain-300 text-navy font-heading font-bold text-xs uppercase tracking-widest focus:outline-none focus:border-copper"
                          placeholder="VARADHAN"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-heading font-bold uppercase text-navy/60 block mb-1">
                          Number (1-99)
                        </label>
                        <input
                          type="text"
                          maxLength={2}
                          value={customNumber}
                          onChange={(e) => setCustomNumber(e.target.value.replace(/\D/g, ""))}
                          className="w-full px-3 py-2 rounded-xl bg-porcelain-50 border border-porcelain-300 text-navy font-heading font-black text-xs text-center focus:outline-none focus:border-copper"
                          placeholder="10"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity & Desktop Add to Cart Button */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-porcelain-300 rounded-xl bg-white overflow-hidden shrink-0">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-11 flex items-center justify-center text-navy font-bold hover:bg-porcelain-100 active:scale-95"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-heading font-bold text-xs text-navy">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="w-10 h-11 flex items-center justify-center text-navy font-bold hover:bg-porcelain-100 active:scale-95"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Desktop Primary Add to Bag Action */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98"
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4 text-copper" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-copper" />
                        <span>Add to Bag • ₹{(unitPrice * quantity).toLocaleString("en-IN")}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Product Specifications & Editorial Description */}
              <div className="pt-4 border-t border-porcelain-200 space-y-3">
                <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-navy">
                  Description & Craftsmanship
                </h3>
                <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-navy/70">
                  <div className="p-2.5 rounded-xl bg-white border border-porcelain-200">
                    <span className="text-navy/50 block text-[9px] uppercase font-bold">Fabric</span>
                    <strong className="text-navy font-semibold">{product.details?.material || "100% Recycled Poly-Mesh"}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-porcelain-200">
                    <span className="text-navy/50 block text-[9px] uppercase font-bold">Origin</span>
                    <strong className="text-navy font-semibold">{product.details?.madeIn || "Tamil Nadu, India"}</strong>
                  </div>
                </div>
              </div>

              {/* Value Props Strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-navy/70 border-t border-porcelain-200">
                <div className="flex flex-col items-center p-2 rounded-xl bg-porcelain-50">
                  <ShieldCheck className="w-4 h-4 text-copper mb-1" />
                  <span>100% Official Club Gear</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-porcelain-50">
                  <Truck className="w-4 h-4 text-copper mb-1" />
                  <span>Free Shipping over ₹2,500</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-porcelain-50">
                  <RotateCcw className="w-4 h-4 text-copper mb-1" />
                  <span>14-Day Free Exchange</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STICKY ADD-TO-BAG BOTTOM BAR (< 768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-porcelain-300 p-3 shadow-2xl safe-area-pb">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-navy/60 font-semibold truncate">
              {product.name} ({selectedSize})
            </span>
            <span className="font-heading font-black text-lg text-navy leading-none mt-0.5">
              ₹{(unitPrice * quantity).toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 max-w-[200px] py-3 px-5 rounded-full bg-navy active:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 text-copper" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-copper" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-porcelain-200 pb-3">
              <h3 className="font-heading font-bold text-base text-navy">
                Official Kit Size Guide (Chest Inches)
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1 rounded-full hover:bg-porcelain-100 text-navy"
                aria-label="Close size guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-porcelain-50 border-b border-porcelain-200 text-navy/60 font-bold">
                    <th className="p-2">Size</th>
                    <th className="p-2">Chest (Inches)</th>
                    <th className="p-2">Length (Inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-porcelain-200">
                  <tr><td className="p-2 font-bold">XS</td><td className="p-2">34 - 36</td><td className="p-2">26.5</td></tr>
                  <tr><td className="p-2 font-bold">S</td><td className="p-2">36 - 38</td><td className="p-2">27.5</td></tr>
                  <tr><td className="p-2 font-bold">M</td><td className="p-2">38 - 40</td><td className="p-2">28.5</td></tr>
                  <tr><td className="p-2 font-bold">L</td><td className="p-2">40 - 42</td><td className="p-2">29.5</td></tr>
                  <tr><td className="p-2 font-bold">XL</td><td className="p-2">42 - 44</td><td className="p-2">30.5</td></tr>
                  <tr><td className="p-2 font-bold">2XL</td><td className="p-2">44 - 46</td><td className="p-2">31.5</td></tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-2.5 rounded-full bg-navy text-porcelain text-xs font-heading font-bold uppercase"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
