"use client";
import { Link } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../drawer";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../dialog";
import { Button } from "../button";
import React, { useEffect, useRef, useState } from "react";
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
  const drawerRef = useRef<HTMLDivElement>(null);

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
      setOpen(false);
    } else {
      toast({
        description: "Failed to copy link, please try again.",
        variant: "destructive",
      });
      setOpen(false);
    }
  };

  useOnClickOutside(drawerRef, () => setOpen(false));

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
          <div className="flex flex-row gap-2">
            <LinkPage url={fullUrl} className="w-full" />
            <Button onClick={handleCopy} type="button" className="bg-luoDarkBiege w-fit hover:bg-[#a58b73] rounded-none transition ease-in-out duration-150">
              Copy Link
            </Button>
          </div>

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
      <DrawerContent ref={drawerRef}>
        <DrawerHeader className="text-left">
          <DrawerTitle>Share</DrawerTitle>
          <DrawerDescription>Copy the link below to share:</DrawerDescription>
        </DrawerHeader>
        <LinkPage url={fullUrl} className="px-4 flex flex-col gap-2" />
        <DrawerFooter className="pt-2 flex flex-row gap-2">
          <DrawerClose asChild onClick={handleClose}>
            <Button variant="outline" className="rounded-none w-fit">
              Cancel
            </Button>
          </DrawerClose>
          <Button onClick={handleCopy} type="button" className="bg-luoDarkBiege w-full hover:bg-[#a58b73] rounded-none transition ease-in-out duration-150">
            Copy Link
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

type LinkPageProps = {
  url: string;
  className?: string;
};

function LinkPage({ url, className }: LinkPageProps) {
  return (
    <div className={className}>
      <Input className="rounded-none focus-visible:ring-luoDarkBiege" type="url" readOnly value={url} />
    </div>
  );
}

function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
