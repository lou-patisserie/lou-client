import { CircleChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../UI/card";
import { product } from "./dummy";

export function ProductDesc() {
  return (
    <Card className="border-luoBiege">
      <div className="p-4 text-luoDarkBiege space-y-2">
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">{product.name}</h3>
        </div>
        <div>
          <p className="text-base">{product.description}</p>
        </div>
      </div>
    </Card>
  );
}

export function ProductAllergenAndIngredients() {
  return (
    <Card className="border-luoBiege ">
      <div className="p-4 text-luoDarkBiege space-y-2">
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Allergen</h3>
        </div>
        <div>
          <p className="text-base">{product.allergen}</p>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Ingredients</h3>
        </div>
        <div>
          <p>{product.ingredients}</p>
        </div>
      </div>
    </Card>
  );
}

export function StorageServing() {
  return (
    <Card className="border-luoBiege">
      <div className="p-4 text-luoDarkBiege space-y-2">
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Storage Serving</h3>
        </div>
        <div>
          <p className="text-base">{product.description}</p>
        </div>
      </div>
    </Card>
  );
}
