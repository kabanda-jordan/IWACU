import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: {
    default: "IWACU — Rwanda's Premier Real Estate Platform",
    template: "%s | IWACU Real Estate",
  },
  description:
    "Discover premium homes, apartments, land and commercial properties across Rwanda. Verified listings, trusted agents, and seamless property transactions.",
  keywords: ["Rwanda real estate", "Kigali property", "buy house Rwanda", "rent apartment Kigali"],
  openGraph: {
    title: "IWACU — Rwanda's Premier Real Estate Platform",
    description: "Find your dream property in Rwanda",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`}>
      <body className="bg-[#0B0B0B] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
