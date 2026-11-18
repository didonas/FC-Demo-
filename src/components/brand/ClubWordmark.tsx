import React from "react";
import Link from "next/link";
import { ClubCrest } from "./ClubCrest";

interface ClubWordmarkProps {
  variant?: "horizontal" | "stacked" | "compact" | "with-crest";
  theme?: "light" | "dark" | "copper";
  className?: string;
  crestSize?: number;
}

export const ClubWordmark: React.FC<ClubWordmarkProps> = ({
  variant = "with-crest",
  theme = "light",
  className = "",
  crestSize = 44,
}) => {
  const textColor =
    theme === "dark"
      ? "text-porcelain"
      : theme === "copper"
      ? "text-copper"
      : "text-navy";

  const subtextColor =
    theme === "dark"
      ? "text-copper"
      : theme === "copper"
      ? "text-porcelain"
      : "text-copper";

  if (variant === "with-crest") {
    return (
      <Link
        href="/"
        className={`inline-flex items-center gap-3.5 group select-none transition-opacity hover:opacity-95 ${className}`}
      >
        <ClubCrest size={crestSize} variant={theme === "dark" ? "primary" : "primary"} />
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-heading font-extrabold tracking-[0.14em] text-lg sm:text-xl ${textColor} group-hover:text-copper transition-colors`}>
              TAMILNADU
            </span>
            <span className="font-heading font-black tracking-widest text-lg sm:text-xl text-copper">
              FC
            </span>
          </div>
          <span className={`text-[9px] sm:text-[10px] tracking-[0.24em] font-medium uppercase mt-1 ${subtextColor}`}>
            One State. One Passion.
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <ClubCrest size={crestSize || 64} />
        <div className="mt-3 flex items-center gap-1.5">
          <span className={`font-heading font-black tracking-[0.18em] text-2xl ${textColor}`}>
            TAMILNADU
          </span>
          <span className="font-heading font-black tracking-widest text-2xl text-copper">
            FC
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="h-[1px] w-6 bg-copper/50" />
          <span className="text-[11px] tracking-[0.3em] font-semibold text-copper uppercase">
            Est. 1934 • Chennai
          </span>
          <span className="h-[1px] w-6 bg-copper/50" />
        </div>
        <span className={`text-xs tracking-[0.22em] font-medium uppercase mt-1 ${subtextColor}`}>
          One State. One Passion.
        </span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-1 font-heading font-black tracking-wider ${className}`}>
        <span className={textColor}>TN</span>
        <span className="text-copper">FC</span>
      </div>
    );
  }

  // Horizontal Wordmark
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`font-heading font-black tracking-[0.15em] text-xl ${textColor}`}>
        TAMILNADU FC
      </span>
      <span className="text-xs px-2 py-0.5 rounded bg-copper/15 text-copper font-medium tracking-wider uppercase">
        EST. 1934
      </span>
    </div>
  );
};
