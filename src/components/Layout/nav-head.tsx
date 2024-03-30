"use client";
import { useEffect, useState } from "react";

import { TopNavigationMenu } from "./top-nav-menu";
import { TopLogo, TopScrolledLogo } from "./top-logo";

export default function NavHeader() {
  const [showNav, setShowNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  // console.log(showNav);
  // console.log(lastScrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 150) {
        setShowNav(false);
      } else if (currentScrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`flex justify-between items-center px-10  transition-transform duration-500  ${showNav ? "fixed z-20 top-0  w-full translate-y-0 bg-luoBiege mt-0 py-2 " : "relative -translate-y-full w-full top-12 mt-4 "}`}>
      <div className="flex items-center text-center ">{showNav ? <TopScrolledLogo /> : <TopLogo />}</div>
      <div>
        <TopNavigationMenu />
      </div>
      <div></div>
    </div>
  );
}
