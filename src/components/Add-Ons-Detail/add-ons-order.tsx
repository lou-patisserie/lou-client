import { CalendarClock } from "lucide-react";
import { Skeleton } from "../UI/skeleton";
import AddOnOrderForm from "./forms/addon-order-form";

type Props = {
  addOnId?: string;
  addOnName?: string;
  price?: string;
  mainImgSrc?: string;
  desc?: string;
  loading?: boolean;
};

export default function AddOnOrder({ addOnId = "", addOnName, price = "0", mainImgSrc, desc, loading }: Props) {
  const convertedPrice = parseInt(price, 10);
  return (
    <>
      <div className="w-full max-w-lg flex flex-col gap-8 mx-4 lg:mx-0">
        <div className="flex flex-col h-fit items-start justify-start text-luoDarkBiege w-full">
          {addOnName && addOnId ? <h1 className="font-bold text-xl">{addOnName}</h1> : <Skeleton className="w-96 h-8" />}
          <div className="flex flex-row items-center gap-1 mt-2">
            <CalendarClock size={18} strokeWidth={1} />
            <span className="uppercase text-xs font-semibold tracking-wide">receive order within 1 hour of confirmation</span>
          </div>
          {desc && addOnId ? <p className="font-normal text-base my-2">{desc}</p> : <Skeleton className="w-96 h-4 my-2" />}
        </div>
        <div className="flex w-full flex-col h-fit items-start justify-start gap-4">
          <span className="font-semibold text-luoDarkBiege">Make Your Order Here:</span>
          <AddOnOrderForm id={addOnId} name={addOnName} price={convertedPrice} imgSrc={mainImgSrc} loading={loading} />
        </div>
      </div>
    </>
  );
}
