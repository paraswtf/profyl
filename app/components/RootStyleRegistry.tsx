'use client';

import { CacheProvider } from '@emotion/react';
import {
    useEmotionCache,
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme,
} from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { useState } from 'react';

export default function RootStyleRegistry(props: {
    children: React.ReactNode;
    colorScheme: ColorScheme;
}) {
    const cache = useEmotionCache();
    cache.compat = true;
    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        props.colorScheme
    );

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme =
            value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
        // when color scheme is updated save it to cookie
        setCookie('theme', nextColorScheme, {
            maxAge: 60 * 60 * 24 * 30,
        });
    };

    useServerInsertedHTML(() => (
        <style
            key="mantine-styles"
            data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(
                ' '
            )}`}
            dangerouslySetInnerHTML={{
                __html: Object.values(cache.inserted).join(' '),
            }}
        />
    ));

    return (
        <CacheProvider value={cache as any}>
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        /** Put your mantine theme override here */
                        colorScheme,
                        breakpoints: {
                            xs: 360, //Mobile size
                            sm: 480, //Mobile size
                            md: 768, //Tablet size
                            lg: 1024, //Desktop size
                            xl: 1200, //TV size
                        },
                        fontFamily: 'Noto Sans, sans-serif',
                        fontFamilyMonospace: 'Noto Sans, monospace',
                        headings: { fontFamily: 'Noto Sans, sans-serif' },
                        colors: {},
                    }}
                >
                    {props.children}
                </MantineProvider>
            </ColorSchemeProvider>
        </CacheProvider>
    );
}
