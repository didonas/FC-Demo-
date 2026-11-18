import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import { CartDrawer } from "@/components/store/CartDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TAMILNADU FC — One State. One Passion. | Official Club Platform",
  description:
    "The official digital platform of Tamilnadu Football Club. Explore fixtures, match centre, first team squad, official merchandise store, and interactive ticket booking.",
  keywords: [
    "Tamilnadu FC",
    "Tamil Nadu Football",
    "The Meridian Stadium",
    "Indian Super League",
    "Football Tickets",
    "Official Jersey",
  ],
  authors: [{ name: "TAMILNADU FC Digital Agency" }],
  openGraph: {
    title: "TAMILNADU FC — One State. One Passion.",
    description:
      "Official website of Tamilnadu FC. Heritage, Fixtures, First Team, Official Store, and Interactive Matchday Ticketing.",
    siteName: "TAMILNADU FC",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#F4F1E9] text-[#102738] antialiased selection:bg-[#B77A59] selection:text-[#F4F1E9]">
        <CartProvider>
          <SearchProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <SearchOverlay />
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
