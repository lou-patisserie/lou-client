import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";

import TopSubscribe from "@/components/UI/Top-Subscribe/top-subscribe";
import NavHeader from "@/components/Layout/nav-head";
import Footer from "@/components/Layout/footer";

export const metadata: Metadata = {
  title: "Luo Patisserie",
  description: "Dive into our luxurious gelato, crafted with the finest ingredients for a smooth, velvety texture and irresistible taste. Treat yourself to the best of both worlds with Lou Patisserie.",
  keywords: "lou patisserie, pastry & gelato, lou patisserie gading serpong, lou patisserie pastry & gelato",
  authors: [{
    name: "Lou Patisserie & Grivo.id",
    url: "https://wwww.loupatisserie.com",
  }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://wwww.loupatisserie.com",
    title: "Luo Patisserie",
    description: "Dive into our luxurious gelato, crafted with the finest ingredients for a smooth, velvety texture and irresistible taste. Treat yourself to the best of both worlds with Lou Patisserie.",
    siteName: "Lou Patisserie",
    images: [{
      url: "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/logo%2FLOU%20L%20Symbol%20BG-02.png?alt=media&token=d50eea79-30b8-4622-86e8-ae0023d9c6b1",
    }],
  },
  twitter: { card: "summary_large_image", site: "https://wwww.loupatisserie.com", creator: "Lou Patisserie & Grivo.id", "images": "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/logo%2FLOU%20L%20Symbol%20BG-02.png?alt=media&token=d50eea79-30b8-4622-86e8-ae0023d9c6b1" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className={`${cn(GeistSans.variable)}`}>
        <div className="absolute inset-x-0 top-0">
          <TopSubscribe />
          <NavHeader />
        </div>
        <main>{children}</main>
        <div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
