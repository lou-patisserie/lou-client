import Title from "../UI/Title/title";
import ProductsItem from "./products-item";
import classes from "./scss/product-logistics.module.scss";

type Items = {
  ID: string;
  name: string;
  main_image: string;
};

type Props = {
  items: Items[];
  selectedCategory: string;
  choosenType: string;
};

export default function ProductLogistics({ items, selectedCategory, choosenType = "Products" }: Props) {
  return (
    <div className={classes.container}>
      <div className="capitalize">
        <Title title={choosenType} />
      </div>
      <div className={classes.products}>
        {items.map((item) => (
          <ProductsItem key={item.ID} {...item}  />
        ))}

      </div>
    </div>
  );
}
