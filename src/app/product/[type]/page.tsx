"use client";
import { getAllProductTypes } from "@/api/product-type-api";
import AllProducts from "@/components/AllProducts/all-products";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";
import { notFound, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ProductsPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  // const pathSegments = pathname.split("/");
  // const paramType = pathSegments[pathSegments.length - 1].toLowerCase();
  // console.log(paramType);
  console.log(productTypes);
  console.log(loading);

  const fetchProductTypes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllProductTypes();
      setProductTypes(data.data);
    } catch (error) {
      console.error(`Fail to fetch Product Types`, error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("Effect to fetch product types is running.");
    fetchProductTypes();
  }, [fetchProductTypes]);

  return (
    <>
      <SubHeroBanner title="Our Products" />
      <AllProducts />
      <h1 className="text-rose-500"></h1>
    </>
  );
}
