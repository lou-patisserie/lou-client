import { Button } from "@/components/UI/button";

type Props = {
  onSelect: (selection: string) => void;
  currentSelection: string;
};

export default function ProductSelection({ onSelect, currentSelection }: Props) {
  return (
    <>
      <Button onClick={() => onSelect("Best Sellers")} variant="ghost" className={`text-sm font-bold uppercase rounded-full tracking-wide bg-slate-100 text-slate-900 transition ease-in-out duration-150 hover:bg-luoBiege ${currentSelection === "Best Sellers" ? "bg-luoBiege " : ""}`}>
        Best Sellers
      </Button>
      <Button onClick={() => onSelect("New Arrivals")} variant="ghost" className={`text-sm font-bold uppercase rounded-full tracking-wide bg-slate-100 text-slate-900 transition ease-in-out duration-150 hover:bg-luoBiege ${currentSelection === "New Arrivals" ? "bg-luoBiege " : ""}`}>
        New Arrivals
      </Button>
    </>
  );
}
