import AboutLou from "@/components/About/about";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";
import JSONLD from "@/components/JSONLD";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded by Audrey, a Le Cordon Bleu alumna, alongside her sister, Vanny, this enchanting patisserie brings together a fusion of culinary worlds in their home country. ",
  keywords: "lou patisserie, pastry & gelato, lou patisserie gading serpong, lou patisserie pastry & gelato",
  authors: [
    {
      name: "Lou Patisserie & Grivo.id",
      url: "https://www.loupatisserie.com/about-us",
    },
  ],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://www.loupatisserie.com/about-us",
    title: "About Us",
    description:
      "Founded by Audrey, a Le Cordon Bleu alumna, alongside her sister, Vanny,  this enchanting patisserie brings together a fusion of culinary worlds in their home country.",
    siteName: "About Us",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/logo%2FLOU%20L%20Symbol%20BG-02.png?alt=media&token=d50eea79-30b8-4622-86e8-ae0023d9c6b1",
      },
    ],
  },
  twitter: {
    title: "About Us",
    card: "summary_large_image",
    site: "https://www.loupatisserie.com/about-us",
    creator: "Lou Patisserie & Grivo.id",
    images: "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/logo%2FLOU%20L%20Symbol%20BG-02.png?alt=media&token=d50eea79-30b8-4622-86e8-ae0023d9c6b1",
  },
};

const aboutUsData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "About Us",
  "url": "https://www.loupatisserie.com/about-us",
  "logo": "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/logo%2FLOU%20L%20Symbol%20BG-02.png?alt=media&token=d50eea79-30b8-4622-86e8-ae0023d9c6b1",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.loupatisserie.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+6281110019906",
    "contactType": "Customer Service",
  },
}

export default function AboutLouPage() {

  return (
    <>
      <JSONLD data={aboutUsData} />
      <SubHeroBanner title="About Us" image="/assets/img/Location.png" />
      <AboutLou />
    </>
  );
}
