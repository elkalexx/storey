"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkoutSchema } from "@/lib/validations/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import Shipment from "@/components/order/shipment";
import Payment from "@/components/order/payment";

type Inputs = z.infer<typeof checkoutSchema>;

export default function OrderPage() {
    // 1. define the form
    const form = useForm<Inputs>({
        resolver: zodResolver(checkoutSchema),
        // find a way how to have address and office as conditional fields
        defaultValues: {
            email: "",
            firstname: "",
            lastname: "",
            phone: "",
            city: "",
            address: "",
            office: 0,
        },
    });

    // 2. define the submit handler
    function onSubmit(values: Inputs) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <section className="m-3 space-y-3">

                    <Shipment form={form} />



                    <Payment form={form} />

                    <Button type="submit" className="h-16 w-full">
                        Order Now
                    </Button>
                </section>
            </form>
        </Form>
    );
}
