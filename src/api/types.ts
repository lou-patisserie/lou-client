export type CakeQueryParams = {
  name?: string;
  typeID?: string;
  bestSeller?: boolean;
  newArrival?: boolean;
  fruitBased?: boolean;
  nutFree?: boolean;
  chocolateBased?: boolean;
  sort?: "asc" | "desc";
  limit?: number;
  page?: number;
};
