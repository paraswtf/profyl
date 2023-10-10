'use client';
import { createStyles, Text } from '@mantine/core';
import Link from 'next/link';
import Logo from './Logo';
import GitHubLogo from './GitHubLogo';
import GitHubStar from './GitHubStar';

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
    stars: {
        backgroundColor: '#4084C5',
        color: '#fff',
        paddingBlock: '2px',
        paddingInline: '10px',
        position: 'relative',
        marginTop: '7px',
        marginRight: '14px',
        marginBottom: 'auto',
        float: 'left',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        cursor: 'pointer',
        '&:after': {
            content: '" "',
            position: 'absolute',
            right: '-6px',
            top: '7px',
            borderTop: '6px solid transparent',
            borderRight: 'none',
            borderLeft: '6px solid #4084C5',
            borderBottom: '6px solid transparent',
        },
    },
    ghs: {
        marginTop: '-2px',
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
                    <Link href="/github">
                        <div className={classes.stars}>
                            <Text color="white" size="sm" weight={800}>
                                hhkad
                            </Text>
                            <GitHubStar className={classes.ghs} height={14} />
                        </div>
                        <GitHubLogo className={classes.gitlogo} height={25} />
                    </Link>
                </div>
            </div>
        </div>
    );
}