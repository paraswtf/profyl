import Head from 'next/head';
import Test from './test-component';

export default function Page() {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Head>
                <title key="home">Profyl</title>
            </Head>
            <Test />
        </div>
    );
}
