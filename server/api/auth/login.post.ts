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
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user || user.password !== password) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials'
        });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Set session cookie (simplified for now)
    setCookie(event, 'auth_session', JSON.stringify(userWithoutPassword), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    return {
        success: true,
        user: userWithoutPassword
    };
});
