"use client";
import { useCallback, useEffect, useState } from "react";
import { TopNavigationMenu } from "./top-nav-menu";
import { TopLogo, TopScrolledLogo } from "./top-logo";
import MobileNavigationMenu from "./mobile-nav-menu";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./scss/nav-head.module.scss";
import LuoCart from "../UI/Cart/shopping-cart";
import { getAllProductTypes } from "@/api/product-type-api";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { fetchProductTypes } from "@/recoils/selectors/product-types";
import { ProductTypes } from "@/types/data-types";
import { cn } from "@/lib/utils";

type Props = {
  marginTopNotScrolled?: string;
  bgColorNotScrolled?: string;
  pyNotScrolled?: string;
  textColor?: string;
  logoSwitch?: boolean;
};

export default function NavHeader({ marginTopNotScrolled = "mt-4", bgColorNotScrolled = "bg-transparent", pyNotScrolled = "py-0", textColor = "text-white", logoSwitch = false }: Props) {
  const [showNav, setShowNav] = useState(false);
  const productTypesLoadable = useRecoilValueLoadable(fetchProductTypes);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setShowNav(currentScrollY > 0);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isClient]);

  if (!isClient) {
    return <div></div>;
  }

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  let content;
  switch (productTypesLoadable.state) {
    case "hasValue":
      const productTypes = productTypesLoadable.contents as ProductTypes[];
      if (showNav === true) {
        content = (
          <AnimatePresence>
            <motion.div
              className={cn(classes.navHeadPopup, "flex text-luoDarkBiege justify-between items-center px-10 fixed z-20 top-0 w-full mt-0 py-2")}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={navVariants}
              transition={{ duration: 0.3 }}
            >
              <div className="hidden md:flex items-center text-center ">{showNav || logoSwitch ? <TopScrolledLogo /> : <TopLogo />}</div>
              <div className="block md:hidden">
                <MobileNavigationMenu typeList={productTypes} showNav={showNav} />
              </div>
              <div>
                <div className="hidden md:block">
                  <TopNavigationMenu typeList={productTypes} />
                </div>
                <div>
                  <div className="flex items-center text-center md:hidden ">
                    <TopScrolledLogo />
                  </div>
                </div>
              </div>
              <div className="relative w-fit h-fit">
                <LuoCart />
              </div>
            </motion.div>
          </AnimatePresence>
        );
      }
      if (showNav === false) {
        content = (
          <div className={cn("flex justify-between items-center px-10 ", pyNotScrolled, marginTopNotScrolled, bgColorNotScrolled, textColor)}>
            <div className="hidden md:flex items-center text-center">{showNav || logoSwitch ? <TopScrolledLogo /> : <TopLogo />}</div>
            <div className="flex md:hidden">
              <MobileNavigationMenu typeList={productTypes} showNav={showNav} />
            </div>
            <div>
              <div className="hidden md:block">
                <TopNavigationMenu typeList={productTypes} />
              </div>
              <div>
                <div className="flex items-center text-center md:hidden ">
                  <TopScrolledLogo />
                </div>
              </div>
            </div>
            <div className="relative w-fit h-fit">
              <LuoCart />
            </div>
          </div>
        );
      }
      break;
    case "hasError":
      console.error("Error loading product types:", productTypesLoadable.contents);
      content = <div>Error loading product types</div>;
      break;
  }

  return content;
}
// return (
//   <div
//     className={`flex justify-between items-center px-10  transition ease-in-out  ${
//       showNav ? "fixed z-20 top-0 translate-y-0 w-full  bg-luoBiege mt-0 py-2  duration-500  " : `w-full duration-100 ${pyNotScrolled} ${marginTopNotScrolled} ${bgColorNotScrolled}`
//     }`}
//   >
//     <div className="hidden md:flex items-center text-center">{showNav || logoSwitch ? <TopScrolledLogo /> : <TopLogo />}</div>
//     <div className="flex md:hidden">
//       <MobileNavigationMenu showNav={showNav} />
//     </div>
//     <div>
//       <div className="hidden md:block">
//         <TopNavigationMenu />
//       </div>
//       <div>
//         <div className="flex items-center text-center md:hidden ">
//           <TopScrolledLogo />
//         </div>
//       </div>
//     </div>
//     <div>
//       <ShoppingCart className="text-luoDarkBiege" />
//     </div>
//   </div>
// );
