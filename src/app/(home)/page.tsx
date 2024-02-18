import { Product } from "@/db/schema";

import { getFeaturedProducts } from "@/lib/fetcher/products";
import { ProductCard } from "@/components/cards/product-card";
import ProductSection from "@/components/product-section";

export default async function HomePage() {
    const featuredProducts: Product[] = await getFeaturedProducts();
    return (
        <section className="p-1 pb-10">
            <section
                className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 py-24 text-center sm:scroll-auto md:py-32">
                <h1 className="font-serif text-3xl text-balance sm:text-5xl md:text-6xl lg:text-7xl">
                    Storey is a small e-commerce shop built to learn Next.js 14
                </h1>
                <p className="max-w-3xl leading-normal text-balance text-muted-foreground sm:text-xl sm:leading-8">
                    Shop a wide selection of stylish and affordable shoes at{" "}
                    <strong>storey</strong>, where fashion meets comfort in
                    every step.
                </p>
            </section>
            <ProductSection products={featuredProducts}/>
            <section
                className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 py-24 text-center sm:scroll-auto md:py-32">
                <p className="max-w-7xl leading-normal text-balance text-muted-foreground sm:text-xl sm:leading-8">
                    Shop a wide selection of stylish and affordable shoes at{" "}
                    <strong>storey</strong>, where fashion meets comfort in
                    every step.
                </p>
            </section>
        </section>
    );
}
