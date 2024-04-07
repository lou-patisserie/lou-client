"use client";
import Image from "next/image";
import { useState } from "react";
import ProductImageView from "./product-img-view";

export default function ProductDetailImgs() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  const handleImageClick = (src: string) => {
    setSelectedImg(src);
    setIsOpen(true);
  };

  return (
    <>
      <div className="max-w-lg h-full mx-4 md:mx-0 flex flex-col gap-2 ">
        <div onClick={() => handleImageClick("/assets/dummy/Lou_Croissant2.jpg")} className="flex h-fit  items-start justify-center transition ease-in duration-150 hover:opacity-70">
          <Image src="/assets/dummy/Lou_Croissant2.jpg" width={900} height={900} alt="Luo Croissant" className="object-cover aspect-square rounded-lg shadow-lg" />
        </div>
        <div className="flex flex-row gap-2">
          <div onClick={() => handleImageClick("/assets/dummy/Lou_Croissant3.jpg")} className="flex h-fit items-start justify-center transition ease-in duration-150 hover:opacity-70 ">
            <Image src="/assets/dummy/Lou_Croissant3.jpg" width={900} height={900} alt="Luo Croissant" className="object-cover aspect-square rounded-lg shadow-lg" />
          </div>
          <div onClick={() => handleImageClick("/assets/dummy/Lou_Croissant0.jpg")} className="flex h-fit items-start justify-center transition ease-in duration-150 hover:opacity-70 ">
            <Image src="/assets/dummy/Lou_Croissant0.jpg" width={900} height={900} alt="Luo Croissant" className="object-cover aspect-square rounded-lg shadow-lg" />
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProductImageView isOpen={isOpen} setIsOpen={setIsOpen} selectedImg={selectedImg} />
    </>
  );
}
