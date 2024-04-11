import Image from "next/image";

export default function SubHeroBanner() {
  return (
    <div className="w-full ">
      <Image src="/assets/img/sub-hero-banner.png" width={1900} height={1900} alt="Luo-SubHero-Banner" className="w-full object-cover h-64" />
    </div>
  );
}
