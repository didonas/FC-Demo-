const fs = require('fs');
const path = require('path');

// Colors
const NAVY = "#102738";
const NAVY_DARK = "#091722";
const PORCELAIN = "#F4F1E9";
const PORCELAIN_WARM = "#EAE4D5";
const COPPER = "#B77A59";
const COPPER_LIGHT = "#D69F82";
const SEAGLASS = "#64847D";
const SEAGLASS_LIGHT = "#8EAFA8";

// Ensure directories exist
const dirs = [
  'public/merchandise/kits',
  'public/merchandise/training',
  'public/merchandise/fanwear',
  'public/merchandise/accessories'
];
dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Helper for Crest SVG Fragment
function getCrestFragment(x, y, scale = 1, isWhite = false, isCopper = false) {
  const primaryFill = isWhite ? PORCELAIN : isCopper ? COPPER : NAVY;
  const secondaryFill = isWhite ? COPPER : isCopper ? PORCELAIN : COPPER;
  return `
  <g transform="translate(${x}, ${y}) scale(${scale})">
    <polygon points="25,2 26.5,5.5 30,5.7 27.5,7.8 28.3,11 25,9.2 21.7,11 22.5,7.8 20,5.7 23.5,5.5" fill="${secondaryFill}" />
    <path d="M25 9 L46 16 V38 C46 54 25 70 25 70 C25 70 4 54 4 38 V16 L25 9 Z" fill="${primaryFill}" stroke="${secondaryFill}" stroke-width="1.8"/>
    <path d="M7 19 L25 13 L43 19 V27 L25 23 L7 27 V19 Z" fill="${secondaryFill}"/>
    <text x="25" y="22" text-anchor="middle" fill="${isWhite ? NAVY : PORCELAIN}" font-size="4.2" font-weight="900" font-family="sans-serif" letter-spacing="0.6">TAMILNADU</text>
    <path d="M25 28 L31 41 H19 L25 28 Z" fill="${PORCELAIN}"/>
    <circle cx="25" cy="27" r="1.3" fill="${COPPER}"/>
    <rect x="17" y="56" width="16" height="8" rx="2" fill="#0A1824" stroke="${secondaryFill}" stroke-width="0.8"/>
    <text x="25" y="62" text-anchor="middle" fill="${PORCELAIN}" font-size="5" font-weight="800" font-family="sans-serif">FC</text>
  </g>
  `;
}

// 1. HOME JERSEY FRONT
const homeJerseyFront = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgG" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="100%" stopColor="#E8E2D5" />
    </radialGradient>
    <linearGradient id="bodyG" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FCFAF6" />
      <stop offset="100%" stopColor="#F2ECE0" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#102738" flood-opacity="0.14" />
    </filter>
    <pattern id="jacquard" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="#E2DAC9" stroke-width="1.2" opacity="0.4" />
      <path d="M10 20 L20 10 L30 20 L20 30 Z" fill="none" stroke="#B77A59" stroke-width="0.6" opacity="0.25" />
    </pattern>
  </defs>

  <rect width="800" height="960" rx="32" fill="url(#bgG)" />

  <g filter="url(#shadow)">
    <!-- Main Torso Silhouette -->
    <path d="M280 180 L230 200 L110 320 L180 430 L250 370 V790 C250 810 270 820 290 820 H510 C530 820 550 810 550 790 V370 L620 430 L690 320 L570 200 L520 180 Z" fill="url(#bodyG)" stroke="#D8CFBD" stroke-width="2" />

    <!-- Subtle Jacquard Overlay on Body -->
    <path d="M250 250 H550 V790 C550 810 530 820 510 820 H290 C270 820 250 810 250 790 Z" fill="url(#jacquard)" />

    <!-- Atlantic Navy Sleeve Cuffs with Copper Trim -->
    <path d="M110 320 L135 348 L180 430 L155 402 Z" fill="${NAVY}" />
    <path d="M135 348 L142 356 L162 410 L155 402 Z" fill="${COPPER}" />
    <path d="M690 320 L665 348 L620 430 L645 402 Z" fill="${NAVY}" />
    <path d="M665 348 L658 356 L638 410 L645 402 Z" fill="${COPPER}" />

    <!-- Ribbed Atlantic Navy Crew Collar with Copper Piping -->
    <path d="M330 178 C330 230 470 230 470 178 C450 170 350 170 330 178 Z" fill="${NAVY}" />
    <path d="M340 180 C340 220 460 220 460 180 C445 174 355 174 340 180 Z" fill="${PORCELAIN}" />
    <path d="M342 195 C360 215 440 215 458 195" stroke="${COPPER}" stroke-width="2.5" fill="none" />

    <!-- Shoulder Contour Seams in Navy & Copper -->
    <path d="M280 180 L250 370" stroke="${NAVY}" stroke-width="2" opacity="0.25" />
    <path d="M520 180 L550 370" stroke="${NAVY}" stroke-width="2" opacity="0.25" />
    <path d="M250 420 V790" stroke="${COPPER}" stroke-width="1.5" opacity="0.4" stroke-dasharray="4 2" />
    <path d="M550 420 V790" stroke="${COPPER}" stroke-width="1.5" opacity="0.4" stroke-dasharray="4 2" />

    <!-- Official Club Crest on Left Chest -->
    ${getCrestFragment(450, 270, 1.2)}

    <!-- Maker Logo on Right Chest -->
    <g transform="translate(290, 290)">
      <path d="M0 20 L16 0 L32 20 H24 L16 10 L8 20 Z" fill="${NAVY}" />
      <polygon points="16,3 18,7 23,7 19,10 20,14 16,12 12,14 13,10 9,7 14,7" fill="${COPPER}" />
    </g>

    <!-- Center Chest Sponsor: BAY MARINE -->
    <g transform="translate(400, 480)">
      <text x="0" y="0" text-anchor="middle" fill="${NAVY}" font-size="34" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4">BAY MARINE</text>
      <text x="0" y="24" text-anchor="middle" fill="${COPPER}" font-size="11" font-weight="800" font-family="system-ui, sans-serif" letter-spacing="6">LOGISTICS • PORTS • GLOBAL</text>
      <line x1="-120" y1="-14" x2="120" y2="-14" stroke="${COPPER}" stroke-width="1.5" opacity="0.5" />
    </g>

    <!-- Lower Hem Authentic Tag -->
    <rect x="270" y="755" width="46" height="30" rx="3" fill="${NAVY}" stroke="${COPPER}" stroke-width="1" />
    <text x="293" y="768" text-anchor="middle" fill="${PORCELAIN}" font-size="6" font-weight="900" font-family="sans-serif">OFFICIAL</text>
    <text x="293" y="777" text-anchor="middle" fill="${COPPER}" font-size="5" font-weight="700" font-family="sans-serif">MATCH ISSUE</text>
  </g>
