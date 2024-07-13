"use client";

import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { X } from "lucide-react";
import classes from "./scss/product-img-view.module.scss";
import { validateImageUrl } from "@/lib/imgUtils";
import ImageWithFallback from "@/hooks/fallback-img";

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
  selectedImg: string;
  img1?: string;
  img2?: string;
  img3?: string;
};

export default function ProductImageView({ isOpen, setIsOpen, selectedImg, img1 = "/assets/img/image_not_found.jpeg", img2 = "/assets/img/image_not_found.jpeg", img3 = "/assets/img/image_not_found.jpeg" }: Props) {
  const [currentImg, setCurrentImg] = useState(selectedImg);
  //   console.log(currentImg)

  useEffect(() => {
    setCurrentImg(selectedImg);
  }, [selectedImg]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body!.style.overflowY = "hidden";
    } else {
      body!.style.overflowY = "scroll";
    }
  }, [isOpen]);

  const imageClickHandler = (src: string) => {
    if (src !== currentImg) {
      setCurrentImg(src);
    }
  };

  const handleImgError = (e: any) => {
    e.target.src = "/assets/img/image_not_found.jpeg";
  };

  const content = (
    <div className={classes.modal} onClick={() => setIsOpen(false)}>
      <button className="bg-none border-none text-gray-200 text-lg absolute cursor-pointer right-2 top-2">
        <X />
      </button>
      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onClick={(e) => e.stopPropagation()} className={classes.modalCard}>
        <Image src={validateImageUrl(currentImg) || "/assets/img/image_not_found.jpeg"} alt="product-img-select" width={1080} height={1080} style={{ width: "100%", height: "100%" }} priority />

        <div className={classes.imgTabLayout}>
          <div>
            {/* <Image
              src={validateImageUrl(img1)}
              alt="product-img1"
              width={1080}
              height={1080}
              className={`aspect-square object-cover hover:opacity-60 hover:border-2 hover:border-luoDarkBiege transition ease-in-out duration-200 rounded-lg ${currentImg === img1 ? "border-2 border-luoDarkBiege" : ""}`}
              style={{ width: "100%", height: "100%" }}
              onClick={() => imageClickHandler(img1)}
              onError={handleImgError}
              priority
            /> */}
            <ImageWithFallback
              src={validateImageUrl(img1)}
              fallbackSrc="/assets/img/image_not_found.jpeg"
              alt="product-img1"
              width={1080}
              height={1080}
              className={`aspect-square object-cover hover:opacity-60 hover:border-2 hover:border-luoDarkBiege transition ease-in-out duration-200 rounded-lg ${currentImg === img1 ? "border-2 border-luoDarkBiege" : ""}`}
              style={{ width: "100%", height: "100%" }}
              onClick={() => imageClickHandler(img1)}
              priority
            />
          </div>
          <div>
            {/* <Image
              src={validateImageUrl(img2)}
              alt="product-img2"
              width={1080}
              height={1080}
              className={`aspect-square object-cover hover:opacity-60 hover:border-2 hover:border-luoDarkBiege transition ease-in-out duration-200 rounded-lg ${currentImg === img2 ? "border-2 border-luoDarkBiege" : ""}`}
              style={{ width: "100%", height: "100%" }}
              onClick={() => imageClickHandler(img2)}
              onError={handleImgError}
            /> */}
            <ImageWithFallback
              src={validateImageUrl(img2)}
              fallbackSrc="/assets/img/image_not_found.jpeg"
              alt="product-img2"
              width={1080}
              height={1080}
              className={`aspect-square object-cover hover:opacity-60 hover:border-2 hover:border-luoDarkBiege transition ease-in-out duration-200 rounded-lg ${currentImg === img1 ? "border-2 border-luoDarkBiege" : ""}`}
              style={{ width: "100%", height: "100%" }}
              onClick={() => imageClickHandler(img2)}
              priority
            />
          </div>
          <div>
            {/* <Image
              src={validateImageUrl(img3)}
              alt="product-img3"
              width={1080}
              height={1080}
              className={`aspect-square object-cover hover:opacity-60 hover:border-2 hover:border-luoDarkBiege transition ease-in-out duration-200 rounded-lg ${currentImg === img3 ? "border-2 border-luoDarkBiege" : ""}`}
              style={{ width: "100%", height: "100%" }}
              onClick={() => imageClickHandler(img3)}
              onError={handleImgError}
            /> */}
            <ImageWithFallback
              src={validateImageUrl(img3)}
              fallbackSrc="/assets/img/image_not_found.jpeg"
              alt="product-img3"
              width={1080}
              height={1080}
              className={`aspect-square object-cover hover:opacity-60 hover:border-2 hover:border-luoDarkBiege transition ease-in-out duration-200 rounded-lg ${currentImg === img1 ? "border-2 border-luoDarkBiege" : ""}`}
              style={{ width: "100%", height: "100%" }}
              onClick={() => imageClickHandler(img3)}
              priority
            />
          </div>
        </div>
      </motion.div>
    </div>
  );

  if (!isOpen) return <></>;

  // @ts-ignore
  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
