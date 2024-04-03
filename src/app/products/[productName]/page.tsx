import ProductDetailImgs from "@/components/Product-Detail/product-img-layout";


export default function ProductDetailPage() {
  return (
    <>
      <div className="flex flex-wrap mt-10 mx-auto w-[60%] justify-center gap-2">
        <ProductDetailImgs />
        <ProductDetailImgs />
      </div>
    </>
  );
}
