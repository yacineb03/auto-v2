import Database from 'better-sqlite3';
import { join } from 'path';

let db: any = null;

export const useDb = () => {
    if (!db) {
        // On Railway, we will use /data/driveflow.sqlite mapped to a Volume
        // On Local, it will stay in the project root
        const dbPath = process.env.DATABASE_PATH || join(process.cwd(), 'driveflow.sqlite');

        console.log(`--- CONNECTING TO DATABASE AT: ${dbPath} ---`);

        db = new Database(dbPath, { verbose: console.log });
        db.pragma('journal_mode = WAL');
    }
    return db;
};
