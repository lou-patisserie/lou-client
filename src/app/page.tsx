import HeroBanner from "@/components/Homepage/HeroBanner/hero-banner";
import SecondBanner from "@/components/Homepage/SecondBanner/second-banner";
import NavHeader from "@/components/Layout/nav-head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <SecondBanner />
      <h1 className="text-2xl">test</h1>
    </>
  );
}
