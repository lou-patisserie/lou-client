"use client";
import { useState } from "react";
import { Button } from "../UI/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import classes from "./scss/about-logistics.module.scss";
import { aboutImgs } from "./img-collections";

export default function AboutLogistics() {
  const [showMore, setShowMore] = useState(false);

  function showMoreToggle() {
    setShowMore(!showMore);
  }

  return (
    <>
      <div className="max-w-4xl mt-12 md:mt-20 mx-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">About Luo</h2>
        <p className="leading-7 [&:not(:first-child)]:mt-4 text-[0.95rem]">
          Welcome to Lou Patisserie, where the delicate artistry of French pastry meets the vibrant flavors of Indonesia. Founded by Audrey, a Le Cordon Bleu alumna, alongside her sister, Vanny, this enchanting patisserie brings together a
          fusion of culinary worlds in their home country.
        </p>
        <AnimatePresence>
          {showMore && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="mt-1">
              <p className="leading-7 [&:not(:first-child)]:mt-1 text-[0.95rem]">
                Nestled in the capital of Indonesia, Lou Patisserie is a testament to Audrey's passion for crafting exquisite pastries, honed through her prestigious culinary education and international background. With each creation,
                Audrey and her team revisit traditional French techniques with the rich diversity of local ingredients, resulting in a symphony of flavors that captivate the senses.
              </p>
              <p className="leading-7 [&:not(:first-child)]:mt-1 text-[0.95rem]">
                From decadent cakes to delicate pastries, every bite tells a story of craftsmanship, creativity, and a deep passion for both French and Indonesian ingredients.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mx-4 flex justify-end mt-2 lg:-mt-10">
        <Button onClick={showMoreToggle}>{showMore ? "Show Less" : "Show More"}</Button>
      </div>
      <div className={`${classes.gridContainer} px-4 overflow-hidden`}>
        {aboutImgs.map((img, index) => (
          <div key={img.id} className={`${classes.gridItem} shadow-md`}>
            <Image src={img.imgRef} alt={`Interior ${index + 1}`} width={500} height={500} className={`object-cover ${img.size} ${img.smallSize}`} />
          </div>
        ))}
      </div>
    </>
  );
}
