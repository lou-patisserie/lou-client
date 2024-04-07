import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/tabs";
import { ProductDesc, ProductAllergenAndIngredients, StorageServing } from "./tab-content";

export default function ProductTabs() {
  return (
    <Tabs defaultValue="description" className=" max-w-lg h-fit mx-4 md:mx-0">
      <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 md:grid-rows-1 grid-rows-2 shadow-md bg-luoDarkBiege text-white h-fit">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="storageServing">Storage Serving</TabsTrigger>
        <TabsTrigger value="allergenAndIngredients">Allergen & Ingredients</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <ProductDesc />
      </TabsContent>
      <TabsContent value="storageServing">
        <StorageServing />
      </TabsContent>
      <TabsContent value="allergenAndIngredients">
        <ProductAllergenAndIngredients />
      </TabsContent>
    </Tabs>
  );
}
