import BottomBanner from "@/components/Homepage/BottomBanner/bottom-banner";
import HeroBanner from "@/components/Homepage/HeroBanner/hero-banner";
import ProductNav from "@/components/Homepage/Product-Navigation/product-nav";
import Products from "@/components/Homepage/Product/products";
import SecondBanner from "@/components/Homepage/SecondBanner/second-banner";
import Testimonials from "@/components/Homepage/Testimony/testimonials";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <SecondBanner />
      <Suspense fallback={<div></div>}>
        <ProductNav />
      </Suspense>

      <Products />
      <BottomBanner />
      <Testimonials />
    </>
  );
}
