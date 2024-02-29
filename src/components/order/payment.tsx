import { z } from "zod";
import { checkoutSchema } from "@/lib/validations/checkout";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

type Input = z.infer<typeof checkoutSchema>;

interface Form {
    form: UseFormReturn<Input>;
}

export default function Payment({ form }: Form) {
    return (
        <>
            <span> Payment </span>
            <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <RadioGroup
                                onValueChange={(value) => {
                                    field.onChange(value);
                                }}
                                defaultValue={form.watch("payment")}
                                className="flex flex-col"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border-2 has-[:checked]:border-primary">
                                    <FormControl>
                                        <RadioGroupItem value="cash" hidden />
                                    </FormControl>
                                    <FormLabel className="flex h-12 w-full">
                                        <Image src="/images/cash.svg" alt="cash-payment" width={50} height={50} />
                                        <div className="flex flex-col justify-center gap-2 pl-10">
                                            <span className="font-bold"> Наложен платеж </span>
                                        </div>
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border-2 has-[:checked]:border-primary">
                                    <FormControl>
                                        <RadioGroupItem value="card" hidden />
                                    </FormControl>
                                    <FormLabel className="flex h-12 w-full">
                                        <Image src="/images/card.svg" alt="card-payment" width={50} height={50} />
                                        <div className="flex flex-col justify-center gap-2 pl-10">
                                            <span className="font-bold">Плащане с дебитна или кредитна карта</span>
                                        </div>
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}
