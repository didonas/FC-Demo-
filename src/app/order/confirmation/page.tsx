"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { CheckCircle2, Package, Truck, MapPin, ArrowRight, Download, Info } from "lucide-react";

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tnfc_latest_order");
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const fallbackOrder = {
    orderId: "TNFC-ORD-882194",
    total: 4499,
    customer: {
      fullName: "Vignesh Natarajan",
      email: "vignesh.natarajan@example.com",
      address: "42 Marina Coast Avenue, Besant Nagar",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600090",
    },
    items: [
      {
        id: "1",
        name: "2026/27 Official Home Jersey — The Heritage",
        size: "M",
        price: 4499,
        quantity: 1,
      },
    ],
  };

  const data = order || fallbackOrder;

  return (
    <div className="bg-[#F4F1E9] min-h-screen py-12 sm:py-20">
      <div className="site-container max-w-3xl">
        {/* Success Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-2 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-heading font-black tracking-[0.24em] text-copper uppercase block">
            Payment & Order Confirmed
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy">
            Thank You for Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-navy/70 max-w-md mx-auto">
            Order Reference: <strong className="text-navy">{data.orderId}</strong>. A receipt and tracking link have been dispatched to {data.customer.email}.
          </p>
        </div>

        {/* Demo Notice */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 flex items-center gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0" />
          <span>
            <strong>DEMONSTRATION ORDER:</strong> This transaction was completely simulated. No funds have been deducted from any account.
          </span>
        </div>

        {/* Order Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-xl space-y-6">
          {/* Tracking Status Timeline */}
          <div className="border-b border-porcelain-200 pb-6">
            <span className="text-[10px] font-heading font-bold text-copper uppercase tracking-widest block mb-4">
              Estimated Delivery: 2-4 Business Days
            </span>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="space-y-1">
                <span className="w-8 h-8 rounded-full bg-navy text-porcelain flex items-center justify-center mx-auto text-xs font-bold">
                  ✓
                </span>
                <strong className="text-navy block">Order Placed</strong>
                <span className="text-[10px] text-navy/50">Today</span>
              </div>
              <div className="space-y-1">
                <span className="w-8 h-8 rounded-full bg-copper text-porcelain flex items-center justify-center mx-auto text-xs font-bold">
                  <Package className="w-4 h-4" />
                </span>
                <strong className="text-navy block">Packaging</strong>
                <span className="text-[10px] text-navy/50">Marina Center</span>
              </div>
              <div className="space-y-1">
                <span className="w-8 h-8 rounded-full bg-porcelain-200 text-navy/40 flex items-center justify-center mx-auto text-xs font-bold">
                  <Truck className="w-4 h-4" />
                </span>
                <strong className="text-navy/50 block">Out for Delivery</strong>
                <span className="text-[10px] text-navy/50">Pending</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="border-b border-porcelain-200 pb-6">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-navy mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-copper" /> Shipping To:
            </h3>
            <p className="text-xs text-navy/80 leading-relaxed">
              <strong>{data.customer.fullName}</strong><br />
              {data.customer.address}, {data.customer.city}, {data.customer.state} - {data.customer.pincode}
            </p>
          </div>

          {/* Items Recap */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-navy">
              Items Purchased
            </h3>
            <div className="divide-y divide-porcelain-200 text-xs">
              {data.items?.map((item: any) => (
                <div key={item.id} className="py-2.5 flex justify-between">
                  <div>
                    <strong className="text-navy">{item.name}</strong>
                    <span className="text-navy/60 block">Size: {item.size} • Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-navy">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-porcelain-200 flex justify-between font-heading font-black text-base text-navy">
              <span>Total Paid (Simulated)</span>
              <span className="text-copper">₹{data.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/store"
            className="px-6 py-3.5 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-md"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => alert("Simulated Receipt PDF generated.")}
            className="px-6 py-3.5 rounded-full bg-white hover:bg-porcelain-100 text-navy font-heading font-bold text-xs uppercase tracking-wider transition-colors border border-porcelain-300 flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4 text-copper" />
            <span>Download Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
