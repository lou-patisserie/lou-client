import Title from "../UI/Title/title";
import { Skeleton } from "../UI/skeleton";
import ProductsItem from "./products-item";
import classes from "./scss/product-logistics.module.scss";

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
};

export default function ProductLogistics({ items, selectedCategory, choosenType = "Products", page = 1, loading }: Props) {
  // console.log("items", items);
  return (
    <div className={classes.container}>
      <div className="capitalize w-full flex justify-between flex-wrap">
        <Title title={choosenType} />
        <span>Search</span>
      </div>
      <div className={classes.products}>
        {items.map((item) => (
          <ProductsItem key={item.ID} {...item} />
        ))}
        {loading && page > 1 && (
          <div className="flex flex-col">
            <Skeleton className="w-full h-60 md:h-72 rounded-none" />
            <Skeleton className="w-full h-14 mt-2 rounded-none" />
          </div>
        )}
      </div>
    </div>
  );
}
