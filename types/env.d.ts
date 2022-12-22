export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			//Vercel deployment url (https://example.vercel.app)
			VERCEL_URL: string;
			//Environment (preview | development | production)
			VERCEL_ENV: "preview" | "development" | "production";
			//Uri to mongodb database (mongodb://localhost:27017/database)
			MONGODB_URI: string;
			//Secret for jwt (any string, should not be changed in production)
			JWT_SECRET: string;
			//Api key for sendgrid (https://sendgrid.com/)
			MAIL_API_KEY: string;
			//Username for mail account
			MAIL_USERNAME: string;
		}
	}
}
