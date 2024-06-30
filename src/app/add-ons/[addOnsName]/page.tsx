"use client";
import { getAddOnByName } from "@/api/add-ons-api";
import AddOnOrder from "@/components/Add-Ons-Detail/add-ons-order";
import FaqProductDetail from "@/components/Product-Detail/faq-product";
import ProductDetailImgs from "@/components/Product-Detail/product-img-layout";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";
import { deSlugify } from "@/lib/formatters";
import { AddOnDetail } from "@/types/data-types";
import { notFound, usePathname } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

export default function AddOnsPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [triggetNotFound, setTriggerNotFound] = useState(false);
  const [addOnData, setAddOnData] = useState<AddOnDetail>();
  const pathSegments = pathname.split("/");
  const addOnsNameParam = decodeURIComponent(pathSegments[pathSegments.length - 1]);
  const normalizeAddOnsName = deSlugify(addOnsNameParam);

  console.log("addonname param", addOnsNameParam, "normalize", normalizeAddOnsName);

  const fetchAddOnDetailByName = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAddOnByName(normalizeAddOnsName);
      setAddOnData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch addon detail by name", error);
      setTriggerNotFound(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddOnDetailByName();
  }, [fetchAddOnDetailByName]);

  if (triggetNotFound) {
    return notFound();
  }

  return (
    <>
      <SubHeroBanner title="Add Ons Details" />
      <div className="flex flex-wrap my-10 md:my-16 mx-auto justify-center gap-4 lg:gap-10 h-fit ">
        <div className="flex flex-col gap-6">
          <ProductDetailImgs mainImg={addOnData?.main_image} subImg1={addOnData?.sub_image1} subImg2={addOnData?.sub_image2} />
          <div className=" max-w-lg w-[1000px]"></div>
        </div>
        <div className="flex flex-col w-full max-w-lg  border lg:border-none lg:shadow-none lg:py-0 lg:mx-0 border-luoBiege shadow-md rounded-lg py-4 mx-4">
          <Suspense fallback={<div></div>}>
            <AddOnOrder addOnId={addOnData?.ID} addOnName={addOnData?.name} desc={addOnData?.desc} price={addOnData?.price} mainImgSrc={addOnData?.main_image} loading={loading} />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-wrap mt-10 md:mt-16 mx-auto justify-center gap-4 lg:gap-10 h-fit bg-luoBiege py-10">
        <FaqProductDetail />
      </div>
    </>
  );
}
