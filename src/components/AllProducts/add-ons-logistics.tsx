import { AddOns } from "@/types/data-types";
import Title from "../UI/Title/title";
import classes from "./scss/product-logistics.module.scss";
import AddOnsItem from "./add-ons-item";

type Props = {
  choosenType: string;
  addOnsData?: AddOns[];
};

export default function AddOnsLogistics({ choosenType = "Add Ons", addOnsData }: Props) {
  return (
    <div className={classes.container}>
      <div className="capitalize">
        <Title title={choosenType} />
      </div>
      <div className={classes.products}>
        {addOnsData?.map((addOn) => (
          <AddOnsItem key={addOn.ID} {...addOn} />
        ))}
      </div>
    </div>
  );
}
