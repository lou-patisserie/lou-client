import { Copyright, Facebook, Instagram } from "lucide-react";
import { TiktokSvg } from "../UI/svgs";
import FooterNavItems from "./footer-nav";

export default function Footer() {
  return (
    <div className="flex flex-col">
      <div className="relative flex flex-wrap bg-gray-100  gap-10 md:gap-40 justify-between px-10 lg:px-28 py-12">
        <FooterNavItems />
      </div>
      <div className="bg-luoDarkBiege pt-2.5 pb-1 flex justify-center px-4">
        <div className="flex items-center text-center gap-1 text-xs text-luoBiege">
          <Copyright size={15} />
          <span> Copyright {new Date().getFullYear()}, LuoPatisserie. All Rights Reserved. Powered by Grivo.id</span>
        </div>
        {/* <div className="flex gap-2">
          <Instagram size={20} className="text-luoBiege" />
          <Facebook size={20} className="text-luoBiege" />
          <TiktokSvg />
        </div> */}
      </div>
    </div>
  );
}
