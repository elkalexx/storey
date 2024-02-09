"use server";

import { db } from "@/db";
import { cart, cartItem } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

export async function getCart() {
    // noStore();
    const cookieStore = cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
        return null;
    }
    const existingCart = await db.query.cart.findFirst({
        where: eq(cart.id, Number(cartId)),
    });

    if (!existingCart) {
        // create cart maybe?
        throw Error("Cart does not exist");
    }

    return existingCart;
}

export async function getCartItems(cartId: number)  {

    const cartItems = await db.select().from(cartItem).where(eq(cartItem.cartId, cartId));

    return cartItems;
}