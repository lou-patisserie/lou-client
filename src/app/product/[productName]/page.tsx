"use client";
import { getAllAddOns } from "@/api/add-ons-api";
import { getCakeByName } from "@/api/cakes-api";
import ProductDetailImgs from "@/components/Product-Detail/product-img-layout";
import ProductOrder from "@/components/Product-Detail/product-order";
import ProductTabs from "@/components/Product-Detail/product-tabs";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";
import { deSlugify, normalizeText } from "@/lib/formatters";
import { AddOns, Cake, Variants } from "@/types/data-types";
import { notFound, usePathname } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

export default function ProductDetailPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [triggetNotFound, setTriggerNotFound] = useState(false);
  const [cakeDetail, setCakeDetail] = useState<Cake>();
  const [cakeVariant, setCakeVariant] = useState<Variants[]>([]);
  const [addOns, setAddOns] = useState<AddOns[]>([]);
  const pathSegments = pathname.split("/");
  const cakeNameParam = decodeURIComponent(pathSegments[pathSegments.length - 1]);
  const normalizeCakeName = deSlugify(cakeNameParam);
  // console.log("cakeNameparam", cakeNameParam, "normalize", normalizeCakeName);

  const fetchCakeDetailByNameAndAddOns = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getCakeByName(normalizeCakeName);
      const addOnsResponse = await getAllAddOns();

      setCakeDetail(response.data.cake);
      setCakeVariant(response.data.variants);
      setAddOns(addOnsResponse.data);
      // console.log(addOnsResponse.data);
      // console.log("cake detail", response.data.cake, "variant", response.data.variants);
    } catch (error) {
      console.error("Failed to fetch product detail by name", error);
      setTriggerNotFound(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCakeDetailByNameAndAddOns();
  }, [fetchCakeDetailByNameAndAddOns]);

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
          <Suspense fallback={<div></div>}>
            <ProductOrder cakeId={cakeDetail?.ID} cakeName={cakeDetail?.name} mainImgSrc={cakeDetail?.main_image} variants={cakeVariant} addOns={addOns} loading={loading} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
