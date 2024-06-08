"use client";
import { useState } from "react";
import { Button } from "../UI/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import classes from "./scss/about-logistics.module.scss";
import { aboutImgs } from "./img-collections";

export default function AboutLogistics() {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className=" bg-none md:mt-16 mt-12">
        <div className="max-w-[85rem] mx-auto">
          <div className="mx-0 md:mx-4 flex flex-col md:flex-row justify-center items-center md:justify-betwee gap-4 md:gap-10">
            <div className="w-full">
              <Image src="/assets/about/lou-interior.jpg" width={1300} height={1300} alt="value-about" className="object-cover aspect-square" />
            </div>
            <div className="max-w-5xl text-slate-700 flex flex-col justify-center py-8 md:py-4 px-4 md:px-0">
              <span className="text-xs text-luoDarkBiege tracking-tight">/LU:/</span>
              <h2 className="scroll-m-20 text-3xl text-luoDarkBiege font-semibold tracking-tight first:mt-0">Lou</h2>
              <p className="leading-7 [&:not(:first-child)]:mt-4 text-[0.95rem]">
                Welcome to Lou Patisserie, where the delicate artistry of French pastry meets the vibrant flavors of Indonesia. Founded by Audrey, a Le Cordon Bleu alumna, alongside her sister, Vanny, this enchanting patisserie brings
                together a fusion of culinary worlds in their home country.
              </p>
              <p className="leading-7 [&:not(:first-child)]:mt-1 text-[0.95rem]">
                Nestled in the capital of Indonesia, Lou Patisserie is a testament to Audrey's passion for crafting exquisite pastries, honed through her prestigious culinary education and international background. With each creation,
                Audrey and her team revisit traditional French techniques with the rich diversity of local ingredients, resulting in a symphony of flavors that captivate the senses.
              </p>
              <p className="leading-7 [&:not(:first-child)]:mt-1 text-[0.95rem]">
                From decadent cakes to delicate pastries, every bite tells a story of craftsmanship, creativity, and a deep passion for both French and Indonesian ingredients.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="max-w-4xl mt-12 md:mt-20 mx-4">
        <span className="text-xs text-luoDarkBiege tracking-tight">/LU:/</span>
        <h2 className="scroll-m-20 text-3xl text-luoDarkBiege font-semibold tracking-tight first:mt-0">Lou</h2>
        <p className="leading-7 [&:not(:first-child)]:mt-4 text-[0.95rem]">
          Welcome to Lou Patisserie, where the delicate artistry of French pastry meets the vibrant flavors of Indonesia. Founded by Audrey, a Le Cordon Bleu alumna, alongside her sister, Vanny, this enchanting patisserie brings together a
          fusion of culinary worlds in their home country.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-1 text-[0.95rem]">
          Nestled in the capital of Indonesia, Lou Patisserie is a testament to Audrey's passion for crafting exquisite pastries, honed through her prestigious culinary education and international background. With each creation, Audrey and
          her team revisit traditional French techniques with the rich diversity of local ingredients, resulting in a symphony of flavors that captivate the senses.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-1 text-[0.95rem]">From decadent cakes to delicate pastries, every bite tells a story of craftsmanship, creativity, and a deep passion for both French and Indonesian ingredients.</p>
      </div> */}
      {/* <div className={`${classes.gridContainer} px-4 overflow-hidden`}>
        {aboutImgs.map((img, index) => (
          <div key={img.id} className={`${classes.gridItem} shadow-md`}>
            <Image src={img.imgRef} alt={`Interior ${index + 1}`} width={500} height={500} className={`object-cover ${img.size} ${img.smallSize}`} />
          </div>
        ))}
      </div> */}
    </>
  );
}
