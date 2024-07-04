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

export const metadata: Metadata = {
  title: "Lou Patisserie | Celebration of Sweet Moments",
  description:
    "Welcome to Lou Patisserie, where the delicate artistry of French pastry meets the vibrant flavors of Indonesia. Founded by Audrey, a Le Cordon Bleu alumna, alongside her sister, Vanny,  this enchanting patisserie brings together a fusion of culinary worlds in their home country. ",
  keywords: "lou patisserie, pastry & gelato, lou patisserie gading serpong, lou patisserie pastry & gelato",
  authors: [
    {
      name: "Lou Patisserie & Grivo.id",
      url: "https://wwww.loupatisserie.com",
    },
  ],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://wwww.loupatisserie.com",
    title: "Luo Patisserie",
    description:
      "Welcome to Lou Patisserie, where the delicate artistry of French pastry meets the vibrant flavors of Indonesia. Founded by Audrey, a Le Cordon Bleu alumna, alongside her sister, Vanny,  this enchanting patisserie brings together a fusion of culinary worlds in their home country. ",
    siteName: "Lou Patisserie",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/logo%2FLOU%20L%20Symbol%20BG-02.png?alt=media&token=d50eea79-30b8-4622-86e8-ae0023d9c6b1",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://wwww.loupatisserie.com",
    creator: "Lou Patisserie & Grivo.id",
    images: "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/logo%2FLOU%20L%20Symbol%20BG-02.png?alt=media&token=d50eea79-30b8-4622-86e8-ae0023d9c6b1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body id="portal" className={`${cn(GeistSans.variable)} `}>
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
