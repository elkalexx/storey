import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { z } from "zod";
import { checkoutSchema, speedyOfficeSchema } from "@/lib/validations/checkout";
import { getEcontOffices } from "@/lib/fetcher/checkout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type UseFormReturn } from "react-hook-form";

type SpeedyOffice = z.infer<typeof speedyOfficeSchema>;

type Input = z.infer<typeof checkoutSchema>;

interface Form {
   form: UseFormReturn<Input>;
}

export default function EcontOffices({form} : Form){
// todo: find out what is the type of form
    const [open, setOpen] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [speedyOffices, setSpeedyOffices] = useState<SpeedyOffice[] | null>(null);

    const handleSearch = () => {
        console.log("in handlesearch: " + searchValue);
        getEcontOffices(searchValue).then((data) => {
            setSpeedyOffices(data);
        });
    }

    useEffect(() => {
        getEcontOffices(searchValue).then((data) => {
            setSpeedyOffices(data);
        });
    }, [searchValue]);

    return (
            <FormItem>
                <FormControl>
                    <Command className="rounded-md border">
                        <CommandInput
                            placeholder="Търси Офис"
                            className="h-12"
                            onValueChange={(e) => {
                                setOpen(true);
                                setSearchValue(e);
                            }}
                            value={searchValue}
                        />
                        <CommandEmpty
                            className={cn(
                                speedyOffices === null && "hidden",
                            )}>
                            Не беше намерен офис.
                        </CommandEmpty>
                        <CommandGroup
                            className={cn(
                                speedyOffices ? "" : "hidden",
                                open ? "" : "hidden"
                            )}
                        >
                            {speedyOffices && (
                                <ScrollArea className="h-48 roundend-md border">
                                    <div>
                                    {speedyOffices.map(
                                        (speedyOffice) => (
                                            <CommandItem
                                                key={speedyOffice.officeId}
                                                value={speedyOffice.name}
                                                onSelect={() => {
                                                    setSearchValue(speedyOffice.name);
                                                    setOpen(false);
                                                    form.setValue("office", speedyOffice.officeId);
                                                }}>
                                                { speedyOffice.name }
                                            </CommandItem>
                                        )
                                    )}
                                    </div>
                                </ScrollArea>
                            )}
                        </CommandGroup>
                    </Command>
                </FormControl>
                <FormMessage />
            </FormItem>
    )
}