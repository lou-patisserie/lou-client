import { CircleChevronRight } from "lucide-react";
import { Card } from "../UI/card";
import classes from "./scss/about-content.module.scss";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

type DescProps = {
  description: string;
};

export function ProductDesc({ description }: DescProps) {
  const santizedContent = DOMPurify.sanitize(description);
  const parsedContent = parse(santizedContent);

  return (
    <Card className="border-luoBiege">
      <div className="p-4 text-luoDarkBiege space-y-2">
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Description</h3>
        </div>
        <div className={`px-6 ${classes.renderedJoditHtml}`}>{parsedContent}</div>
      </div>
    </Card>
  );
}

type AllerIngProps = {
  allergens: string;
  ingredients: string;
};

export function ProductAllergenAndIngredients({ allergens, ingredients }: AllerIngProps) {
  const santizedAllergen = DOMPurify.sanitize(allergens);
  const parsedAllergen = parse(santizedAllergen);

  const sanitizedIngredients = DOMPurify.sanitize(ingredients);
  const parsedIngredients = parse(sanitizedIngredients);

  return (
    <Card className="border-luoBiege ">
      <div className="p-4 text-luoDarkBiege space-y-2">
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Allergen</h3>
        </div>
        <div className={`px-6 ${classes.renderedJoditHtml}`}>{parsedAllergen}</div>
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Ingredients</h3>
        </div>
        <div className={`px-6 ${classes.renderedJoditHtml}`}>{parsedIngredients}</div>
      </div>
    </Card>
  );
}

type ServingProps = {
  storageServing: string;
};

export function StorageServing({ storageServing }: ServingProps) {
  const santizedContent = DOMPurify.sanitize(storageServing);
  const parsedContent = parse(santizedContent);

  return (
    <Card className="border-luoBiege">
      <div className="p-4 text-luoDarkBiege space-y-2">
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Storage & Serving</h3>
        </div>
        <div className={`px-6 ${classes.renderedJoditHtml}`}>{parsedContent}</div>
      </div>
    </Card>
  );
}
