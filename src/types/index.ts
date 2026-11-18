export type PlayerPosition = "Goalkeeper" | "Defender" | "Midfielder" | "Forward";

export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  cleanSheets?: number;
  minutesPlayed: number;
  passingAccuracy: number; // percentage
  shotAccuracy?: number; // percentage
  tacklesPerMatch?: number;
}

export interface PlayerAttributes {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

export interface Player {
  id: string;
  slug: string;
  name: string;
  shirtNumber: number;
  position: PlayerPosition;
  role: string; // e.g. "Captain & Playmaker"
  nationality: string;
  dateOfBirth: string;
  age: number;
  height: string;
  weight: string;
  preferredFoot: "Right" | "Left" | "Both";
  joinedDate: string;
  image: string;
  portraitImage: string;
  actionImage: string;
  bio: string;
  quote: string;
  stats: PlayerStats;
  attributes: PlayerAttributes;
  careerTimeline: {
    year: string;
    clubOrMilestone: string;
    note: string;
  }[];
}

export interface MatchTeam {
  name: string;
  shortName: string;
  crest: string;
  isHome: boolean;
}

export type MatchStatus = "Upcoming" | "Live" | "Finished" | "Postponed";

export interface MatchEvent {
  minute: number;
  type: "Goal" | "YellowCard" | "RedCard" | "Substitution";
  player: string;
  team: string;
  detail?: string;
}

export interface Match {
  id: string;
  slug: string;
  competition: string;
  competitionBadge?: string;
  roundOrMatchday: string;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  homeScore?: number;
  awayScore?: number;
  date: string;
  kickoffTime: string; // e.g. "19:30 IST"
  stadium: string;
  city: string;
  status: MatchStatus;
  ticketsAvailable: boolean;
  ticketStartingPrice: number;
  broadcast: string;
  preview: string;
  report?: string;
  lineupTNFC?: {
    formation: string;
    startingXI: { number: number; name: string; position: string; x: number; y: number }[];
    substitutes: string[];
    manager: string;
  };
  events?: MatchEvent[];
}

export interface StandingRow {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ("W" | "D" | "L")[];
}

export type ProductCategory = "Kits" | "Training" | "Lifestyle" | "Accessories";

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: string;
  category: ProductCategory;
  price: number; // in INR
  originalPrice?: number;
  badge?: "New Arrival" | "Bestseller" | "Limited Edition" | "Official Match";
  images: {
    front: string;
    back: string;
    detail: string;
    lifestyle?: string;
  };
  sizes: ("XS" | "S" | "M" | "L" | "XL" | "2XL")[];
  description: string;
  features: string[];
  customizable?: boolean; // allow adding name & number
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  customization?: {
    name: string;
    number: string;
  };
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Official Announcement" | "Match Report" | "Interview" | "Club News" | "Academy";
  publishDate: string;
  readTime: string;
  heroImage: string;
  content: string[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  featured?: boolean;
}

export type TicketCategory = "General" | "Premium" | "VIP";

export interface Seat {
  id: string;
  stand: "North Stand" | "South Stand" | "East Stand" | "West Stand";
  tier: "Lower" | "Club" | "Upper";
  row: string;
  number: number;
  category: TicketCategory;
  price: number;
  status: "available" | "selected" | "reserved" | "occupied";
}

export interface BookingDetails {
  bookingId: string;
  matchId: string;
  match: Match;
  seats: Seat[];
  category: TicketCategory;
  quantity: number;
  subtotal: number;
  bookingFee: number;
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  membershipId?: string;
  createdAt: string;
}
