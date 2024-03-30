import Link from "next/link";
import classes from "./product-nav.module.scss";

export default function ProductNav() {
  return (
    <div className={classes.container}>
      <div className={`${classes.navItems} text-luoBiege text-lg font-medium`}>
        <Link href="/" className={`${classes.link}`}>
          All Product
        </Link>
        <Link href="/" className={`${classes.link} `}>
          Whole Cakes
        </Link>
        <Link href="/" className={`${classes.link}`}>
          Petit Gâteau
        </Link>
        <Link href="/" className={`${classes.link}`}>
          Entremet
        </Link>
        {/* <Link href="/" className={`${classes.link}`}>
          Others
        </Link> */}
      </div>
    </div>
  );
}
