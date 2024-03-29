import HeroBanner from "@/components/Homepage/HeroBanner/hero-banner";
import ProductNav from "@/components/Homepage/Product-Navigation/product-nav";
import Products from "@/components/Homepage/Product/products";
import SecondBanner from "@/components/Homepage/SecondBanner/second-banner";


export default function Home() {
  return (
    <>
      <HeroBanner />
      <SecondBanner />
      <ProductNav />
      <Products />
    </>
  );
}
