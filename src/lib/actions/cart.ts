"use server";

// the idea for the cart:
// work with cookies
// get cookies with cartId
// check in database if cart id has already products assigned to it

import { cookies } from "next/headers";
import { db } from "@/db";
import { cart, cartItem, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { type z } from "zod";
import { addToCartSchema, CartItemToInsert } from "@/lib/validations/cart";
import { revalidatePath } from "next/cache";

export async function addProductToCart(input: z.infer<typeof addToCartSchema>) {
    const cartInput = addToCartSchema.parse(input);

    const cookieStore = cookies();
    const cartId = cookieStore.get("cartId")?.value;

    const product = await db.query.products.findFirst({
        where: eq(products.id, cartInput.productId),
    });

    if (!product) {
        throw new Error("Product not found.");
    }

    if (!cartId) {
        // user has no cart, create one, assign the products and assign the cart item to it as well
        const cartToInsert: {
            grandTotal: number;
            itemsQty: number;
            itemsCount: number;
        } = {
            itemsCount: 1,
            itemsQty: 1,
            grandTotal: product.price,
        };

        const insertedCart = await db
            .insert(cart)
            .values(cartToInsert)
            .returning({ id: cart.id });
        const cartId: number = insertedCart[0].id;
        cookies().set("cartId", String(cartId));
        const cartItemToInsert: CartItemToInsert = {
            cartId: cartId,
            sku: product.sku,
            name: product.name,
            qty: 1,
            price: product.price,
        };
        await db.insert(cartItem).values(cartItemToInsert);
        revalidatePath("/");
        return;
    }

    const existingCart = await db.query.cart.findFirst({
        where: eq(cart.id, Number(cartId)),
    });

    if (!existingCart) {
        throw Error("Cart could not be found");
    }

    const updateCart = {
        itemsCount: existingCart.itemsCount + 1,
        itemsQty: existingCart.itemsQty + 1,
        grandTotal: existingCart.grandTotal + product.price,
    };
    await db.update(cart).set(updateCart).where(eq(cart.id, existingCart.id));

    const cartItemToInsert: CartItemToInsert = {
        cartId: existingCart.id,
        sku: product.sku,
        name: product.name,
        qty: 1,
        price: product.price,
    };

    await db.insert(cartItem).values(cartItemToInsert);
    revalidatePath("/");
    return;
    // at later point, take care of expired carts as well
}
