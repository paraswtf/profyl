import Navbar from './components/Navbar';
import RootStyleRegistry from './components/RootStyleRegistry';
import { Noto_Sans } from 'next/font/google';
import { headers } from 'next/headers';
import AuthContext from './components/AuthContext';
import { ColorScheme } from '@mantine/core';
import { Suspense } from 'react';
import Footer from './components/Footer';

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

const parseCookie = (cookie: string) =>
    cookie
        .split(';')
        .map((c) => c.trim())
        .filter(Boolean)
        .reduce((acc: { [key: string]: string }, v) => {
            const split = v.split('=');
            acc[decodeURIComponent(split[0].trim())] = decodeURIComponent(
                split[1].trim()
            );
            return acc;
        }, {});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookie = headers().get('cookie') ?? '';
    const parsedCookie = parseCookie(cookie);
    return (
        <html lang="en-US">
            <head />
            <body className={noto.className}>
                <RootStyleRegistry
                    colorScheme={(parsedCookie.theme as ColorScheme) ?? 'light'}
                >
                    <AuthContext cookie={cookie}>
                        <Suspense>
                            <Navbar />
                        </Suspense>
                        <div id="page">
                            {children}
                            <Footer />
                        </div>
                    </AuthContext>
                </RootStyleRegistry>
            </body>
        </html>
    );
}
