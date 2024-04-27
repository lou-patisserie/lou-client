"use client";

import TopSubscribe from "@/components/UI/Top-Subscribe/top-subscribe";
import NavHeader from "../../components/Layout/nav-head";
import { usePathname } from "next/navigation";

export default function TopLayoutProvider() {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/" ? (
        <div className="absolute inset-x-0 top-0">
          <TopSubscribe />
          <NavHeader />
        </div>
      ) : (
 
          <div className="absolute inset-x-0 top-0">
            <TopSubscribe />
            <NavHeader marginTopNotScrolled="mt-0" bgColorNotScrolled="bg-luoBiege" pyNotScrolled="py-2" logoSwitch={true} />
          </div>

      )}
    </>
  );
}
