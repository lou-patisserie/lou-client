"use client";
import { getAllProductTypes } from "@/api/product-type-api";
import AllProducts from "@/components/AllProducts/all-products";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";
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

  if (!selectedType || loading) {
    return (
      <>
        <SubHeroBanner title="Our Products" />
        <h1>Loading skeleton here...</h1>
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
