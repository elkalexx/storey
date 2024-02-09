import * as z from "zod";

// in here this can generally be used when items are added to the cart

export const addToCartSchema = z.object({
    productId: z.number(),
    qty: z.number().optional(),
});

export const cartItems = z.object({
    productId: z.number(),
    name: z.string(),
    sku: z.string(),
    price: z.number(),
    qty: z.number()
})
export type CartItems = z.infer<typeof cartItems>

const cartItemToInsert = z.object({
    cartId: z.number(),
    sku: z.string(),
    name: z.string(),
    qty: z.number(),
    price: z.number()
});
export type CartItemToInsert = z.infer<typeof cartItemToInsert>