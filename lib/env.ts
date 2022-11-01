export const env = {
	MONGODB_URI: process.env.MONGODB_URI as string,
	JWT_SECRET: process.env.JWT_SECRET as string,
	BASE_URL: process.env.BASE_URL as string
} as const;

export default env;
