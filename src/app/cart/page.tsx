"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    promoCode,
    applyPromoCode,
    removePromoCode,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    itemsCount,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess(false);

    if (!couponInput.trim()) return;

    const applied = applyPromoCode(couponInput);
    if (applied) {
      setCouponSuccess(true);
      setCouponInput("");
    } else {
      setCouponError("Invalid promo code. Try 'ONEPASSION' for 10% off.");
    }
  };

  return (
    <div className="bg-[#F4F1E9] min-h-screen py-10 sm:py-16">
      <div className="site-container max-w-5xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/store"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy/70 hover:text-copper transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        <div className="mb-8">
          <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block mb-1">
            Official Club Store
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy">
            Your Shopping Bag ({itemsCount})
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-3xl bg-white border border-porcelain-300 text-center shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-porcelain-100 text-copper flex items-center justify-center mx-auto mb-2">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-heading font-extrabold text-xl text-navy">
              Your bag is currently empty
            </h2>
            <p className="text-xs sm:text-sm text-navy/60 max-w-sm mx-auto leading-relaxed">
              Explore the 2026/27 official kits, tech training gear, and supporter accessories.
            </p>
            <div className="pt-4">
              <Link
                href="/store"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Browse Collections</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Items Table / List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl bg-white border border-porcelain-300 shadow-sm flex gap-5 items-center justify-between"
                >
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl bg-porcelain-100 overflow-hidden shrink-0 border border-porcelain-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-sm sm:text-base text-navy line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="text-xs text-navy/60 mt-1 space-x-2">
                      <span>Size: <strong className="text-navy">{item.size}</strong></span>
                      {item.customization && (
                        <span className="text-copper font-semibold">
                          • #{item.customization.number} {item.customization.name}
                        </span>
                      )}
                    </div>
                    <span className="font-heading font-extrabold text-sm text-navy block mt-2">
                      ₹{item.price.toLocaleString("en-IN")} each
                    </span>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end justify-between self-stretch">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-navy/40 hover:text-red-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-porcelain-300 rounded-lg bg-porcelain-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-xs text-navy hover:bg-porcelain-200 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-navy">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-xs text-navy hover:bg-porcelain-200 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-heading font-black text-sm text-navy">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Coupon (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-5">
                <h3 className="font-heading font-extrabold text-lg text-navy">
                  Order Summary
                </h3>

                {/* Promo Code Form */}
                <div>
                  {!promoCode ? (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
                        <input
                          type="text"
                          placeholder="Promo code (e.g. ONEPASSION)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy uppercase"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-navy hover:bg-copper text-porcelain text-xs font-semibold transition-colors shrink-0"
                      >
                        Apply
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-copper/10 border border-copper/30 text-xs">
                      <div className="flex items-center gap-1.5 text-copper font-semibold">
                        <Check className="w-4 h-4" /> Code {promoCode} applied (10% off)
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-navy/50 hover:text-red-600 transition-colors font-medium underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{couponError}</p>
                  )}
                  {couponSuccess && (
                    <p className="text-[11px] text-green-700 mt-1 font-medium">Promo code activated!</p>
                  )}
                </div>

                {/* Subtotal & Breakdown */}
                <div className="space-y-2.5 text-xs text-navy/70 pt-4 border-t border-porcelain-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-navy">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-copper font-semibold">
                      <span>Discount (10%)</span>
                      <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-bold text-navy">
                      {shippingFee === 0 ? (
                        <span className="text-green-700 uppercase font-black">Free</span>
                      ) : (
                        `₹${shippingFee.toLocaleString("en-IN")}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-heading font-black text-navy pt-3 border-t border-porcelain-200">
                    <span>Total</span>
                    <span className="text-copper">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="pt-2">
                  <Link
                    href="/checkout"
                    className="w-full py-4 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
