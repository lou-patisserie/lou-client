import { formatPrice } from "@/lib/formatters";
import Image from "next/image";

type Props = {
  name: string;
  price: number;
  imgRef: string;
};

export default function ProductsItem({ name, price, imgRef }: Props) {
  return (
    <div className="text-center">
      <div className="">
        <Image src={imgRef} alt="Products" width={500} height={500} priority className={`aspect-square object-cover rounded-md shadow-sm cursor-pointer transition ease-in-out duration-200`} />
      </div>
      <h3 className="text-lg font-semibold mt-2 text-slate-700 cursor-default">{name}</h3>
      <p className="text-sm mt-1 text-luoDarkBiege cursor-default">{formatPrice(price)}</p>
    </div>
  );
}