"use client";
import * as React from "react";
import Link from "next/link";
import { Icons } from "../UI/icons";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../UI/navigation-menu";
import { cn } from "@/lib/utils";
import { normalizeText } from "@/lib/formatters";

type ProductTypes = {
  ID: string;
  name: string;
  desc: string;
};

type Props = {
  typeList: ProductTypes[];
};

export function TopNavigationMenu({ typeList }: Props) {
  return (
    <NavigationMenu className="text-luoDarkBiege">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Delivery</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {typeList.map((type) => (
                <ListItem key={type.ID} href={`/collection/${normalizeText(type.name)}`} title={type.name}>
                  {type.desc}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/our-location" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Our Location</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about-lou" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>About Lou</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 text-luoDarkBiege rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-luoBiege hover:text-luoDarkBiege focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];
