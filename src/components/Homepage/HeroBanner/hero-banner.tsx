import Image from "next/image";
import classes from "./hero-banner.module.scss";

export default function HeroBanner() {
  return (
    <header id="hero-section" >
      <div className={classes.heroBanner}>
        {/* <Image src="/assets/img/Lou_F&B-11.jpg" width={1900} height={1900} alt="Luo-Hero-Banner" priority /> */}
        </div>
    </header>
  );
}
