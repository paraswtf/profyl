import Navbar from './components/Navbar';
import RootStyleRegistry from './emotion';
import { Noto_Sans } from 'next/font/google';
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

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en-US">
            <head />
            <body className={noto.className}>
                <RootStyleRegistry>
                    <AuthContext cookie={headers().get('cookie') ?? ''}>
                        <Navbar />
                        {children}
                    </AuthContext>
                </RootStyleRegistry>
            </body>
        </html>
    );
}