</svg>
`;

// 2. HOME JERSEY BACK
const homeJerseyBack = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgG" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="100%" stopColor="#E8E2D5" />
    </radialGradient>
    <linearGradient id="bodyG" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FCFAF6" />
      <stop offset="100%" stopColor="#F2ECE0" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#102738" flood-opacity="0.14" />
    </filter>
  </defs>

  <rect width="800" height="960" rx="32" fill="url(#bgG)" />

  <g filter="url(#shadow)">
    <!-- Main Torso Silhouette -->
    <path d="M280 180 L230 200 L110 320 L180 430 L250 370 V790 C250 810 270 820 290 820 H510 C530 820 550 810 550 790 V370 L620 430 L690 320 L570 200 L520 180 Z" fill="url(#bodyG)" stroke="#D8CFBD" stroke-width="2" />

    <!-- Sleeve Cuffs -->
    <path d="M110 320 L135 348 L180 430 L155 402 Z" fill="${NAVY}" />
    <path d="M135 348 L142 356 L162 410 L155 402 Z" fill="${COPPER}" />
    <path d="M690 320 L665 348 L620 430 L645 402 Z" fill="${NAVY}" />
    <path d="M665 348 L658 356 L638 410 L645 402 Z" fill="${COPPER}" />

    <!-- Back Collar with Slogan -->
    <path d="M330 178 C330 200 470 200 470 178 Z" fill="${NAVY}" />
    <text x="400" y="222" text-anchor="middle" fill="${COPPER}" font-size="10" font-weight="800" font-family="sans-serif" letter-spacing="3">ONE STATE. ONE PASSION.</text>
    <polygon points="400,230 402,234 406,234 403,237 404,241 400,239 396,241 397,237 394,234 398,234" fill="${COPPER}" />

    <!-- Player Name: VARADHAN -->
    <text x="400" y="340" text-anchor="middle" fill="${NAVY}" font-size="44" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="8">VARADHAN</text>

    <!-- Big Player Number: 10 -->
    <g transform="translate(400, 520)">
      <text x="0" y="0" text-anchor="middle" fill="${NAVY}" font-size="180" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4">10</text>
      <!-- Copper drop-shadow outline inside number -->
      <text x="4" y="4" text-anchor="middle" fill="none" stroke="${COPPER}" stroke-width="2" font-size="180" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4" opacity="0.6">10</text>
      <!-- Mini Club Crest at base of number -->
      <circle cx="20" cy="20" r="12" fill="${COPPER}" />
      <path d="M20 12 L28 16 V24 C28 29 20 32 20 32 C20 32 12 29 12 24 V16 Z" fill="${NAVY}" />
    </g>

    <!-- Lower Back Sponsor: TAMIL TELECOM -->
    <g transform="translate(400, 740)">
      <text x="0" y="0" text-anchor="middle" fill="${NAVY}" font-size="18" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="3">TAMIL TELECOM</text>
      <text x="0" y="16" text-anchor="middle" fill="${COPPER}" font-size="9" font-weight="700" font-family="system-ui, sans-serif" letter-spacing="4">5G ULTRA NETWORK</text>
    </g>
  </g>
</svg>
`;

