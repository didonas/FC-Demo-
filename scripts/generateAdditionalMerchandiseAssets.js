const fs = require('fs');
const path = require('path');

const NAVY = "#102738";
const PORCELAIN = "#F4F1E9";
const COPPER = "#B77A59";
const SEAGLASS = "#64847D";

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

// 1. AWAY JERSEY BACK
const awayJerseyBack = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGAwayB" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#1E384D" />
      <stop offset="100%" stopColor="#0B1A24" />
    </radialGradient>
    <linearGradient id="bodyGAwayB" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#142F43" />
      <stop offset="100%" stopColor="#0E2333" />
    </linearGradient>
    <filter id="shadowAwayB" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.3" />
    </filter>
  </defs>

  <rect width="800" height="960" rx="32" fill="url(#bgGAwayB)" />

  <g filter="url(#shadowAwayB)">
    <path d="M280 180 L230 200 L110 320 L180 430 L250 370 V790 C250 810 270 820 290 820 H510 C530 820 550 810 550 790 V370 L620 430 L690 320 L570 200 L520 180 Z" fill="url(#bodyGAwayB)" stroke="#224866" stroke-width="2" />
    <path d="M110 320 L135 348 L180 430 L155 402 Z" fill="${PORCELAIN}" />
    <path d="M135 348 L142 356 L162 410 L155 402 Z" fill="${COPPER}" />
    <path d="M690 320 L665 348 L620 430 L645 402 Z" fill="${PORCELAIN}" />
    <path d="M665 348 L658 356 L638 410 L645 402 Z" fill="${COPPER}" />

    <path d="M330 178 C330 200 470 200 470 178 Z" fill="${PORCELAIN}" />
    <text x="400" y="222" text-anchor="middle" fill="${COPPER}" font-size="10" font-weight="800" font-family="sans-serif" letter-spacing="3">ONE STATE. ONE PASSION.</text>

    <!-- Player Name: SENTHIL -->
    <text x="400" y="340" text-anchor="middle" fill="${PORCELAIN}" font-size="44" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="8">SENTHIL</text>

    <!-- Big Player Number: 7 -->
    <g transform="translate(400, 520)">
      <text x="0" y="0" text-anchor="middle" fill="${PORCELAIN}" font-size="180" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4">7</text>
      <text x="4" y="4" text-anchor="middle" fill="none" stroke="${COPPER}" stroke-width="2" font-size="180" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4" opacity="0.8">7</text>
      <circle cx="20" cy="20" r="12" fill="${COPPER}" />
      <path d="M20 12 L28 16 V24 C28 29 20 32 20 32 C20 32 12 29 12 24 V16 Z" fill="${NAVY}" />
    </g>
  </g>
