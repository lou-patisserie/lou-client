import { ShoppingCart } from "lucide-react";

export default function LuoCart() {
  return (
    <>
      <ShoppingCart className="text-luoDarkBiege" />
      <span className="absolute z-10 -top-1.5 -right-2.5 text-white font-semibold text-sm px-[0.45rem] bg-luoDarkBiege rounded-full ">1</span>
    </>
  );
}
