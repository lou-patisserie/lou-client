"use client";
import { Link } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../dialog";
import { Button } from "../button";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

type Props = {
  className?: string;
};

export default function ShareLinks({ className }: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className={className} onClick={handleClick}>
            <Link />
          </button>
        </DialogTrigger>
        <DialogContent onClick={(e) => e.stopPropagation()} className="sm:max-w-[425px]">
          <DialogHeader onClick={(e) => e.stopPropagation()}>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <LinkPage />
          <DialogClose onClick={handleClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className={className} onClick={handleClick}>
          <Link />
        </button>
      </DrawerTrigger>
      <DrawerContent onClick={(e) => e.stopPropagation()}>
        <DrawerHeader className="text-left" onClick={(e) => e.stopPropagation()}>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Make changes to your profile here. Click save when you're done.</DrawerDescription>
        </DrawerHeader>
        <LinkPage className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild onClick={handleClose}>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}


function LinkPage({ className }: React.ComponentProps<"form">) {
  return <Button type="submit">Save changes</Button>;
}
