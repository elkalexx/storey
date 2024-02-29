import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { checkoutSchema } from "@/lib/validations/checkout";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import Offices from "@/components/order/offices";
import { Input } from "../ui/input";

type Input = z.infer<typeof checkoutSchema>;

interface Form {
    form: UseFormReturn<Input>;
}

export default function Shipment({ form }: Form) {
    const shipmentValue = form.watch("shipment");

    const isOffice = shipmentValue === "speedy-office" || shipmentValue === "econt-office";
    return (
        <>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Email" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <span>Shipment</span>
            <FormField
                control={form.control}
                name="shipment"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormControl>
                            <RadioGroup
                                onValueChange={(value) => {
                                    field.onChange(value);
                                }}
                                defaultValue={form.watch("shipment")}
                                className="flex flex-col"
                            >
                                <FormItem
                                    className="flex items-center space-x-3 space-y-0 rounded-md border-2 has-[:checked]:border-primary">
                                    <FormControl>
                                        <RadioGroupItem value="speedy" hidden />
                                    </FormControl>
                                    <FormLabel className="flex h-12 w-full">
                                        <Image src="/images/speedy.svg" alt="speedy-logo" width={50} height={70} />
                                        <div className="flex flex-col justify-center gap-2 pl-10">
                                            <span className="font-bold">до адрес</span>
                                            <span>1-2 работни дни</span>
                                        </div>
                                    </FormLabel>
                                </FormItem>
                                <FormItem
                                    className="flex items-center space-x-3 space-y-0 rounded-md border-2 has-[:checked]:border-primary">
                                    <FormControl>
                                        <RadioGroupItem value="speedy-office" hidden />
                                    </FormControl>
                                    <FormLabel className="flex h-12 w-full">
                                        <Image src="/images/speedy.svg" alt="speedy-logo" width={50} height={70} />
                                        <div className="flex flex-col justify-center gap-2 pl-10">
                                            <span className="font-bold">до офис</span>
                                            <span>1-2 работни дни</span>
                                        </div>
                                    </FormLabel>
                                </FormItem>
                                <FormItem
                                    className="flex items-center space-x-3 space-y-0 rounded-md border-2 has-[:checked]:border-primary">
                                    <FormControl>
                                        <RadioGroupItem value="econt-office" hidden />
                                    </FormControl>
                                    <FormLabel className="flex h-12 w-full">
                                        <Image src="/images/econt.svg" alt="econt-logo" width={50} height={70} />
                                        <div className="flex flex-col justify-center gap-2 pl-10">
                                            <span className="font-bold">до офис</span>
                                            <span>1-2 работни дни</span>
                                        </div>
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Firstname" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Lastname" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Phone" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="City" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {isOffice ? (
                <FormField
                    key={shipmentValue}
                    control={form.control}
                    name="office"
                    render={({ field }) => <Offices form={form} courier={shipmentValue} {...field} />}
                />
            ) : (
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Адрес" {...field} className="h-12" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </>
    );
}
