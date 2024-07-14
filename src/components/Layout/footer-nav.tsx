"use client";

import Image from "next/image";
import Link from "next/link";
import classes from "./scss/footer-nav.module.scss";
import { Facebook, Instagram } from "lucide-react";
import { useRecoilValueLoadable } from "recoil";
import { fetchProductTypes } from "@/recoils/selectors/product-types";
import { useEffect, useState } from "react";
import { ProductTypes } from "@/types/data-types";
import { normalizeText } from "@/lib/formatters";
import { TiktokSvg, WhatsappSvg } from "../UI/Svg/svg-ui";

export default function FooterNavItems() {
  const productTypesLoadable = useRecoilValueLoadable(fetchProductTypes);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let content;
  if (!isClient) {
    content = <div></div>;
  } else {
    switch (productTypesLoadable.state) {
      case "hasValue":
        const productTypes = productTypesLoadable.contents as ProductTypes[];
        content = (
          <>
            <div className="max-w-72 flex flex-col ">
              <Image src="/assets/img/Lou_footer.png" width={80} height={50} alt="Lou-Footer-Logo" />
              <div className="flex gap-2 pl-2">
                <Link href="https://www.instagram.com/lou_jkt" target="_blank" rel="nofollow">
                  <Instagram size={20} className="text-slate-700" />
                </Link>
                <Link href="https://wa.me/6281110019906" target="_blank" rel="nofollow">
                  <WhatsappSvg />
                </Link>
                <Link href="https://www.tiktok.com/@loupatisserie?_t=8nhdXzcGLZv&_r=1" target="_blank" rel="nofollow">
                  <TiktokSvg />
                </Link>
              </div>
              <p className="text-left pl-2 text-sm mt-2">
                We are a team full of passion and deep love for the culinary world. As we progress to take local
                pastries to a new height, our value remains the same - to deliver excellent craftsmanship and be present
                in your sweet moments.
              </p>
            </div>
            <div className="flex ms-3 flex-row grow gap-10">
              <div className="flex flex-col gap-4">
                <div className="text-base font-semibold text-slate-700 tracking-wide">Our Product</div>
                <div className="flex flex-col gap-2 text-sm text-luoDarkBiege w-fit">
                  {productTypes.map((type) => (
                    <div key={type.ID}>
                      <Link href={`/collection/${normalizeText(type.name)}`}>
                        <span className={classes.link}>{type.name}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-base font-semibold text-slate-700 tracking-wide">Know More</div>
                <div className="flex flex-col gap-2 text-sm text-luoDarkBiege">
                  <Link href="/about-us">
                    <span className={classes.link}>About Us</span>
                  </Link>
                  <Link href="/our-location">
                    <span className={classes.link}>Our Location</span>
                  </Link>
                </div>
              </div>
            </div>
          </>
        );
        break;
      case "hasError":
        console.error("Error loading product types:", productTypesLoadable.contents);
        content = <div>Error loading product types</div>;
        break;
      default:
        content = (
          <>
            <div className="max-w-72 flex flex-col ">
              <Image src="/assets/img/Lou_footer.png" width={80} height={50} alt="Lou-Footer-Logo" />
              <div className="flex gap-2 pl-2">
                <Link href="https://www.instagram.com/lou_jkt" target="_blank" rel="nofollow">
                  <Instagram size={20} className="text-slate-700" />
                </Link>
                <Link href="https://wa.me/6281110019906" target="_blank" rel="nofollow">
                  <WhatsappSvg />
                </Link>
                <Link href="https://www.tiktok.com/@loupatisserie?_t=8nhdXzcGLZv&_r=1" target="_blank" rel="nofollow">
                  <TiktokSvg />
                </Link>
              </div>
              <p className="text-left pl-2 text-sm mt-2">
                We are a team full of passion and deep love for the culinary world. As we progress to take local
                pastries to a new height, our value remains the same - to deliver excellent craftsmanship and be present
                in your sweet moments.
              </p>
            </div>
            <div className="flex ms-3 flex-row grow gap-10">
              <div className="flex flex-col gap-4"></div>
              <div className="flex flex-col gap-4">
                <div className="text-base font-semibold text-slate-700 tracking-wide">Know More</div>
                <div className="flex flex-col gap-2 text-sm text-luoDarkBiege">
                  <Link href="/about-us">
                    <span className={classes.link}>About Us</span>
                  </Link>
                  <Link href="/our-location">
                    <span className={classes.link}>Our Location</span>
                  </Link>
                </div>
              </div>
            </div>
          </>
        );
        break;
    }
  }

  return content;
}
