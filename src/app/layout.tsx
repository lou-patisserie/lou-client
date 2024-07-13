import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import TopSubscribe from "@/components/UI/Top-Subscribe/top-subscribe";
import NavHeader from "@/components/Layout/nav-head";
import Footer from "@/components/Layout/footer";
import TopLayoutProvider from "@/provider/Layout-Provider/top-layout-provider";
import { Toaster } from "@/components/UI/toaster";
import Providers from "@/provider/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body id="portal" className={`${cn(GeistSans.variable)} relative`}>
        <Providers>
          <TopLayoutProvider />
          <main className="min-h-screen">{children}<Analytics /> <SpeedInsights /></main>
          <Toaster />
          <div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
