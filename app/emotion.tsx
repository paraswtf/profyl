'use client';

import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';

export default function RootStyleRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    const cache = useEmotionCache();
    cache.compat = true;

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
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: 'dark',
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
                }}
            >
                {children}
            </MantineProvider>
        </CacheProvider>
    );
}