// 3. HOME JERSEY DETAIL
const homeJerseyDetail = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgG" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="100%" stopColor="#E0D7C5" />
    </radialGradient>
    <pattern id="macroWeave" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="#F4EFE5" />
      <rect x="8" y="8" width="8" height="8" fill="#F4EFE5" />
      <rect x="8" width="8" height="8" fill="#ECE4D3" />
      <rect y="8" width="8" height="8" fill="#ECE4D3" />
    </pattern>
  </defs>

  <rect width="800" height="960" rx="32" fill="url(#bgG)" />
  <rect x="40" y="40" width="720" height="880" rx="24" fill="url(#macroWeave)" stroke="#D8CFBD" stroke-width="3" />

  <!-- Ribbed Navy Collar Arc in corner -->
  <path d="M40 40 Q250 220 500 40" fill="none" stroke="${NAVY}" stroke-width="48" />
  <path d="M40 76 Q250 256 530 50" fill="none" stroke="${COPPER}" stroke-width="12" />

  <!-- Macro Crest Badge with 3D Bevel -->
  <g transform="translate(400, 520) scale(4.8)">
    <g transform="translate(-25, -40)">
      <polygon points="25,0 27,4.5 32,4.8 28.5,7.8 29.5,12.5 25,10 20.5,12.5 21.5,7.8 18,4.8 23,4.5" fill="${COPPER}" stroke="#FFF" stroke-width="0.5"/>
      <path d="M25 8 L46 16 V38 C46 54 25 70 25 70 C25 70 4 54 4 38 V16 L25 8 Z" fill="${NAVY}" stroke="${COPPER}" stroke-width="2.5"/>
      <path d="M7 18 L25 12 L43 18 V26 L25 21 L7 26 V18 Z" fill="${COPPER}"/>
      <text x="25" y="20.5" text-anchor="middle" fill="${NAVY}" font-size="4.2" font-weight="900" font-family="sans-serif">TAMILNADU</text>
      <path d="M25 27 L32 40 H18 L25 27 Z" fill="${PORCELAIN}"/>
      <circle cx="25" cy="25" r="1.5" fill="${COPPER}"/>
      <rect x="17" y="54" width="16" height="8" rx="2" fill="#0A1824" stroke="${COPPER}" stroke-width="1"/>
      <text x="25" y="60.5" text-anchor="middle" fill="${PORCELAIN}" font-size="5" font-weight="800" font-family="sans-serif">FC</text>
      <text x="25" y="66" text-anchor="middle" fill="${COPPER}" font-size="3" font-weight="700" font-family="sans-serif">EST. 1934</text>
    </g>
  </g>

  <!-- Technical Spec Caption Label -->
  <rect x="80" y="810" width="640" height="70" rx="16" fill="${NAVY}" />
  <text x="120" y="842" fill="${PORCELAIN}" font-size="16" font-weight="800" font-family="sans-serif">AeroWeave™ 3D Silicone Crest & Jacquard Stone Weave</text>
  <text x="120" y="862" fill="${COPPER}" font-size="12" font-weight="600" font-family="sans-serif">Authentic Player Specification • Micro-perforated Heat Dissipation</text>
</svg>
`;

// 4. AWAY JERSEY FRONT (The Atlantic)
const awayJerseyFront = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgG" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#1E384D" />
      <stop offset="100%" stopColor="#0B1A24" />
    </radialGradient>
    <linearGradient id="bodyG" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#142F43" />
      <stop offset="100%" stopColor="#0E2333" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.3" />
    </filter>
    <pattern id="marineCurrents" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M0 30 Q15 20 30 30 T60 30" fill="none" stroke="#1D435E" stroke-width="2" opacity="0.6" />
      <path d="M0 15 Q15 5 30 15 T60 15" fill="none" stroke="#255172" stroke-width="1.5" opacity="0.4" />
    </pattern>
  </defs>

  <rect width="800" height="960" rx="32" fill="url(#bgG)" />

  <g filter="url(#shadow)">
    <!-- Main Torso Silhouette -->
    <path d="M280 180 L230 200 L110 320 L180 430 L250 370 V790 C250 810 270 820 290 820 H510 C530 820 550 810 550 790 V370 L620 430 L690 320 L570 200 L520 180 Z" fill="url(#bodyG)" stroke="#224866" stroke-width="2" />

    <!-- Currents Graphic Texture -->
    <path d="M250 250 H550 V790 C550 810 530 820 510 820 H290 C270 820 250 810 250 790 Z" fill="url(#marineCurrents)" />

    <!-- Porcelain Sleeve Cuffs with Copper Trim -->
    <path d="M110 320 L135 348 L180 430 L155 402 Z" fill="${PORCELAIN}" />
    <path d="M135 348 L142 356 L162 410 L155 402 Z" fill="${COPPER}" />
    <path d="M690 320 L665 348 L620 430 L645 402 Z" fill="${PORCELAIN}" />
    <path d="M665 348 L658 356 L638 410 L645 402 Z" fill="${COPPER}" />

    <!-- Porcelain & Copper Collar -->
    <path d="M330 178 C330 230 470 230 470 178 C450 170 350 170 330 178 Z" fill="${PORCELAIN}" />
    <path d="M340 180 C340 220 460 220 460 180 C445 174 355 174 340 180 Z" fill="${NAVY}" />
    <path d="M342 195 C360 215 440 215 458 195" stroke="${COPPER}" stroke-width="2.5" fill="none" />

    <!-- Official Club Crest (White/Porcelain Variant) -->
    ${getCrestFragment(450, 270, 1.2, true)}

    <!-- Maker Logo -->
    <g transform="translate(290, 290)">
      <path d="M0 20 L16 0 L32 20 H24 L16 10 L8 20 Z" fill="${PORCELAIN}" />
      <polygon points="16,3 18,7 23,7 19,10 20,14 16,12 12,14 13,10 9,7 14,7" fill="${COPPER}" />
    </g>

    <!-- Sponsor: BAY MARINE in Porcelain -->
    <g transform="translate(400, 480)">
      <text x="0" y="0" text-anchor="middle" fill="${PORCELAIN}" font-size="34" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4">BAY MARINE</text>
      <text x="0" y="24" text-anchor="middle" fill="${COPPER}" font-size="11" font-weight="800" font-family="system-ui, sans-serif" letter-spacing="6">LOGISTICS • PORTS • GLOBAL</text>
      <line x1="-120" y1="-14" x2="120" y2="-14" stroke="${COPPER}" stroke-width="1.5" opacity="0.6" />
    </g>

    <!-- Lower Hem Authentic Tag -->
    <rect x="270" y="755" width="46" height="30" rx="3" fill="${PORCELAIN}" stroke="${COPPER}" stroke-width="1" />
    <text x="293" y="768" text-anchor="middle" fill="${NAVY}" font-size="6" font-weight="900" font-family="sans-serif">OFFICIAL</text>
    <text x="293" y="777" text-anchor="middle" fill="${COPPER}" font-size="5" font-weight="700" font-family="sans-serif">MATCH ISSUE</text>
  </g>
</svg>
`;

