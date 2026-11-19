"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
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

  const freeShippingThreshold = 2500;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

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

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-porcelain flex flex-col shadow-2xl border-l border-porcelain-200">
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-porcelain-200 flex items-center justify-between bg-porcelain-50">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <ShoppingBag className="w-5 h-5 text-copper" />
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-navy tracking-tight">
                Shopping Bag ({itemsCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-porcelain-200 transition-colors text-navy/70 hover:text-navy cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-navy text-porcelain text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
                <Truck className="w-3.5 h-3.5 text-copper shrink-0" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-copper font-semibold">You qualify for FREE Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-copper">₹{amountNeededForFreeShipping.toLocaleString("en-IN")}</strong> for Free Shipping
                  </span>
                )}
              </span>
              <span className="font-bold text-copper text-[11px] sm:text-xs">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full bg-porcelain/15 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-copper h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-porcelain-200 text-copper flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-lg text-navy">Your bag is empty</h3>
                <p className="text-sm text-navy/60 mt-1.5 max-w-xs mx-auto">
                  Explore the new 2026/27 official kits, training apparel, and supporter accessories.
                </p>
                <Link
                  href="/store"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-navy hover:bg-copper text-porcelain text-sm font-semibold transition-colors shadow-sm"
                >
                  Explore Official Kits <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-2xl bg-white border border-porcelain-200 shadow-sm transition-all hover:border-copper/40"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl bg-porcelain-100 overflow-hidden shrink-0 border border-porcelain-200 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-1.5">
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-navy line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-navy/40 hover:text-red-600 transition-colors p-1 shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs text-navy/60 mt-0.5">
                        <span>Size: <strong className="text-navy">{item.size}</strong></span>
                        {item.customization && (
                          <span className="text-copper font-medium truncate">
                            • #{item.customization.number} {item.customization.name}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 sm:mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-porcelain-300 rounded-lg bg-porcelain-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 sm:p-1.5 hover:bg-porcelain-200 text-navy transition-colors rounded-l-md active:scale-95 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 sm:px-2.5 text-xs font-semibold text-navy">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 sm:p-1.5 hover:bg-porcelain-200 text-navy transition-colors rounded-r-md active:scale-95 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <div className="font-heading font-bold text-xs sm:text-sm text-navy">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-porcelain-200 bg-porcelain-50 space-y-3 sm:space-y-4">
              {/* Promo Code Input */}
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
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-porcelain-300 bg-white focus:outline-none focus:border-copper font-medium text-navy uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-navy hover:bg-copper text-porcelain text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-copper/10 border border-copper/30 text-xs">
                    <div className="flex items-center gap-1.5 text-copper font-semibold">
                      <Check className="w-4 h-4" /> Code {promoCode} applied (10% off)
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-navy/50 hover:text-red-600 transition-colors font-medium underline cursor-pointer"
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

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-navy/70 border-t border-porcelain-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-navy">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-copper font-medium">
                    <span>Discount (10%)</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-navy">
                    {shippingFee === 0 ? (
                      <span className="text-green-700 font-semibold uppercase">Free</span>
                    ) : (
                      `₹${shippingFee.toLocaleString("en-IN")}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-heading font-extrabold text-navy pt-2 border-t border-porcelain-200">
                  <span>Total</span>
                  <span className="text-copper">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg group active:scale-95"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full block text-center py-1.5 text-xs font-semibold text-navy/70 hover:text-navy underline transition-colors"
                >
                  View Full Cart & Summary
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
