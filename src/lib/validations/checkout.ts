import { z } from "zod";

const conditionalFields = z.union([
    z.object({
        shipment: z.literal("speedy"),
        address: z.string().min(2).max(100),
    }),
    z.object({
        shipment: z.literal("speedy-office"),
        office: z.number(),
    }),
    z.object({
        shipment: z.literal("econt-office"),
        office: z.number(),
    }),
]);

export const checkoutSchema = z
    .object({
        // find a way how to have address and office as conditional fields
        email: z.string().email(),
        firstname: z.string().min(2).max(50),
        shipment: z.enum(["speedy", "speedy-office", "econt-office"]),
        lastname: z.string().min(2).max(50),
        phone: z.string().min(10).max(15),
        city: z.string().min(2).max(50),
        office: z.number({ required_error: "Моля избери офис за доставка" }),
        address: z.string().min(2).max(100),
    })
    .and(conditionalFields);

export const officeSchema = z.object({
    officeId: z.number(),
    name: z.string(),
});

export const Courier = z.enum(["speedy", "speedy-office", "econt-office"]);
