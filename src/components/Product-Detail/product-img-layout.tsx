"use client";
import Image from "next/image";
import { useState } from "react";
import ProductImageView from "./product-img-view";
import { Eye } from "lucide-react";

export default function ProductDetailImgs() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const handleImageClick = (src: string) => {
    setSelectedImg(src);
    setIsOpen(true);
  };

  return (
    <>
      <div className="max-w-lg h-full mx-4 md:mx-0 flex flex-col gap-2 cursor-pointer">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => handleImageClick("/assets/dummy/Lou_Croissant2.jpg")}
          className="flex h-fit relative items-start justify-center transition ease-in duration-150 hover:opacity-70"
        >
          <Image src="/assets/dummy/Lou_Croissant2.jpg" width={900} height={900} alt="Luo Croissant" className="object-cover aspect-square shadow-lg" />
          {isHovered && <Eye size={35} className="text-white absolute bottom-2 right-2" />}
        </div>
        <div className="flex flex-row gap-2">
          <div
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
            onClick={() => handleImageClick("/assets/dummy/Lou_Croissant3.jpg")}
            className="flex relative h-fit items-start justify-center transition ease-in duration-150 hover:opacity-70 "
          >
            <Image src="/assets/dummy/Lou_Croissant3.jpg" width={900} height={900} alt="Luo Croissant" className="object-cover aspect-square shadow-lg" />
            {isHovered2 && <Eye size={25} className="text-white absolute bottom-2 right-2" />}
          </div>
          <div
            onMouseEnter={() => setIsHovered3(true)}
            onMouseLeave={() => setIsHovered3(false)}
            onClick={() => handleImageClick("/assets/dummy/Lou_Croissant0.jpg")}
            className="flex relative h-fit items-start justify-center transition ease-in duration-150 hover:opacity-70 "
          >
            <Image src="/assets/dummy/Lou_Croissant0.jpg" width={900} height={900} alt="Luo Croissant" className="object-cover aspect-square shadow-lg" />
            {isHovered3 && <Eye size={25} className="text-white absolute bottom-2 right-2" />}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProductImageView isOpen={isOpen} setIsOpen={setIsOpen} selectedImg={selectedImg} />
    </>
  );
}
