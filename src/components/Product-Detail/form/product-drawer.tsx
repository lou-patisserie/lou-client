"use client";
import { Button } from "@/components/UI/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/UI/drawer";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  deliveryDate: Date;
  deliveryTime: string;
  candleAndKnife: boolean;
  greetingCard: boolean;
  complimentaryMsg: string;
}

type Props = {
  onOpenDrawer: boolean;
  setOpenDrawer: any;
  productToAdd: ProductProps;
};

export default function ProductDrawer({ onOpenDrawer, setOpenDrawer, productToAdd }: Props) {
  return (
    <Drawer open={onOpenDrawer} onOpenChange={setOpenDrawer}>
      {/* <DrawerTrigger>Open</DrawerTrigger> */}
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{productToAdd.name}</DrawerTitle>
            <DrawerDescription>{productToAdd.price}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex flex-row w-full">
            <DrawerClose asChild>
              <Button variant="outline">Add to Cart</Button>
            </DrawerClose>
            <Button className="w-full">Proceed to Checkout</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
