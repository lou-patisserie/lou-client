import Title from "../UI/Title/title";
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
};

export default function ProductLogistics({ items, selectedCategory, choosenType = "Products" }: Props) {
  console.log("items", items);
  return (
    <div className={classes.container}>
      <div className="capitalize">
        <Title title={choosenType} />
      </div>
      <div className={classes.products}>
        {items.map((item) => (
          <ProductsItem key={item.ID} {...item} />
        ))}
      </div>
    </div>
  );
}
