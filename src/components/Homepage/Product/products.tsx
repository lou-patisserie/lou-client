"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/UI/carousel";
import { items } from "../../../product";
import { formatPrice } from "@/lib/formatters";
import Image from "next/image";
import ProductSelection from "./product-selection";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getCakesByFlexQueries } from "@/api/cakes-api";
import { CakeQueryParams } from "@/types/api-types";
import { validateImageUrl } from "@/lib/imgUtils";

type Variant = {
  ID: string;
  cake_id: string;
  desc: string;
  name: string;
  price: string;
};

type Cake = {
  ID: string;
  name: string;
  main_image: string;
  variants: Variant[];
};

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [currentSelection, setSelection] = useState("Best Sellers");
  const [cakesData, setCakesData] = useState<{ [Key: string]: Cake[] }>({});
  // console.log(currentSelection, cakesData);

  const fetchCakes = useCallback(async () => {
    if (cakesData[currentSelection]) {
      return;
    }

    setLoading(true);
    try {
      const queryParams: CakeQueryParams = {
        sort: "desc",
        limit: "10",
        page: "1",
      };

      if (currentSelection === "Best Sellers") {
        queryParams.bestSeller = true;
      } else if (currentSelection === "New Arrivals") {
        queryParams.newArrival = true;
      }

      const data = await getCakesByFlexQueries(queryParams);
      setCakesData((prevData) => ({
        ...prevData,
        [currentSelection]: data.data.cakes,
      }));
    } catch (error) {
      console.error(`Failed to fetch cakes for ${currentSelection}:`, error);
    } finally {
      setLoading(false);
    }
  }, [currentSelection, cakesData]);

  useEffect(() => {
    fetchCakes();
  }, [fetchCakes]);

  const currentCakes = cakesData[currentSelection] || [];

  return (
    <section id="products" className="flex flex-col justify-center my-16 gap-4 mx-4 lg:mx-0">
      <div className="flex flex-row gap-2 justify-center">
        <ProductSelection onSelect={setSelection} currentSelection={currentSelection} />
      </div>
      <div className="flex w-full justify-center">
        <Carousel className="w-full max-w-[80%] md:max-w-[90%] ">
          <CarouselContent>
            {currentCakes.map((cake) => (
              <CarouselItem key={cake.ID} className="md:basis-1/2 lg:basis-1/4 flex flex-col items-center text-center justify-center p-4">
                <Link href={`/product/${cake.name.replace(/\s+/g, "-")}`} className="">
                  <Image
                    src={validateImageUrl(cake.main_image)}
                    alt={cake.name}
                    width={550}
                    height={550}
                    className={`aspect-square object-cover rounded-none shadow-sm cursor-pointer transition ease-in-out duration-200 hover:opacity-60 hover:border-2 hover:border-luoDarkBiege opacity-100`}
                  />
                </Link>
                <h3 className="text-lg font-semibold mt-2 text-slate-700 cursor-default capitalize">{cake.name}</h3>
                <p className="text-sm mt-1 text-luoDarkBiege cursor-default">{formatPrice(cake.variants[0].price)}</p>
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
