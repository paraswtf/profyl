'use client';
import type { NextPage } from 'next';
import { Card, Button, Center, Group, Text } from '@mantine/core';
import { useState } from 'react';
import Head from 'next/head';
import HeroImage from './components/HeroImage';
//@ts-ignore
import MovingText from 'react-moving-text';

const Home: NextPage = () => {
    const [grid, setGrid] = useState(
        new Array<number[]>(4).fill(new Array<number>(4).fill(0))
    );

    return (
        <div
            style={{
                height: '100vh',
                width: '100%',
                backgroundImage:
                    'radial-gradient(#88A47C41 1px, transparent 1px), radial-gradient(#88A47C41 1px, transparent 1px)',
                backgroundSize: 'calc(20 * 1px) calc(20 * 1px)',
                backgroundPosition: '0 0, calc(10 * 1px) calc(10 * 1px)',
            }}
        >
            <Head>
                <title>Profyl - Generate URL</title>
            </Head>
            <Center
                w="100%"
                h="100%"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                }}
            >
                <HeroImage />

                <Text
                    c="white"
                    size="xl"
                    style={{
                        transform: 'translate(-55px, -190px)',
                        display: 'flex',
                    }}
                >
                    Coming Soon
                    <MovingText
                        type="flash"
                        duration="4000ms"
                        delay="0s"
                        direction="alternate-reverse"
                        timing="ease-in-out"
                        iteration="infinite"
                        fillMode="both"
                    >
                        .
                    </MovingText>
                    <MovingText
                        type="flash"
                        duration="4000ms"
                        delay="0.2s"
                        direction="alternate-reverse"
                        timing="ease-in-out"
                        iteration="infinite"
                        fillMode="both"
                    >
                        .
                    </MovingText>
                    <MovingText
                        type="flash"
                        duration="4000ms"
                        delay="0.5s"
                        direction="alternate-reverse"
                        timing="ease-in-out"
                        iteration="infinite"
                        fillMode="both"
                    >
                        .
                    </MovingText>
                </Text>
            </Center>
        </div>
    );
};

export default Home;
