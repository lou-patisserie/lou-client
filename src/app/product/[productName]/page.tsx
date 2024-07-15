"use client";
import { getAllAddOns } from "@/api/add-ons-api";
import { getCakeByName } from "@/api/cakes-api";
import FaqProductDetail from "@/components/Product-Detail/faq-product";
import ProductDetailImgs from "@/components/Product-Detail/product-img-layout";
import ProductOrder from "@/components/Product-Detail/product-order";
import ProductTabs from "@/components/Product-Detail/product-tabs";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";
import { deSlugify } from "@/lib/formatters";
import { AddOns, Cake, CakeDetails, Variants } from "@/types/data-types";
import { notFound, usePathname } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import JSONLD from "@/components/JSONLD";

export default function ProductDetailPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [triggerNotFound, setTriggerNotFound] = useState(false);
  const [cakeData, setCakeData] = useState<Cake>();
  const [cakeVariant, setCakeVariant] = useState<Variants[]>([]);
  const [cakeDetails, setCakeDetails] = useState<CakeDetails>();
  const [addOns, setAddOns] = useState<AddOns[]>([]);
  const [addOnsFetchError, setAddOnsFetchError] = useState(false);
  const pathSegments = pathname.split("/");
  const cakeNameParam = decodeURIComponent(pathSegments[pathSegments.length - 1]);
  const normalizeCakeName = deSlugify(cakeNameParam);

  const fetchCakeDetailByNameAndAddOns = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getCakeByName(normalizeCakeName);
      setCakeData(response.data.cake);
      setCakeVariant(response.data.variants);
      setCakeDetails(response.data.aboutCake);

      try {
        const addOnsResponse = await getAllAddOns();
        setAddOns(addOnsResponse.data);
      
      } catch (addOnsError) {
        console.error("Failed to fetch add-ons", addOnsError);
        setAddOnsFetchError(true);
      }
    } catch (error) {
      console.error("Failed to fetch product detail by name", error);
      setTriggerNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [normalizeCakeName]);

  useEffect(() => {
    fetchCakeDetailByNameAndAddOns();
  }, [fetchCakeDetailByNameAndAddOns]);

  if (triggerNotFound) {
    return notFound();
  }

  console.log("cakeData", cakeData);

  return (
    <>
      <SubHeroBanner title="Product Details" image="/assets/img/Product-Detail.png" />
      <div className="flex flex-wrap my-10 md:my-16 mx-auto justify-center gap-4 lg:gap-10 h-fit">
        <div className="flex flex-col gap-6 w-full max-w-lg">
          <ProductDetailImgs mainImg={cakeData?.main_image} subImg1={cakeData?.sub_image1} subImg2={cakeData?.sub_image2} />
          <div className="">
            <ProductTabs aboutCakeData={cakeDetails} />
          </div>
        </div>
        <div className="flex flex-col w-full max-w-lg border lg:border-none lg:shadow-none lg:py-0 lg:mx-0 border-luoBiege shadow-md rounded-lg py-4 mx-4">
          <Suspense fallback={<div></div>}>
            <ProductOrder
              cakeId={cakeData?.ID}
              cakeName={cakeData?.name}
              mainImgSrc={cakeData?.main_image}
              variants={cakeVariant}
              addOns={addOns}
              addOnsNull={addOnsFetchError}
              loading={loading}
            />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-wrap mt-10 md:mt-16 mx-auto justify-center gap-4 lg:gap-10 h-fit bg-luoBiege py-10">
        <FaqProductDetail />
      </div>
    </>
  );
}
