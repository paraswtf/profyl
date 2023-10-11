'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import useSWR from 'swr';

export interface AuthContextProps {
    children: React.ReactNode;
    cookie: string;
}

async function getSession(cookie: string): Promise<Session> {
    const response = await fetch(
        `http${
            process.env.NEXT_PUBLIC_VERCEL_ENV.toLowerCase().startsWith('dev')
                ? ''
                : 's'
        }://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/session`,
        {
            headers: {
                cookie,
            },
        }
    );

    const session = await response.json();

    return Object.keys(session).length > 0 ? session : null;
}

export default function AuthContext({ cookie, children }: AuthContextProps) {
    const { data: session } = useSWR('/api/auth/session', () =>
        getSession(cookie)
    );
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
