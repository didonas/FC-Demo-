"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { matchesData } from "@/data/matchesData";
import { Seat, TicketCategory } from "@/types";
import { ArrowLeft, ArrowRight, Check, Shield, Ticket, User, Mail, Phone, Info } from "lucide-react";

export default function StadiumSeatingPage() {
  const router = useRouter();
  const params = useParams();
  const matchId = (params?.matchId as string) || "match-01";

  const match = matchesData.find((m) => m.id === matchId) || matchesData[0];

  // Active Stand & Category Filter
  const [selectedStand, setSelectedStand] = useState<"North Stand" | "South Stand" | "East Stand" | "West Stand">("West Stand");
  const [selectedCategory, setSelectedCategory] = useState<TicketCategory>("Premium");

  // Selected seats state
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>(["W-12-14", "W-12-15"]);

  // Customer form state
  const [customerName, setCustomerName] = useState("Karthik Raman");
  const [customerEmail, setCustomerEmail] = useState("karthik.raman@example.com");
  const [customerPhone, setCustomerPhone] = useState("+91 98400 19340");
  const [membershipId, setMembershipId] = useState("TNFC-M-90214");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate a realistic grid of seats for each stand
  const seatsForActiveStand: Seat[] = useMemo(() => {
    const standsMeta = {
      "North Stand": { rows: ["N1", "N2", "N3", "N4"], seatsPerRow: 10, category: "General" as TicketCategory, price: 800 },
      "South Stand": { rows: ["S1", "S2", "S3", "S4"], seatsPerRow: 10, category: "General" as TicketCategory, price: 800 },
      "East Stand": { rows: ["E1", "E2", "E3", "E4"], seatsPerRow: 10, category: "Premium" as TicketCategory, price: 2200 },
      "West Stand": { rows: ["W10", "W11", "W12", "W14"], seatsPerRow: 10, category: "Premium" as TicketCategory, price: 2200 },
    };

    const currentMeta = standsMeta[selectedStand];
    const generated: Seat[] = [];

    // Pre-determined occupied seeds
    const occupiedHash = (row: string, num: number) => (row.charCodeAt(0) * 7 + num * 13) % 4 === 0;

    currentMeta.rows.forEach((row) => {
      for (let num = 1; num <= currentMeta.seatsPerRow; num++) {
        const id = `${row}-${num}`;
        const isOccupied = occupiedHash(row, num);
        const isSelected = selectedSeatIds.includes(id);

        generated.push({
          id,
          stand: selectedStand,
          tier: selectedStand === "West Stand" ? "Club" : "Lower",
          row,
          number: num,
          category: selectedStand === "West Stand" && row === "W10" ? "VIP" : currentMeta.category,
          price: selectedStand === "West Stand" && row === "W10" ? 5500 : currentMeta.price,
          status: isOccupied ? "occupied" : isSelected ? "selected" : "available",
        });
      }
    });

    return generated;
  }, [selectedStand, selectedSeatIds]);

  // Toggle seat selection
  const handleToggleSeat = (seat: Seat) => {
    if (seat.status === "occupied") return;

    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seat.id));
    } else {
      if (selectedSeatIds.length >= 6) {
        alert("Maximum 6 seats per transaction.");
        return;
      }
      setSelectedSeatIds((prev) => [...prev, seat.id]);
    }
  };

  // Selected seats objects
  const selectedSeatsList = useMemo(() => {
    return selectedSeatIds.map((id) => {
      const parts = id.split("-");
      const row = parts[0] || "W12";
      const num = parseInt(parts[1] || "1", 10);
      const isVIP = row === "W10";
      const isGeneral = row.startsWith("N") || row.startsWith("S");
      const category: TicketCategory = isVIP ? "VIP" : isGeneral ? "General" : "Premium";
      const price = isVIP ? 5500 : isGeneral ? 800 : 2200;

      return {
        id,
        stand: row.startsWith("N")
          ? "North Stand"
          : row.startsWith("S")
          ? "South Stand"
          : row.startsWith("E")
          ? "East Stand"
          : "West Stand",
        tier: isVIP ? "Club" : "Lower",
        row,
        number: num,
        category,
        price,
        status: "selected" as const,
      };
    });
  }, [selectedSeatIds]);

  const subtotal = selectedSeatsList.reduce((sum, s) => sum + s.price, 0);
  const bookingFee = selectedSeatsList.length > 0 ? 50 * selectedSeatsList.length : 0;
  const total = subtotal + bookingFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeatIds.length === 0) {
      alert("Please select at least one seat on the stadium map.");
      return;
    }

    setIsSubmitting(true);

    const bookingRef = `TNFC-${Date.now().toString().slice(-6)}`;
    const bookingPayload = {
      bookingId: bookingRef,
      matchId: match.id,
      match,
      seats: selectedSeatsList,
      category: selectedCategory,
      quantity: selectedSeatsList.length,
      subtotal,
      bookingFee,
      total,
      customerName,
      customerEmail,
      customerPhone,
      membershipId,
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("tnfc_latest_booking", JSON.stringify(bookingPayload));
    } catch {
      // LocalStorage error fallback
    }

    setTimeout(() => {
      router.push(`/booking/confirmation?ref=${bookingRef}`);
    }, 600);
  };

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Top Breadcrumb */}
      <div className="site-container py-4 border-b border-porcelain-300">
        <Link
          href="/tickets"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-navy/70 hover:text-copper transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Fixtures
        </Link>
      </div>

      {/* Booking Header */}
      <section className="bg-navy text-porcelain py-8 sm:py-10 border-b border-porcelain/15">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-heading font-black tracking-widest text-copper uppercase">
                {match.competition} • {match.roundOrMatchday}
              </span>
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-porcelain mt-1">
                {match.homeTeam.name} vs {match.awayTeam.name}
              </h1>
              <p className="text-xs text-porcelain/70 mt-1">
                Sat, 23 Nov 2026 • 19:30 IST • The Meridian Stadium, Chennai
              </p>
            </div>

            {/* Stepper Progress */}
            <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider">
              <span className="text-porcelain/50">1. Match</span>
              <span className="text-copper">›</span>
              <span className="text-copper font-black">2. Choose Seats</span>
              <span className="text-copper">›</span>
              <span className="text-porcelain/50">3. Confirmation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Seating Map & Checkout Grid */}
      <section className="py-6 sm:py-12">
        <div className="site-container">
          {/* MOBILE EXPERIENCE (< 1024px) */}
          <div className="block lg:hidden space-y-6 pb-28">
            {/* 1. Mobile Stand Selection Rails */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[10px] font-heading font-black tracking-widest text-copper uppercase">
                  Select Stadium Stand
                </span>
                <span className="text-[11px] font-semibold text-navy/60">
                  {selectedStand}
                </span>
              </div>
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1 px-1">
                {[
                  { id: "West Stand" as const, name: "West Stand", tier: "VIP & Club", price: "From ₹2,200", icon: "⭐" },
                  { id: "East Stand" as const, name: "East Stand", tier: "Bay View", price: "₹2,200", icon: "🌊" },
                  { id: "North Stand" as const, name: "North Stand", tier: "Marina Ultras", price: "₹800", icon: "🔥" },
                  { id: "South Stand" as const, name: "South Stand", tier: "Chola End", price: "₹800", icon: "🏛️" },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStand(st.id)}
                    className={`flex-shrink-0 p-3.5 rounded-2xl border text-left transition-all min-w-[155px] ${
                      selectedStand === st.id
                        ? "bg-navy text-porcelain border-navy shadow-md ring-2 ring-copper/40"
                        : "bg-white text-navy border-porcelain-300 hover:border-copper/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-base">{st.icon}</span>
                      <span
                        className={`text-[9px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          selectedStand === st.id
                            ? "bg-copper text-navy"
                            : "bg-porcelain-200 text-navy/70"
                        }`}
                      >
                        {st.tier}
                      </span>
                    </div>
                    <strong className="font-heading font-bold text-xs block leading-tight">
                      {st.name}
                    </strong>
                    <span
                      className={`text-[11px] font-mono mt-0.5 block ${
                        selectedStand === st.id ? "text-copper" : "text-navy/60"
                      }`}
                    >
                      {st.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Stand Pitch Orientation Header & Legend */}
            <div className="p-4 rounded-2xl bg-white border border-porcelain-300 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-sm text-navy">
                    {selectedStand} Seating
                  </h3>
                  <p className="text-[11px] text-navy/60">
                    Tap a seat to reserve. Max 6 seats.
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-copper/15 border border-copper/30 text-copper font-heading font-black text-xs">
                  {selectedSeatIds.length} / 6 Selected
                </div>
              </div>

              {/* Pitch Target Indicator */}
              <div className="h-6 rounded-lg bg-emerald-900/10 border border-emerald-800/20 flex items-center justify-center text-[10px] font-heading font-black tracking-widest text-emerald-800 uppercase">
                ▲ Pitch Direction ▲
              </div>

              {/* Touch Legend */}
              <div className="flex items-center justify-around pt-1 text-[11px] border-t border-porcelain-200">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-md bg-white border border-porcelain-300 shadow-xs" />
                  <span className="text-navy/70">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-md bg-copper border border-navy ring-1 ring-navy text-[9px] flex items-center justify-center font-bold text-navy" />
                  <span className="text-navy font-bold">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-md bg-navy/15 border border-navy/20" />
                  <span className="text-navy/40">Occupied</span>
                </div>
              </div>
            </div>

            {/* 3. Touch-First Seat Selector for Mobile */}
            <div className="p-4 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-3.5">
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-navy/50 block">
                Row by Row Selection (Swipe horizontally if needed)
              </span>

              <div className="space-y-3">
                {["Row 1", "Row 2", "Row 3", "Row 4"].map((rowLabel, rIdx) => {
                  const rowSeats = seatsForActiveStand.slice(rIdx * 10, (rIdx + 1) * 10);
                  const firstBank = rowSeats.slice(0, 5);
                  const secondBank = rowSeats.slice(5, 10);
                  const rowCode = rowSeats[0]?.row || `R${rIdx + 1}`;

                  return (
                    <div key={rowLabel} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-navy/60 px-1">
                        <span className="font-bold text-navy">Row {rowCode}</span>
                        <span>₹{rowSeats[0]?.price.toLocaleString("en-IN")} / seat</span>
                      </div>

                      {/* Row Seats with central aisle */}
                      <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-1">
                        {/* Bank 1: Seats 1 - 5 */}
                        <div className="flex items-center gap-1.5 flex-1">
                          {firstBank.map((seat) => {
                            const isSelected = selectedSeatIds.includes(seat.id);
                            const isOccupied = seat.status === "occupied";
                            return (
                              <button
                                key={seat.id}
                                disabled={isOccupied}
                                onClick={() => handleToggleSeat(seat)}
                                className={`flex-1 min-w-[34px] sm:min-w-[40px] h-10 sm:h-11 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center active:scale-90 ${
                                  isOccupied
                                    ? "bg-navy/10 text-navy/30 cursor-not-allowed border border-navy/10"
                                    : isSelected
                                    ? "bg-copper text-navy ring-2 ring-navy font-black shadow-md scale-105"
                                    : "bg-white hover:bg-copper/20 text-navy border border-porcelain-300"
                                }`}
                                aria-label={`Seat ${seat.id}`}
                              >
                                {seat.number}
                              </button>
                            );
                          })}
                        </div>

                        {/* Aisle Divider */}
                        <div className="w-4 flex flex-col items-center justify-center text-[8px] font-mono font-bold text-navy/30 tracking-tighter uppercase px-0.5">
                          |
                        </div>

                        {/* Bank 2: Seats 6 - 10 */}
                        <div className="flex items-center gap-1.5 flex-1">
                          {secondBank.map((seat) => {
                            const isSelected = selectedSeatIds.includes(seat.id);
                            const isOccupied = seat.status === "occupied";
                            return (
                              <button
                                key={seat.id}
                                disabled={isOccupied}
                                onClick={() => handleToggleSeat(seat)}
                                className={`flex-1 min-w-[34px] sm:min-w-[40px] h-10 sm:h-11 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center active:scale-90 ${
                                  isOccupied
                                    ? "bg-navy/10 text-navy/30 cursor-not-allowed border border-navy/10"
                                    : isSelected
                                    ? "bg-copper text-navy ring-2 ring-navy font-black shadow-md scale-105"
                                    : "bg-white hover:bg-copper/20 text-navy border border-porcelain-300"
                                }`}
                                aria-label={`Seat ${seat.id}`}
                              >
                                {seat.number}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Selected Seats Pills Summary */}
            {selectedSeatsList.length > 0 && (
              <div className="p-4 rounded-2xl bg-white border border-porcelain-300 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading font-bold text-navy">
                    Your Selected Seats ({selectedSeatsList.length})
                  </span>
                  <button
                    onClick={() => setSelectedSeatIds([])}
                    className="text-[11px] text-red-600 font-semibold"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSeatsList.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => handleToggleSeat(st as any)}
                      className="px-3 py-1.5 rounded-xl bg-navy text-porcelain text-xs font-mono font-bold flex items-center gap-2 active:scale-95"
                    >
                      <span>
                        {st.stand.split(" ")[0]} • {st.row}-{st.number}
                      </span>
                      <span className="text-copper">₹{st.price.toLocaleString("en-IN")}</span>
                      <span className="text-porcelain/60 hover:text-white">✕</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Mobile Checkout Form Card */}
            <div id="mobile-checkout-form" className="p-5 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-5">
              <div>
                <span className="text-[10px] font-heading font-black tracking-widest text-copper uppercase block mb-1">
                  Ticket Holder
                </span>
                <h3 className="font-heading font-extrabold text-lg text-navy">
                  Guest Information
                </h3>
              </div>

              {/* Price Overview */}
              <div className="space-y-2 text-xs text-navy/70 pt-2 border-t border-porcelain-200">
                <div className="flex justify-between">
                  <span>Seats ({selectedSeatsList.length})</span>
                  <span className="font-bold text-navy">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Facility Fee</span>
                  <span className="font-bold text-navy">₹{bookingFee.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-base font-heading font-black text-navy pt-2 border-t border-porcelain-200">
                  <span>Total Amount</span>
                  <span className="text-copper">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-3.5 pt-2">
                <div>
                  <label className="text-[10px] uppercase font-bold text-navy/60 block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 text-base sm:text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-navy/60 block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 text-base sm:text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-navy/60 block mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 text-base sm:text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy"
                      placeholder="+91 98400 12345"
                    />
                  </div>
                </div>

                {/* Demonstration Alert */}
                <div className="p-3 rounded-xl bg-copper/10 border border-copper/30 text-[11px] text-navy/80 flex items-start gap-2">
                  <Info className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                  <span>
                    <strong>Demonstration Booking:</strong> No real payment is charged. Confirmed passes appear in your browser.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || selectedSeatIds.length === 0}
                  className="w-full py-4 rounded-full bg-navy hover:bg-copper disabled:opacity-50 text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>
                    {isSubmitting ? "Generating Demo Pass..." : `Confirm Booking • ₹${total.toLocaleString("en-IN")}`}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* 6. Sticky Mobile Bottom Tray */}
            {selectedSeatIds.length > 0 && (
              <div className="fixed bottom-0 inset-x-0 bg-navy/95 backdrop-blur-md border-t border-copper/30 p-3.5 z-40 shadow-2xl flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-porcelain/60 block font-semibold">
                    {selectedSeatIds.length} {selectedSeatIds.length === 1 ? "Seat" : "Seats"} Selected
                  </span>
                  <strong className="text-base font-heading font-black text-copper">
                    ₹{total.toLocaleString("en-IN")}
                  </strong>
                </div>

                <a
                  href="#mobile-checkout-form"
                  className="px-6 py-3 rounded-full bg-copper hover:bg-copper-400 text-navy font-heading font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 active:scale-95 transition-transform"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* DESKTOP EXPERIENCE (>= 1024px) — 100% PRESERVED */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Interactive Stadium Overhead Blueprint (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Stand Selector Tabs */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-porcelain-300">
                {(["West Stand", "East Stand", "North Stand", "South Stand"] as const).map((stand) => (
                  <button
                    key={stand}
                    onClick={() => setSelectedStand(stand)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all text-center whitespace-nowrap ${
                      selectedStand === stand
                        ? "bg-navy text-porcelain shadow"
                        : "text-navy/70 hover:text-navy hover:bg-porcelain-100"
                    }`}
                  >
                    {stand}
                  </button>
                ))}
              </div>

              {/* Stadium Overhead Vector Blueprint */}
              <div className="p-6 rounded-3xl bg-white border border-porcelain-300 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-extrabold text-base text-navy">
                    The Meridian Stadium Blueprint
                  </h3>
                  <span className="text-xs font-semibold text-copper">
                    Active: {selectedStand}
                  </span>
                </div>

                {/* SVG Pitch & Stand Overview */}
                <div className="relative aspect-[16/10] rounded-2xl bg-navy/95 border-2 border-porcelain-300 overflow-hidden p-3 flex items-center justify-center">
                  <svg
                    viewBox="0 0 500 320"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Stadium Outer Ring */}
                    <rect x="20" y="15" width="460" height="290" rx="36" stroke="#B77A59" strokeWidth="2" strokeDasharray="4 2" />

                    {/* North Stand */}
                    <path
                      d="M100 20 H400 L370 65 H130 L100 20 Z"
                      fill={selectedStand === "North Stand" ? "#B77A59" : "#1A3B52"}
                      stroke="#F4F1E9"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-colors"
                      onClick={() => setSelectedStand("North Stand")}
                    />
                    <text x="250" y="46" fill="#F4F1E9" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="sans-serif">
                      NORTH STAND (MARINA ULTRAS) • ₹800
                    </text>

                    {/* South Stand */}
                    <path
                      d="M130 255 H370 L400 300 H100 L130 255 Z"
                      fill={selectedStand === "South Stand" ? "#B77A59" : "#1A3B52"}
                      stroke="#F4F1E9"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-colors"
                      onClick={() => setSelectedStand("South Stand")}
                    />
                    <text x="250" y="282" fill="#F4F1E9" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="sans-serif">
                      SOUTH STAND (CHOLA END) • ₹800
                    </text>

                    {/* West Stand (VIP & Premium) */}
                    <path
                      d="M25 80 L75 105 V215 L25 240 Z"
                      fill={selectedStand === "West Stand" ? "#B77A59" : "#1A3B52"}
                      stroke="#F4F1E9"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-colors"
                      onClick={() => setSelectedStand("West Stand")}
                    />
                    <text x="50" y="165" fill="#F4F1E9" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="sans-serif" transform="rotate(-90 50 165)">
                      WEST STAND (VIP) • ₹2,200 - ₹5,500
                    </text>

                    {/* East Stand */}
                    <path
                      d="M475 80 L425 105 V215 L475 240 Z"
                      fill={selectedStand === "East Stand" ? "#B77A59" : "#1A3B52"}
                      stroke="#F4F1E9"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-colors"
                      onClick={() => setSelectedStand("East Stand")}
                    />
                    <text x="450" y="165" fill="#F4F1E9" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="sans-serif" transform="rotate(90 450 165)">
                      EAST STAND (BAY VIEW) • ₹2,200
                    </text>

                    {/* Central Football Pitch */}
                    <rect x="120" y="90" width="260" height="140" rx="6" fill="#1C4B2E" stroke="#3DA365" strokeWidth="2" />
                    <line x1="250" y1="90" x2="250" y2="230" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" />
                    <circle cx="250" cy="160" r="30" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
                    <rect x="120" y="125" width="40" height="70" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
                    <rect x="340" y="125" width="40" height="70" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
                    <text x="250" y="164" fill="#FFFFFF" textAnchor="middle" fontSize="10" fontWeight="900" letterSpacing="2" fontFamily="sans-serif" fillOpacity="0.6">
                      THE MERIDIAN PITCH
                    </text>
                  </svg>
                </div>

                {/* Seat State Legend */}
                <div className="flex items-center justify-center gap-6 pt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-md bg-white border border-navy/40" />
                    <span className="text-navy/70">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-md bg-copper border border-copper" />
                    <span className="text-navy font-bold">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-md bg-navy/20 border border-navy/20" />
                    <span className="text-navy/40">Occupied</span>
                  </div>
                </div>
              </div>

              {/* Clickable Seat Matrix for Active Stand */}
              <div className="p-6 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-navy">
                      Click to Select Seats — {selectedStand}
                    </h3>
                    <p className="text-xs text-navy/60">
                      Tap individual seat blocks below to add or remove from your booking.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-copper font-bold">
                    {selectedSeatIds.length} / 6 Seats
                  </span>
                </div>

                {/* Seat Matrix Grid */}
                <div className="space-y-2.5 pt-2">
                  {["Row 1", "Row 2", "Row 3", "Row 4"].map((rowLabel, rIdx) => {
                    const rowSeats = seatsForActiveStand.slice(rIdx * 10, (rIdx + 1) * 10);
                    return (
                      <div key={rowLabel} className="flex items-center gap-2">
                        <span className="w-12 text-[10px] font-mono font-bold text-navy/60 shrink-0">
                          {rowSeats[0]?.row || `R${rIdx + 1}`}
                        </span>
                        <div className="flex-1 grid grid-cols-10 gap-1.5 sm:gap-2">
                          {rowSeats.map((seat) => {
                            const isSelected = selectedSeatIds.includes(seat.id);
                            const isOccupied = seat.status === "occupied";
                            return (
                              <button
                                key={seat.id}
                                disabled={isOccupied}
                                onClick={() => handleToggleSeat(seat)}
                                className={`h-8 sm:h-9 rounded-lg font-mono text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center ${
                                  isOccupied
                                    ? "bg-navy/10 text-navy/30 cursor-not-allowed border border-navy/10"
                                    : isSelected
                                    ? "bg-copper text-navy ring-2 ring-navy shadow-md font-black scale-105"
                                    : "bg-white hover:bg-copper/20 text-navy border border-porcelain-300 hover:border-copper"
                                }`}
                                title={`Seat ${seat.id} • ₹${seat.price}`}
                              >
                                {seat.number}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Booking Summary & Demo Checkout (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block mb-1">
                    Booking Summary
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-navy">
                    Selected Match Seats
                  </h3>
                </div>

                {/* Selected Seats Badges */}
                {selectedSeatsList.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-porcelain-50 border border-porcelain-200 text-center">
                    <Ticket className="w-8 h-8 text-copper/60 mx-auto mb-2" />
                    <p className="text-xs text-navy/60">
                      No seats selected. Please click on seats in the stadium map to proceed.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedSeatsList.map((st) => (
                      <div
                        key={st.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-porcelain-50 border border-porcelain-200 text-xs"
                      >
                        <div>
                          <strong className="font-heading font-bold text-navy block">
                            {st.stand} • Row {st.row}, Seat {st.number}
                          </strong>
                          <span className="text-[10px] text-copper font-medium">
                            {st.category} Tier
                          </span>
                        </div>
                        <span className="font-heading font-bold text-navy">
                          ₹{st.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-2 text-xs text-navy/70 pt-4 border-t border-porcelain-200">
                  <div className="flex justify-between">
                    <span>Seats Subtotal ({selectedSeatsList.length})</span>
                    <span className="font-bold text-navy">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stadium Facility & Booking Fee</span>
                    <span className="font-bold text-navy">₹{bookingFee.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-base font-heading font-black text-navy pt-3 border-t border-porcelain-200">
                    <span>Total Amount</span>
                    <span className="text-copper">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Customer Details Demo Form */}
                <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-4 border-t border-porcelain-200">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-navy">
                    Ticket Holder Information
                  </h4>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-navy/60 block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-base sm:text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-navy/60 block mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-base sm:text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-navy/60 block mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-base sm:text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium text-navy"
                        placeholder="+91 98400 12345"
                      />
                    </div>
                  </div>

                  {/* Demonstration Notice Box */}
                  <div className="p-3 rounded-xl bg-copper/10 border border-copper/30 text-[11px] text-navy/80 flex items-start gap-2">
                    <Info className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                    <span>
                      <strong>Demonstration Booking:</strong> No real payment is required. Completing this step generates a simulated official digital match pass.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || selectedSeatIds.length === 0}
                    className="w-full py-4 rounded-full bg-navy hover:bg-copper disabled:opacity-50 text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>
                      {isSubmitting ? "Generating Demo Pass..." : `Confirm Booking • ₹${total.toLocaleString("en-IN")}`}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
