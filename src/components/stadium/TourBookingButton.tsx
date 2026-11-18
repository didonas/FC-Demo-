"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export const TourBookingButton: React.FC = () => {
  const [booked, setBooked] = useState(false);

  const handleBooking = () => {
    setBooked(true);
    setTimeout(() => {
      alert("Simulated Stadium Tour booking confirmed for upcoming weekend slot! Pass saved to profile.");
    }, 100);
  };

  return (
    <div>
      <button
        onClick={handleBooking}
        className="px-8 py-4 rounded-full bg-copper hover:bg-copper-400 text-navy font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
      >
        {booked ? "Tour Slot Reserved ✓" : "Reserve Tour Slot (Simulated)"}
      </button>
    </div>
  );
};
