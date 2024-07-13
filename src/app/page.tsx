import FAQs from "@/components/FAQ/faqs";
import BottomBanner from "@/components/Homepage/BottomBanner/bottom-banner";
import HeroBanner from "@/components/Homepage/HeroBanner/hero-banner";
import ProductNav from "@/components/Homepage/Product-Navigation/product-nav";
import Products from "@/components/Homepage/Product/products";
import SecondBanner from "@/components/Homepage/SecondBanner/second-banner";
import Testimonials from "@/components/Homepage/Testimony/testimonials";
import { Suspense } from "react";
import { Metadata } from "next";
import JSONLD from "@/components/JSONLD";

export const metadata: Metadata = {
  title: "Lou Patisserie & Gelato | Celebration of Sweet Moments",
  description:
    "Welcome to Lou Patisserie, where the delicate artistry of French pastry meets the vibrant flavors of Indonesia. Founded by Audrey, a Le Cordon Bleu alumna, alongside her sister, Vanny,  this enchanting patisserie brings together a fusion of culinary worlds in their home country. ",
  keywords: "lou patisserie, pastry & gelato, lou patisserie gading serpong, lou patisserie pastry & gelato",
  authors: [
    {
      name: "Lou Patisserie & Grivo.id",
      url: "https://www.loupatisserie.com",
    },
  ],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://www.loupatisserie.com",
    title: "Lou Patisserie & Gelato | Celebration of Sweet Moments",
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
    title: "Lou Patisserie & Gelato | Celebration of Sweet Moments",
    card: "summary_large_image",
    site: "https://www.loupatisserie.com",
    creator: "Lou Patisserie & Grivo.id",
    images: "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/logo%2FLOU%20L%20Symbol%20BG-02.png?alt=media&token=d50eea79-30b8-4622-86e8-ae0023d9c6b1",
  },
};

const HomepageJSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://www.loupatisserie.com/",
  "name": "Lou Patisserie & Gelato | Celebration of Sweet Moments",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.loupatisserie.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

export default function Home() {
  return (
    <>
      <JSONLD data={HomepageJSONLD} />
      <HeroBanner />
      <SecondBanner />
      <Suspense fallback={<div></div>}>
        <ProductNav />
      </Suspense>

      <Products />
      <BottomBanner />
      <Testimonials />
      <div className="flex flex-wrap mt-10 md:mt-16 mx-auto justify-center gap-4 lg:gap-10 h-fit bg-luoBiege py-10">
        <FAQs />
      </div>
    </>
  );
}
