import { atom } from "recoil";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  deliveryDate?: Date;
  deliveryTime?: string;
  candleAndKnife: boolean;
  greetingCard: boolean;
  complimentaryMsg: string;
};

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});
