export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			//Environment (development | production)
			NODE_ENV: "development" | "production";
			//Uri to mongodb database (mongodb://localhost:27017/database)
			MONGODB_URI: string;
			//Secret for jwt (any string, should not be changed in production)
			JWT_SECRET: string;
			//Base URL where the app is hosted (https://example.com)
			NEXT_PUBLIC_BASE_URL: string;
			//Api key for sendgrid (https://sendgrid.com/)
			MAIL_API_KEY: string;
			//Username for mail account
			MAIL_USERNAME: string;
		}
	}
}
