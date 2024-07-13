import Image from "next/image";
import classes from "./subBanner.module.scss";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  height?: string;
  title?: string;
  image?: string | StaticImport | any;
};

export default function SubHeroBanner({ height = "h-72", title, image }: Props) {
  return (
    <div className="w-full relative">
      <Image src={image} width={1900} height={1900} alt="Luo-SubHero-Banner" className={`${height} w-full object-cover relative -z-50`} priority />
      <div className="absolute inset-x-0 inset-y-1/2 -z-50">
        <h1 className="text-white text-2xl md:text-3xl tracking-wide font-semibold w-full flex text-center justify-center mb-8 drop-shadow-md">{title}</h1>
      </div>
    </div>
  );
}
