import React from "react";

interface ClubCrestProps {
  className?: string;
  size?: number;
  variant?: "primary" | "simplified" | "monogram" | "monochrome" | "light" | "dark";
  showWordmark?: boolean;
}

export const ClubCrest: React.FC<ClubCrestProps> = ({
  className = "",
  size = 56,
  variant = "primary",
  showWordmark = false,
}) => {
  // Brand Colors
  const navy = "#102738";
  const porcelain = "#F4F1E9";
  const copper = "#B77A59";
  const seaglass = "#64847D";

  // Monogram variant
  if (variant === "monogram") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          {/* Subtle shield backdrop */}
          <path
            d="M50 5 L88 20 V52 C88 74 50 94 50 94 C50 94 12 74 12 52 V20 L50 5 Z"
            fill={navy}
            stroke={copper}
            strokeWidth="3"
          />
          {/* Interlocked T and F monogram */}
          {/* T-Bar */}
          <path
            d="M26 28 H74 V36 H55 V76 H45 V36 H26 V28 Z"
            fill={porcelain}
          />
          {/* F-Bar overlay in Copper */}
          <path
            d="M48 44 H70 V52 H48 V44 Z"
            fill={copper}
          />
          <circle cx="50" cy="18" r="3" fill={copper} />
        </svg>
      </div>
    );
  }

  // Simplified Crest (for small headers / icons)
  if (variant === "simplified") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg
          width={size}
          height={(size * 120) / 100}
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Shield */}
          <path
            d="M50 4 L90 18 V62 C90 88 50 114 50 114 C50 114 10 88 10 62 V18 L50 4 Z"
            fill={navy}
            stroke={copper}
            strokeWidth="3.5"
          />
          {/* Inner Shield Inset */}
          <path
            d="M50 12 L84 24 V60 C84 82 50 106 50 106 C50 106 16 82 16 60 V24 L50 12 Z"
            fill="#0D202F"
            stroke={copper}
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          {/* Architectural Gopuram Apex Geometric Motif */}
          <path
            d="M50 24 L68 46 H58 V66 H66 L50 82 L34 66 H42 V46 H32 L50 24 Z"
            fill={porcelain}
          />
          {/* Football chevron arc */}
          <circle cx="50" cy="54" r="7" fill={copper} />
          {/* Star on top */}
          <polygon
            points="50,6 52,11 57,11 53,14 55,19 50,16 45,19 47,14 43,11 48,11"
            fill={copper}
          />
        </svg>
      </div>
    );
  }

  // Full Primary Club Crest
  const isDark = variant === "dark";
  const isMono = variant === "monochrome";

  const primaryFill = isMono ? "currentColor" : isDark ? porcelain : navy;
  const secondaryFill = isMono ? "currentColor" : copper;
  const bgFill = isMono ? "transparent" : isDark ? navy : "#0C1F2D";
  const creamText = isMono ? "currentColor" : porcelain;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={(size * 128) / 100}
        viewBox="0 0 100 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-105 filter drop-shadow-md"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#102738" />
            <stop offset="60%" stopColor="#0B1C2A" />
            <stop offset="100%" stopColor="#07131D" />
          </linearGradient>
          <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D99C7B" />
            <stop offset="50%" stopColor="#B77A59" />
            <stop offset="100%" stopColor="#8C5537" />
          </linearGradient>
          <linearGradient id="goldStar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5D061" />
            <stop offset="100%" stopColor="#B77A59" />
          </linearGradient>
        </defs>

        {/* Championship Star */}
        <polygon
          points="50,2 52.5,7.5 58,7.8 53.8,11.2 55.2,16.5 50,13.5 44.8,16.5 46.2,11.2 42,7.8 47.5,7.5"
          fill="url(#copperGrad)"
          stroke={copper}
          strokeWidth="0.5"
        />

        {/* Outer Classic Football Shield */}
        <path
          d="M50 14 L92 26 V66 C92 92 50 120 50 120 C50 120 8 92 8 66 V26 L50 14 Z"
          fill="url(#shieldGrad)"
          stroke="url(#copperGrad)"
          strokeWidth="3"
        />

        {/* Inner Fillet Border */}
        <path
          d="M50 18 L87 29 V64 C87 88 50 114 50 114 C50 114 13 88 13 64 V29 L50 18 Z"
          fill="none"
          stroke={porcelain}
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Header Header Band */}
        <path
          d="M14 30 L50 20 L86 30 V44 L50 37 L14 44 V30 Z"
          fill="url(#copperGrad)"
        />

        {/* Text: TAMILNADU */}
        <text
          x="50"
          y="35.5"
          textAnchor="middle"
          fill={navy}
          fontSize="7.5"
          fontWeight="900"
          letterSpacing="1.2"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          TAMILNADU
        </text>

        {/* Subtle Tamil architectural spire / gopuram silhouette geometric lines */}
        <g opacity="0.95">
          {/* Base tiered monument pedestal */}
          <rect x="36" y="78" width="28" height="4" rx="1" fill={porcelain} opacity="0.8" />
          <rect x="39" y="73" width="22" height="4" rx="1" fill={copper} />
          <rect x="42" y="68" width="16" height="4" rx="1" fill={porcelain} opacity="0.9" />

          {/* Stepped Spire Triangle Apex */}
          <path
            d="M50 44 L60 66 H40 L50 44 Z"
            fill={porcelain}
          />
          {/* Spire Kalasam Finial */}
          <circle cx="50" cy="42" r="2.2" fill="url(#copperGrad)" />

          {/* Geometric Football hemisphere in base */}
          <path
            d="M32 86 Q50 96 68 86 C64 96 36 96 32 86 Z"
            fill={copper}
            opacity="0.85"
          />
          {/* Maritime coastal wave accents */}
          <path
            d="M24 64 Q34 68 44 64 T64 64 T84 64"
            fill="none"
            stroke={seaglass}
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
        </g>

        {/* FC Badge & Year Banner */}
        <rect x="34" y="93" width="32" height="13" rx="3" fill="#0A1824" stroke={copper} strokeWidth="1" />
        <text
          x="50"
          y="102"
          textAnchor="middle"
          fill={porcelain}
          fontSize="8"
          fontWeight="800"
          letterSpacing="1.5"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          FC
        </text>

        {/* EST. 1934 */}
        <text
          x="50"
          y="112"
          textAnchor="middle"
          fill={copper}
          fontSize="5"
          fontWeight="700"
          letterSpacing="0.8"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          EST. 1934
        </text>
      </svg>

      {showWordmark && (
        <div className="flex flex-col justify-center text-left">
          <span className="font-heading font-black text-xl tracking-wider text-navy leading-none">
            TAMILNADU <span className="text-copper">FC</span>
          </span>
          <span className="text-[10px] tracking-[0.25em] font-medium text-copper uppercase mt-0.5">
            One State. One Passion.
          </span>
        </div>
      )}
    </div>
  );
};