</svg>
`;

// 2. AWAY JERSEY DETAIL
const awayJerseyDetail = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgAwayDet" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#1E384D" />
      <stop offset="100%" stopColor="#0B1A24" />
    </radialGradient>
    <pattern id="marineCurrentsZoom" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M0 40 Q20 25 40 40 T80 40" fill="none" stroke="#255172" stroke-width="3" opacity="0.6" />
      <path d="M0 20 Q20 5 40 20 T80 20" fill="none" stroke="#326790" stroke-width="2" opacity="0.4" />
    </pattern>
  </defs>

  <rect width="800" height="960" rx="32" fill="url(#bgAwayDet)" />
  <rect x="50" y="50" width="700" height="860" rx="24" fill="#142F43" stroke="#224866" stroke-width="2" />
  <rect x="50" y="50" width="700" height="860" rx="24" fill="url(#marineCurrentsZoom)" />

  <g transform="translate(400, 420) scale(4.5)">
    <g transform="translate(-25, -40)">
      <polygon points="25,0 27,4.5 32,4.8 28.5,7.8 29.5,12.5 25,10 20.5,12.5 21.5,7.8 18,4.8 23,4.5" fill="${COPPER}" stroke="#FFF" stroke-width="0.5"/>
      <path d="M25 8 L46 16 V38 C46 54 25 70 25 70 C25 70 4 54 4 38 V16 L25 8 Z" fill="${PORCELAIN}" stroke="${COPPER}" stroke-width="2.5"/>
      <path d="M7 18 L25 12 L43 18 V26 L25 21 L7 26 V18 Z" fill="${COPPER}"/>
      <text x="25" y="20.5" text-anchor="middle" fill="${NAVY}" font-size="4.2" font-weight="900" font-family="sans-serif">TAMILNADU</text>
      <path d="M25 27 L32 40 H18 L25 27 Z" fill="${NAVY}"/>
      <circle cx="25" cy="25" r="1.5" fill="${COPPER}"/>
      <rect x="17" y="54" width="16" height="8" rx="2" fill="#0A1824" stroke="${COPPER}" stroke-width="1"/>
      <text x="25" y="60.5" text-anchor="middle" fill="${PORCELAIN}" font-size="5" font-weight="800" font-family="sans-serif">FC</text>
      <text x="25" y="66" text-anchor="middle" fill="${COPPER}" font-size="3" font-weight="700" font-family="sans-serif">EST. 1934</text>
    </g>
  </g>

  <rect x="80" y="810" width="640" height="70" rx="16" fill="${NAVY}" stroke="${COPPER}" stroke-width="1" />
  <text x="120" y="842" fill="${PORCELAIN}" font-size="16" font-weight="800" font-family="sans-serif">The Atlantic — Ocean Currents Micro-Weave</text>
  <text x="120" y="862" fill="${COPPER}" font-size="12" font-weight="600" font-family="sans-serif">Silicone White Crest with Burnished Copper Border Trims</text>
</svg>
`;

// 3. THIRD JERSEY BACK
const thirdJerseyBack = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGThirdB" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#E4ECE9" />
      <stop offset="100%" stopColor="#C4D5D0" />
    </radialGradient>
    <linearGradient id="bodyGThirdB" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#6E8E87" />
      <stop offset="100%" stopColor="#55756E" />
    </linearGradient>
    <filter id="shadowThirdB" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#102738" flood-opacity="0.16" />
    </filter>
  </defs>

  <rect width="800" height="960" rx="32" fill="url(#bgGThirdB)" />

  <g filter="url(#shadowThirdB)">
    <path d="M280 180 L230 200 L110 320 L180 430 L250 370 V790 C250 810 270 820 290 820 H510 C530 820 550 810 550 790 V370 L620 430 L690 320 L570 200 L520 180 Z" fill="url(#bodyGThirdB)" stroke="#4A6861" stroke-width="2" />
    <path d="M110 320 L135 348 L180 430 L155 402 Z" fill="${NAVY}" />
    <path d="M135 348 L142 356 L162 410 L155 402 Z" fill="${COPPER}" />
    <path d="M690 320 L665 348 L620 430 L645 402 Z" fill="${NAVY}" />
    <path d="M665 348 L658 356 L638 410 L645 402 Z" fill="${COPPER}" />

    <path d="M330 178 L400 220 L470 178 Z" fill="${NAVY}" />
    <text x="400" y="240" text-anchor="middle" fill="${COPPER}" font-size="10" font-weight="800" font-family="sans-serif" letter-spacing="3">ONE STATE. ONE PASSION.</text>

    <!-- Player Name: PRAVEEN -->
    <text x="400" y="340" text-anchor="middle" fill="${NAVY}" font-size="44" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="8">PRAVEEN</text>

    <!-- Big Player Number: 8 -->
    <g transform="translate(400, 520)">
      <text x="0" y="0" text-anchor="middle" fill="${NAVY}" font-size="180" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4">8</text>
      <text x="4" y="4" text-anchor="middle" fill="none" stroke="${COPPER}" stroke-width="2" font-size="180" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4" opacity="0.7">8</text>
      <circle cx="20" cy="20" r="12" fill="${COPPER}" />
      <path d="M20 12 L28 16 V24 C28 29 20 32 20 32 C20 32 12 29 12 24 V16 Z" fill="${PORCELAIN}" />
    </g>
  </g>
