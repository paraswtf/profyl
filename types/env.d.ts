export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            //deployment url (https://example.vercel.app)
            NEXT_PUBLIC_HOSTNAME: string;
            //Secret for jwt (any string, should not be changed in production)
            NEXT_SECRET: string;
            //Api key for sendgrid (https://sendgrid.com/)
            MAIL_API_KEY: string;
            //Username for mail account
            MAIL_USERNAME: string;
            //Google Auth
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            //Discord Auth
            DISCORD_CLIENT_ID: string;
            DISCORD_CLIENT_SECRET: string;
        }
    }
}
