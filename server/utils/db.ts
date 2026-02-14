import { createClient } from '@libsql/client';

let client: any = null;

export const useDb = () => {
    if (!client) {
        const url = process.env.TURSO_DATABASE_URL || `file:${process.cwd()}/driveflow.sqlite`;
        const authToken = process.env.TURSO_AUTH_TOKEN;

        console.log(`--- CONNECTING TO DATABASE AT: ${url} ---`);

        client = createClient({
            url: url,
            authToken: authToken,
        });
    }

    // Turso (libsql) uses a slightly different API. 
    // We'll wrap it to mimic a bit of what we had or just use it directly.
    return client;
};
