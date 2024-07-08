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
import JSONLD from "@/components/JSONLD";
import Head from "next/head";

export default function AddOnsPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [triggerNotFound, setTriggerNotFound] = useState(false);
  const [addOnData, setAddOnData] = useState<AddOnDetail>();
  const [jsonLdData, setJsonLdData] = useState({});
  const pathSegments = pathname.split("/");
  const addOnsNameParam = decodeURIComponent(pathSegments[pathSegments.length - 1]);
  const normalizeAddOnsName = deSlugify(addOnsNameParam);

  const fetchAddOnDetailByName = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAddOnByName(normalizeAddOnsName);
      setAddOnData(response.data);
      generateJsonLd(response.data);
    } catch (error) {
      console.error("Failed to fetch add-on detail by name", error);
      setTriggerNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [normalizeAddOnsName]);

  const generateJsonLd = (addOnDetail: AddOnDetail) => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": addOnDetail.name,
      "image": [
        addOnDetail.main_image,
        addOnDetail.sub_image1,
        addOnDetail.sub_image2,
      ].filter(Boolean),
      "description": addOnDetail.desc,
      "sku": addOnDetail.ID,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "IDR",
        "price": addOnDetail.price,
        "url": `https://www.loupatisserie.com/add-ons/${normalizeAddOnsName}`,
        "availability": "http://schema.org/InStock",
      }
    };
    setJsonLdData(jsonLd);
  };

  useEffect(() => {
    fetchAddOnDetailByName();
  }, [fetchAddOnDetailByName]);

  if (triggerNotFound) {
    return notFound();
  }

  return (
    <>
      <Head>
        <title>{addOnData ? `${addOnData.name} | Lou Patisserie & Gelato` : 'Add-On Not Found | Lou Patisserie & Gelato'}</title>
        <meta name="description" content={addOnData ? addOnData.desc : "Add-on details not available."} />
        <meta property="og:title" content={addOnData ? addOnData.name : "Add-On Not Found"} />
        <meta property="og:description" content={addOnData ? addOnData.desc : "Add-on details not available."} />
        <meta property="og:image" content={addOnData ? addOnData.main_image : "/default-image.png"} />
        <meta property="og:url" content={`https://www.loupatisserie.com/add-ons/${normalizeAddOnsName}`} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={addOnData ? addOnData.name : "Add-On Not Found"} />
        <meta name="twitter:description" content={addOnData ? addOnData.desc : "Add-on details not available."} />
        <meta name="twitter:image" content={addOnData ? addOnData.main_image : "/default-image.png"} />
        <link rel="canonical" href={`https://www.loupatisserie.com/add-ons/${normalizeAddOnsName}`} />
      </Head>
      <JSONLD data={jsonLdData} />
      <SubHeroBanner title="Add Ons Details" />
      <div className="flex flex-wrap my-10 md:my-16 mx-auto justify-center gap-4 lg:gap-10 h-fit ">
        <div className="flex flex-col gap-6">
          <ProductDetailImgs mainImg={addOnData?.main_image} subImg1={addOnData?.sub_image1} subImg2={addOnData?.sub_image2} />
          <div className=" max-w-lg w-[1000px]"></div>
        </div>
        <div className="flex flex-col w-full max-w-lg border lg:border-none lg:shadow-none lg:py-0 lg:mx-0 border-luoBiege shadow-md rounded-lg py-4 mx-4">
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
