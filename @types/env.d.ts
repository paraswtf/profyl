export {};

declare global {
    namespace NodeJS {
        //override existing enviornment and disallow using non existing enviornment variables
        declare interface ProcessEnv {
            //Vercel environment (development, production, preview)
            NEXT_PUBLIC_VERCEL_ENV: 'development' | 'production' | 'preview';
            //deployment url (https://example.vercel.app)
            NEXT_PUBLIC_VERCEL_URL: string;
            //Database url (https://www.prisma.io/docs/concepts/database-connectors/postgresql)
            MONGODB_URL: string;
            //Secret for jwt (any string, should not be changed in production)
            NEXT_AUTH_SECRET: string;
            //Api key for sendgrid (https://sendgrid.com/)
            SENDGRID_API_KEY: string;
            //Username for mail account
            MAIL_USERNAME: string;
            //Google OAuth
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            //Discord OAuth
            DISCORD_CLIENT_ID: string;
            DISCORD_CLIENT_SECRET: string;
            [key: string]: undefined;
        }
    }
}
