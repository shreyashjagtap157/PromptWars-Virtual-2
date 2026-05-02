import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/Providers";

import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-noto-devanagari",
});

export const metadata: Metadata = {
  title: "CivicGuide | Verified Election Roadmap & Voter Education",
  description: "Navigate the voting process with confidence. CivicGuide provides localized, verified election protocols and progress tracking for an empowered civic participation.",
  keywords: ["election", "voting", "voter guide", "roadmap", "civic engagement", "India elections", "USA elections"],
  authors: [{ name: "CivicGuide Team" }],
  openGraph: {
    title: "CivicGuide | Your Election Process, Simplified",
    description: "Verified election roadmaps and localized voter protocols designed for every citizen.",
    type: "website",
    locale: "en_US",
    siteName: "CivicGuide",
  },
  twitter: {
    card: "summary_large_image",
    title: "CivicGuide | Your Election Process, Simplified",
    description: "Verified election roadmaps and localized voter protocols.",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoDevanagari.variable}`} suppressHydrationWarning>
      <body className="bg-background text-on-background font-body-md antialiased selection:bg-primary selection:text-on-primary min-h-screen">
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-on-primary focus:rounded-xl focus:font-bold focus:shadow-2xl">
          Skip to main content
        </a>
        <Providers>
          <Navbar />
          <Sidebar />
          <main id="main-content" className="pt-20 lg:pt-0 lg:ml-64 min-h-screen pb-xl flex flex-col focus:outline-none" tabIndex={-1}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
