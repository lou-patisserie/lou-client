import { cartState } from "@/recoils/atoms/products";
import { ShoppingCart } from "lucide-react";
import { useRecoilValue } from "recoil";

export default function LuoCart() {
  const cart = useRecoilValue(cartState);
  return (
    <>
      <ShoppingCart className="text-luoDarkBiege" />
      <span className="absolute z-10 -top-1.5 -right-2.5 text-white font-semibold text-sm px-[0.45rem] bg-luoDarkBiege rounded-full ">{cart.length}</span>
    </>
  );
}
