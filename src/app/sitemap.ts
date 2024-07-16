import { MetadataRoute } from "next";
// import { getAllCakes } from "@/api/cakes-api";
// import { getAllProductTypes } from "@/api/product-type-api";
// import { getAllAddOns } from "@/api/add-ons-api";
// import { normalizeText } from "@/lib/formatters";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // let allCakes = [];
  // try {
  //   allCakes = await getAllCakes();
  // } catch (error: any) {
  //   if (error.response && error.response.status === 404) {
  //     console.error("Error fetching cakes data: Not Found (404)");
  //   } else {
  //     console.error("Error fetching cakes data:", error);
  //   }
  // }

  // let allCollections = [];
  // try {
  //   allCollections = await getAllProductTypes();
  // } catch (error: any) {
  //   if (error.response && error.response.status === 404) {
  //     console.error("Error fetching collections data: Not Found (404)");
  //   } else {
  //     console.error("Error fetching collections data:", error);
  //   }
  // }

  // let allAddOns = [];
  // try {
  //   allAddOns = await getAllAddOns();
  // } catch (error: any) {
  //   if (error.response && error.response.status === 404) {
  //     console.error("Error fetching add-ons data: Not Found (404)");
  //   } else {
  //     console.error("Error fetching add-ons data:", error);
  //   }
  // }

  // const staticPaths = [
  //   {
  //     url: "https://www.loupatisserie.com",
  //     lastModified: new Date(),
  //     changeFrequency: "daily",
  //   },
  //   {
  //     url: "https://www.loupatisserie.com/about-us",
  //     lastModified: new Date(),
  //     changeFrequency: "weekly",
  //   },
  //   {
  //     url: "https://www.loupatisserie.com/our-location",
  //     lastModified: new Date(),
  //     changeFrequency: "weekly",
  //   },
  //   {
  //     url: "https://www.loupatisserie.com/checkout",
  //     lastModified: new Date(),
  //     changeFrequency: "weekly",
  //   },
  // ];

  // const productPaths = allCakes.map((product: any) => ({
  //   url: `https://www.loupatisserie.com/product/${normalizeText(product.name)}`,
  //   lastModified: new Date(),
  //   changeFrequency: "daily",
  // }));

  // const collectionPaths = allCollections.map((collection: any) => ({
  //   url: `https://www.loupatisserie.com/collection/${normalizeText(
  //     collection.name
  //   )}`,
  //   lastModified: new Date(),
  //   changeFrequency: "daily",
  // }));

  // const addOnPaths = allAddOns.map((addon: any) => ({
  //   url: `https://www.loupatisserie.com/add-ons/${normalizeText(addon.name)}`,
  //   lastModified: new Date(),
  //   changeFrequency: "daily",
  // }));

  // return [...staticPaths, ...productPaths, ...collectionPaths, ...addOnPaths];

  return [
    {
      url: "https://www.loupatisserie.com",
      lastModified: new Date(),
      changeFrequency: "daily",
    },
    {
      url: "https://www.loupatisserie.com/about-us",
      lastModified: new Date(),
      changeFrequency: "weekly",
    },
    {
      url: "https://www.loupatisserie.com/our-location",
      lastModified: new Date(),
      changeFrequency: "weekly",
    },
    {
      url: "https://www.loupatisserie.com/checkout",
      lastModified: new Date(),
      changeFrequency: "weekly",
    },
  ];
}
