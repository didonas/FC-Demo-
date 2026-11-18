"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { BookingDetails } from "@/types";
import { CheckCircle2, Calendar, MapPin, Download, Share2, Ticket, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function BookingConfirmationPage() {
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tnfc_latest_booking");
      if (saved) {
        setBooking(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const fallbackBooking = {
    bookingId: "TNFC-2026-TIX-89241",
    match: {
      homeTeam: { name: "TAMILNADU FC" },
      awayTeam: { name: "CHENNAI CITY FC" },
      competition: "Indian Super League • Coromandel Derby",
      date: "2026-11-23",
      kickoffTime: "19:30 IST",
      stadium: "The Meridian Stadium",
      city: "Chennai",
    },
    seats: [
      { id: "W12-14", stand: "West Stand", row: "W12", number: 14, category: "Premium", price: 2200 },
      { id: "W12-15", stand: "West Stand", row: "W12", number: 15, category: "Premium", price: 2200 },
    ],
    total: 4500,
    customerName: "Karthik Raman",
    customerEmail: "karthik.raman@example.com",
    customerPhone: "+91 98400 19340",
  };

  const data = booking || (fallbackBooking as any);

  const handleDownloadSimulation = () => {
    alert("Official digital pass downloaded to device (Demonstration simulation).");
  };

  const handleCalendarSimulation = () => {
    alert("Match fixture added to your calendar: Sat, 23 Nov 2026 • 19:30 IST.");
  };

  return (
    <div className="bg-[#F4F1E9] min-h-screen py-12 sm:py-20">
      <div className="site-container max-w-3xl">
        {/* Success Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-2 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-heading font-black tracking-[0.24em] text-copper uppercase block">
            Booking Confirmed
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy">
            You&apos;re Going to The Meridian!
          </h1>
          <p className="text-xs sm:text-sm text-navy/70 max-w-md mx-auto">
            Your matchday pass is issued. A confirmation receipt has been sent to{" "}
            <strong className="text-navy">{data.customerEmail}</strong>.
          </p>
        </div>

        {/* Prominent Demo Notice Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
          <span>
            <strong>DEMONSTRATION BOOKING:</strong> This ticket reservation is simulated for evaluation purposes. No real monetary transaction occurred and no actual seat reservation was submitted.
          </span>
        </div>

        {/* Perforated Official Match Pass (Digital Ticket) */}
        <div className="rounded-3xl overflow-hidden bg-white border border-porcelain-300 shadow-xl relative">
          {/* Ticket Header */}
          <div className="bg-navy p-6 sm:p-8 text-porcelain flex items-center justify-between border-b border-porcelain/15">
            <div className="flex items-center gap-3">
              <ClubCrest size={48} variant="primary" />
              <div>
                <span className="font-heading font-black tracking-widest text-lg sm:text-xl text-porcelain block">
                  TAMILNADU <span className="text-copper">FC</span>
                </span>
                <span className="text-[9px] tracking-[0.25em] font-medium text-copper uppercase">
                  Official Match Pass
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] tracking-widest uppercase font-mono text-copper block">
                Pass Reference
              </span>
              <span className="font-mono font-bold text-sm sm:text-base text-porcelain">
                {data.bookingId}
              </span>
            </div>
          </div>

          {/* Ticket Body: Match Info */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-porcelain-200 pb-6">
              <span className="text-[10px] font-heading font-black tracking-widest text-copper uppercase block mb-1">
                {data.match.competition}
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-navy">
                {data.match.homeTeam.name} vs {data.match.awayTeam.name}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-navy/70 mt-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-copper" />
                  {data.match.date} • {data.match.kickoffTime}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-copper" />
                  {data.match.stadium}, {data.match.city}
                </span>
              </div>
            </div>

            {/* Perforated Divider */}
            <div className="relative py-2">
              <div className="border-t-2 border-dashed border-porcelain-300" />
              <div className="absolute -left-10 -top-3 w-6 h-6 rounded-full bg-[#F4F1E9]" />
              <div className="absolute -right-10 -top-3 w-6 h-6 rounded-full bg-[#F4F1E9]" />
            </div>

            {/* Seats & Attendee Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-porcelain-50 p-4 rounded-2xl border border-porcelain-200 text-xs">
              <div>
                <span className="text-[10px] font-semibold text-navy/50 uppercase block">Ticket Holder</span>
                <strong className="text-navy font-bold block mt-0.5">{data.customerName}</strong>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-navy/50 uppercase block">Stand / Gate</span>
                <strong className="text-navy font-bold block mt-0.5">
                  {data.seats[0]?.stand || "West Stand"}
                </strong>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-navy/50 uppercase block">Seats</span>
                <strong className="text-copper font-bold block mt-0.5">
                  {data.seats.map((s: any) => `${s.row}-${s.number}`).join(", ")}
                </strong>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-navy/50 uppercase block">Total Price</span>
                <strong className="text-navy font-bold block mt-0.5">
                  ₹{data.total?.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            {/* Barcode & Decorative Simulated QR Code */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-semibold text-navy/50 uppercase tracking-widest block">
                  Scan at Gate Turnstile
                </span>
                {/* SVG Barcode */}
                <svg width="220" height="40" className="opacity-80">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <rect
                      key={i}
                      x={i * 4.5}
                      y="0"
                      width={i % 3 === 0 ? 3 : 1.5}
                      height="40"
                      fill="#102738"
                    />
                  ))}
                </svg>
                <span className="text-[10px] font-mono tracking-widest text-navy/60 block">
                  ENTRY CODE: 8940-2026-TNFC-01
                </span>
              </div>

              {/* Decorative QR Code */}
              <div className="w-24 h-24 rounded-2xl bg-white p-2 border-2 border-navy/20 flex items-center justify-center shadow-inner">
                <svg viewBox="0 0 100 100" className="w-full h-full text-navy fill-current">
                  <path d="M10 10 H40 V40 H10 Z M20 20 V30 H30 V20 Z M60 10 H90 V40 H60 Z M70 20 V30 H80 V20 Z M10 60 H40 V90 H10 Z M20 70 V80 H30 V70 Z M50 10 H55 V25 H50 Z M60 50 H75 V55 H60 Z M80 60 H90 V70 H80 Z M60 80 H70 V90 H60 Z M80 80 H90 V90 H80 Z M50 60 H55 V90 H50 Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleDownloadSimulation}
            className="px-6 py-3.5 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-md"
          >
            <Download className="w-4 h-4 text-copper" />
            <span>Download Digital Pass</span>
          </button>

          <button
            onClick={handleCalendarSimulation}
            className="px-6 py-3.5 rounded-full bg-white hover:bg-porcelain-100 text-navy font-heading font-bold text-xs uppercase tracking-wider transition-colors border border-porcelain-300 flex items-center gap-2 shadow-sm"
          >
            <Calendar className="w-4 h-4 text-copper" />
            <span>Add to Calendar</span>
          </button>

          <Link
            href="/store"
            className="px-6 py-3.5 rounded-full bg-porcelain-200 hover:bg-porcelain-300 text-navy font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <span>Shop Matchday Scarf</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
