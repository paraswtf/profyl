'use client';
import type { NextPage } from 'next';
import {
    Card,
    Button,
    Center,
    Group,
    Text,
    Input,
    createStyles,
} from '@mantine/core';
import { useState } from 'react';
import Head from 'next/head';
import HeroImage from './components/HeroImage';
//@ts-ignore
import MovingText from 'react-moving-text';

const useStyles = createStyles((theme) => ({
    root: {
        '::placeholder': {
            color: theme.colorScheme === 'dark' ? '#FFFFFF52' : '#16487796',
            fontWeight: 400,
        },
        '::-ms-input-placeholder': {
            color: theme.colorScheme === 'dark' ? '#FFFFFF52' : '#16487796',
            fontWeight: 400,
        },
        '::-moz-placeholder': {
            color: theme.colorScheme === 'dark' ? '#FFFFFF52' : '#16487796',
            fontWeight: 400,
        },
        '::-webkit-input-placeholder': {
            color: theme.colorScheme === 'dark' ? '#FFFFFF52' : '#16487796',
            fontWeight: 400,
        },
    },
}));

const Home: NextPage = () => {
    const [grid, setGrid] = useState(
        new Array<number[]>(4).fill(new Array<number>(4).fill(0))
    );
    const { classes } = useStyles();

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
                <Text size={20} variant="text" fw="bold">
                    Shorten your URLs with ease
                </Text>
                <Input
                    classNames={{ input: classes.root }}
                    rightSection={
                        <Button
                            style={{
                                borderRadius: '0px 4px 4px 0px',
                                //borderLeft: '2px solid #4084C5',
                                backgroundColor: '#263238',
                            }}
                        >
                            Try it out
                        </Button>
                    }
                    style={{
                        border: '2px #4084C5 solid',
                        backgroundColor: 'transparent',
                        borderRadius: '6px',
                    }}
                    rightSectionProps={{
                        style: {
                            width: 'auto',
                            borderLeft: '2px #4084C5 solid',
                            borderRadius: '0px 4px 4px 0px',
                            backgroundColor: '#263238',
                        },
                    }}
                    styles={{
                        input: {
                            background: 'rgba(40,84,125,0.25)',
                            border: '0px',
                            backdropFilter: 'blur(1px)',
                        },
                    }}
                    placeholder="Enter a long URL..."
                    inputMode="url"
                    w="288px"
                />
            </Center>
        </div>
    );
};

export default Home;