</svg>
`;

// 4. THIRD JERSEY DETAIL
const thirdJerseyDetail = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#E4ECE9" />
  <rect x="50" y="50" width="700" height="860" rx="24" fill="#6E8E87" stroke="#4A6861" stroke-width="2" />
  <!-- Atlantic Navy Chevron Cut -->
  <path d="M50 350 L400 550 L750 350 V100 H50 Z" fill="${NAVY}" />
  <path d="M50 350 L400 550 L750 350" stroke="${COPPER}" stroke-width="8" fill="none" />

  <g transform="translate(400, 320) scale(4)">
    <g transform="translate(-25, -40)">
      <polygon points="25,0 27,4.5 32,4.8 28.5,7.8 29.5,12.5 25,10 20.5,12.5 21.5,7.8 18,4.8 23,4.5" fill="${COPPER}" stroke="#FFF" stroke-width="0.5"/>
      <path d="M25 8 L46 16 V38 C46 54 25 70 25 70 C25 70 4 54 4 38 V16 L25 8 Z" fill="${PORCELAIN}" stroke="${COPPER}" stroke-width="2.5"/>
      <path d="M7 18 L25 12 L43 18 V26 L25 21 L7 26 V18 Z" fill="${COPPER}"/>
      <text x="25" y="20.5" text-anchor="middle" fill="${NAVY}" font-size="4.2" font-weight="900" font-family="sans-serif">TAMILNADU</text>
      <path d="M25 27 L32 40 H18 L25 27 Z" fill="${NAVY}"/>
      <circle cx="25" cy="25" r="1.5" fill="${COPPER}"/>
      <rect x="17" y="54" width="16" height="8" rx="2" fill="#0A1824" stroke="${COPPER}" stroke-width="1"/>
      <text x="25" y="60.5" text-anchor="middle" fill="${PORCELAIN}" font-size="5" font-weight="800" font-family="sans-serif">FC</text>
      <text x="25" y="66" text-anchor="middle" fill="${COPPER}" font-size="3" font-weight="700" font-family="sans-serif">EST. 1934</text>
    </g>
  </g>

  <rect x="80" y="810" width="640" height="70" rx="16" fill="${NAVY}" stroke="${COPPER}" stroke-width="1" />
  <text x="120" y="842" fill="${PORCELAIN}" font-size="16" font-weight="800" font-family="sans-serif">The Horizon — Sea Glass & Navy Chevron Seam Detail</text>
  <text x="120" y="862" fill="${COPPER}" font-size="12" font-weight="600" font-family="sans-serif">Recycled Ocean Plastic AeroWeave™ Construction</text>
</svg>
`;

// 5. GOALKEEPER JERSEY BACK
const gkJerseyBack = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGGkB" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#FFF2E8" />
      <stop offset="100%" stopColor="#E0C2AF" />
    </radialGradient>
    <linearGradient id="bodyGGkB" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#D98A52" />
      <stop offset="100%" stopColor="#B36531" />
    </linearGradient>
    <filter id="shadowGkB" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#102738" flood-opacity="0.16" />
    </filter>
  </defs>

  <rect width="800" height="960" rx="32" fill="url(#bgGGkB)" />

  <g filter="url(#shadowGkB)">
    <path d="M280 180 L230 200 L110 320 L180 430 L250 370 V790 C250 810 270 820 290 820 H510 C530 820 550 810 550 790 V370 L620 430 L690 320 L570 200 L520 180 Z" fill="url(#bodyGGkB)" stroke="#8C4B20" stroke-width="2" />
    
    <path d="M330 178 C330 200 470 200 470 178 Z" fill="${NAVY}" />
    <text x="400" y="222" text-anchor="middle" fill="${PORCELAIN}" font-size="10" font-weight="800" font-family="sans-serif" letter-spacing="3">ONE STATE. ONE PASSION.</text>

    <!-- Player Name: ELANGO -->
    <text x="400" y="340" text-anchor="middle" fill="${NAVY}" font-size="44" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="8">ELANGO</text>

    <!-- Big Player Number: 1 -->
    <g transform="translate(400, 520)">
      <text x="0" y="0" text-anchor="middle" fill="${NAVY}" font-size="180" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4">1</text>
      <text x="4" y="4" text-anchor="middle" fill="none" stroke="${PORCELAIN}" stroke-width="2" font-size="180" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="4" opacity="0.8">1</text>
      <circle cx="20" cy="20" r="12" fill="${PORCELAIN}" />
      <path d="M20 12 L28 16 V24 C28 29 20 32 20 32 C20 32 12 29 12 24 V16 Z" fill="${NAVY}" />
    </g>
  </g>
