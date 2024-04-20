"use client";
import { cartState } from "@/recoils/atoms/products";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function LuoCart() {
  const cart = useRecoilValue(cartState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const shakeAnimation = {
    initial: { scale: 0.9 },
    animate: {
      x: [0, -3, 3, -3, 3, 0],
      scale: 1,
    },
    transition: {
      type: "tween",
      duration: 0.4,
      ease: "easeInOut",
    },
  };

  if (!isHydrated) {
    return (
      <>
        <ShoppingCart className="text-luoDarkBiege " />
        <span className="absolute z-10 -top-1.5 -right-2.5 text-white font-semibold text-xs px-[0.35rem] bg-luoDarkBiege rounded-full ">0</span>
      </>
    );
  }

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div key={cart.length} initial={shakeAnimation.initial} animate={shakeAnimation.animate} transition={shakeAnimation.transition}>
          <Link href="/checkout">
            <ShoppingCart className="text-luoDarkBiege " />
            <span className="absolute z-10 -top-1.5 -right-2.5 text-white font-semibold text-xs px-[0.35rem] bg-luoDarkBiege rounded-full ">{cart.length}</span>
          </Link>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
