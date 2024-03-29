import Image from "next/image";
import Link from "next/link";
import classes from "./scss/footer-nav.module.scss";

export default function FooterNavItems() {
  return (
    <>
      <div className="max-w-72 flex flex-col ">
        <Image src="/assets/img/Lou_footer.png" width={80} height={50} alt="Lou-Footer-Logo" />
        <p className="text-left pl-2 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec vestibulum arcu, non fringilla sapien. Donec ac odio cursus, scelerisque sapien at, eleifend turpis.</p>
      </div>
      <div className="flex flex-row grow  gap-10">
        <div className="flex flex-col gap-4">
          <div className="text-base font-semibold text-slate-700 tracking-wide">Product Nav</div>
          <div className="flex flex-col gap-2 text-sm text-luoDarkBiege">
            <Link href="/" className={`${classes.link} `}>
              ProductLink#1
            </Link>
            <Link href="/" className={`${classes.link} `}>
              ProductLink#2
            </Link>
            <Link href="/" className={`${classes.link} `}>
              ProductLink#3
            </Link>
            <Link href="/" className={`${classes.link} `}>
              ProductLink#4
            </Link>
            <Link href="/" className={`${classes.link} `}>
              ProductLink#5
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-base font-semibold text-slate-700 tracking-wide">Know More</div>
          <div className="flex flex-col gap-2 text-sm text-luoDarkBiege">
            <Link href="/" className={`${classes.link} `}>
              About Us
            </Link>
            <Link href="/" className={`${classes.link} `}>
              Our Location
            </Link>
            <Link href="/" className={`${classes.link} `}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
