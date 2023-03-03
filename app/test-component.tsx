'use client';
import type { NextPage } from 'next';
import { Card, Button, Center, Group, Text } from '@mantine/core';
import { useState } from 'react';
import Head from 'next/head';

//Method to transpose without changing original array
const transpose = (a: number[][]) => a[0].map((_, c) => a.map((r) => r[c]));

const Home: NextPage = () => {
    const [grid, setGrid] = useState(
        new Array<number[]>(4).fill(new Array<number>(4).fill(0))
    );

    return (
        <div style={{ height: '100vh', width: '100%' }}>
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
                <Card
                    w="auto"
                    h="auto"
                    style={{
                        gap: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {grid
                        .map((row, i) =>
                            row.map((col, j) => (
                                <Button
                                    onClickCapture={() => {
                                        const newArr = [...grid[i]];
                                        newArr[j] = grid[i][j] ? 0 : 1;
                                        let newGrid = [...grid];
                                        newGrid[i] = newArr;
                                        setGrid(newGrid);
                                    }}
                                    key={(i + 1) * (j + 1)}
                                >
                                    {grid[i][j]}
                                </Button>
                            ))
                        )
                        .map((row) => (
                            <Group>{row}</Group>
                        ))}
                </Card>
                <Text c="white" size="xl">
                    Coming Soon...
                </Text>
            </Center>
        </div>
    );
};

export default Home;
