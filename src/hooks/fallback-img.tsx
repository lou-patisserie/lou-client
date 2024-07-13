"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type ImageWithFallbackProps = ImageProps & {
  fallbackSrc: string;
};

function ImageWithFallback({ src, fallbackSrc, alt, ...props }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return <Image {...props} src={imgSrc} alt={alt} onError={() => setImgSrc(fallbackSrc)} />;
}

export default ImageWithFallback;
