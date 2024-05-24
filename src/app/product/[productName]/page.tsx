"use client";
import { getCakeByName } from "@/api/cakes-api";
import ProductDetailImgs from "@/components/Product-Detail/product-img-layout";
import ProductOrder from "@/components/Product-Detail/product-order";
import ProductTabs from "@/components/Product-Detail/product-tabs";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";
import { deSlugify, normalizeText } from "@/lib/formatters";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Cake = {
  ID: string;
  name: string;
  main_image: string;
  sub_image1: string;
  sub_image2: string;
  variants: object[];
  aboutCake: any;
};

export default function ProductDetailPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [cakeDetail, setCakeDetail] = useState<Cake>();
  const pathSegments = pathname.split("/");
  const cakeNameParam = decodeURIComponent(pathSegments[pathSegments.length - 1]);
  const normalizeCakeName = deSlugify(cakeNameParam);
  // console.log("cakeNameparam", cakeNameParam, "normalize", normalizeCakeName);

  const fetchCakeDetailByName = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCakeByName(normalizeCakeName);
      setCakeDetail(response.data.cake);
      console.log("cake detail", response.data.cake);
    } catch (error) {
      console.error("Failed to fetch product detail by name", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCakeDetailByName()
  }, [fetchCakeDetailByName])

  return (
    <>
      <SubHeroBanner title="Product Details" />
      <div className="flex flex-wrap my-10 md:my-16 mx-auto justify-center gap-4 lg:gap-10 h-fit ">
        <div className="flex flex-col gap-6">
          <ProductDetailImgs />
          <div className="">
            <ProductTabs />
          </div>
        </div>
        <div className="flex flex-col w-full max-w-lg  border lg:border-none lg:shadow-none lg:py-0 lg:mx-0 border-luoBiege shadow-md rounded-lg py-4 mx-4">
          <ProductOrder />
        </div>
      </div>
    </>
  );
}
