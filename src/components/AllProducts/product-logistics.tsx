import { Frown } from "lucide-react";
import Title from "../UI/Title/title";
import { Skeleton } from "../UI/skeleton";
import ProductsItem from "./products-item";
import classes from "./scss/product-logistics.module.scss";
import SearchProducts from "./search-products";
import { AnimatePresence } from "framer-motion";

type Variant = {
  ID: string;
  cake_id: string;
  desc: string;
  name: string;
  price: string;
};

type Items = {
  ID: string;
  name: string;
  main_image: string;
  variants: Variant[];
};

type Props = {
  items: Items[];
  selectedCategory: string;
  choosenType: string;
  page?: number;
  loading?: boolean;
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchPerformed: boolean;
};

export default function ProductLogistics({ items, selectedCategory, choosenType = "Products", page = 1, loading, searchQuery, onSearchChange, searchPerformed }: Props) {
  // console.log("items", items);
  return (
    <div className={classes.container}>
      <div className="capitalize w-full flex justify-between flex-wrap">
        <Title title={choosenType} />
        <SearchProducts searchQuery={searchQuery} onSearchChange={onSearchChange} typeName={choosenType} />
      </div>
      <div className={classes.products}>
        {searchPerformed ? (
          <div className="w-full text-start items-start gap-2 text-luoDarkBiege flex justify-start h-[22vh]">
            <Frown size={40} color="#8B7158" strokeWidth={1.5} /> <span className="mt-2">Your search did not find any products.</span>
          </div>
        ) : (
          <>
            <AnimatePresence>
              {items.map((item) => (
                <ProductsItem key={item.ID} {...item} />
              ))}
            </AnimatePresence>
            {loading && page > 1 && (
              <div className="flex flex-col">
                <Skeleton className="w-full h-60 md:h-72 rounded-none" />
                <Skeleton className="w-full h-14 mt-2 rounded-none" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
