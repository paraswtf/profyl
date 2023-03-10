'use client';
import { createStyles } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import Logo from './Logo';
//@ts-ignore
import { NavButton } from 'react-svg-buttons';
import NavLink from './NavLink';
import UserIcon from './UserIcon';
import { IconNavigation } from '@tabler/icons';

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
    logoLink: {
        cursor: 'pointer',
        display: 'flex',
    },
    navButton: {
        cursor: 'pointer',
        display: 'none',
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            display: 'block',
        },
        '& svg g circle': {
            stroke: 'none',
        },
        strokeLinecap: 'round',
    },
    navLinks: {
        display: 'flex',
        gap: '15px',
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
        },
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '25px',
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
        },
    },
    leftSection: {
        display: 'flex',
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            width: '100%',
        },
        justifyContent: 'space-between',
    },
    nav: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: 'auto',
        borderRadius: '0px 0px 10px 10px',
        display: 'flex',
        flexDirection: 'row',
        background:
            'linear-gradient(180deg, rgba(64, 132, 197, 0.2) 0%, rgba(28, 49, 94, 0.2) 100%), #1C315E;',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
        padding: '25px 80px',
        justifyContent: 'space-between',
        gap: '50px',
        alignItems: 'center',
        zIndex: 99,
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            [`&`]: {
                maxHeight: '100px',
                overflow: 'hidden',
                padding: '25px 30px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                transition: 'max-height 0.4s ease-in-out',
            },
            [`&.open`]: {
                height: 'auto',
                maxHeight: '360px',
            },
        },
    },
    blur: {
        position: 'absolute',
        overflow: 'visible',
        top: '0',
        left: '0',
        width: '100%',
        height: '100px',
        display: 'flex',
        zIndex: 99,
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            [`&`]: {
                backdropFilter: 'blur(0px)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                transition:
                    'backdrop-filter 0.4s ease-in-out, background-color 0.4s ease-in-out 0.4s, height 0s ease-in-out 0.8s',
            },
            [`&.active`]: {
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                height: '100vh',
                transition:
                    'backdrop-filter 0.4s ease-in-out, background-color 0.4s ease-in-out, height 0s ease-in-out',
            },
        },
    },
}));

export default function Navbar() {
    const { classes } = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                className={classes.blur + (open ? ' active' : '')}
                onClick={() => setOpen(false)}
            />
            <nav className={classes.nav + (open ? ' open' : '')}>
                <div className={classes.leftSection}>
                    <Link className={classes.logoLink} href="/">
                        <Logo height={50} color="white" />
                    </Link>
                    <NavButton
                        className={classes.navButton}
                        direction="down"
                        opened={open}
                        color="white"
                        thickness={2}
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className={classes.rightSection}>
                    <div className={classes.navLinks}>
                        {links.map(({ href, title }, index) => (
                            <NavLink href={href} key={index}>
                                {title}
                            </NavLink>
                        ))}
                    </div>
                    <UserIcon />
                </div>
            </nav>
        </>
    );
}
