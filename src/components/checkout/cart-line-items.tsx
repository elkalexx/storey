"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { ExistingCartLineItems } from "@/lib/validations/cart";
import { removeProductFromCart } from "@/lib/actions/cart";

interface existingCartItems {
    existingCartItems: ExistingCartLineItems[],
}

export function CartLineItems({ existingCartItems }: existingCartItems) {

    const handleRemoveFromCart = async (product: ExistingCartLineItems) => {
        await removeProductFromCart(product);
    }

    return (
        <ScrollArea className="h-full">
            <div className="flex w-full flex-col gap-5 pr-6">
            {existingCartItems.map((product) => (
                <div
                    key={product.id}
                    className="flex items-start justify-between"
                >
                    <div className="w-1/2">
                        <AspectRatio>
                            <Image
                                src={
                                    "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_598,c_limit/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoes-rWtqPn.png"
                                }
                                alt={"Nike Air Force"}
                                className="object-fill"
                                fill
                            />
                        </AspectRatio>
                    </div>
                    <div className="w-3/4 space-y-2 pl-5">
                        <p>
                            <span className="text-sm">1x {product.name}</span>
                        </p>
                        <p>
                            <span>{product.price} €</span>
                        </p>
                        <div className="pt-4">
                            <Button
                                variant="outline"
                                className="relative"
                                size="icon"
                                onClick={handleRemoveFromCart.bind(null, product)}
                            >
                                <Icons.trash className="size-5 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </ScrollArea>
    );
}
