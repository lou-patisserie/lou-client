import ProductDetails from "@/components/Product-Detail/product-details";
import ProductDetailImgs from "@/components/Product-Detail/product-img-layout";

export default function ProductDetailPage() {
  return (
    <>
      <div className="flex flex-wrap mt-10 mx-auto justify-center gap-2 h-fit">
        <ProductDetailImgs />
        <ProductDetails />
      </div>
    </>
  );
}
