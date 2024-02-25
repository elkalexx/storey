import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { z } from "zod";
import { checkoutSchema, Courier, officeSchema } from "@/lib/validations/checkout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type UseFormReturn } from "react-hook-form";
import { getOffices } from "@/lib/fetcher/checkout";

type Office = z.infer<typeof officeSchema>;
type Courier = z.infer<typeof Courier>;

type Input = z.infer<typeof checkoutSchema>;

interface Form {
    form: UseFormReturn<Input>;
    courier: Courier;
}

export default function Offices({ form, courier }: Form) {
    const [open, setOpen] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [offices, setOffices] = useState<Office[] | null >(null);

    const handleSearchChange = (value: string) => {
        setOpen(true);
        setSearchValue(value);
        getOffices(value, courier).then((data) => {
            setOffices(data ?? null);
        });
    };

    return (
        <FormItem>
            <FormControl>
                <Command className="rounded-md border">
                    <CommandInput
                        placeholder="Търси Офис"
                        className="h-12"
                        onValueChange={handleSearchChange}
                        value={searchValue}
                    />
                    <CommandEmpty className={cn(offices === null && "hidden")}>
                        Не беше намерен офис.
                    </CommandEmpty>
                    <CommandGroup className={cn(offices ? "" : "hidden", open ? "" : "hidden")}>
                        {offices && (
                            <ScrollArea className="h-48 rounded-md border">
                                <div>
                                    {offices.map((office) => (
                                        <CommandItem
                                            key={office.officeId}
                                            value={office.name}
                                            onSelect={() => {
                                                setSearchValue(office.name);
                                                setOpen(false);
                                                form.setValue("office", office.officeId);
                                            }}
                                        >
                                            {office.name}
                                        </CommandItem>
                                    ))}
                                </div>
                            </ScrollArea>
                        )}
                    </CommandGroup>
                </Command>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}
