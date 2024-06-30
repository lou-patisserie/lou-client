"use client";

import classes from "./scss/all-products.module.scss";
import { useCallback, useEffect, useState } from "react";
import ProductLogistics from "./product-logistics";
import AllProductsSelection from "./selections";
import { getCakesByFlexQueries } from "@/api/cakes-api";
import { CakeQueryParams } from "@/types/api-types";
import { getAllAddOns } from "@/api/add-ons-api";
import AddOnsLogistics from "./add-ons-logistics";
import { AddOns } from "@/types/data-types";
import { debounce } from "lodash";
import { notFound } from "next/navigation";
import { Skeleton } from "../UI/skeleton";

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
  const [allAddOns, setAllAddOns] = useState<AddOns[]>();
  const [searchQuery, setSearchQuery] = useState("");
  const [notFoundError, setNotFoundError] = useState(false);

  const fetchCakes = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        if (cakeType.name === "Add Ons") {
          const response = await getAllAddOns();
          setAllAddOns(response.data);
        } else {
          const queryParams: CakeQueryParams = {
            sort: "desc",
            limit: "10",
            page: page.toString(),
          };

          if (cakeType.name !== "All Product") {
            queryParams.typeID = cakeType.ID;
          }

          const response = await getCakesByFlexQueries(queryParams);
          setAllCakes((prevCakes) => {
            const newCakes = response.data.cakes.filter((cake: Cake) => !prevCakes.some((existingCake) => existingCake.ID === cake.ID));
            return [...prevCakes, ...newCakes];
          });
          setTotalPages(response.data.totalPage);
        }
      } catch (error) {
        console.error(`Failed to fetch cakes with type ${cakeType.ID}`, error);
      } finally {
        setLoading(false);
      }
    },
    [cakeType.ID, cakeType.name]
  );

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      try {
        const queryParams: CakeQueryParams = {
          name: query,
          sort: "desc",
          limit: "10",
          page: "1",
        };

        if (cakeType.name !== "All Product") {
          queryParams.typeID = cakeType.ID;
        }
        const response = await getCakesByFlexQueries(queryParams);
        setAllCakes(response.data.cakes);
      } catch (error: any) {
        console.error(`Failed to search cakes with query ${query}`, error);
        if (error.response?.status === 404) {
          setNotFoundError(true);
        }
      }
    }, 500),
    [cakeType.ID]
  );

  useEffect(() => {
    fetchCakes(1);
  }, [fetchCakes]);

  useEffect(() => {
    if (cakeType.name !== "Add Ons") {
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
    }
  }, [selectedSubType, allCakes, cakeType.name]);

  const handleShowMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCakes(nextPage);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (!query) {
      setNotFoundError(false);
    }
    debouncedSearch(query);
  };

  const skeletonCount = 10;
  if (cakeType.name === "Add Ons") {
    return (
      <section id="add-ons-page" className="flex flex-col justify-center my-8 md:my-16 gap-2">
        <div className="w-full flex flex-col justify-center mt-8">
          {loading ? (
            <div className="flex justify-center">
              <div className="md:w-[75%] w-full">
                <div className="flex justify-start md:justify-center">
                  <Skeleton className="h-9 w-full mb-4 mt-6" />
                </div>
                <div className={classes.skeletonGrid}>
                  {Array.from({ length: skeletonCount }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center text-center justify-center">
                      <Skeleton className="w-full h-48 md:h-72" />
                      <Skeleton className="w-full h-6 mt-2" />
                      <Skeleton className="w-1/2 h-4 mt-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <AddOnsLogistics addOnsData={allAddOns} choosenType={cakeType.name} />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="all-products-page" className="flex flex-col justify-center my-8 md:my-16 gap-2">
      <div className="flex flex-wrap gap-2 justify-center mx-4">
        <AllProductsSelection onSelectCategory={setSelectedSubType} currentSelection={selectedSubType} />
      </div>

      {loading && page === 1 ? (
        <div className="flex justify-center">
          <div className="md:w-[75%] w-full">
            <div className="flex justify-start md:justify-center">
              <Skeleton className="h-9 w-full mb-4 mt-6" />
            </div>
            <div className={classes.skeletonGrid}>
              {Array.from({ length: skeletonCount }).map((_, index) => (
                <div key={index} className="flex flex-col items-center text-center justify-center">
                  <Skeleton className="w-full h-48 md:h-72" />
                  <Skeleton className="w-full h-6 mt-2" />
                  <Skeleton className="w-1/2 h-4 mt-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col justify-center mt-8">
            <div className="flex justify-center">
              <ProductLogistics
                items={filteredCakes}
                selectedCategory={selectedSubType}
                choosenType={cakeType.name}
                loading={loading}
                page={page}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                searchPerformed={notFoundError}
              />
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
    </section>
  );
}

// console.log(queryParams);
// if (cakeType.ID !== "952addc3-dfe5-4ef6-9699-8378f28c40f6") {
//   queryParams.typeID = cakeType.ID;
// }
