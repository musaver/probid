
import fs from 'fs';
import path from 'path';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

// 1. Load .env manually to avoid dependency issues
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const [key, ...valueParts] = trimmed.split('=');
            const value = valueParts.join('=').replace(/(^"|"$)/g, '').replace(/(^'|'$)/g, '');
            if (key && value) {
                process.env[key.trim()] = value;
            }
        }
    });
    console.log('Loaded .env file');
} else {
    console.log('No .env file found');
}

// 2. Import App Modules (using relative paths to avoid alias issues)
import { db } from '../src/lib/db';
import { user } from '../src/lib/schema';

async function main() {
    const email = 'joe@ownmidwest.com';
    const name = 'Joe (County Admin)';

    console.log(`Checking for user: ${email}...`);

    try {
        const [existing] = await db.select().from(user).where(eq(user.email, email)).limit(1);

        if (existing) {
            console.log(`User exists (ID: ${existing.id}). Updating to "county"...`);
            await db
                .update(user)
                .set({
                    type: 'county',
                    emailVerified: new Date(),
                })
                .where(eq(user.email, email));
            console.log('Update Success!');
        } else {
            console.log('User not found. Creating new "county" user...');
            const newId = uuidv4();
            await db.insert(user).values({
                id: newId,
                email,
                name,
                type: 'county',
                emailVerified: new Date(),
                visibilityMinBid: 1,
                visibilityCurrentBid: 1,
                visibilityBidHistory: 0,
                visibilityPropertyStatus: 1,
                visibilityBidderList: 0,
                visibilityDocuments: 0,
            });
            console.log(`Creation Success! New ID: ${newId}`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error executing script:', error);
        process.exit(1);
    }
}

main();
