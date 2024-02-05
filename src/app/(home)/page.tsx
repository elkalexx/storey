import { Product } from "@/db/schema";

import { getFeaturedProducts } from "@/lib/fetcher/products";
import { ProductCard } from "@/components/cards/product-card";

export default async function HomePage() {
    const featuredProducts: Product[] = await getFeaturedProducts();
    return (
        <section className="p-1 pb-10">
            <section className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 py-24 text-center sm:scroll-auto md:py-32">
                <h1 className="text-balance font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                    Storey is a small e-commerce shop built to learn Next.js 14
                </h1>
                <p className="max-w-3xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    Shop a wide selection of stylish and affordable shoes at{" "}
                    <strong>storey</strong>, where fashion meets comfort in
                    every step.
                </p>
            </section>
            <section className="mx-auto grid w-3/4 max-w-7xl gap-4 xs:w-full xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {featuredProducts.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </section>
        </section>
    );
}
