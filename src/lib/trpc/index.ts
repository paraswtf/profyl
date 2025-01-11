import { initTRPC } from "@trpc/server";
import { Session } from "next-auth";

interface Context {
	session: Session | null;
}

const t = initTRPC.context<Context>().create({});

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
