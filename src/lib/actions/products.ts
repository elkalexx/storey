"use server"
import {Product, products} from "@/db/schema";
import {faker} from "@faker-js/faker";
import {db} from '@/db';

export async function seedProducts() {
    const data: Product[] = [];

    for (let i = 0; i <= 10; i++) {
        data.push({
            id: i,
            uuid: faker.string.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
        })
    }

    await db.delete(products);

    await db.insert(products).values(data)

}