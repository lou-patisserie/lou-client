import { getAllAddOns } from "@/api/add-ons-api";
import { getAllCakes } from "@/api/cakes-api";
import { getAllProductTypes } from "@/api/product-type-api";
import { normalizeText } from "@/lib/formatters";
import { Cake } from "@/types/data-types";
import { url } from "inspector";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cakeEntries: MetadataRoute.Sitemap = [];
  const collectionEntries: MetadataRoute.Sitemap = [];
  const addOnsEntries: MetadataRoute.Sitemap = [];

  try {
    const cakeResponse = await getAllCakes();
    const cakeData = cakeResponse.data;

    cakeData.forEach((cake: { name: string }) => {
      const normalizedCakeName = cake.name.replace(/\s+/g, "-");
      cakeEntries.push({
        url: `https://www.loupatisserie.com/product/${normalizedCakeName}`,
        lastModified: new Date(),
        changeFrequency: "daily",
      });
    });
  } catch (error) {
    console.error("Failed to fetch cakes on sitemap", error);
  }

  try {
    const collectionResponse = await getAllProductTypes();
    const collectionsData = collectionResponse.data;

    collectionsData.forEach((collection: { name: string }) => {
      const normalizeCollectionName = normalizeText(collection.name);
      collectionEntries.push({
        url: `https://www.loupatisserie.com/collection/${normalizeCollectionName}`,
        lastModified: new Date(),
        changeFrequency: "daily",
      });
    });
  } catch (error) {
    console.error("Failed to fetch collections on sitemap", error);
  }

  try {
    const addOnsResponse = await getAllAddOns();
    const addOnsData = addOnsResponse.data;

    addOnsData.forEach((addOn: { name: string }) => {
      const normalizeAddOnName = addOn.name.replace(/\s+/g, "-");
      addOnsEntries.push({
        url: `https://www.loupatisserie.com/add-ons/${normalizeAddOnName}`,
        lastModified: new Date(),
        changeFrequency: "daily",
      });
    });
  } catch (error) {
    console.error("Failed to fetch add-ons on sitemap", error);
  }

  return [
    {
      url: "https://www.loupatisserie.com",
      lastModified: new Date(),
      changeFrequency: "daily",
    },
    ...collectionEntries,
    ...cakeEntries,
    ...addOnsEntries,
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
