"use client";
import { getCakeByName } from "@/api/cakes-api";
import ProductDetailImgs from "@/components/Product-Detail/product-img-layout";
import ProductOrder from "@/components/Product-Detail/product-order";
import ProductTabs from "@/components/Product-Detail/product-tabs";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";
import { deSlugify, normalizeText } from "@/lib/formatters";
import { notFound, usePathname } from "next/navigation";
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

type Variants = {
  ID: string;
  cake_id: string;
  desc: string;
  name: string;
  price: string;
};

export default function ProductDetailPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [triggetNotFound, setTriggerNotFound] = useState(false);
  const [cakeDetail, setCakeDetail] = useState<Cake>();
  const [cakeVariant, setCakeVariant] = useState<Variants[]>([]);
  const pathSegments = pathname.split("/");
  const cakeNameParam = decodeURIComponent(pathSegments[pathSegments.length - 1]);
  const normalizeCakeName = deSlugify(cakeNameParam);
  // console.log("cakeNameparam", cakeNameParam, "normalize", normalizeCakeName);

  const fetchCakeDetailByName = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCakeByName(normalizeCakeName);
      setCakeDetail(response.data.cake);
      setCakeVariant(response.data.variants);
      console.log("cake detail", response.data.cake, "variant", response.data.variants);
    } catch (error) {
      console.error("Failed to fetch product detail by name", error);
      setTriggerNotFound(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCakeDetailByName();
  }, [fetchCakeDetailByName]);

  if (triggetNotFound) {
    return notFound();
  }

  return (
    <>
      <SubHeroBanner title="Product Details" />
      <div className="flex flex-wrap my-10 md:my-16 mx-auto justify-center gap-4 lg:gap-10 h-fit ">
        <div className="flex flex-col gap-6">
          <ProductDetailImgs mainImg={cakeDetail?.main_image} subImg1={cakeDetail?.sub_image1} subImg2={cakeDetail?.sub_image2} />
          <div className="">
            <ProductTabs />
          </div>
        </div>
        <div className="flex flex-col w-full max-w-lg  border lg:border-none lg:shadow-none lg:py-0 lg:mx-0 border-luoBiege shadow-md rounded-lg py-4 mx-4">
          <ProductOrder cakeName={cakeDetail?.name} variants={cakeVariant} />
        </div>
      </div>
    </>
  );
}
