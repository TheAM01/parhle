export const sessionOptions = {
    password: process.env.SESSION_PASSWORD,
    cookieName: "s-connect-id",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};
