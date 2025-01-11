import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/lib/trpc/server";
import { auth } from "@/lib/auth";

const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: "/api",
		req,
		router: appRouter,
		createContext: async () => ({
			session: await auth()
		})
	});

export { handler as GET, handler as POST };
