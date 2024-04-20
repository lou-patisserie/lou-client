import Image from "next/image";

type Props = {
  height?: string;
  title?: string;
};

export default function SubHeroBanner({ height = "h-72", title }: Props) {
  return (
    <div className="w-full relative">
      <Image src="/assets/img/sub-banner2.jpg" width={1900} height={1900} alt="Luo-SubHero-Banner" className={`${height} w-full object-cover`} priority />
      <div className="absolute inset-x-0 bottom-0">
        <h1 className="text-luoBiege text-2xl md:text-3xl tracking-wide font-bold w-full flex text-center justify-center mb-8">{title}</h1>
      </div>
    </div>
  );
}
