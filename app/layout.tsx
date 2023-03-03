import Navbar from './components/Navbar';
import RootStyleRegistry from './emotion';
import { Noto_Sans } from 'next/font/google';
import { Session } from 'next-auth';
import { headers } from 'next/headers';
import AuthContext from './components/AuthContext';

const noto = Noto_Sans({
    weight: [
        //Regular
        '400',
        //Medium
        '500',
        //Bold
        '700',
    ],
    style: ['normal'],
    subsets: ['latin'],
});

async function getSession(cookie: string): Promise<Session> {
    const response = await fetch(
        `http${
            process.env.NEXT_PUBLIC_VERCEL_ENV === 'development' ? '' : 's'
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

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession(headers().get('cookie') ?? '');
    return (
        <html lang="en-US">
            <head />
            <body className={noto.className}>
                <RootStyleRegistry>
                    <AuthContext session={session}>
                        <Navbar />
                        {children}
                    </AuthContext>
                </RootStyleRegistry>
            </body>
        </html>
    );
}
