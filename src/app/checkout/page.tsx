import Checkout from "@/components/Checkout/checkout";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your purchase at Lou Patisserie. Indulge in our exquisite selection of pastries, cakes, and gelato, handcrafted with passion and precision. Enjoy a seamless and secure checkout experience with us.",
  keywords:
    "Lou Patisserie checkout, buy pastries online, order cakes online, secure checkout, Lou Patisserie Gading Serpong, purchase pastries",
  authors: [
    {
      name: "Lou Patisserie & Grivo.id",
      url: "https://www.loupatisserie.com/checkout",
    },
  ],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://www.loupatisserie.com/checkout",
    title: "Checkout",
    description:
      "Finalize your order for our premium pastries, cakes, and gelato. Lou Patisserie ensures a delightful and secure shopping experience. Indulge in the best of artisanal bakery goods.",
    siteName: "Lou Patisserie",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/logo%2FLOU%20L%20Symbol%20BG-02.png?alt=media&token=d50eea79-30b8-4622-86e8-ae0023d9c6b1",
        alt: "Lou Patisserie Logo",
      },
    ],
  },
  twitter: {
    title: "Checkout",
    card: "summary_large_image",
    site: "@LouPatisserie",
    creator: "@LouPatisserie",
    images: "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/logo%2FLOU%20L%20Symbol%20BG-02.png?alt=media&token=d50eea79-30b8-4622-86e8-ae0023d9c6b1",
  },
};

export default function CheckOutPage() {
  return (
    <>
      <SubHeroBanner height="h-60" title="Checkout" image="/assets/img/Checkout.png" />
      <div className="flex flex-wrap my-10 md:my-16 mx-auto justify-center">
        <Checkout />
      </div>
    </>
  );
}
