import Image from "next/image";
import Link from "next/link";
import classes from "./scss/footer-nav.module.scss";
import { Facebook, Instagram } from "lucide-react";
import { TiktokSvg } from "../UI/svgs";

export default function FooterNavItems() {
  return (
    <>
      <div className="max-w-72 flex flex-col ">
        <Image src="/assets/img/Lou_footer.png" width={80} height={50} alt="Lou-Footer-Logo" />
        <div className="flex gap-2 pl-2">
          <Instagram size={20} className="text-slate-700" />
          <Facebook size={20} className="text-slate-700" />
          <TiktokSvg />
        </div>
        <p className="text-left pl-2 text-sm mt-2">
          We are a team full of passion and deep love for the culinary world. As we progress to take local pastries to a new height, our value remains the same - to deliver excellent craftsmanship and be present in your sweet moments.
        </p>
      </div>
      <div className="flex ms-3 flex-row grow  gap-10">
        <div className="flex flex-col gap-4">
          <div className="text-base font-semibold text-slate-700 tracking-wide">Product Nav</div>
          <div className="flex flex-col gap-2 text-sm text-luoDarkBiege">
            <Link href="/products/type/whole-cakes" className={`${classes.link} `}>
              Whole Cakes
            </Link>
            <Link href="/products/type/petit-gateau" className={`${classes.link} `}>
              Petit Gâteau
            </Link>
            <Link href="/products/type/entremet" className={`${classes.link} `}>
              Entremet
            </Link>
            <Link href="/products/type/add-ons" className={`${classes.link} `}>
              Add Ons
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-base font-semibold text-slate-700 tracking-wide">Know More</div>
          <div className="flex flex-col gap-2 text-sm text-luoDarkBiege">
            <Link href="/about-lou" className={`${classes.link} `}>
              About Lou
            </Link>
            <Link href="/our-location" className={`${classes.link} `}>
              Our Location
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
