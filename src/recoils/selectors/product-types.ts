import { selector } from "recoil";
import { productTypesState } from "../atoms/product-types";
import { getAllProductTypes } from "@/api/product-type-api";
type ProductTypes = {
  ID: string;
  name: string;
  created_date: string;
};

export const fetchProductTypes = selector<ProductTypes[]>({
  key: "fetchProductTypes",
  get: async ({ get }) => {
    if (typeof window === "undefined") {
      console.log("fetchProductTypes: running on server, skip sessionStorage");
      // Hapus code bawah klau gak perlu
      const response = await getAllProductTypes();
      const data = response.data;
      console.log("Fetch productTypes from API on SSR:", data);
      return data;
      // return
    }

    const sessionStorageKey = "productTypes";

    try {
      const cachedData = sessionStorage.getItem(sessionStorageKey);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        // console.log("Using sessionStorage productTypes:", parsedData);
        return parsedData as ProductTypes[];
      }

      const response = await getAllProductTypes();
      const data = response.data;
      // console.log("Fetch productTypes from API:", data);

      sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error in Recoil selector: fetching product types:", error);
      throw error;
    }
  },
});
