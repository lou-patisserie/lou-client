import ProductDetailImgs from "@/components/Product-Detail/product-img-layout";
import ProductOrder from "@/components/Product-Detail/product-order";
import ProductTabs from "@/components/Product-Detail/product-tabs";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";

export default function ProductDetailPage() {
  return (
    <>
      {/* <SubHeroBanner /> */}
      <div className="flex flex-wrap my-16 mx-auto justify-center gap-10 h-fit">
        <div className="flex flex-col gap-6">
          <ProductDetailImgs />
          <ProductTabs />
        </div>
        <ProductOrder />
      </div>
    </>
  );
}
