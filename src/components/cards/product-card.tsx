"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/db/schema";
import { EyeOpenIcon, HeartFilledIcon } from "@radix-ui/react-icons";

import { addProductToCart } from "@/lib/actions/cart";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";

//
// interface ProductCardProps {
//     product: Product
// }

type ProductCardProps = {
    product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const handleAddToCard = async (productId: number) => {
        setIsAddingToCart(true);
        await addProductToCart({ productId });
        setIsAddingToCart(false);
    };
    return (
        <Card className="size-full overflow-hidden rounded-sm">
            <CardHeader>
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
                <CardTitle className="line-clamp-1 leading-tight">
                    {product.name}
                </CardTitle>
                <CardDescription>{product.price} €</CardDescription>
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
                <Link
                    href="/"
                    className={cn(
                        buttonVariants({
                            variant: "secondary",
                            size: "icon",
                            className: "h-8 w-8 shrink-0",
                        })
                    )}
                >
                    <EyeOpenIcon className="size-4" />
                    <span className="sr-only">Preview</span>
                </Link>
            </CardFooter>
        </Card>
    );
}
