import ProductDetailImgs from "@/components/Product-Detail/product-img-layout";
import ProductOrder from "@/components/Product-Detail/product-order";
import ProductTabs from "@/components/Product-Detail/product-tabs";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";


export default function ProductDetailPage() {
  return (
    <>
      <SubHeroBanner title="Product Details" />
      <div className="flex flex-wrap my-10 md:my-16 mx-auto justify-center gap-4 lg:gap-10 h-fit ">
        <div className="flex flex-col gap-6">
          <ProductDetailImgs />
          <div className="">
            <ProductTabs />
          </div>
        </div>
        <div className="flex flex-col w-full max-w-lg  border lg:border-none lg:shadow-none lg:py-0 lg:mx-0 border-luoBiege shadow-md rounded-lg py-4 mx-4">
          <ProductOrder />
        </div>
        {/* <div className="relative md:hidden">
          <ProductTabs />
        </div> */}
      </div>
    </>
  );
}
