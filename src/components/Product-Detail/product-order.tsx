import { formatPrice } from "@/lib/formatters";
import { CalendarClock } from "lucide-react";
import OrderForm from "./form/order-form";
import { product } from "./dummy";


export default function ProductOrder() {
  return (
    <div className="w-full max-w-lg flex flex-col gap-10 mx-4 lg:mx-0">
      <div className="flex flex-col h-fit items-start justify-start text-luoDarkBiege">
        <h1 className="font-bold text-xl">{product.name}</h1>
        <h2 className="font-bold text-lg tracking-wide">{formatPrice(product.price)}</h2>
        <div className="flex flex-row items-center gap-1 mt-2">
          <CalendarClock size={18} strokeWidth={1} />
          <span className="uppercase text-xs font-semibold tracking-wide">Order before 12AM to Receive it Next Day</span>
        </div>
      </div>
      <div className="flex w-full flex-col h-fit items-start justify-start gap-2">
        <span className="font-semibold text-luoDarkBiege">Make Your Order Here:</span>
        <OrderForm />
      </div>
    </div>

  );
}
