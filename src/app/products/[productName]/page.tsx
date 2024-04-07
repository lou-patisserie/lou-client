import ProductDetailImgs from "@/components/Product-Detail/product-img-layout";
import ProductOrder from "@/components/Product-Detail/product-order";
import ProductTabs from "@/components/Product-Detail/product-tabs";

export default function ProductDetailPage() {
  return (
    <>
      <div className="flex flex-wrap my-10 mx-auto justify-center gap-10 h-fit">
        <div className="flex flex-col gap-6">
          <ProductDetailImgs />
          <ProductTabs />
        </div>
        <ProductOrder />
      </div>
    </>
  );
}
