export default defineEventHandler(async (event) => {
    console.log('--- API TEST-DB CALLED ---');
    const db = useDb();
    try {
        const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
        const users = db.prepare("SELECT id, email, password, rank FROM users").all();
        return {
            success: true,
            tables,
            users
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    }
});
