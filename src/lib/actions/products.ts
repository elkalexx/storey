"use server";

import { db } from "@/db";
import { Product, products } from "@/db/schema";
import { faker } from "@faker-js/faker";

export async function seedProducts() {
    const data: Product[] = [];

    for (let i = 0; i <= 10; i++) {
        data.push({
            id: i,
            uuid: faker.string.uuid(),
            name: faker.commerce.productName(),
            price: Number(faker.commerce.price()) + 0.99,
            sku: faker.string.alphanumeric({ length: 10, casing: "upper" }),
        });
    }

    await db.delete(products);

    await db.insert(products).values(data);
}
