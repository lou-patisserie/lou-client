import { api } from "./api-config";

export const getAllAddOns = async () => {
  try {
    const response = await api.get("/add-ons");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAddOnByName = async (addOnName: string) => {
  try {
    const response = await api.get("/add-ons/search", {
      params: {
        name: addOnName,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
