export default defineEventHandler((event) => {
    const session = getCookie(event, 'auth_session');

    if (!session) {
        return {
            user: null
        };
    }

    try {
        const user = JSON.parse(session);
        return {
            user
        };
    } catch (e) {
        return {
            user: null
        };
    }
});
