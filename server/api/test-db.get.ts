export default defineEventHandler(async (event) => {
    console.log('--- API TEST-DB CALLED ---');
    const db = useDb();
    try {
        const tablesResult = await db.execute("SELECT name FROM sqlite_master WHERE type='table'");
        const usersResult = await db.execute("SELECT id, email, password, rank FROM users");

        return {
            success: true,
            tables: tablesResult.rows,
            users: usersResult.rows
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    }
});
