"use client";

import React, { useState } from "react";
import Image from "next/image";
import { type Product } from "@/db/schema";

import { addProductToCart } from "@/lib/actions/cart";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Product;
}


export function ProductCard({ product, className }: ProductCardProps) {
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const handleAddToCard = async (productId: number) => {
        setIsAddingToCart(true);
        await addProductToCart({ productId });
        setIsAddingToCart(false);
    };
    return (
        <Card
            className={cn(
                "size-full overflow-hidden rounded-sm lg:size-full",
                className
            )}
        >
            <CardHeader>
                <span className="text-center text-xl font-bold">
                    {product.name}
                </span>
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
            </CardHeader>
            <CardContent>
                {/*<CardTitle className="leading-tight line-clamp-1">*/}
                {/*    {product.name}*/}
                {/*</CardTitle>*/}
                <CardTitle>
                    <div className="flex justify-center gap-14">
                        <div className="flex flex-col gap-2 text-muted-foreground">
                            <p className="underline">Цена:</p>
                            <p className="text-lg font-bold line-through md:text-base">
                                {(product.price * 1.95).toFixed(2)} лв.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 text-red-500">
                            <p className="underline">Промо цена:</p>
                            <p className="text-lg font-bold md:text-base">
                                {product.price} лв.
                            </p>
                        </div>
                    </div>
                </CardTitle>
            </CardContent>
            <CardFooter className="gap-2">
                <Button
                    aria-label="Add to card"
                    className="h-8 w-full rounded-sm"
                    onClick={handleAddToCard.bind(null, product.id)}
                    disabled={isAddingToCart}
                >
                    {isAddingToCart && (
                        <Icons.spinner
                            className="mr-2 size-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Add to card
                </Button>
                {/*<Link*/}
                {/*    href="/"*/}
                {/*    className={cn(*/}
                {/*        buttonVariants({*/}
                {/*            variant: "secondary",*/}
                {/*            size: "icon",*/}
                {/*            className: "h-8 w-8 shrink-0",*/}
                {/*        })*/}
                {/*    )}*/}
                {/*>*/}
                {/*    <EyeOpenIcon className="size-4" />*/}
                {/*    <span className="sr-only">Preview</span>*/}
                {/*</Link>*/}
            </CardFooter>
        </Card>
    );
}
