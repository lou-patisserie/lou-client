"use client";

import { useState } from "react";
import ProductLogistics from "./product-logistics";
import AllProductsSelection from "./selections";
import { items } from "../../product";

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  // console.log(selectedCategory)

  const filteredItems = selectedCategory === "All Products" 
    ? items
    : items.filter(item => item.category === selectedCategory)

  return (
    <section id="all-products-page" className="flex flex-col justify-center my-8 md:my-16 gap-2">
      <div className="flex flex-wrap gap-2 justify-center mx-4">
        <AllProductsSelection onSelectCategory={setSelectedCategory} currentSelection={selectedCategory} />
      </div>
      <div className="w-full flex justify-center mt-8">
        <ProductLogistics items={filteredItems} selectedCategory={selectedCategory} />
      </div>
    </section>
  );
}
