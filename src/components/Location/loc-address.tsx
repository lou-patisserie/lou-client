"use client";
import Image from "next/image";
import MapNavigationChannel from "./map-navigation";

export default function LocationAddress() {
  return (
    <div className=" bg-white">
      <div className="max-w-[85rem] mx-auto">
        <div className="mx-0 md:mx-4 flex flex-col md:flex-row justify-center items-center md:justify-betwee gap-4 md:gap-10 py-0 md:py-4">
          <div className="max-w-2xl w-full text-luoDarkBiege flex flex-col justify-center py-8 md:py-4 px-4 md:px-0 text-center items-center gap-1">
            {/* <span className="uppercase text-sm opacity-85 tracking-tight italic leading-7">Central Kitchen</span> */}
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Lou Patisserie</h2>
            <p className="leading-8 [&:not(:first-child)]:mt-4 text-[0.95rem] flex flex-col">
              <span>Ruko South Goldfinch</span>
              <span>Blok E No. 33. Jl. Springs Boulevard</span>
              <span>Gading Serpong, Serpong, Tangerang.</span>
            </p>
            <MapNavigationChannel />
          </div>
          <div className="w-full max-w-2xl">
            <Image src="/assets/about/lou-interior.jpg" width={1300} height={1300} alt="value-about" className="object-cover aspect-square" priority />
          </div>
        </div>
      </div>
    </div>
  );
}