// 5. THIRD JERSEY FRONT (The Horizon)
const thirdJerseyFront = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgG" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#E4ECE9" />
      <stop offset="100%" stopColor="#C4D5D0" />
    </radialGradient>
    <linearGradient id="bodyG" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#6E8E87" />
      <stop offset="100%" stopColor="#55756E" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#102738" flood-opacity="0.16" />
    </filter>
  </defs>

  <rect width="800" height="960" rx="32" fill="url(#bgG)" />

  <g filter="url(#shadow)">
    <!-- Main Torso Silhouette in Sea Glass -->
    <path d="M280 180 L230 200 L110 320 L180 430 L250 370 V790 C250 810 270 820 290 820 H510 C530 820 550 810 550 790 V370 L620 430 L690 320 L570 200 L520 180 Z" fill="url(#bodyG)" stroke="#4A6861" stroke-width="2" />

    <!-- Atlantic Navy Chest Chevron Block -->
    <path d="M250 340 L400 420 L550 340 V240 H250 Z" fill="${NAVY}" />
    <path d="M250 340 L400 420 L550 340" stroke="${COPPER}" stroke-width="4" fill="none" />

    <!-- Cuffs -->
    <path d="M110 320 L135 348 L180 430 L155 402 Z" fill="${NAVY}" />
    <path d="M135 348 L142 356 L162 410 L155 402 Z" fill="${COPPER}" />
    <path d="M690 320 L665 348 L620 430 L645 402 Z" fill="${NAVY}" />
    <path d="M665 348 L658 356 L638 410 L645 402 Z" fill="${COPPER}" />

    <!-- Modern V-Collar -->
    <path d="M330 178 L400 240 L470 178 Z" fill="${NAVY}" stroke="${COPPER}" stroke-width="2" />

    <!-- Official Crest on Navy Chevron -->
    ${getCrestFragment(450, 260, 1.2, true)}

    <!-- Maker Logo -->
    <g transform="translate(290, 275)">
      <path d="M0 20 L16 0 L32 20 H24 L16 10 L8 20 Z" fill="${PORCELAIN}" />
      <polygon points="16,3 18,7 23,7 19,10 20,14 16,12 12,14 13,10 9,7 14,7" fill="${COPPER}" />
    </g>

    <!-- Sponsor: BAY MARINE in Porcelain -->
    <g transform="translate(400, 520)">
      <text x="0" y="0" text-anchor="middle" fill="${PORCELAIN}" font-size="34" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4">BAY MARINE</text>
      <text x="0" y="24" text-anchor="middle" fill="${COPPER}" font-size="11" font-weight="800" font-family="system-ui, sans-serif" letter-spacing="6">LOGISTICS • PORTS • GLOBAL</text>
    </g>
  </g>
</svg>
`;

// 6. GOALKEEPER JERSEY (The Guardian)
const gkJerseyFront = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgG" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#FFF2E8" />
      <stop offset="100%" stopColor="#E0C2AF" />
    </radialGradient>
    <linearGradient id="bodyG" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#D98A52" />
      <stop offset="100%" stopColor="#B36531" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#102738" flood-opacity="0.16" />
    </filter>
  </defs>

  <rect width="800" height="960" rx="32" fill="url(#bgG)" />

  <g filter="url(#shadow)">
    <!-- Main Torso in Amber/Copper -->
    <path d="M280 180 L230 200 L110 320 L180 430 L250 370 V790 C250 810 270 820 290 820 H510 C530 820 550 810 550 790 V370 L620 430 L690 320 L570 200 L520 180 Z" fill="url(#bodyG)" stroke="#8C4B20" stroke-width="2" />

    <!-- Forearm Grip Ribs in Navy -->
    <g fill="${NAVY}" opacity="0.8">
      <rect x="130" y="360" width="40" height="6" rx="3" transform="rotate(-30 130 360)" />
      <rect x="138" y="375" width="40" height="6" rx="3" transform="rotate(-30 138 375)" />
      <rect x="146" y="390" width="40" height="6" rx="3" transform="rotate(-30 146 390)" />
      <rect x="630" y="360" width="40" height="6" rx="3" transform="rotate(30 630 360)" />
      <rect x="622" y="375" width="40" height="6" rx="3" transform="rotate(30 622 375)" />
      <rect x="614" y="390" width="40" height="6" rx="3" transform="rotate(30 614 390)" />
    </g>

    <!-- Collar -->
    <path d="M330 178 C330 220 470 220 470 178 Z" fill="${NAVY}" />

    <!-- Crest -->
    ${getCrestFragment(450, 270, 1.2, true)}

    <!-- Sponsor -->
    <g transform="translate(400, 480)">
      <text x="0" y="0" text-anchor="middle" fill="${NAVY}" font-size="34" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4">BAY MARINE</text>
      <text x="0" y="24" text-anchor="middle" fill="${PORCELAIN}" font-size="11" font-weight="800" font-family="system-ui, sans-serif" letter-spacing="6">LOGISTICS • PORTS • GLOBAL</text>
    </g>
  </g>
</svg>
`;

