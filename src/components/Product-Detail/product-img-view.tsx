"use client";

import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import classes from "./scss/product-img-view.module.scss";

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
  selectedImg: string;
};

export default function ProductImageView({ isOpen, setIsOpen, selectedImg }: Props) {
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

  const content = (
    <div className={classes.modal} onClick={() => setIsOpen(false)}>
      <button className="bg-none border-none text-gray-200 text-lg absolute cursor-pointer right-2 top-2">
        <X />
      </button>
      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onClick={(e) => e.stopPropagation()} className={classes.modalCard}>
        <Image src={currentImg} alt="product-img" width={1080} height={1080} style={{ width: "100%", height: "100%" }} />
        <div className="p-2 flex flex-row gap-2 ">
          <div>
            <Image
              src="/assets/dummy/Lou_Croissant2.jpg"
              alt="product-img"
              width={1080}
              height={1080}
              className="aspect-square object-cover hover:opacity-60 hover:border-2 hover:border-luoDarkBiege transition ease-in-out duration-200"
              style={{ width: "100%", height: "100%" }}
              onClick={() => imageClickHandler("/assets/dummy/Lou_Croissant2.jpg")}
            />
          </div>
          <div>
            <Image
              src="/assets/dummy/Lou_Croissant0.jpg"
              alt="product-img"
              width={1080}
              height={1080}
              className="aspect-square object-cover hover:opacity-60 hover:border-2 hover:border-luoDarkBiege transition ease-in-out duration-200"
              style={{ width: "100%", height: "100%" }}
              onClick={() => imageClickHandler("/assets/dummy/Lou_Croissant0.jpg")}
            />
          </div>
          <div>
            <Image
              src="/assets/dummy/Lou_Croissant3.jpg"
              alt="product-img"
              width={1080}
              height={1080}
              className="aspect-square object-cover hover:opacity-60 hover:border-2 hover:border-luoDarkBiege transition ease-in-out duration-200"
              style={{ width: "100%", height: "100%" }}
              onClick={() => imageClickHandler("/assets/dummy/Lou_Croissant3.jpg")}
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
