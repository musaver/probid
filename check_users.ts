import { db } from "@/lib/db";
import { user } from "@/lib/schema";

async function main() {
    const users = await db.select().from(user);
    console.log("Users in DB:", JSON.stringify(users, null, 2));
}

main().catch(console.error).finally(() => process.exit(0));
