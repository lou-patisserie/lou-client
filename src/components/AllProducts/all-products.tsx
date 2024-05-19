"use client";

import { useCallback, useEffect, useState } from "react";
import ProductLogistics from "./product-logistics";
import AllProductsSelection from "./selections";
import { CakeQueryParams } from "@/api/types";
import { getCakesByFlexQueries } from "@/api/cakes-api";

type Cake = {
  ID: string;
  name: string;
};

type Props = {
  cakeType: string;
};

export default function AllProducts({ cakeType }: Props) {
  const [loading, setLoading] = useState(false);
  const [selectedSubType, setSelectedSubType] = useState("All Products");
  const [cakesData, setCakesData] = useState<{ [Key: string]: Cake[] }>({});
  // console.log(selectedSubType, cakesData);

  const fetchCakes = useCallback(async () => {
    if (cakesData[selectedSubType]) {
      return;
    }

    setLoading(true);
    try {
      const queryParams: CakeQueryParams = {
        sort: "desc",
        limit: "10",
        page: "1",
      };

      if (selectedSubType === "Fruit-based") {
        queryParams.fruitBased = true;
      } else if (selectedSubType === "Nut-free") {
        queryParams.nutFree = true;
      } else if (selectedSubType === "Chocolate-based") {
        queryParams.chocolateBased = true;
      }

      // console.log(queryParams);

      const data = await getCakesByFlexQueries(queryParams);
      setCakesData((prevData) => ({
        ...prevData,
        [selectedSubType]: data.data.cakes,
      }));
    } catch (error) {
      console.error(`Failed to fetch cakes with sub-type ${selectedSubType}`, error);
    } finally {
      setLoading(false);
    }
  }, [selectedSubType, cakesData]);

  useEffect(() => {
    fetchCakes();
  }, [fetchCakes]);

  const selectedCakes = cakesData[selectedSubType] || [];

  return (
    <section id="all-products-page" className="flex flex-col justify-center my-8 md:my-16 gap-2">
      <div className="flex flex-wrap gap-2 justify-center mx-4">
        <AllProductsSelection onSelectCategory={setSelectedSubType} currentSelection={selectedSubType} />
      </div>
      <div className="w-full flex justify-center mt-8">
        <ProductLogistics items={selectedCakes} selectedCategory={selectedSubType} choosenType={cakeType} />
      </div>
    </section>
  );
}
