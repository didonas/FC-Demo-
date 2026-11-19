"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, ArrowRight, ShieldCheck, Truck, CreditCard, Smartphone, Building, Info, CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discountAmount, shippingFee, total, clearCart } = useCart();

  // Form states
  const [fullName, setFullName] = useState("Vignesh Natarajan");
  const [email, setEmail] = useState("vignesh.natarajan@example.com");
  const [phone, setPhone] = useState("+91 94440 28419");
  const [address, setAddress] = useState("42 Marina Coast Avenue, Besant Nagar");
  const [city, setCity] = useState("Chennai");
  const [state, setState] = useState("Tamil Nadu");
  const [pincode, setPincode] = useState("600090");

  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryCost = deliveryMethod === "express" ? 199 : shippingFee;
  const grandTotal = total + (deliveryMethod === "express" ? 199 : 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Your cart is empty. Add items from the store first.");
      router.push("/store");
      return;
    }

    setIsProcessing(true);

    const orderId = `TNFC-ORD-${Date.now().toString().slice(-6)}`;
    const orderData = {
      orderId,
      items,
      total: grandTotal,
      customer: { fullName, email, phone, address, city, state, pincode },
      deliveryMethod,
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("tnfc_latest_order", JSON.stringify(orderData));
    } catch {
      // LocalStorage error fallback
    }

    setTimeout(() => {
      clearCart();
      router.push(`/order/confirmation?id=${orderId}`);
    }, 800);
  };

  return (
    <div className="bg-[#F4F1E9] min-h-screen py-10 sm:py-16">
      <div className="site-container max-w-5xl">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy/70 hover:text-copper transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
        </div>

        <div className="mb-8">
          <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block mb-1">
            Secure Storefront
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy">
            Checkout Demonstration
          </h1>
        </div>

        {/* Demo Warning Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 flex items-center gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0" />
          <span>
            <strong>DEMONSTRATION CHECKOUT:</strong> No real payment is required or processed. All details submitted here are for realistic UI evaluation and simulated receipt generation.
          </span>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Shipping & Payment Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Customer Contact */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-4">
                <h3 className="font-heading font-extrabold text-base text-navy">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-navy/60 uppercase block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-navy/60 uppercase block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-navy/60 uppercase block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-4">
                <h3 className="font-heading font-extrabold text-base text-navy">
                  2. Shipping Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-navy/60 uppercase block mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-navy/60 uppercase block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-navy/60 uppercase block mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-navy/60 uppercase block mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Delivery Method */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-4">
                <h3 className="font-heading font-extrabold text-base text-navy">
                  3. Delivery Speed
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    onClick={() => setDeliveryMethod("standard")}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      deliveryMethod === "standard"
                        ? "border-copper bg-copper/5 shadow-sm"
                        : "border-porcelain-300 bg-white"
                    }`}
                  >
                    <div>
                      <strong className="font-heading font-bold text-xs text-navy block">
                        Standard Shipping (3-5 Days)
                      </strong>
                      <span className="text-[11px] text-navy/60">Across Tamil Nadu & India</span>
                    </div>
                    <span className="font-bold text-xs text-green-700 uppercase">
                      {shippingFee === 0 ? "Free" : `₹${shippingFee}`}
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryMethod("express")}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      deliveryMethod === "express"
                        ? "border-copper bg-copper/5 shadow-sm"
                        : "border-porcelain-300 bg-white"
                    }`}
                  >
                    <div>
                      <strong className="font-heading font-bold text-xs text-navy block">
                        Express Matchday (24h)
                      </strong>
                      <span className="text-[11px] text-navy/60">Priority dispatch</span>
                    </div>
                    <span className="font-bold text-xs text-navy">₹199</span>
                  </label>
                </div>
              </div>

              {/* 4. Demo Payment Selection */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-4">
                <h3 className="font-heading font-extrabold text-base text-navy">
                  4. Demonstration Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "upi", label: "Instant UPI", icon: Smartphone },
                    { id: "card", label: "Credit Card", icon: CreditCard },
                    { id: "netbanking", label: "NetBanking", icon: Building },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        paymentMethod === method.id
                          ? "border-copper bg-copper/5 text-navy font-bold shadow-sm"
                          : "border-porcelain-300 bg-white text-navy/70 hover:border-navy/40"
                      }`}
                    >
                      <method.icon className="w-5 h-5 text-copper" />
                      <span className="text-xs">{method.label}</span>
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-porcelain-50 rounded-xl border border-porcelain-200 text-xs text-navy/70">
                  <span className="text-copper font-bold block mb-0.5">Demo Mode Active:</span>
                  Clicking Complete Order will simulate successful payment and redirect to order confirmation with dispatch tracking.
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-5">
                <h3 className="font-heading font-extrabold text-lg text-navy">
                  Order Items ({items.length})
                </h3>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {items.map((it) => (
                    <div key={it.id} className="flex gap-3 text-xs pb-3 border-b border-porcelain-200">
                      <div className="w-12 h-14 rounded-lg bg-porcelain-100 overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <strong className="font-heading font-bold text-navy line-clamp-1 block">
                          {it.name}
                        </strong>
                        <span className="text-navy/60 block mt-0.5">
                          Size: {it.size} • Qty: {it.quantity}
                        </span>
                        {it.customization && (
                          <span className="text-copper font-medium block">
                            #{it.customization.number} {it.customization.name}
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-navy">
                        ₹{(it.price * it.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="space-y-2 text-xs text-navy/70 pt-2 border-t border-porcelain-200">
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
                    <span>Shipping</span>
                    <span className="font-bold text-navy">
                      {deliveryCost === 0 ? "FREE" : `₹${deliveryCost.toLocaleString("en-IN")}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-heading font-black text-navy pt-3 border-t border-porcelain-200">
                    <span>Total Amount</span>
                    <span className="text-copper">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group cursor-pointer"
                  >
                    <span>{isProcessing ? "Processing Demo Order..." : "Complete Order"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
