import { Medal, ShoppingBasket, Trophy, Truck } from "lucide-react";
import classes from "./second-banner.module.scss";

export default function SecondBanner() {
  return (
    <div className={`${classes.container} text-luoDarkBiege`}>
      <span className="text-xs font-medium">SINCE 2019</span>
      <h1 className="font-medium">Revolutionising experiences and occasions, one cake at a time</h1>
      <div className={classes.items}>
        <div className="" >
          <Truck size={45} strokeWidth={1.5} className="" />
          <p>Free Delivery</p>
          <span>with minimum purchase</span>
        </div>
        <div>
          <ShoppingBasket size={45} strokeWidth={1.5} />
          <p>Crafted To Order</p>
          <span>freshly made within 1 hour from purchase</span>
        </div>
        <div>
          <Medal size={42} strokeWidth={1.5} />
          <p>The Finest Quality</p>
          <span>5 Stars on Google from over 1000 reviews</span>
        </div>
        <div>
          <Trophy size={42} strokeWidth={1.5} />
          <p>Award-Winning Chef</p>
          <span>champion of the 2017 Asian Pastry Cup</span>
        </div>
      </div>
    </div>
  );
}
