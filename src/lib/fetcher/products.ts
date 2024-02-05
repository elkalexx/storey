"use server";

import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/db";
import { products } from "@/db/schema";

export async function getFeaturedProducts() {
    noStore();
    return db.select().from(products).limit(8);
}
