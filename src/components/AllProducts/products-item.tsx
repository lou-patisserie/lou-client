import { formatPrice } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";

type Props = {
  name: string;


};

export default function ProductsItem({ name }: Props) {
  return (
    <div className="text-center">
      <div className="">
        <Link href="/product/test">
          <Image
            src="/assets/dummy/Lou_Pastry_15.jpg"
            alt="Products"
            width={500}
            height={500}
            priority
            className={`aspect-square object-cover rounded-none shadow-sm cursor-pointer transition ease-in-out duration-200 hover:opacity-60 hover:border-2 hover:border-luoDarkBiege`}
          />
        </Link>
      </div>
      <h3 className="text-lg font-semibold mt-2 text-slate-700 cursor-default">{name}</h3>
      {/* <p className="text-sm mt-1 text-luoDarkBiege cursor-default">{formatPrice(price)}</p> */}
    </div>
  );
}
