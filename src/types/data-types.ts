export type Variants = {
  ID: string;
  cake_id: string;
  desc: string;
  name: string;
  price: string;
};

export type Cake = {
  ID: string;
  name: string;
  main_image: string;
  sub_image1: string;
  sub_image2: string;
  variants: Variants[];
};

export type AddOns = {
  ID: string;
  name: string;
  desc: string;
  price: string;
  main_image: string;
};

export type AddOnDetail = {
  ID: string;
  name: string;
  price: string;
  desc: string;
  main_image: string;
  sub_image1: string;
  sub_image2: string;
};

export type CakeDetails = {
  ID: string;
  cake_id: string;
  desc: string;
  allergen: string;
  ingredients: string;
  storage_serving: string;
};

export type ProductTypes = {
  ID: string;
  name: string;
  desc: string;
  created_date: string;
};

export type AddOnCartItem = {
  id: string;
  name: string;
  price: number;
  main_image: string;
  quantity: number;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  variant: string;
  quantity: number;
  deliveryDate?: Date;
  deliveryTime?: string;
  addOns?: Record<string, { selected: boolean; price: number; name: string; main_image: string }>;
  complimentaryMsg: string;
  totalPrice?: number;
  imgSrc?: string;
};
