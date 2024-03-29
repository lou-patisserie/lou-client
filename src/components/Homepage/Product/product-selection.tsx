import { Button } from "@/components/UI/button";

type Props = {
  onSelect: (selection: string) => void;
  currentSelection: string;
};

export default function ProductSelection({ onSelect, currentSelection }: Props) {
  return (
    <>
      <Button onClick={() => onSelect("Best Sellers")} variant="ghost" className={`text-sm font-bold uppercase rounded-full tracking-wide ${currentSelection === "Best Sellers" ? "bg-luoDarkBiege text-white" : "text-luoDarkBiege"}`}>
        Best Sellers
      </Button>
      <Button onClick={() => onSelect("New Arrivals")} variant="ghost" className={`text-sm font-bold uppercase rounded-full tracking-wide ${currentSelection === "New Arrivals" ? "bg-luoDarkBiege text-white" : "text-luoDarkBiege"}`}>
        New Arrivals
      </Button>
    </>
  );
}
