import { CircleChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../UI/card";
import { product } from "./dummy";

type DescProps = {
  description: string;
};

export function ProductDesc({ description }: DescProps) {
  return (
    <Card className="border-luoBiege">
      <div className="p-4 text-luoDarkBiege space-y-2">
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Description</h3>
        </div>
        <div>{description}</div>
      </div>
    </Card>
  );
}

type AllerIngProps = {
  allergens: string;
  ingredients: string;
};

export function ProductAllergenAndIngredients({ allergens, ingredients }: AllerIngProps) {
  return (
    <Card className="border-luoBiege ">
      <div className="p-4 text-luoDarkBiege space-y-2">
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Allergen</h3>
        </div>
        <div>{allergens}</div>
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Ingredients</h3>
        </div>
        <div>{ingredients}</div>
      </div>
    </Card>
  );
}

type ServingProps = {
  storageServing: string;
};

export function StorageServing({ storageServing }: ServingProps) {
  return (
    <Card className="border-luoBiege">
      <div className="p-4 text-luoDarkBiege space-y-2">
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Storage Serving</h3>
        </div>
        <div>{storageServing}</div>
      </div>
    </Card>
  );
}
