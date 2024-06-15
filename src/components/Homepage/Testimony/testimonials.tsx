"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/UI/carousel";
import TestimonyItem from "./testimony-item";
import { testimonyData } from "./testimony-data";

export default function Testimonials() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }));

  return (
    <div className="w-full flex justify-center my-16 md:my-24 px-4 md:px-0">
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full max-w-full md:max-w-[80%]"
      >
        <CarouselContent>
          {testimonyData.map((testimony) => (
            <CarouselItem key={testimony.id} className="basis-1/2 md:basis-1/3 xl:basis-1/5">
              <div className="p-1">
                <TestimonyItem name={testimony.name} content={testimony.content} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
