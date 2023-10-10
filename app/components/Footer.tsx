'use client';
import { createStyles, Text } from '@mantine/core';
import Link from 'next/link';
import Logo from './Logo';
import GitHubLogo from './GitHubLogo';

const links = [
    {
        title: 'Shorten a URL',
        href: '/shorten',
    },
    {
        title: 'Privacy',
        href: '/privacy',
    },
    {
        title: 'Terms of Service',
        href: '/terms',
    },
];

const useStyles = createStyles((theme) => ({
    footer: {
        width: '100vw',
        minHeight: '10vh',
        backgroundColor: '#1C315E',
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerInner: {
        maxWidth: 360,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 40,
        marginRight: 40,
    },
    gitlogo: {
        marginTop: 8,
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',

        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
}));

export default function Footer() {
    const { classes } = useStyles();
    return (
        <div className={classes.footer}>
            <div className={classes.footerInner}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                        <Link href="/">
                            <Logo height={40} color="white" />
                        </Link>
                        <Text color="white" size="sm">
                            An open-source URL shortener
                        </Text>
                    </div>
                    <GitHubLogo className={classes.gitlogo} height={25} />
                </div>
            </div>
        </div>
    );
}
