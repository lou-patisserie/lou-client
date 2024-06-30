import Image from "next/image";
import classes from "./subBanner.module.scss";

type Props = {
  height?: string;
  title?: string;
};

export default function SubHeroBanner({ height = "h-72", title }: Props) {
  return (
    // <header id="hero-section">
    //   <div className={classes.subBanner}>
    //     <div className={classes.customInsetBanner}>
    //       <h1 className="text-luoBiege text-2xl md:text-3xl tracking-wide font-semibold w-full flex text-center justify-center mb-8">{title}</h1>
    //     </div>
    //   </div>
    // </header>
    <div className="w-full relative">
      <Image src="/assets/img/sub-banner2.jpg" width={1900} height={1900} alt="Luo-SubHero-Banner" className={`${height} w-full object-cover`} priority />
      <div className="absolute inset-x-0 inset-y-1/2">
        <h1 className="text-white text-2xl md:text-3xl tracking-wide font-semibold w-full flex text-center justify-center mb-8 drop-shadow-md">{title}</h1>
      </div>
    </div>
  );
}
