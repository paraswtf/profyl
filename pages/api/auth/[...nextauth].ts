import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma/client';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import mail, { html, text } from '../../../lib/nextauth/providers/email';

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
    },
    adapter: PrismaAdapter(prisma),
    callbacks: {
        //Handle custom session for storing user id (needed to update api data)
        async session({ session, token, user }) {
            if (session.user) session.user.id = user.id;
            return session;
        },
    },
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
        // ...add more providers here
        EmailProvider({
            id: 'email',
            name: 'Email',
            from: process.env.MAIL_USERNAME,
            secret: 'khgnojkhgjg',
            async sendVerificationRequest(params) {
                const { identifier, url, provider, theme } = params;
                const { host } = new URL(url);
                const result = await mail.send(
                    {
                        to: identifier,
                        from: process.env.MAIL_USERNAME,
                        subject: `Sign in to ${host}`,
                        text: text({ url, host }),
                        html: html({ url, host, theme }),
                    },
                    false,
                    (error, result) => {
                        if (error) {
                            throw new Error(`Email could not be sent.`);
                        }
                    }
                );
            },
        }),
    ],
};

export default NextAuth(authOptions);
