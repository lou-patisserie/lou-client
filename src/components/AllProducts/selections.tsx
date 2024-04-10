import { Button } from "../UI/button";

type Props = {
  onSelectCategory: Function;
  currentSelection?: string;
};

export default function AllProductsSelection({ onSelectCategory, currentSelection }: Props) {
  return (
    <>
      <Button variant="ghost" onClick={() => onSelectCategory("Whole Cakes")} className={`text-xs font-bold uppercase rounded-full tracking-wide bg-slate-100 hover:bg-luoBiege ${currentSelection === "Whole Cakes" ? "bg-luoBiege " : ""}}`}>
        Whole Cakes
      </Button>
      <Button variant="ghost" onClick={() => onSelectCategory("Petit Gâteau")} className={`text-xs font-bold uppercase rounded-full tracking-wide bg-slate-100 hover:bg-luoBiege  ${currentSelection === "Petit Gâteau" ? "bg-luoBiege " : ""}`}>
        Petit Gâteau
      </Button>
      <Button variant="ghost" onClick={() => onSelectCategory("Entremet")} className={`text-xs font-bold uppercase rounded-full tracking-wide bg-slate-100 hover:bg-luoBiege  ${currentSelection === "Entremet" ? "bg-luoBiege " : ""}`}>
        Entremet
      </Button>
    </>
  );
}
