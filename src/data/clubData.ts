export interface Trophy {
  id: string;
  name: string;
  count: number;
  years: string[];
  icon: string;
  description: string;
}

export interface ClubTimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface BoardMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const clubData = {
  name: "TAMILNADU FC",
  fullName: "TAMILNADU FOOTBALL CLUB",
  shortName: "TNFC",
  slogan: "ONE STATE. ONE PASSION.",
  nickname: "The Coromandel Mariners / Kavalargal",
  foundedYear: 1934,
  foundingCity: "Chennai, Tamil Nadu, India",
  homeVenue: "The Meridian Stadium",
  capacity: "62,500",
  currentManager: "Gabriel Santana",
  clubCaptain: "Arjun Varadhan (#10)",
  president: "Dr. K. Sundararajan",
  
  overview:
    "TAMILNADU FC is a premier football institution embodying the pride, heritage, and sporting spirit of Tamil Nadu. Founded in 1934 along the historic Coromandel Coast, the club has evolved from colonial beach-side tournaments into an internationally recognized powerhouse celebrated for dynamic attacking football, unmatched supporter devotion, and the world-class Meridian Stadium.",

  mission:
    "To unite millions across Tamil Nadu and the global diaspora through the universal language of football, upholding unwavering excellence, community development, and sporting integrity.",

  philosophy: {
    title: "The Art of Courage & Precision",
    description:
      "Our football philosophy draws inspiration from Tamil architectural geometry and coastal fortitude: structured defensively like ancient granite temples, fluid and relentless in transition like the Bay of Bengal waves, and executed with technical mastery.",
    pillars: [
      {
        title: "Coastal Fortitude",
        detail: "Grit and endurance that resists all storms, from opening whistle to the 96th minute.",
      },
      {
        title: "Architectural Precision",
        detail: "Strict geometric spacing in possession, rapid triangular overloads, and ruthless efficiency.",
      },
      {
        title: "People's Passion",
        detail: "We do not merely play for points; we carry the aspirations of 76 million people with every sprint.",
      },
    ],
  },

  trophies: [
    {
      id: "super-league",
      name: "National Super League Championship",
      count: 4,
      years: ["2018", "2021", "2024", "2026"],
      icon: "trophy",
      description: "Premier division champions of Indian professional football.",
    },
    {
      id: "federation-cup",
      name: "All-India Federation Cup",
      count: 6,
      years: ["1976", "1983", "1994", "2007", "2019", "2023"],
      icon: "award",
      description: "Prestigious national knockout tournament.",
    },
    {
      id: "durand-cup",
      name: "Historic Durand Cup",
      count: 5,
      years: ["1958", "1969", "1982", "2015", "2025"],
      icon: "shield",
      description: "The oldest football tournament in Asia.",
    },
    {
      id: "asian-challenge",
      name: "Asian Continental Challenge Cup",
      count: 2,
      years: ["2022", "2025"],
      icon: "globe",
      description: "Continental triumphs against leading Asian clubs.",
    },
  ] as Trophy[],

  timeline: [
    {
      year: "1934",
      title: "Founding at the Marina Sands",
      description:
        "Maritime merchants, university athletes, and local sportsmen unite under the Coromandel sky to establish Tamilnadu Football Club, playing initial friendlies against visiting sailors.",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    },
    {
      year: "1958",
      title: "Historic Durand Cup Triumph",
      description:
        "Led by legendary forward S. Ramanathan, TNFC secures its maiden national silver in New Delhi, putting Southern football firmly on the map.",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    },
    {
      year: "1982",
      title: "The Golden Era & The Marina Roar",
      description:
        "An invincible 28-match unbeaten home run creates the famed 'Marina Roar', capturing both the Federation Cup and Rovers Cup in a solitary season.",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
    },
    {
      year: "2014",
      title: "Inauguration of The Meridian Stadium",
      description:
        "A 62,500-seat architectural marvel opens on Chennai's coastal boulevard, featuring cutting-edge hybrid turf and cantilevered sound-amplifying roofs.",
      image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1200&q=80",
    },
    {
      year: "2026",
      title: "A New Continental Chapter",
      description:
        "Under manager Gabriel Santana and captain Arjun Varadhan, Tamilnadu FC enters a golden era of modern attacking football, setting records across domestic and Asian competitions.",
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80",
    },
  ] as ClubTimelineEvent[],

  stadiumDetails: {
    name: "The Meridian Stadium",
    capacity: 62500,
    surface: "SISGrass Hybrid Reinforced Natural Turf",
    openedYear: 2014,
    location: "Meridian Coastal Way, Marina Promenade, Chennai 600004",
    architect: "Foster + Coromandel Studio",
    features: [
      "360° Cantilevered acoustic roof maximizing vocal resonance",
      "5-Star UEFA and AFC elite stadium accreditation",
      "84 Executive VIP Luxury Suites & Directors Terrace",
      "Direct rapid transit station link (Meridian Metro Stop)",
      "Zero-carbon solar canopy generating 40% of matchday energy",
    ],
  },

  academyDetails: {
    name: "The Kovil Youth Academy",
    location: "Mahabalipuram Sports Science Complex",
    director: "Matteo Bianchi",
    graduatesInFirstTeam: 9,
    motto: "Heritage of Craft, Future of Football",
    tiers: ["Under-15", "Under-18", "Under-21 Reserves"],
  },

  board: [
    {
      name: "Dr. K. Sundararajan",
      role: "Club President & Co-Founder",
      bio: "Visionary sports administrator and industrialist dedicated to building a sustainable football legacy in South Asia.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Gabriel Santana",
      role: "Head Coach / Technical Director",
      bio: "Former European tactician who revolutionized the club's high-pressing, vertical possession game model.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Priya Chandrasekar",
      role: "Chief Executive Officer",
      bio: "Former executive at leading global sports agencies overseeing club commercial growth, digital innovation and global partnerships.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Matteo Bianchi",
      role: "Head of Youth Development",
      bio: "Renowned youth scout having developed international players across Italy and Spain before helming The Kovil Academy.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    },
  ] as BoardMember[],

  supporters: {
    name: "Kavalargal (The Guardians)",
    established: 1982,
    homeStand: "North Stand (The Marina Wall)",
    membershipCount: "145,000+ registered global members",
    chants: [
      "Solai Vanam Pogathe, TNFC Vellum Thaan!",
      "From Marina Beach to the Asian Sky!",
      "One State, One Heart, One Passion!",
    ],
  },
};
