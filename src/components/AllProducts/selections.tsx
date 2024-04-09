import { Button } from "../UI/button";

export default function AllProductsSelection() {
  return (
    <>
      <Button variant="ghost" className={`text-xs font-bold uppercase rounded-full tracking-wide bg-slate-100 hover:bg-luoBiege`}>
        Whole Cakes
      </Button>
      <Button variant="ghost" className={`text-xs font-bold uppercase rounded-full tracking-wide bg-slate-100 hover:bg-luoBiege`}>
        Petit Gâteau
      </Button>
      <Button variant="ghost" className={`text-xs font-bold uppercase rounded-full tracking-wide bg-slate-100 hover:bg-luoBiege`}>
        Entremet
      </Button>
    </>
  );
}
