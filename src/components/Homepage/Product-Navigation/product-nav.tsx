"use client";
import Link from "next/link";
import classes from "./product-nav.module.scss";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { fetchProductTypes } from "@/recoils/selectors/product-types";
import { useEffect, useState } from "react";
import { normalizeText } from "@/lib/formatters";
import { ProductTypes } from "@/types/data-types";



export default function ProductNav() {
  const [isClient, setIsClient] = useState(false);
  const productTypesLoadable = useRecoilValueLoadable(fetchProductTypes);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div></div>;
  }

  switch (productTypesLoadable.state) {
    case "hasValue":
      const productTypes = productTypesLoadable.contents  as ProductTypes[];
      return (
        <div className={classes.container}>
          <div className={`${classes.navItems} text-luoBiege text-lg font-medium`}>
            {productTypes.map((type) => (
              <Link href={`/collection/${normalizeText(type.name)}`} key={type.ID} className={`${classes.link}`}>
                {type.name}
              </Link>
            ))}
          </div>
        </div>
      );
    case "hasError":
      console.error("Error loading product types:", productTypesLoadable.contents);
      return <div className={classes.container}>Error loading product types</div>;
  }
}
