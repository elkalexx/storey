"use server"

import { Icons } from "@/components/icons";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCart, getCartItems } from "@/lib/fetcher/cart";
import { Cart } from "@/db/schema";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartLineItems } from "@/components/checkout/cart-line-items";


export async function CartSheet() {
    const existingCart: Cart | null = await getCart();

    const itemCount = existingCart?.itemsCount;

    let existingCartItems;
    if (itemCount) {
        existingCartItems = await getCartItems(existingCart.id);
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="relative" size="icon">
                    {itemCount && itemCount > 0 ? (
                        <Badge
                            variant="secondary"
                            className="absolute -right-2 -top-2 size-4 justify-center rounded-full p-2.5"
                        >
                            {itemCount}
                        </Badge>
                    ): null}
                    <Icons.cart className="size-4" />
                </Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col'>
                <SheetHeader>
                    <SheetTitle className="border-b">Cart</SheetTitle>
                </SheetHeader>
                {itemCount && itemCount > 0 ? (
                    <>
                        {existingCartItems && (
                           <CartLineItems existingCartItems={existingCartItems} />
                        )}
                        <div className="container pt-5 h-full">
                            <div className="flex justify-between">
                                <p>
                                    <span className="font-bold">Sum:</span>
                                </p>
                                <p>
                                    <span className="font-bold">
                                        {(Math.round(existingCart?.grandTotal * 100) / 100).toFixed(2)} €
                                    </span>
                                </p>
                            </div>
                            <div className="pt-4">
                                <Button className="w-full">Order now</Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center space-y-1">
                        <Icons.cart className="mb-4 size-16 text-muted-foreground" />
                        <div className="text-xl font-medium text-muted-foreground">
                            Your cart is empty
                        </div>
                        <SheetTrigger asChild>
                            <Link
                                href="/"
                                className={cn(
                                    buttonVariants({
                                        variant: "link",
                                        size: "sm",
                                        className:
                                            "text-sm text-muted-foreground",
                                    })
                                )}
                            >
                                Add items to your cart
                            </Link>
                        </SheetTrigger>
                    </div>
                )}
                <SheetFooter></SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
