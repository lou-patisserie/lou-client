"use client";
import { Link } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../drawer";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../dialog";
import { Button } from "../button";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Input } from "../input";
import { usePathname } from "next/navigation";
import { useToast } from "../use-toast";

type Props = {
  className?: string;
};

export default function ShareLinks({ className }: Props) {
  const [open, setOpen] = useState(false);
  const [fullUrl, setFullUrl] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopy = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(fullUrl);
      toast({
        description: "Link copied to clipboard!",
        variant: "default",
      });
    } else {
      toast({
        description: "Failed to copy link, please try again.",
        variant: "destructive",
      });
    }
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
            <DialogTitle>Share</DialogTitle>
            <DialogDescription>Copy the link below to share:</DialogDescription>
          </DialogHeader>
          <LinkPage url={fullUrl} className="flex flex-row gap-2" onCopy={handleCopy} />
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
      <DrawerContent onClick={(e) => e.stopPropagation()} className="py-4">
        <DrawerHeader className="text-left" onClick={(e) => e.stopPropagation()}>
          <DrawerTitle>Share</DrawerTitle>
          <DrawerDescription>Copy the link below to share:</DrawerDescription>
        </DrawerHeader>
        <LinkPage url={fullUrl} className="flex flex-col gap-2 px-4" onCopy={handleCopy} isDrawer />
      </DrawerContent>
    </Drawer>
  );
}

type LinkPageProps = {
  url: string;
  className?: string;
  onCopy: () => void;
  isDrawer?: boolean;
};

function LinkPage({ url, className, onCopy, isDrawer = false }: LinkPageProps) {
  return (
    <div className={className}>
      <Input className="rounded-none focus-visible:ring-luoDarkBiege" type="url" readOnly value={url} />
      <div className={`${isDrawer ? "flex flex-row gap-2" : "flex flex-col gap-2"}`}>
        {isDrawer && (
          <DrawerClose asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="outline" className="rounded-none" onClick={onCopy}>
              Cancel
            </Button>
          </DrawerClose>
        )}
        <Button onClick={onCopy} type="button" className="bg-luoDarkBiege w-full hover:bg-[#a58b73] rounded-none transition ease-in-out duration-150">
          Copy Link
        </Button>
      </div>
    </div>
  );
}
