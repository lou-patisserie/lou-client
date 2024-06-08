"use client";
import { formatPrice } from "@/lib/formatters";
import { CalendarClock } from "lucide-react";
import OrderForm from "./form/order-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/tabs";
import { useEffect, useState } from "react";
import { AddOns, Variants } from "@/types/data-types";
import { Skeleton } from "../UI/skeleton";

type Props = {
  cakeId?: string;
  cakeName?: string;
  mainImgSrc?: string;
  variants: Variants[];
  addOns: AddOns[];
  loading?: boolean;
};

export default function ProductOrder({ cakeId = "", cakeName, mainImgSrc, variants, addOns, loading }: Props) {
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [selectedVariantName, setSelectedVariantName] = useState<string>("");

  useEffect(() => {
    if (variants.length > 0) {
      setSelectedPrice(parseFloat(variants[0].price));
      setSelectedVariantName(variants[0].name);
    }
  }, [variants]);

  const handleTabChange = (value: string) => {
    const selectedVariant = variants.find((variant) => variant.ID === value);
    if (selectedVariant) {
      setSelectedPrice(parseFloat(selectedVariant.price));
      setSelectedVariantName(selectedVariant.name);
    }
  };

  return (
    <>
      <div className="w-full max-w-lg flex flex-col gap-8 mx-4 lg:mx-0">
        <div className="flex flex-col h-fit items-start justify-start text-luoDarkBiege w-full">
          {cakeName && cakeId ? <h1 className="font-bold text-xl">{cakeName}</h1> : <Skeleton className="w-96 h-8" />}

          {variants.length > 0 ? (
            <Tabs defaultValue={variants[0]?.ID || "Variants"} onValueChange={handleTabChange} className="w-fit">
              <TabsList className="bg-transparent p-0 text-luoDarkBiege gap-1">
                {variants.map((variant) => (
                  <TabsTrigger className="hover:bg-luoBiege" key={variant.ID} value={variant.ID}>
                    {variant.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {variants.map((variant) => (
                <TabsContent key={variant.ID} value={variant.ID} className="mt-1">
                  <h3 className="font-bold text-lg tracking-wide">{formatPrice(variant.price)}</h3>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            // <h3 className="font-light italic text-md tracking-wide">No Price for this Product</h3>
            <div>
              <Skeleton className="w-96 h-7 mt-1" />
              <Skeleton className="w-96 h-6 mt-1" />
            </div>
          )}

          <div className="flex flex-row items-center gap-1 mt-2">
            <CalendarClock size={18} strokeWidth={1} />
            <span className="uppercase text-xs font-semibold tracking-wide">receive order within 1 hour of confirmation</span>
          </div>
        </div>
        <div className="flex w-full flex-col h-fit items-start justify-start gap-4">
          <span className="font-semibold text-luoDarkBiege">Make Your Order Here:</span>
          <OrderForm id={cakeId} name={cakeName} price={selectedPrice} imgSrc={mainImgSrc} selectedVariantName={selectedVariantName} addOns={addOns} loading={loading} />
        </div>
      </div>
    </>
  );
}
