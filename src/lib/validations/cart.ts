import * as z from "zod";

export const cartItemSchema = z.object({
    productId: z.number()
})