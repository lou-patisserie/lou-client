import { AtomEffect, atom } from "recoil";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  deliveryDate?: Date;
  deliveryTime?: string;
  candleAndKnife: boolean;
  greetingCard: boolean;
  complimentaryMsg: string;
  totalPrice?: number;
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
