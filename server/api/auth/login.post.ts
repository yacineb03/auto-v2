import { useDb } from '../../utils/db';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, password } = body;

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required'
        });
    }

    const db = useDb();
    const result = await db.execute({
        sql: 'SELECT * FROM users WHERE email = ?',
        args: [email]
    });

    const user = result.rows[0];

    if (!user || user.password !== password) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials'
        });
    }

    // Libsql rows are objects but let's make sure we handle it cleanly
    const userData = { ...user };
    delete userData.password;

    // Set session cookie
    setCookie(event, 'auth_session', JSON.stringify(userData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    return {
        success: true,
        user: userData
    };
});
