import { AtomEffect, atom } from "recoil";

type CartItem = {
  id: string;
  name: string;
  price: number;
  variant: string;
  quantity: number;
  deliveryDate?: Date;
  deliveryTime?: string;
  addOns: Record<string, { selected: boolean; variant?: string }>;
  complimentaryMsg: string;
  totalPrice?: number;
  imgSrc?: string;
};

const isClient = typeof window !== 'undefined';

const localStorageEffect =
  (key: string): AtomEffect<CartItem[]> =>
  ({ setSelf, onSet }) => {
    if (isClient) {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue: CartItem[]) => {
        localStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
  effects_UNSTABLE: [localStorageEffect("cartState")],
});
