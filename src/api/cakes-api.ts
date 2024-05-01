import { api } from "./api-config";
import { CakeQueryParams } from "./types";

export const getCakesByFlexQueries = async (params: CakeQueryParams) => {
  try {
    const response = await api.get("/cakes/search", { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
