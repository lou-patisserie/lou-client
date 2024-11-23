"use client";

import TopSubscribe from "@/components/UI/Top-Subscribe/top-subscribe";
import NavHeader from "../../components/Layout/nav-head";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function TopLayoutProvider() {
  const pathname = usePathname();
  return (
    <>
      <Suspense fallback={<div></div>}>
        {pathname === "/" ? (
          <div className="absolute inset-x-0 top-0 z-50">
            <TopSubscribe />
            <NavHeader />
          </div>
        ) : (
          <div className="z-50">
            <TopSubscribe />
            <NavHeader marginTopNotScrolled="mt-0" bgColorNotScrolled="bg-luoBiege" pyNotScrolled="py-2" logoSwitch={true} textColor="text-luoDarkBiege" />
          </div>
        )}
      </Suspense>
    </>
  );
}
