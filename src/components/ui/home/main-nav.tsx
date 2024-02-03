"use client"
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import React from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Icons} from "@/components/icons";
import {footerInternalConfig} from "@/config/footer-internal";

export function MainNav() {
    return (
        <header className="sticky top-0 z-50 flex h-16 w-full border-b bg-background">
            <div className="container flex h-16 items-center space-x-4">
                <span className="font-bold">
                    {footerInternalConfig.name}
                </span>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Shop All</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <a
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none from-muted/50 to-muted focus:shadow-md"
                                                href="/"
                                            >
                                                <div className="mt-4 mb-2 text-lg font-medium">
                                                    storey
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    Shop stylish and affordable shoes at storey, where fashion meets comfort.
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="/docs" title="Shoes"/>
                                    <ListItem href="/docs/installation" title="Bags"/>
                                    <ListItem href="/docs/primitives/typography" title="Stickers" />
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    New arrivals
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    About
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            <div className="flex flex-1 items-center justify-end space-x-4">
                {/*Here will be cart and login as well as maybe search*/}
                <nav className="flex items-center space-x-2">
                    <Icons.cart className="size-4"/>
                </nav>
            </div>
        </div>
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"