// 7. MATCH SHORTS (Atlantic Navy)
const matchShorts = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#F4F1E9" />
  <g transform="translate(150, 220)">
    <!-- Shorts Silhouette in Atlantic Navy -->
    <path d="M40 50 H460 L440 460 L270 470 L250 250 L230 470 L60 460 Z" fill="${NAVY}" stroke="#091824" stroke-width="2" />
    <!-- Elastic Waistband -->
    <rect x="40" y="20" width="420" height="35" rx="4" fill="#0A1C29" stroke="${COPPER}" stroke-width="1.5" />
    <path d="M230 55 V90 M270 55 V90" stroke="${PORCELAIN}" stroke-width="3" stroke-linecap="round" />
    <!-- Porcelain Side Panels with Copper Piping -->
    <path d="M40 50 L60 460 H80 L60 50 Z" fill="${PORCELAIN}" />
    <path d="M80 50 L80 460" stroke="${COPPER}" stroke-width="2" />
    <path d="M460 50 L440 460 H420 L440 50 Z" fill="${PORCELAIN}" />
    <path d="M420 50 L420 460" stroke="${COPPER}" stroke-width="2" />
    <!-- Embroidered Club Crest on Right Thigh -->
    ${getCrestFragment(360, 360, 1.1, true)}
    <!-- Maker Logo on Left Thigh -->
    <path d="M100 400 L114 382 L128 400 H120 L114 390 L108 400 Z" fill="${PORCELAIN}" />
  </g>
</svg>
`;

// 8. MATCH SOCKS
const matchSocks = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#F4F1E9" />
  <g transform="translate(180, 140)">
    <!-- Left Sock -->
    <path d="M80 60 H180 V480 L140 540 H60 L80 480 Z" fill="${PORCELAIN}" stroke="#DCD5C4" stroke-width="2" />
    <!-- Navy Turnover Cuff with Copper Stripe -->
    <rect x="75" y="40" width="110" height="60" rx="4" fill="${NAVY}" />
    <rect x="75" y="80" width="110" height="10" fill="${COPPER}" />
    <!-- TNFC Knit Lettering on Shin -->
    <text x="130" y="260" text-anchor="middle" fill="${NAVY}" font-size="28" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4">TNFC</text>

    <!-- Right Sock -->
    <path d="M260 60 H360 V480 L320 540 H240 L260 480 Z" fill="${PORCELAIN}" stroke="#DCD5C4" stroke-width="2" />
    <!-- Navy Turnover Cuff -->
    <rect x="255" y="40" width="110" height="60" rx="4" fill="${NAVY}" />
    <rect x="255" y="80" width="110" height="10" fill="${COPPER}" />
    <!-- TNFC Knit Lettering on Shin -->
    <text x="310" y="260" text-anchor="middle" fill="${NAVY}" font-size="28" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4">TNFC</text>
  </g>
</svg>
`;

// 9. PRO TECH DRILL TOP (Training)
const trainDrillTop = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#F4F1E9" />
  <g transform="translate(0, 0)">
    <!-- Drill Top Torso (Navy body, Sea glass sleeves) -->
    <path d="M280 180 L210 200 L90 400 L140 490 L250 370 V790 C250 810 270 820 290 820 H510 C530 820 550 810 550 790 V370 L660 490 L710 400 L590 200 L520 180 Z" fill="${NAVY}" stroke="#091722" stroke-width="2" />
    <!-- Raglan Sea Glass Sleeves -->
    <path d="M280 180 L210 200 L90 400 L140 490 L250 370 Z" fill="${SEAGLASS}" />
    <path d="M520 180 L590 200 L710 400 L660 490 L550 370 Z" fill="${SEAGLASS}" />
    <!-- Quarter Zip Collar -->
    <rect x="340" y="140" width="120" height="70" rx="8" fill="${NAVY}" stroke="${COPPER}" stroke-width="1.5" />
    <line x1="400" y1="160" x2="400" y2="340" stroke="${COPPER}" stroke-width="3" />
    <circle cx="400" cy="340" r="6" fill="${COPPER}" />
    <!-- Thumbholes on Cuffs -->
    <ellipse cx="120" cy="460" rx="6" ry="12" fill="${NAVY}" />
    <ellipse cx="680" cy="460" rx="6" ry="12" fill="${NAVY}" />
    <!-- Reflective Club Crest -->
    ${getCrestFragment(450, 270, 1.2, true)}
    <text x="400" y="460" text-anchor="middle" fill="${PORCELAIN}" font-size="20" font-weight="800" font-family="sans-serif" letter-spacing="4">KOVIL PERFORMANCE</text>
  </g>
</svg>
`;

// 10. TRAINING JERSEY
const trainJersey = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#F4F1E9" />
  <g transform="translate(0, 0)">
    <path d="M280 180 L230 200 L110 320 L180 430 L250 370 V790 H550 V370 L620 430 L690 320 L570 200 L520 180 Z" fill="${NAVY}" stroke="#0A1A26" stroke-width="2" />
    <!-- Side Ventilation Mesh in Sea Glass -->
    <path d="M250 370 H280 V790 H250 Z" fill="${SEAGLASS}" opacity="0.7" />
    <path d="M520 370 H550 V790 H520 Z" fill="${SEAGLASS}" opacity="0.7" />
    <path d="M330 178 C330 220 470 220 470 178 Z" fill="${SEAGLASS}" />
    <!-- Crest -->
    ${getCrestFragment(450, 270, 1.2, true)}
    <!-- Training Sponsor -->
    <text x="400" y="480" text-anchor="middle" fill="${PORCELAIN}" font-size="30" font-weight="900" font-family="sans-serif" letter-spacing="4">COROMANDEL AIR</text>
    <text x="400" y="510" text-anchor="middle" fill="${COPPER}" font-size="12" font-weight="800" font-family="sans-serif" letter-spacing="4">OFFICIAL TRAINING KIT</text>
  </g>
</svg>
`;

