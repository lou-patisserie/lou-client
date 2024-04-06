import { formatPrice } from "@/lib/formatters";
import { CalendarClock } from "lucide-react";
import OrderForm from "./form/order-form";
import { ProfileForm } from "./form/tes";

const product = {
  id: 1,
  name: "Luo Croissant",
  price: 70000,
};

export default function ProductDetails() {
  return (
    <div className="w-full max-w-md flex flex-col gap-10 mx-4">
      <div className="flex flex-col h-fit items-start justify-start text-luoDarkBiege">
        <span className="font-bold text-xl">{product.name}</span>
        <span className="font-bold text-lg tracking-wide">{formatPrice(product.price)}</span>
        <div className="flex flex-row items-center gap-1 mt-2">
          <CalendarClock size={18} strokeWidth={1} />
          <span className="uppercase text-xs font-semibold tracking-wide">Order before 12AM to Receive it Next Day</span>
        </div>
      </div>
      <div className="flex flex-col h-fit items-start justify-start gap-2">
        <span className="font-semibold text-luoDarkBiege">Make Your Order Here:</span>
        <OrderForm />
        {/* <ProfileForm /> */}
      </div>
    </div>

  );
}
