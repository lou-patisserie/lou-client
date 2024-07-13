"use client";
import Image from "next/image";
import { useState } from "react";
import ProductImageView from "./product-img-view";
import { Eye } from "lucide-react";
import { Skeleton } from "../UI/skeleton";
import ShareLinks from "../UI/Link/share-link";
import ImageWithFallback from "@/hooks/fallback-img";

type Props = {
  mainImg?: string;
  subImg1?: string;
  subImg2?: string;
};

export default function ProductDetailImgs({ mainImg, subImg1, subImg2 }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const handleImageClick = (src: any) => {
    setSelectedImg(src);
    setIsOpen(true);
  };

  return (
    <>
      <div className="max-w-lg h-full mx-4 md:mx-0 flex flex-col gap-2 cursor-pointer">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => mainImg && handleImageClick(mainImg)}
          className="flex h-fit relative items-start justify-center transition ease-in duration-150 hover:opacity-70"
        >
          {mainImg ? (
            // <Image
            //   src={mainImg}
            //   width={900}
            //   height={900}
            //   alt="Luo Croissant"
            //   className="object-cover aspect-square shadow-lg w-full"
            //   onError={handleImgError}
            // />
            <ImageWithFallback src={mainImg} fallbackSrc="/assets/img/image_not_found.jpeg" alt="Lou-product-Img" width={900} height={900} className="object-cover aspect-square shadow-lg w-full" />
          ) : (
            <Skeleton className="aspect-square w-full" />
          )}
          <div onClick={(e) => e.stopPropagation()}>
            <ShareLinks className="bg-luoDarkBiege drop-shadow absolute top-2 right-2 text-white rounded-full p-1.5" />
          </div>
          {isHovered && mainImg && (
            <>
              <Eye size={35} className="text-white absolute bottom-2 right-2" />
            </>
          )}
        </div>
        <div className="flex flex-row gap-2 w-full">
          <div
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
            onClick={() => subImg1 && handleImageClick(subImg1)}
            className="flex relative h-fit items-start justify-center transition ease-in duration-150 hover:opacity-70 w-full"
          >
            {subImg1 ? (
              // <Image
              //   src={subImg1}
              //   width={900}
              //   height={900}
              //   alt="Luo Croissant"
              //   className="object-cover aspect-square shadow-lg w-full"
              //   onError={handleImgError}
              // />
              <ImageWithFallback src={subImg1} fallbackSrc="/assets/img/image_not_found.jpeg" width={900} height={900} alt="lou-product-img" className="object-cover aspect-square shadow-lg w-full" />
            ) : (
              <Skeleton className="aspect-square w-full " />
            )}
            {isHovered2 && subImg1 && <Eye size={25} className="text-white absolute bottom-2 right-2" />}
          </div>
          <div
            onMouseEnter={() => setIsHovered3(true)}
            onMouseLeave={() => setIsHovered3(false)}
            onClick={() => subImg2 && handleImageClick(subImg2)}
            className="flex relative h-fit items-start justify-center transition ease-in duration-150 hover:opacity-70 w-full"
          >
            {subImg2 ? (
              // <Image
              //   src={subImg2}
              //   width={900}
              //   height={900}
              //   alt="Luo Croissant"
              //   className="object-cover aspect-square shadow-lg w-full"
              //   onError={handleImgError}
              // />
              <ImageWithFallback src={subImg2} fallbackSrc="/assets/img/image_not_found.jpeg" width={900} height={900} alt="lou-product-img" className="object-cover aspect-square shadow-lg w-full" />
            ) : (
              <Skeleton className="aspect-square w-full" />
            )}
            {isHovered3 && subImg2 && <Eye size={25} className="text-white absolute bottom-2 right-2" />}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProductImageView
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedImg={selectedImg}
        img1={mainImg || "/assets/img/image_not_found.jpeg"}
        img2={subImg1 || "/assets/img/image_not_found.jpeg"}
        img3={subImg2 || "/assets/img/image_not_found.jpeg"}
      />
    </>
  );
}
