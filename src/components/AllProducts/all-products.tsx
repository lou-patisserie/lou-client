"use client";

import { useCallback, useEffect, useState } from "react";
import ProductLogistics from "./product-logistics";
import AllProductsSelection from "./selections";
import { getCakesByFlexQueries } from "@/api/cakes-api";
import { CakeQueryParams } from "@/types/api-types";

type Variant = {
  ID: string;
  cake_id: string;
  desc: string;
  name: string;
  price: string;
};

type Cake = {
  ID: string;
  name: string;
  main_image: string;
  is_fruit_based: boolean;
  is_nut_free: boolean;
  is_chocolate_based: boolean;
  variants: Variant[];
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCakes = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const queryParams: CakeQueryParams = {
          sort: "desc",
          limit: "10",
          page: page.toString(),
        };

        // console.log(queryParams);
        // if (cakeType.ID !== "952addc3-dfe5-4ef6-9699-8378f28c40f6") {
        //   queryParams.typeID = cakeType.ID;
        // }

        if (cakeType.name !== "All Product") {
          queryParams.typeID = cakeType.ID;
        }

        const response = await getCakesByFlexQueries(queryParams);
        setAllCakes((prevCakes) => {
          const newCakes = response.data.cakes.filter((cake: Cake) => !prevCakes.some((existingCake) => existingCake.ID === cake.ID));
          return [...prevCakes, ...newCakes];
        });
        setTotalPages(response.data.totalPage);
      } catch (error) {
        console.error(`Failed to fetch cakes with type ${cakeType.ID}`, error);
      } finally {
        setLoading(false);
      }
    },
    [cakeType.ID, cakeType.name]
  );

  useEffect(() => {
    fetchCakes(1);
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

  const handleShowMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCakes(nextPage);
    }
  };

  return (
    <section id="all-products-page" className="flex flex-col justify-center my-8 md:my-16 gap-2">
      <div className="flex flex-wrap gap-2 justify-center mx-4">
        <AllProductsSelection onSelectCategory={setSelectedSubType} currentSelection={selectedSubType} />
      </div>

      {loading && page === 1 ? (
        <p>Loading here</p>
      ) : (
        <>
          <div className="w-full flex flex-col justify-center mt-8">
            <div className="flex justify-center">
              <ProductLogistics items={filteredCakes} selectedCategory={selectedSubType} choosenType={cakeType.name} />
            </div>

            {page < totalPages && !loading && (
              <div className="flex justify-center">
                <button onClick={handleShowMore} className="mt-4 w-44 px-4 py-2  bg-luoDarkBiege text-white rounded-none">
                  Show More
                </button>
              </div>
            )}
          </div>
        </>
      )}
      {loading && page > 1 && <p>Loading more...</p>}
    </section>
  );
}
