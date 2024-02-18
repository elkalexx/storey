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
import { speedyOfficeSchema } from "@/lib/validations/checkout";
import { getSpeedyOffices } from "@/lib/fetcher/checkout";

type SpeedyOffice = z.infer<typeof speedyOfficeSchema>;
export default function SpeedyOffices({form}: any) {
// todo: find out what is the type of form
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [speedyOffices, setSpeedyOffices] = useState<SpeedyOffice[] | null>(null);

    useEffect(() => {
        getSpeedyOffices(searchValue).then((data) => {
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
                        <CommandEmpty>
                            Не беше намерен офис.
                        </CommandEmpty>
                        <CommandGroup
                            className={cn(
                                speedyOffices ? "" : "hidden",
                                open ? "" : "hidden"
                            )}
                        >
                            {speedyOffices && (
                                <>
                                    {speedyOffices.map(
                                        (speedyOffice) => (
                                            <CommandItem
                                                key={speedyOffice.officeId}
                                                value={speedyOffice.name}
                                                onSelect={( currentValue) => {
                                                    setSearchValue(speedyOffice.name);
                                                    setValue(currentValue === value ? "" : currentValue);
                                                    setOpen(false);
                                                    form.setValue("office", speedyOffice.officeId);
                                                }}>
                                                { speedyOffice.name }
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        value === speedyOffice.name ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        )
                                    )}
                                </>
                            )}
                        </CommandGroup>
                    </Command>
                </FormControl>
                <FormMessage />
            </FormItem>
    )
}