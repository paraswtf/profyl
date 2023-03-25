import Head from 'next/head';
import Test from './test-component';

export default function Page() {
    return (
        <>
            <Head>
                <title key="home">Profyl</title>
            </Head>
            <Test />
        </>
    );
}
