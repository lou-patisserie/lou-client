"use client";
import { Button } from "@/components/UI/button";
import classes from "./hero-banner.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroBanner() {
  const router = useRouter();

  function exploreBtn() {
    router.push("/collection/all-product");
  }

  return (
    <header className="relative" id="hero-section">
      {/* <div className={classes.heroBanner}> */}
      <div className="h-[100vh] relative w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent z-10"></div>
        <Image src={`/assets/img/Homepage.png`} width={1800} height={1800} alt="banner-lou" className="object-cover bg-center w-full h-full " />
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <div className="max-w-full w-full flex flex-col gap-2 text-center justify-center mb-16">
          <div className="flex justify-center items-center cursor-default">
            <h1 className="scroll-m-20 drop-shadow-md text-white border-b-2 border-luoDarkBiege pb-2 text-3xl font-semibold tracking-tight first:mt-0 ">Delivery & Pickup</h1>
          </div>
          <span className="text-white text-lg font-semibold cursor-default drop-shadow-md">Tangerang & Jakarta</span>
          <div className="flex justify-center">
            <Button onClick={exploreBtn} className="flex drop-shadow-md justify-center items-center bg-luoDarkBiege rounded-none border-none hover:bg-[#a58b73]">
              Explore Our Products
            </Button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </header>
  );
}
