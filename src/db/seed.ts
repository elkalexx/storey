import {seedProducts} from "@/app/lib/actions/products";

async function runSeed() {
    console.log("⏳ Running seed...")

    const start : number = Date.now() / 1000;

    await seedProducts();

    const end : number = Date.now() / 1000;

    console.log(`✅ Seed completed in ${end - start}s`)

    process.exit(0)
}

runSeed().catch((err) => {
    console.error(err)
    process.exit(1)
})