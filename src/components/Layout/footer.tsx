import { Copyright } from "lucide-react";
import FooterNavItems from "./footer-nav";

export default function Footer() {
  return (
    <div className="flex flex-col">
      <div className="relative flex flex-wrap bg-gray-100  gap-10 md:gap-40 justify-between px-10 lg:px-28 py-12">
        <FooterNavItems />
      </div>
      <div className="bg-luoDarkBiege py-3 md:py-4 flex flex-col justify-center text-center items-center px-4">
        <div className="flex items-center text-center gap-1 text-xs text-luoBiege">
          <Copyright size={15} />
          <span className="flex gap-1">
            Copyright {new Date().getFullYear()}, Lou Patisserie & Gelato. <span className="hidden md:block">All Rights Reserved. Powered by Grivo.id</span>
          </span>
        </div>
        <span className="text-xs text-luoBiege block md:hidden">All Rights Reserved. Powered by Grivo.id</span>
        {/* <div className="flex gap-2">
          <Instagram size={20} className="text-luoBiege" />
          <Facebook size={20} className="text-luoBiege" />
          <TiktokSvg />
        </div> */}
      </div>
    </div>
  );
}
