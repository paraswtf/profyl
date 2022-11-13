export const env = {
	//Uri to mongodb database (mongodb://localhost:27017/database)
	MONGODB_URI: process.env.MONGODB_URI as string,
	//Secret for jwt (any string, should not be changed in production)
	JWT_SECRET: process.env.JWT_SECRET as string,
	//Base URL where the app is hosted (https://example.com)
	BASE_URL: process.env.BASE_URL as string,
	//Api key for sendgrid (https://sendgrid.com/)
	MAIL_API_KEY: process.env.MAIL_API_KEY as string
} as const;

export default env;
