import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/tabs";
import { ProductDesc, ProductAllergenAndIngredients, StorageServing } from "./tab-content";

export default function ProductTabs() {
  return (
    <Tabs defaultValue="description" className=" max-w-lg h-fit mx-4 md:mx-0">
      <TabsList className="rounded-none w-full grid grid-cols-2 md:grid-cols-3 md:grid-rows-1 grid-rows-2 shadow-md bg-white text-luoDarkBiege h-fit border-[1px] border-luoBiege">
        <TabsTrigger className="rounded-none" value="description">Description</TabsTrigger>
        <TabsTrigger className="rounded-none" value="storageServing">Storage Serving</TabsTrigger>
        <TabsTrigger className="rounded-none" value="allergenAndIngredients">Allergen & Ingredients</TabsTrigger>
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
