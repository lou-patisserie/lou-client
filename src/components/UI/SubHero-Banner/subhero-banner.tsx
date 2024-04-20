import Image from "next/image";

type Props = {
  height?: string;
};

export default function SubHeroBanner({ height = "h-72" }: Props) {
  return (
    <div className="w-full ">
      <Image src="/assets/img/sub-banner2.jpg" width={1900} height={1900} alt="Luo-SubHero-Banner" className={`${height} w-full object-cover`} priority />
    </div>
  );
}