</svg>
`;

// 6. GOALKEEPER JERSEY DETAIL
const gkJerseyDetail = `
<svg width="800" height="960" viewBox="0 0 800 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="960" rx="32" fill="#FFF2E8" />
  <rect x="50" y="50" width="700" height="860" rx="24" fill="#D98A52" stroke="#8C4B20" stroke-width="2" />

  <!-- High abrasion forearm grip pattern -->
  <g fill="${NAVY}" opacity="0.85">
    ${Array.from({length: 8}).map((_, i) => `
      <rect x="120" y="${180 + i * 45}" width="220" height="24" rx="12" />
      <rect x="460" y="${180 + i * 45}" width="220" height="24" rx="12" />
    `).join('')}
  </g>

  <g transform="translate(400, 580) scale(3.5)">
    <g transform="translate(-25, -40)">
      <polygon points="25,0 27,4.5 32,4.8 28.5,7.8 29.5,12.5 25,10 20.5,12.5 21.5,7.8 18,4.8 23,4.5" fill="${COPPER}" stroke="#FFF" stroke-width="0.5"/>
      <path d="M25 8 L46 16 V38 C46 54 25 70 25 70 C25 70 4 54 4 38 V16 L25 8 Z" fill="${NAVY}" stroke="${PORCELAIN}" stroke-width="2.5"/>
      <path d="M7 18 L25 12 L43 18 V26 L25 21 L7 26 V18 Z" fill="${PORCELAIN}"/>
      <text x="25" y="20.5" text-anchor="middle" fill="${NAVY}" font-size="4.2" font-weight="900" font-family="sans-serif">TAMILNADU</text>
      <path d="M25 27 L32 40 H18 L25 27 Z" fill="${PORCELAIN}"/>
      <circle cx="25" cy="25" r="1.5" fill="${COPPER}"/>
      <rect x="17" y="54" width="16" height="8" rx="2" fill="#0A1824" stroke="${COPPER}" stroke-width="1"/>
      <text x="25" y="60.5" text-anchor="middle" fill="${PORCELAIN}" font-size="5" font-weight="800" font-family="sans-serif">FC</text>
    </g>
  </g>

  <rect x="80" y="810" width="640" height="70" rx="16" fill="${NAVY}" stroke="${COPPER}" stroke-width="1" />
  <text x="120" y="842" fill="${PORCELAIN}" font-size="16" font-weight="800" font-family="sans-serif">The Guardian — High-Abrasion Forearm Grip Zone</text>
  <text x="120" y="862" fill="${COPPER}" font-size="12" font-weight="600" font-family="sans-serif">Shock-Absorbing Silicone Ribbing for Goalkeeper Grip Control</text>
</svg>
`;

// Additional Assets List
const additionalFiles = [
  { path: 'public/merchandise/kits/away-back.svg', content: awayJerseyBack },
  { path: 'public/merchandise/kits/away-detail.svg', content: awayJerseyDetail },
  { path: 'public/merchandise/kits/third-back.svg', content: thirdJerseyBack },
  { path: 'public/merchandise/kits/third-detail.svg', content: thirdJerseyDetail },
  { path: 'public/merchandise/kits/gk-back.svg', content: gkJerseyBack },
  { path: 'public/merchandise/kits/gk-detail.svg', content: gkJerseyDetail },
];

additionalFiles.forEach(f => {
  fs.writeFileSync(path.resolve(f.path), f.content.trim());
  console.log('Created additional asset:', f.path);
});
