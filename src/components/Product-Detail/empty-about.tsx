import { CircleChevronRight } from "lucide-react";
import { Card } from "../UI/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/tabs";

export default function EmptyAboutCake() {
  return (
    <Tabs defaultValue="description" className=" max-w-lg h-fit mx-4 md:mx-0">
      <TabsList className="rounded-none w-full grid grid-cols-2 md:grid-cols-3 md:grid-rows-1 grid-rows-2 shadow-md bg-white text-luoDarkBiege h-fit border-[1px] border-luoBiege">
        <TabsTrigger className="rounded-none" value="description">
          Description
        </TabsTrigger>
        <TabsTrigger className="rounded-none" value="storageServing">
          Storage & Serving
        </TabsTrigger>
        <TabsTrigger className="rounded-none" value="allergenAndIngredients">
          Allergen & Ingredients
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <Card className="border-luoBiege">
          <div className="p-4 text-luoDarkBiege space-y-2">
            <div className="flex flex-row gap-1 items-center">
              <CircleChevronRight size={18} strokeWidth={1.5} />
              <h3 className="text-lg font-semibold tracking-wide">Description</h3>
            </div>
            <div>
              <p className="text-base">No description for this cake</p>
            </div>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="storageServing">
        <Card className="border-luoBiege">
          <div className="p-4 text-luoDarkBiege space-y-2">
            <div className="flex flex-row gap-1 items-center">
              <CircleChevronRight size={18} strokeWidth={1.5} />
              <h3 className="text-lg font-semibold tracking-wide">Storage & Serving</h3>
            </div>
            <div>
              <p className="text-base">No information about storage & serving on this cake</p>
            </div>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="allergenAndIngredients">
        <Card className="border-luoBiege ">
          <div className="p-4 text-luoDarkBiege space-y-2">
            <div className="flex flex-row gap-1 items-center">
              <CircleChevronRight size={18} strokeWidth={1.5} />
              <h3 className="text-lg font-semibold tracking-wide">Allergen</h3>
            </div>
            <div>
              <p className="text-base">No information</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <CircleChevronRight size={18} strokeWidth={1.5} />
              <h3 className="text-lg font-semibold tracking-wide">Ingredients</h3>
            </div>
            <div>
              <p>No information</p>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