// 11. ANTHEM TRACKSUIT
const anthemTracksuit = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#F4F1E9" />
  <!-- Jacket (Upper) -->
  <g transform="translate(0, 0)">
    <path d="M280 120 L200 150 L100 360 L160 410 L250 310 V520 H550 V310 L640 410 L700 360 L600 150 L520 120 Z" fill="${NAVY}" />
    <line x1="400" y1="120" x2="400" y2="520" stroke="${COPPER}" stroke-width="4" />
    <!-- Porcelain Chevron on Chest -->
    <path d="M250 240 L400 320 L550 240 L550 270 L400 350 L250 270 Z" fill="${PORCELAIN}" />
    ${getCrestFragment(450, 180, 0.9, true)}
  </g>
  <!-- Track Pants (Lower) -->
  <g transform="translate(180, 520)">
    <path d="M60 20 H380 L350 400 L250 400 L220 160 L190 400 L90 400 Z" fill="${NAVY}" stroke="#091722" stroke-width="2" />
    <path d="M60 20 L90 400" stroke="${COPPER}" stroke-width="3" />
    <path d="M380 20 L350 400" stroke="${COPPER}" stroke-width="3" />
    ${getCrestFragment(310, 80, 0.7, true)}
  </g>
</svg>
`;

// 12. HEAVYWEIGHT CLUB HOODIE (Fanwear)
const clubHoodie = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#F4F1E9" />
  <g transform="translate(0, 0)">
    <!-- Hood Layer behind -->
    <path d="M310 170 C310 60 490 60 490 170 Z" fill="#0A1926" stroke="${COPPER}" stroke-width="2" />
    <!-- Main Body & Sleeves in Navy -->
    <path d="M270 170 L190 200 L90 420 L160 480 L240 370 V800 H560 V370 L640 480 L710 420 L610 200 L530 170 Z" fill="${NAVY}" stroke="#091722" stroke-width="2" />
    <!-- Kangaroo Pocket -->
    <path d="M300 580 H500 L530 720 H270 Z" fill="#0C1D2C" stroke="#16344A" stroke-width="2" />
    <!-- Drawstrings with Copper Aglets -->
    <path d="M370 190 V320" stroke="${PORCELAIN}" stroke-width="4" stroke-linecap="round" />
    <rect x="367" y="315" width="6" height="18" fill="${COPPER}" rx="2" />
    <path d="M430 190 V340" stroke="${PORCELAIN}" stroke-width="4" stroke-linecap="round" />
    <rect x="427" y="335" width="6" height="18" fill="${COPPER}" rx="2" />
    <!-- Chenille TF Monogram Patch -->
    <g transform="translate(440, 260) scale(1.6)">
      <path d="M50 5 L88 20 V52 C88 74 50 94 50 94 C50 94 12 74 12 52 V20 L50 5 Z" fill="${NAVY}" stroke="${COPPER}" stroke-width="4"/>
      <path d="M26 28 H74 V36 H55 V76 H45 V36 H26 V28 Z" fill="${PORCELAIN}"/>
      <path d="M48 44 H70 V52 H48 V44 Z" fill="${COPPER}"/>
    </g>
    <!-- Tamil Nadu FC Arched Embroidery -->
    <text x="400" y="470" text-anchor="middle" fill="${PORCELAIN}" font-size="28" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="6">TAMILNADU FC</text>
    <text x="400" y="505" text-anchor="middle" fill="${COPPER}" font-size="12" font-weight="800" font-family="system-ui, sans-serif" letter-spacing="4">EST. 1934 • CHENNAI</text>
  </g>
</svg>
`;

// 13. HERITAGE GRAPHIC TEE (Fanwear)
const graphicTee = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#EAE4D5" />
  <g transform="translate(0, 0)">
    <!-- T-shirt in Porcelain -->
    <path d="M280 180 L230 200 L110 320 L180 430 L250 370 V790 H550 V370 L620 430 L690 320 L570 200 L520 180 Z" fill="${PORCELAIN}" stroke="#D8CFBD" stroke-width="2" />
    <path d="M330 178 C330 220 470 220 470 178 Z" fill="${NAVY}" />
    <!-- Giant Central Architectural Crest Print -->
    ${getCrestFragment(360, 260, 1.6)}
    <text x="400" y="480" text-anchor="middle" fill="${NAVY}" font-size="32" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4">ONE STATE. ONE PASSION.</text>
    <text x="400" y="510" text-anchor="middle" fill="${COPPER}" font-size="14" font-weight="800" font-family="system-ui, sans-serif" letter-spacing="6">TAMILNADU FOOTBALL CLUB</text>
  </g>
