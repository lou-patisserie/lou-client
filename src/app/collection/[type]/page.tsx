"use client";

import classes from "./collection.module.scss";
import { getAllProductTypes } from "@/api/product-type-api";
import AllProducts from "@/components/AllProducts/all-products";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";
import { Skeleton } from "@/components/UI/skeleton";
import { normalizeText } from "@/lib/formatters";
import { notFound, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type ProductType = {
  ID: string;
  name: string;
  created_date: string;
};

export default function ProductsPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  const fetchProductTypes = useCallback(async () => {
    setLoading(true);
    const sessionStorageKey = "productTypes";
    try {
      const cachedData = sessionStorage.getItem(sessionStorageKey);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setProductTypes(parsedData);
        // console.log("Product Types Session Storage Fetched:", parsedData);
      } else {
        const { data } = await getAllProductTypes();
        setProductTypes(data);
        // console.log("Product Types API Fetched:", data);
      }
    } catch (error) {
      console.error("Failed to fetch product types", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  const pathSegments = pathname.split("/");
  const typeParam = decodeURIComponent(pathSegments[pathSegments.length - 1]);
  const normalizedParam = normalizeText(typeParam);

  const selectedType = productTypes.find((type) => normalizeText(type.name) === normalizedParam);

  useEffect(() => {
    if (!selectedType && productTypes.length > 0) {
      notFound();
    }
  }, [productTypes, selectedType]);

  const skeletonCount = 6;
  if (!selectedType || loading) {
    return (
      <>
        <SubHeroBanner title="Our Products" />
        {/* <h1>Loading skeleton here...</h1> */}
        <div className="w-full flex flex-col justify-center mt-8 mx-4">
          <div className="flex justify-center">
            <Skeleton className="w-full max-w-xl h-9 my-8" />
          </div>
          <div className="flex justify-start md:justify-center">
            <Skeleton className="h-9 md:w-[75%] w-screen my-4" />
          </div>
          <div className="flex justify-center">
            <div className="md:w-[75%] w-screen">
              <div className={classes.skeletonGrid}>
                {Array.from({ length: skeletonCount }).map((_, index) => (
                  <Skeleton key={index} className="w-full h-48" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SubHeroBanner title="Our Products" />
      <AllProducts cakeType={selectedType} />
    </>
  );
}
