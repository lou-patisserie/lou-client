"use client";
import { Button } from "@/components/UI/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/UI/drawer";
import { Minus, Plus } from "lucide-react";
import * as React from "react";

type Props = {
  onOpenDrawer: boolean;
  setOpenDrawer: any;
};

export default function ProductDrawer({ onOpenDrawer, setOpenDrawer }: Props) {
  return (
    <Drawer open={onOpenDrawer} onOpenChange={setOpenDrawer}>
      {/* <DrawerTrigger>Open</DrawerTrigger> */}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
