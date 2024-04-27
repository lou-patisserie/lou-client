"use client";
import { Button } from "@/components/UI/button";
import classes from "./hero-banner.module.scss";
import { useRouter } from "next/navigation";

export default function HeroBanner() {
  const router = useRouter();

  function exploreBtn() {
    router.push("/products");
  }

  return (
    <header id="hero-section">
      <div className={classes.heroBanner}>
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-full w-full flex flex-col gap-2 text-center justify-center mb-16">
            <div className="flex justify-center items-center cursor-default">
              <h1 className="scroll-m-20 text-luoDarkBiege md:text-white border-b border-luoDarkBiege pb-2 text-3xl font-semibold tracking-tight first:mt-0 ">
                Delivery & <span className="text-transparent bg-clip-text bg-gradient-to-r to-luoDarkBiege from-white">Pickup</span>
              </h1>
            </div>
            <span className="text-luoDarkBiege md:text-white text-lg font-semibold cursor-default">Tangerang & Jakarta</span>
            <div className="flex justify-center">
              <Button onClick={exploreBtn} className="flex justify-center items-center bg-luoDarkBiege rounded-none border-none hover:bg-[#a58b73]">
                Explore Our Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
