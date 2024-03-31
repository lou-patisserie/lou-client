import Image from "next/image";

export function TopLogo() {
  return <Image src="/assets/img/Lou-transparent-light.png" width={50} height={50} alt="Luo-Logo" priority />;
}

export function TopScrolledLogo() {
  return <Image src="/assets/img/Lou-transparent.png" width={40} height={40} alt="Luo-Logo" priority />;
}
