import NextAuth from "next-auth";
import Passkey from "next-auth/providers/passkey";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [Passkey, Google, Discord],
	experimental: { enableWebAuthn: true }
	// pages: {
	// 	signIn: "/auth/signin",
	// 	signOut: "/auth/signout",
	// 	error: "/auth/error",
	// 	verifyRequest: "/auth/verify-request",
	// 	newUser: "/auth/new-user"
	// }
});
