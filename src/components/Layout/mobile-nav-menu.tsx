"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownNarrowWide, Dot, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductTypes } from "@/types/data-types";
import { normalizeText } from "@/lib/formatters";


type Props = {
  showNav: boolean;
  typeList: ProductTypes[];
};

export default function MobileNavigationMenu({ showNav, typeList }: Props) {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sidenavRef = useRef<HTMLDivElement>(null);

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (sidenavRef.current && !sidenavRef.current.contains(target)) {
      setIsSidenavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const sidenavVariants = {
    open: { transform: "translateX(0%)" },
    closed: { transform: "translateX(-100%)" },
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      display: "block",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    closed: {
      opacity: 0,
      y: "-10%",
      transition: {
        duration: 0.2,
        ease: "easeIn",

        transitionEnd: {
          display: "none",
        },
      },
    },
  };

  return (
    <>
      <div>
        <button onClick={toggleSidenav} className={`text-luoDarkBiege hover:text-slate-700 transition ease-in-out duration-200`}>
          <Menu size={30} />
        </button>
      </div>

      <motion.div
        ref={sidenavRef}
        initial="closed"
        animate={isSidenavOpen ? "open" : "closed"}
        variants={sidenavVariants}
        transition={{ type: "tween", duration: 0.3 }}
        className={`fixed left-0 z-40 w-[60%] h-screen px-4 py-2 overflow-y-auto bg-luoBiege top-0`}
        tabIndex={-1}
      >
        <div className="flex gap-4 justify-between pt-2 px-4">
          <button onClick={toggleSidenav} className="text-luoDarkBiege hover:text-slate-700 transition ease-in-out duration-200">
            <X />
          </button>
          <Link href={"#"}>
            <Image src="/assets/img/Lou-bg-dark.png" alt="Website logo" width={40} height={40} className="" priority />
          </Link>
        </div>
        <div className="py-4 overflow-y-auto mt-2">
          <ul className="space-y-2 font-bold tracking-wide text-base">
            <li>
              <Link href="/" className="flex items-center p-2 rounded-lg text-luoDarkBiege  hover:bg-luoDarkBiege hover:text-white transition ease-in-out duration-200 group">
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li onClick={toggleDropdown} onMouseEnter={toggleDropdown} onMouseLeave={() => setIsDropdownOpen(false)} className="cursor-pointer">
              <span className="flex items-center p-2 rounded-lg text-luoDarkBiege hover:bg-luoDarkBiege hover:text-white transition ease-in-out duration-200 group">
                <span className="flex-1 ms-3 whitespace-nowrap"> Products</span>
                <ArrowDownNarrowWide />
              </span>
              {isDropdownOpen && (
                <motion.ul className="flex-1 ms-3 whitespace-nowrap mt-2 text-sm" initial="closed" animate={isDropdownOpen ? "open" : "closed"} variants={dropdownVariants}>
                  {/* <Link href="/all-products">
                    <li className="flex items-center p-2 rounded-lg text-luoDarkBiege hover:bg-luoDarkBiege hover:text-white transition ease-in-out duration-200 group">
                      <Dot />
                      All Products
                    </li>
                  </Link> */}
                  {typeList.map((type) => (
                    <Link key={type.ID} href={`/collection/${normalizeText(type.name)}`}>
                      <li className="flex items-center p-2 rounded-lg text-luoDarkBiege hover:bg-luoDarkBiege hover:text-white transition ease-in-out duration-200 group">
                        <Dot />
                        {type.name}
                      </li>
                    </Link>
                  ))}
                </motion.ul>
              )}
            </li>
            <li>
              <Link href="/about-us" className="flex items-center p-2 rounded-lg text-luoDarkBiege hover:bg-luoDarkBiege hover:text-white transition ease-in-out duration-200 group">
                <span className="ms-3">About Us</span>
              </Link>
            </li>
            <li>
              <Link href="/our-location" className="flex items-center p-2 rounded-lg text-luoDarkBiege hover:bg-luoDarkBiege hover:text-white transition ease-in-out duration-200 group">
                <span className="ms-3">Our Location</span>
              </Link>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-white">
            <li>
              <Link href="#" className="flex items-center p-2 rounded-lg text-luoDarkBiege hover:bg-luoDarkBiege hover:text-white transition ease-in-out duration-200 group">
                <span className="ms-3">FAQ</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center p-2 rounded-lg text-luoDarkBiege hover:bg-luoDarkBiege hover:text-white transition ease-in-out duration-200 group">
                <span className="ms-3">Privacy</span>
              </Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </>
  );
}
