import { z } from "zod";

export const checkoutSchema = z.object({
    email: z.string().email(),
    firstname: z.string().min(2).max(50),
    shipment: z.enum(["speedy", "speedy-office", "econt"]),
    lastname: z.string().min(2).max(50),
    phone: z.string().min(10).max(15),
    city: z.string().min(2).max(50),
    office: z.number({required_error: "Моля избери офис за доставка"}),
    address: z.string().min(2).max(100),
});

export const speedyOfficeSchema = z.object({
    officeId: z.number(),
    name: z.string(),
});