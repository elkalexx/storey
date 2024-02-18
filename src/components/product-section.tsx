"use client"

import { Product } from "@/db/schema";
import { ProductCard } from "@/components/cards/product-card";

interface ProductProps {
    products: Product[];
}

export default function ProductSection({ products }: ProductProps) {
    if (products.length === 1) {
        return (<>
            <section
                className="mx-auto flex max-w-md justify-center sm:max-w-full md:max-w-xl lg:max-w-xl">
                {products.map((product) => (
                    <ProductCard product={product} key={product.id}  className="sm:w-[80%]"/>
                ))}
            </section>
        </>);
    } else if (products.length === 2) {
        return (
            <>
                <section
                    className="mx-auto max-w-md p-3 space-y-5 sm:space-y-0 sm:flex sm:max-w-full sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5 lg:grid lg:max-w-7xl lg:grid-cols-2">
                    {products.map((product) => (
                        <ProductCard product={product} key={product.id} className="sm:w-[47%]" />
                    ))}
                </section>
            </>
        )
    } else {
        return (
            <>
                <section
                    className="mx-auto max-w-md p-3 space-y-5 sm:space-y-0 sm:flex sm:max-w-full sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5 lg:grid lg:max-w-7xl lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard product={product} key={product.id} className="sm:w-[47%]" />
                    ))}
                </section>
            </>
        );
    }
}
