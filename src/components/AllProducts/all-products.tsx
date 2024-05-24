"use client";

import { useCallback, useEffect, useState } from "react";
import ProductLogistics from "./product-logistics";
import AllProductsSelection from "./selections";
import { CakeQueryParams } from "@/api/types";
import { getCakesByFlexQueries } from "@/api/cakes-api";

type Cake = {
  ID: string;
  name: string;
  main_image: string;
  is_fruit_based: boolean;
  is_nut_free: boolean;
  is_chocolate_based: boolean;
};

type ProductType = {
  ID: string;
  name: string;
  created_date: string;
};

type Props = {
  cakeType: ProductType;
};

export default function AllProducts({ cakeType }: Props) {
  const [loading, setLoading] = useState(false);
  const [selectedSubType, setSelectedSubType] = useState("All Products");
  const [allCakes, setAllCakes] = useState<Cake[]>([]);
  const [filteredCakes, setFilteredCakes] = useState<Cake[]>([]);
  // console.log("Filter", filteredCakes, "original data", allCakes);
  // console.log(selectedSubType, cakesData);
  // console.log(cakeType);

  const fetchCakes = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams: CakeQueryParams = {
        sort: "desc",
        limit: "10", //make this dynamic nanti pakai view more / pagination
        page: "1",
      };

      // console.log(queryParams);
      if (cakeType.ID !== "952addc3-dfe5-4ef6-9699-8378f28c40f6") {
        queryParams.typeID = cakeType.ID;
      }

      const response = await getCakesByFlexQueries(queryParams);
      setAllCakes(response.data.cakes);
    } catch (error) {
      console.error(`Failed to fetch cakes with type ${cakeType.ID}`, error);
    } finally {
      setLoading(false);
    }
  }, [cakeType.ID, cakeType.name]);

  useEffect(() => {
    fetchCakes();
  }, [fetchCakes]);

  useEffect(() => {
    const filterCakes = () => {
      if (selectedSubType === "All Products") {
        setFilteredCakes(allCakes);
      } else {
        const subtypeFilter = (cake: Cake) => {
          if (selectedSubType === "Fruit-based") return cake.is_fruit_based;
          if (selectedSubType === "Nut-free") return cake.is_nut_free;
          if (selectedSubType === "Chocolate-based") return cake.is_chocolate_based;
          return true;
        };
        setFilteredCakes(allCakes.filter(subtypeFilter));
      }
    };
    filterCakes();
  }, [selectedSubType, allCakes]);

  return (
    <section id="all-products-page" className="flex flex-col justify-center my-8 md:my-16 gap-2">
      <div className="flex flex-wrap gap-2 justify-center mx-4">
        <AllProductsSelection onSelectCategory={setSelectedSubType} currentSelection={selectedSubType} />
      </div>
      <div className="w-full flex justify-center mt-8">
        {loading ? (
          <>
            <p>Loading here</p>
          </>
        ) : (
          <ProductLogistics items={filteredCakes} selectedCategory={selectedSubType} choosenType={cakeType.name} />
        )}
      </div>
    </section>
  );
}
