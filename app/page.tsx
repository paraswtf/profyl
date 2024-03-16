'use client';
import Head from 'next/head';
import Test from './test-component';
import { NotificationsProvider } from '@mantine/notifications';

export default function Page() {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <NotificationsProvider
                position="top-center"
                style={{ marginTop: 100 }}
            >
                <Head>
                    <title key="home">Profyl</title>
                </Head>
                <Test />
            </NotificationsProvider>
        </div>
    );
}
