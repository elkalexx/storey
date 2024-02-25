"use server";

import { db } from "@/db";
import { speedyOffices } from "@/db/schema";
import { like, or } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { z } from "zod";
import { Courier } from "../validations/checkout";

type Courier = z.infer<typeof Courier>;



export async function getOffices(searchString: string, courier: Courier) {
    unstable_noStore();

    if (searchString.length < 3) {
        return null;
    }

    if (courier === "econt-office") {
        return getEcontOffices(searchString);
    } else if (courier === "speedy-office") {
        return getSpeedyOffices(searchString);
    }

}

async function getSpeedyOffices(searchString: string) {
    const speedyOfficesFound = await db
        .select()
        .from(speedyOffices)
        .where(
            or(
                like(speedyOffices.name, `%${searchString.toUpperCase()}%`),
                like(speedyOffices.nameEn, `%${searchString.toUpperCase()}%`),
                like(speedyOffices.address, `%${searchString.toUpperCase()}%`)
            )
        );

    // console.log(returnArray);

    return speedyOfficesFound.map((office) => {
        return {
            officeId: office.officeId,
            name: office.name + " (" + office.address + ")",
        };
    });
}



async function getEcontOffices(searchString: string) {
    const econtOfficesFound = await db
        .select()
        .from(speedyOffices)
        .where(
            or(
                like(speedyOffices.name, `%${searchString.toUpperCase()}%`),
                like(speedyOffices.nameEn, `%${searchString.toUpperCase()}%`),
                like(speedyOffices.address, `%${searchString.toUpperCase()}%`)
            )
        );

    // console.log(returnArray);

    return econtOfficesFound.map((office) => {
        return {
            officeId: office.officeId,
            name: office.name + " (" + office.address + ")",
        };
    });
}
