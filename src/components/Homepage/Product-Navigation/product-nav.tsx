"use client";
import Link from "next/link";
import classes from "./product-nav.module.scss";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { fetchProductTypes } from "@/recoils/selectors/product-types";
import { useEffect, useState } from "react";

type ProductTypes = {
  ID: string;
  name: string;
  created_date: string;
};

export default function ProductNav() {
  const [isClient, setIsClient] = useState(false);
  const productTypesLoadable = useRecoilValueLoadable<ProductTypes[]>(fetchProductTypes);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div></div>;
  }

  switch (productTypesLoadable.state) {
    case "hasValue":
      const productTypes = productTypesLoadable.contents;
      return (
        <div className={classes.container}>
          <div className={`${classes.navItems} text-luoBiege text-lg font-medium`}>
            <Link href="/">All Product</Link>
            {productTypes.map((type) => (
              <Link href={`/${encodeURIComponent(type.name)}`} key={type.ID} className={`${classes.link}`}>
                {type.name}
              </Link>
            ))}
            <Link href="/" className={`${classes.link}`}>
              Add Ons
            </Link>
          </div>
        </div>
      );
    case "hasError":
      console.error("Error loading product types:", productTypesLoadable.contents);
      return <div className={classes.container}>Error loading product types</div>;
  }
}

//   return (
//     <div className={classes.container}>
//       <div className={`${classes.navItems} text-luoBiege text-lg font-medium`}>
//         <Link href="/" className={`${classes.link}`}>
//           All Product
//         </Link>
//         {productTypes.map((type) => (
//           <Link href={`/${encodeURIComponent(type.name)}`} key={type.ID} className={`${classes.link}`}>
//             {type.name}
//           </Link>
//         ))}
//         <Link href="/" className={`${classes.link}`}>
//           Add Ons
//         </Link>
//       </div>
//     </div>
//   );
// }
