import React from "react";
import { ClubCrest } from "@/components/brand/ClubCrest";

interface ProductImagePlaceholderProps {
  productName?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ProductImagePlaceholder: React.FC<ProductImagePlaceholderProps> = ({
  productName,
  size = "md",
  className = "",
}) => {
  const crestSize = size === "lg" ? 64 : size === "sm" ? 36 : 48;

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#F9F7F2] to-[#ECE7DC] border border-porcelain-300/80 text-navy select-none p-6 text-center ${className}`}
    >
      {/* Authentic Club Crest */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/80 border border-porcelain-300 shadow-sm flex items-center justify-center mb-3">
        <ClubCrest size={crestSize} variant="simplified" />
      </div>

      <span className="text-[10px] sm:text-xs font-heading font-black uppercase tracking-[0.22em] text-navy/80">
        Official Photography Pending
      </span>

      <span className="text-[9px] sm:text-[10px] font-heading font-semibold uppercase tracking-wider text-copper mt-1">
        Tamilnadu FC Official Merchandise
      </span>

      {productName && (
        <span className="text-[9px] text-navy/40 max-w-[200px] line-clamp-1 mt-2 font-mono">
          {productName}
        </span>
      )}
    </div>
  );
};