</svg>
`;

// 14. MATCHDAY TRAVEL POLO (Fanwear)
const travelPolo = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#F4F1E9" />
  <g transform="translate(0, 0)">
    <!-- Polo in Navy -->
    <path d="M280 180 L230 200 L110 320 L180 430 L250 370 V790 H550 V370 L620 430 L690 320 L570 200 L520 180 Z" fill="${NAVY}" stroke="#091722" stroke-width="2" />
    <!-- Ribbed Porcelain Collar & Placket -->
    <path d="M310 160 L400 240 L490 160 Z" fill="${PORCELAIN}" stroke="${COPPER}" stroke-width="1.5" />
    <rect x="385" y="240" width="30" height="110" fill="${PORCELAIN}" rx="2" />
    <circle cx="400" cy="270" r="4" fill="${NAVY}" />
    <circle cx="400" cy="305" r="4" fill="${NAVY}" />
    <circle cx="400" cy="335" r="4" fill="${NAVY}" />
    <!-- Embroidered Crest -->
    ${getCrestFragment(450, 270, 1.1, true)}
  </g>
</svg>
`;

// 15. OFFICIAL MATCHDAY KNITTED SCARF (Accessories)
const matchScarf = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#EAE4D5" />
  <!-- Scarf folded across diagonal -->
  <g transform="translate(100, 200)">
    <!-- Scarf Body (140px tall, 600px wide bar) -->
    <rect x="0" y="80" width="600" height="150" rx="8" fill="${NAVY}" stroke="#091722" stroke-width="2" />
    <!-- Alternating Bar Stripes -->
    <rect x="0" y="80" width="60" height="150" fill="${COPPER}" />
    <rect x="60" y="80" width="60" height="150" fill="${PORCELAIN}" />
    <rect x="480" y="80" width="60" height="150" fill="${PORCELAIN}" />
    <rect x="540" y="80" width="60" height="150" fill="${COPPER}" />
    <!-- Club Crest on Left and Right -->
    ${getCrestFragment(135, 120, 1.0, true)}
    ${getCrestFragment(425, 120, 1.0, true)}
    <!-- Main Bold Text: TAMILNADU FC -->
    <text x="300" y="155" text-anchor="middle" fill="${PORCELAIN}" font-size="34" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="6">TAMILNADU FC</text>
    <text x="300" y="190" text-anchor="middle" fill="${COPPER}" font-size="14" font-weight="800" font-family="system-ui, sans-serif" letter-spacing="8">ONE STATE. ONE PASSION.</text>
    <!-- Fringes on Left and Right -->
    <g fill="${COPPER}">
      ${Array.from({length: 12}).map((_, i) => `<rect x="-15" y="${85 + i * 12}" width="16" height="5" rx="1" />`).join('')}
      ${Array.from({length: 12}).map((_, i) => `<rect x="600" y="${85 + i * 12}" width="16" height="5" rx="1" />`).join('')}
    </g>

    <!-- Lower Scarf Fold (Reversible view) -->
    <rect x="40" y="300" width="520" height="130" rx="8" fill="${PORCELAIN}" stroke="#D8CFBD" stroke-width="2" />
    <rect x="40" y="300" width="50" height="130" fill="${NAVY}" />
    <rect x="510" y="300" width="50" height="130" fill="${NAVY}" />
    <text x="300" y="365" text-anchor="middle" fill="${NAVY}" font-size="28" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4">THE MARINA WALL</text>
    <text x="300" y="395" text-anchor="middle" fill="${COPPER}" font-size="12" font-weight="800" font-family="system-ui, sans-serif" letter-spacing="6">KAVALAN ULTRAS • EST. 1934</text>
  </g>
</svg>
`;

// 16. SIGNATURE 3D CREST SNAPBACK CAP (Accessories)
const snapbackCap = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#F4F1E9" />
  <g transform="translate(150, 240)">
    <!-- Crown Dome in Navy -->
    <path d="M50 320 C50 140 450 140 450 320 Z" fill="${NAVY}" stroke="#091722" stroke-width="3" />
    <!-- Seam Lines -->
    <path d="M250 140 V320" stroke="#1D3E56" stroke-width="2" />
    <path d="M150 160 C180 230 200 320 200 320" stroke="#1D3E56" stroke-width="2" />
    <path d="M350 160 C320 230 300 320 300 320" stroke="#1D3E56" stroke-width="2" />
    <circle cx="250" cy="140" r="8" fill="${COPPER}" />
    <!-- 3D Silicone Club Crest on Crown -->
    ${getCrestFragment(225, 190, 1.4, true)}
    <!-- Visor/Bill with Copper Under-Visor -->
    <path d="M30 320 C30 320 120 440 250 440 C380 440 470 320 470 320 Z" fill="#0A1824" stroke="${COPPER}" stroke-width="3" />
    <path d="M30 320 C90 380 180 420 250 420 C320 420 410 380 470 320" stroke="${COPPER}" stroke-width="4" fill="none" />
  </g>
</svg>
`;

// 17. SUPPORTER STADIUM FLAG (Accessories)
const supporterFlag = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#EAE4D5" />
  <g transform="translate(100, 240)">
    <!-- Flagpole -->
    <rect x="30" y="0" width="14" height="520" rx="4" fill="#6B7280" />
    <circle cx="37" cy="0" r="10" fill="${COPPER}" />
    <!-- Flag Cloth (Quartered Navy & Copper) -->
    <g transform="translate(44, 20)">
      <rect x="0" y="0" width="260" height="170" fill="${NAVY}" />
      <rect x="260" y="0" width="260" height="170" fill="${COPPER}" />
      <rect x="0" y="170" width="260" height="170" fill="${COPPER}" />
      <rect x="260" y="170" width="260" height="170" fill="${NAVY}" />
      <!-- Giant Shield in Center -->
      ${getCrestFragment(220, 110, 1.8, true)}
      <!-- Slogan Banner -->
      <rect x="40" y="270" width="440" height="40" rx="6" fill="${PORCELAIN}" stroke="${NAVY}" stroke-width="2" />
      <text x="260" y="296" text-anchor="middle" fill="${NAVY}" font-size="18" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4">ONE STATE. ONE PASSION.</text>
    </g>
  </g>
