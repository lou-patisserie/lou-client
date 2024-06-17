import { Button } from "../UI/button";

type Props = {
  onSelectCategory: Function;
  currentSelection?: string;
};

export default function AllProductsSelection({ onSelectCategory, currentSelection }: Props) {
  return (
    <>
      <Button variant="ghost" onClick={() => onSelectCategory("All Products")} className={`text-xs font-bold uppercase rounded-full tracking-wide bg-slate-100 hover:bg-luoBiege ${currentSelection === "All Products" ? "bg-luoBiege " : ""}}`}>
        All
      </Button>
      <Button variant="ghost" onClick={() => onSelectCategory("Fruit-based")} className={`text-xs font-bold uppercase rounded-full tracking-wide bg-slate-100 hover:bg-luoBiege ${currentSelection === "Fruit-based" ? "bg-luoBiege " : ""}}`}>
       Fruit-Based
      </Button>
      <Button variant="ghost" onClick={() => onSelectCategory("Nut-free")} className={`text-xs font-bold uppercase rounded-full tracking-wide bg-slate-100 hover:bg-luoBiege  ${currentSelection === "Nut-free" ? "bg-luoBiege " : ""}`}>
        Nut-Free
      </Button>
      <Button variant="ghost" onClick={() => onSelectCategory("Chocolate-based")} className={`text-xs font-bold uppercase rounded-full tracking-wide bg-slate-100 hover:bg-luoBiege  ${currentSelection === "Chocolate-based" ? "bg-luoBiege " : ""}`}>
        Chocolate-based
      </Button>
    </>
  );
}
