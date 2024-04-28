import Title from "../UI/Title/title";
import ProductsItem from "./products-item";
import classes from "./scss/product-logistics.module.scss";

type Items = {
  id: number;
  name: string;
  price: number;
  imgRef: string;
  is_new_arrival: boolean;
  is_bestseller: boolean;
  category: string;
};

type Props = {
  items: Items[];
  selectedCategory: string;
};

export default function ProductLogistics({ items, selectedCategory }: Props) {
  return (
    <div className={classes.container}>
      <div>
        <Title title={selectedCategory} />
      </div>
      <div className={classes.products}>
        {items.map((item) => (
          <ProductsItem key={item.id} name={item.name} price={item.price} imgRef={item.imgRef} />
        ))}
        {/* {items.map((prod) => (
          <ProductsItem key={prod.id} {...prod} />
        ))} */}
      </div>
    </div>
  );
}