</svg>
`;

// 18. STAINLESS STEEL WATER BOTTLE (Accessories)
const waterBottle = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#F4F1E9" />
  <g transform="translate(280, 160)">
    <!-- Bottle Cap & Loop -->
    <path d="M80 60 H160 V120 H80 Z" fill="${NAVY}" stroke="${COPPER}" stroke-width="2" rx="4" />
    <path d="M100 60 C100 20 140 20 140 60" stroke="${COPPER}" stroke-width="8" fill="none" stroke-linecap="round" />
    <!-- Bottle Flask Body in Matte Atlantic Navy -->
    <rect x="50" y="120" width="140" height="520" rx="24" fill="${NAVY}" stroke="#091722" stroke-width="3" />
    <!-- Copper Grip Band -->
    <rect x="50" y="280" width="140" height="16" fill="${COPPER}" />
    <!-- Laser-Etched Copper Crest on Flask -->
    ${getCrestFragment(95, 340, 1.2, false, true)}
    <text x="120" y="520" text-anchor="middle" fill="${COPPER}" font-size="14" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="3">TAMILNADU FC</text>
    <text x="120" y="540" text-anchor="middle" fill="${PORCELAIN}" font-size="9" font-weight="700" font-family="system-ui, sans-serif" letter-spacing="3">750ML • PRO HYDRATION</text>
  </g>
</svg>
`;

// 19. 1934 LEATHER COMMEMORATIVE MATCH BALL
const matchBall = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#F4F1E9" />
  <g transform="translate(200, 240)">
    <!-- Leather Ball Sphere -->
    <circle cx="200" cy="200" r="190" fill="#B26C3D" stroke="#68391A" stroke-width="4" />
    <!-- Leather Panels and Stitched Seams -->
    <path d="M70 120 C140 180 260 180 330 120" stroke="#5A2E12" stroke-width="4" fill="none" />
    <path d="M70 280 C140 220 260 220 330 280" stroke="#5A2E12" stroke-width="4" fill="none" />
    <path d="M200 10 V390" stroke="#5A2E12" stroke-width="4" />
    <path d="M120 70 V330" stroke="#5A2E12" stroke-width="3" />
    <path d="M280 70 V330" stroke="#5A2E12" stroke-width="3" />
    <!-- Stitched Leather Lacing in Center -->
    <rect x="175" y="160" width="50" height="80" rx="4" fill="#8C4D22" stroke="#5A2E12" stroke-width="2" />
    ${Array.from({length: 6}).map((_, i) => `<line x1="180" y1="${170 + i * 11}" x2="220" y2="${170 + i * 11}" stroke="#F4F1E9" stroke-width="3.5" stroke-linecap="round" />`).join('')}
    <!-- Debossed 1934 Founding Seal -->
    <circle cx="200" cy="300" r="28" fill="#753C16" stroke="#46220B" stroke-width="1.5" />
    <text x="200" y="296" text-anchor="middle" fill="#E8A774" font-size="8" font-weight="900" font-family="sans-serif">EST.</text>
    <text x="200" y="308" text-anchor="middle" fill="#E8A774" font-size="11" font-weight="900" font-family="sans-serif">1934</text>
    <text x="200" y="318" text-anchor="middle" fill="#E8A774" font-size="5" font-weight="800" font-family="sans-serif">TNFC</text>
  </g>
</svg>
`;

// Write files
const files = [
  { path: 'public/merchandise/kits/home-front.svg', content: homeJerseyFront },
  { path: 'public/merchandise/kits/home-back.svg', content: homeJerseyBack },
  { path: 'public/merchandise/kits/home-detail.svg', content: homeJerseyDetail },
  { path: 'public/merchandise/kits/away-front.svg', content: awayJerseyFront },
  { path: 'public/merchandise/kits/third-front.svg', content: thirdJerseyFront },
  { path: 'public/merchandise/kits/gk-front.svg', content: gkJerseyFront },
  { path: 'public/merchandise/kits/shorts-home.svg', content: matchShorts },
  { path: 'public/merchandise/kits/socks-home.svg', content: matchSocks },
  { path: 'public/merchandise/training/drill-top-front.svg', content: trainDrillTop },
  { path: 'public/merchandise/training/train-jersey.svg', content: trainJersey },
  { path: 'public/merchandise/training/tracksuit.svg', content: anthemTracksuit },
  { path: 'public/merchandise/fanwear/hoodie-navy.svg', content: clubHoodie },
  { path: 'public/merchandise/fanwear/graphic-tee.svg', content: graphicTee },
  { path: 'public/merchandise/fanwear/polo-navy.svg', content: travelPolo },
  { path: 'public/merchandise/accessories/scarf-front.svg', content: matchScarf },
  { path: 'public/merchandise/accessories/cap-navy.svg', content: snapbackCap },
  { path: 'public/merchandise/accessories/flag.svg', content: supporterFlag },
  { path: 'public/merchandise/accessories/bottle.svg', content: waterBottle },
  { path: 'public/merchandise/accessories/ball-1934.svg', content: matchBall },
];

files.forEach(f => {
  fs.writeFileSync(path.resolve(f.path), f.content.trim());
  console.log('Created:', f.path);
});

console.log('All authentic merchandise assets generated successfully!');
