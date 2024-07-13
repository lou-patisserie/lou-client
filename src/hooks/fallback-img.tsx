"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type ImageWithFallbackProps = ImageProps & {
  fallbackSrc: string;
  onClick?: () => void;
};

function ImageWithFallback({ src, fallbackSrc, alt, onClick, ...props }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return <Image {...props} src={imgSrc} alt={alt} onError={() => setImgSrc(fallbackSrc)} onClick={onClick ? onClick : undefined} />;
}

export default ImageWithFallback;
