"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    itemsCount,
  } = useCart();

  const freeShippingThreshold = 2500;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen sm:max-w-md bg-porcelain flex flex-col shadow-2xl border-l border-porcelain-200">
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-porcelain-200 flex items-center justify-between bg-porcelain-50">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-copper" />
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-navy tracking-tight">
                Shopping Bag ({itemsCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="w-9 h-9 rounded-full hover:bg-porcelain-200 active:scale-95 transition-all text-navy/70 hover:text-navy flex items-center justify-center"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-4 sm:px-6 py-3 bg-navy text-porcelain text-xs">
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
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-porcelain-200 text-copper flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-lg text-navy">Your bag is empty</h3>
                <p className="text-xs sm:text-sm text-navy/60 mt-1.5 max-w-xs mx-auto">
                  Explore the 2026/27 official kits, training apparel, and supporter accessories.
                </p>
                <Link
                  href="/store"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-navy hover:bg-copper text-porcelain text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Explore Official Kits <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-white border border-porcelain-200 shadow-sm transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-22 sm:w-20 sm:h-24 rounded-xl bg-porcelain-100 overflow-hidden shrink-0 border border-porcelain-200 flex items-center justify-center">
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
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-navy line-clamp-1 leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-navy/40 hover:text-red-600 transition-colors p-1"
                          aria-label={`Remove ${item.name} from bag`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase font-bold text-copper px-2 py-0.5 rounded bg-copper/10">
                          Size {item.size}
                        </span>
                        {item.customization && (
                          <span className="text-[10px] text-navy/70 font-mono">
                            #{item.customization.number} {item.customization.name}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-porcelain-100">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-porcelain-300 rounded-lg overflow-hidden bg-porcelain-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-navy hover:bg-porcelain-200 active:scale-95"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-bold text-xs text-navy">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-navy hover:bg-porcelain-200 active:scale-95"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <strong className="font-heading font-extrabold text-xs sm:text-sm text-navy">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-porcelain-200 space-y-3.5 shadow-lg safe-area-pb">
              <div className="flex items-center justify-between text-sm">
                <span className="font-heading font-bold uppercase tracking-wider text-navy/70 text-xs">
                  Subtotal
                </span>
                <span className="font-heading font-black text-lg text-navy">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="py-3 px-4 rounded-full border border-navy text-navy font-heading font-bold text-xs uppercase tracking-wider text-center hover:bg-porcelain-100 transition-colors"
                >
                  View Bag
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="py-3 px-4 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
