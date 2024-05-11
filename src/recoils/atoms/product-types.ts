import { atom } from "recoil";

type ProductTypes = {
  ID: string;
  name: string;
};

export const productTypesState = atom<ProductTypes[]>({
  key: "productTypesState",
  default: [],
});
