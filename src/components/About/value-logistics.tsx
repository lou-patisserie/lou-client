import Image from "next/image";
import { Card } from "../UI/card";

export default function ValueLogistics() {
  return (
    <div className=" bg-luoDarkBiege md:mt-16 mt-12">
      <div className="max-w-[85rem] mx-auto">
        <div className="mx-0 md:mx-4 flex flex-col md:flex-row justify-center items-center md:justify-betwee gap-4 md:gap-10">
          <div className="max-w-2xl text-slate-100 flex flex-col justify-center py-8 md:py-4 px-4 md:px-0">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Our Value</h2>
            <p className="leading-7 [&:not(:first-child)]:mt-4 text-[0.95rem]">
              We are a team full of passion and deep love for the culinary world. As we progress to take local pastries to a new height, our value remains the same - to deliver excellent craftsmanship and be present in your sweet moments.
            </p>
          </div>
          <div className="w-full">
            <Image src="/assets/about/value.jpg" width={1300} height={1300} alt="value-about" className="object-cover aspect-square" />
          </div>
        </div>
      </div>
    </div>
  );
}
