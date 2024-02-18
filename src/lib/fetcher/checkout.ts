"use server";

import { db } from "@/db";
import { speedyOffices } from "@/db/schema";
import { like, or } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getSpeedyOffices(searchString: string) {
    if (searchString.length < 2) {
        return null;
    }
    const speedyOfficesFound = await db
        .select()
        .from(speedyOffices)
        .where(
            or(
                like(speedyOffices.name, `%${searchString.toUpperCase()}%`),
                like(speedyOffices.nameEn, `%${searchString.toUpperCase()}%`)
            )
        );

    const returnArray = speedyOfficesFound.map((office) => {
        return {
            officeId: office.officeId,
            name: office.name,
        };
    });

    console.log(returnArray);

    return returnArray;
}


export async function getEcontOffices(searchString: string) {
    unstable_noStore();
    console.log(searchString);
    console.log(searchString.length);

    if (searchString.length < 3) {
        return null;
    }
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

