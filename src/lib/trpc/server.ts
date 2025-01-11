import { createCallerFactory, router } from "@/lib/trpc";
import routerOptions from "@/lib/trpc/routes";

export const appRouter = router(routerOptions);

//For fetching data server side
const createCaller = createCallerFactory(appRouter);
export const caller = createCaller({
	session: null
});

export type AppRouter = typeof appRouter;
