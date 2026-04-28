import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CivicGuide - Your Election Process, Simplified",
  description: "Navigate the voting process with confidence. Clear, accurate, and localized information designed to empower your civic participation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-background text-on-background font-body-md antialiased selection:bg-primary selection:text-on-primary min-h-screen">
        <Providers>
          <Navbar />
          <Sidebar />
          <div className="pt-20 lg:pt-0 lg:ml-64 min-h-screen pb-xl flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
