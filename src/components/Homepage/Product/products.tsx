"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/UI/carousel";
import { items } from "./product";
import { formatPrice } from "@/lib/formatters";
import Image from "next/image";
import ProductSelection from "./product-selection";
import { useState } from "react";
import Link from "next/link";

export default function Products() {
  const [currentSelection, setSelection] = useState("Best Sellers");
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  const filteredItems = items.filter((item) => {
    if (currentSelection === "Best Sellers") return item.is_bestseller;
    if (currentSelection === "New Arrivals") return item.is_new_arrival;
    return true;
  });

  return (
    <section id="products" className="flex flex-col justify-center my-16 gap-2">
      <div className="flex flex-row gap-2 justify-center">
        <ProductSelection onSelect={setSelection} currentSelection={currentSelection} />
      </div>
      <div className="flex w-full justify-center">
        <Carousel className="w-full max-w-[80%] md:max-w-[90%] ">
          <CarouselContent>
            {filteredItems.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/4 flex flex-col items-center text-center justify-center p-4">
                <Link href="/" className="" onMouseEnter={() => setHoveredItemId(item.id)} onMouseLeave={() => setHoveredItemId(null)}>
                  <Image
                    src={item.imgRef}
                    alt={item.name}
                    width={550}
                    height={550}
                    className={`aspect-square object-cover rounded-md shadow-sm cursor-pointer transition ease-in-out duration-200 ${hoveredItemId === item.id ? "opacity-60 border-2 border-luoDarkBiege" : "opacity-100"}`}
                  />
                </Link>
                <h3 className="text-lg font-semibold mt-2 text-slate-700 cursor-default">{item.name}</h3>
                <p className="text-sm mt-1 text-luoDarkBiege cursor-default">{formatPrice(item.price)}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
