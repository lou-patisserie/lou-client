import { Medal, ShoppingBasket, Trophy, ChefHat } from "lucide-react";
import classes from "./second-banner.module.scss";

export default function SecondBanner() {
  return (
    <div className={`${classes.container} text-luoDarkBiege`}>
      <span className="text-md font-medium">SINCE 2023</span>
      <div className={classes.items}>
        <div>
          <ShoppingBasket size={45} strokeWidth={1.5} />
          <p>Crafted To Order</p>
          <span>Freshly made within 1 hour from purchase</span>
        </div>
        <div>
          <Medal size={42} strokeWidth={1.5} />
          <p>The Finest Quality</p>
          <span>Made with the finest premium ingredients</span>
        </div>
        <div>
          <ChefHat size={42} strokeWidth={1.5} />
          <p>Envisioned With Precision</p>
          <span>By Chef Audrey, a Le Cordon Bleu Alumni</span>
        </div>
      </div>
    </div >
  );
}
