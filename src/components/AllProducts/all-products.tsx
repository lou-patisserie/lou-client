import ProductLogistics from "./product-logistics";
import AllProductsSelection from "./selections";

export default function AllProducts() {
  return (
    <section id="all-products-page" className="flex flex-col justify-center my-16 gap-2">
      <div className="flex flex-wrap gap-2 justify-center mx-4">
        <AllProductsSelection />
      </div>
      <div className="w-full flex justify-center">
        <ProductLogistics />
      </div>
    </section>
  );
}
