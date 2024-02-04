"use server"

import {undefined, type z} from "zod"

// the idea for the cart:
// work with cookies
// get cookies with cartId
// check in database if cart id has already products assigned to it

import {cookies} from "next/headers";
import {cartItemSchema} from "@/lib/validations/cart";
import {cart, cartItem, products} from "@/db/schema";
import {db} from "@/db";
import {eq} from "drizzle-orm";

export async function addProductToCart(input: z.infer<typeof cartItemSchema>) {

    const cartInput = cartItemSchema.parse(input);

    const cookieStore = cookies();
    const cartId = cookieStore.get('cartId')?.value;

    const product = await db.select().from(products).where(eq(products.id, cartInput.productId))



    if (!cartId) {
        const cartToInsert: { grandTotal: string; itemsQty: number; itemsCount: number } = {
            itemsCount: 1,
            itemsQty: 1,
            grandTotal: product[0].price
        }

        const insertedCart = await db.insert(cart).values(cartToInsert).returning({id: cart.id})
        const cartId: number = insertedCart[0].id;
        cookies().set('cartId', String(cartId))

        // insert into cart items:
        const cartItemToInsert: {cartId: number, sku: string, name: string, qty: number, price: string} = {
            cartId: cartId,
            sku: "420",
            name: product[0].name,
            qty: 1,
            price: product[0].price
        }
        await db.insert(cartItem).values(cartItemToInsert);
    }
}