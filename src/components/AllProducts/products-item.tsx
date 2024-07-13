import ImageWithFallback from "@/hooks/fallback-img";
import { formatPrice } from "@/lib/formatters";
import { validateImageUrl } from "@/lib/imgUtils";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  name: string;
  main_image: string;
  variants: Variant[];
};

type Variant = {
  ID: string;
  cake_id: string;
  desc: string;
  name: string;
  price: string;
};

export default function ProductsItem({ name, main_image, variants }: Props) {
  return (
    <motion.div className="text-center" animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} layout>
      <div className="">
        <Link href={`/product/${name.replace(/\s+/g, "-")}`}>
          {/* <Image
            src={validateImageUrl(main_image)}
            alt={name}
            width={500}
            height={500}
            priority
            className={`aspect-square object-cover rounded-none w-full h-full shadow-sm cursor-pointer transition ease-in-out duration-200 hover:opacity-60 hover:border-2 hover:border-luoDarkBiege`}
          /> */}
          <ImageWithFallback
            src={validateImageUrl(main_image)}
            fallbackSrc="/assets/img/image_not_found.jpeg"
            alt={name}
            width={500}
            height={500}
            priority
            className={`aspect-square object-cover rounded-none w-full h-full shadow-sm cursor-pointer transition ease-in-out duration-200 hover:opacity-60 hover:border-2 hover:border-luoDarkBiege`}
          />
        </Link>
      </div>
      <h3 className="text-lg font-semibold mt-2 text-slate-700 cursor-default capitalize">{name}</h3>
      <p className="text-sm mt-1 text-luoDarkBiege cursor-default">{formatPrice(variants[0].price)}</p>
    </motion.div>
  );
}
