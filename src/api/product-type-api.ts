import { api } from "./api-config";

export const getAllProductTypes = async () => {
  try {
    const response = await api.get("/product-types", {
      params: {
        order: "true",
        sort: "desc",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
