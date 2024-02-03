'use server'
import {db} from "@/db";
import {products} from "@/db/schema";
import {unstable_noStore as noStore} from 'next/cache';

export async function getFeaturedProducts() {
    noStore()
    return db.select().from(products).limit(8);
}