import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

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
    <html lang="en" suppressHydrationWarning>
      <head>
         <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
         <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-background font-body-md antialiased selection:bg-primary selection:text-on-primary min-h-screen">
        <Navbar />
        <Sidebar />
        <div className="pt-20 lg:pt-0 lg:ml-64 min-h-screen pb-xl w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
