"use client";
import { useEffect, useState } from "react";
import { TopNavigationMenu } from "./top-nav-menu";
import { TopLogo, TopScrolledLogo } from "./top-logo";
import MobileNavigationMenu from "./mobile-nav-menu";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./scss/nav-head.module.scss";
import LuoCart from "../UI/Cart/shopping-cart";

type Props = {
  marginTopNotScrolled?: string;
  bgColorNotScrolled?: string;
  pyNotScrolled?: string;
  logoSwitch?: boolean;
};

export default function NavHeader({ marginTopNotScrolled = "mt-4", bgColorNotScrolled = "bg-transparent", pyNotScrolled = "py-0", logoSwitch = false }: Props) {
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

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (showNav === true) {
    return (
      <AnimatePresence>
        <motion.div className={`${classes.navHeadPopup} flex justify-between items-center px-10 fixed z-20 top-0 w-full mt-0 py-2`} initial="hidden" animate="visible" exit="hidden" variants={navVariants} transition={{ duration: 0.3 }}>
          <div className="hidden md:flex items-center text-center">{showNav || logoSwitch ? <TopScrolledLogo /> : <TopLogo />}</div>
          <div className="flex md:hidden">
            <MobileNavigationMenu showNav={showNav} />
          </div>
          <div>
            <div className="hidden md:block">
              <TopNavigationMenu />
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

  if (!showNav) {
    return (
      <div className={`flex justify-between items-center px-10  ${pyNotScrolled} ${marginTopNotScrolled} ${bgColorNotScrolled}  `}>
        <div className="hidden md:flex items-center text-center">{showNav || logoSwitch ? <TopScrolledLogo /> : <TopLogo />}</div>
        <div className="flex md:hidden">
          <MobileNavigationMenu showNav={showNav} />
        </div>
        <div>
          <div className="hidden md:block">
            <TopNavigationMenu />
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
