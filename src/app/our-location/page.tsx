import OurLocation from "@/components/Location/location";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";
import JSONLD from "@/components/JSONLD";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Location",
  description:
    "Ruko South Goldfinch Blok E No. 33. Jl. Springs Boulevard, Gading Serpong, Serpong, Tangerang.",
  keywords: "lou patisserie & gelato location, lou patisserie gading serpong, lou patisserie pastry & gelato",
  authors: [
    {
      name: "Lou Patisserie & Grivo.id",
      url: "https://www.loupatisserie.com/our-location",
    },
  ],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://www.loupatisserie.com/our-location",
    title: "Our Location",
    description:
      "Ruko South Goldfinch Blok E No. 33. Jl. Springs Boulevard, Gading Serpong, Serpong, Tangerang.",
    siteName: "Our Location",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/interior%2FLou_Interior%2016.jpg?alt=media&token=e14edff7-d088-492e-af2a-23462c7dd573",
      },
    ],
  },
  twitter: {
    title: "Our Location",
    card: "summary_large_image",
    site: "https://www.loupatisserie.com/our-location",
    creator: "Lou Patisserie & Grivo.id",
    images: "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/interior%2FLou_Interior%2016.jpg?alt=media&token=e14edff7-d088-492e-af2a-23462c7dd573",
  },
};

const locationData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Our Location",
  "description": "Ruko South Goldfinch Blok E No. 33. Jl. Springs Boulevard, Gading Serpong, Serpong, Tangerang.",
  "url": "https://www.loupatisserie.com/our-location",
  "logo": "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/interior%2FLou_Interior%2016.jpg?alt=media&token=e14edff7-d088-492e-af2a-23462c7dd573",
  "image": [
    "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/interior%2FLou_Interior%2016.jpg?alt=media&token=e14edff7-d088-492e-af2a-23462c7dd573",
  ],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.loupatisserie.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "telephone": "+6281110019906",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jalan Boulevard Raya Gading Serpong, Ruko Paramount",
    "addressLocality": "Tangerang",
    "addressRegion": "Banten",
    "postalCode": "15810",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.216475068669308,
    "longitude": 106.63971749413524
  },
  "openingHours": "Tu,We,Th,Fr,Sa,Su 9:00-22:00",
};

export default function OurLocationPage() {
  return (
    <>
      <JSONLD data={locationData} />
      <SubHeroBanner title="Our Location" image="/assets/img/Location.png" />
      <OurLocation />
    </>
  );
}
