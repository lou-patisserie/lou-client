"use client";
import classes from "./collection.module.scss";
import { getAllProductTypes } from "@/api/product-type-api";
import AllProducts from "@/components/AllProducts/all-products";
import FAQs from "@/components/FAQ/faqs";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";
import { Skeleton } from "@/components/UI/skeleton";
import { normalizeText } from "@/lib/formatters";
import { notFound, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type productTypes = {
  ID: string;
  name: string;
  desc: string;
  created_date: string;
};

export default function ProductsPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [productTypes, setProductTypes] = useState<productTypes[]>([]);

  const fetchProductTypes = useCallback(async () => {
    setLoading(true);
    const sessionStorageKey = "productTypes";
    try {
      const cachedData = sessionStorage.getItem(sessionStorageKey);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setProductTypes(parsedData);
      } else {
        const { data } = await getAllProductTypes();
        setProductTypes(data);
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

  const skeletonCount = 10;
  if (!selectedType || loading) {
    return (
      <>
        <SubHeroBanner title="Our Products" image="/assets/img/Product.png" />
        <div className="w-full flex flex-col justify-center mt-8 px-4">
          <div className="flex justify-center">
            <Skeleton className="w-full max-w-xl h-9 mt-8 mb-6" />
          </div>
          <div className="flex justify-start md:justify-center">
            <Skeleton className="h-9 md:w-[75%] w-screen mb-4 mt-6" />
          </div>
          <div className="flex justify-center">
            <div className="md:w-[75%] w-full">
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
        </div>
      </>
    );
  }

  return (
    <>
      <SubHeroBanner title="Our Product" image="/assets/img/Product.png" />
      <AllProducts cakeType={selectedType} />
      <div className="flex flex-wrap mt-10 md:mt-20 mx-auto justify-center gap-4 lg:gap-10 h-fit bg-luoBiege py-10">
        <FAQs maxWidth="max-w-[90rem]" />
      </div>
    </>
  );
}
