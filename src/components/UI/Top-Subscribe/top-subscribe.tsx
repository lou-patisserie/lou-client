import { BellDot, Truck } from "lucide-react";
import classes from "./top-subscribe.module.scss";

export default function TopSubscribe() {
  return (
    <div className={`bg-luoDarkBiege w-full h-[3.25rem] flex justify-center items-center z-20 ${classes.topSubscribe} `}>
      <span className={`uppercase tracking-wide flex gap-1.5 items-center text-luoBiege`}>
        {/* <Truck size={18} strokeWidth={1.2} /> */}
        <BellDot size={18} strokeWidth={1.75} />
        Receive Order within 1 hour of confirmation
      </span>
    </div>
  );
}
