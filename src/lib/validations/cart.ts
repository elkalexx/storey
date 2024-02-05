import * as z from "zod";

// in here this can generally be used when items are added to the cart

export const addToCartSchema = z.object({
    productId: z.number(),
    qty: z.number().optional(),
});
