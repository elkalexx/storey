import 'dotenv/config'
import {migrate} from "drizzle-orm/node-postgres/migrator";
import {db} from "@/db";

async function runMigration() {
    console.log("⏳ Running migration...")

    const start : number = Date.now() / 1000;

    await migrate(db, {migrationsFolder: './drizzle'});

    const end : number = Date.now() / 1000;

    console.log(`✅ Migration completed in ${end - start}s`)

    process.exit(0)
}

runMigration().catch((err) => {
    console.error(err)
    process.exit(1)
})