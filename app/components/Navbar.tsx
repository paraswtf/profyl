'use client';
import { createStyles } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from './svg/Logo';
//@ts-expect-error
import { NavButton } from '@paraswtf/react-svg-buttons';
import NavLink from './NavLink';
import UserMenu from './UserMenu';
import { isMobile } from 'react-device-detect';

interface Props {
    //Value to check if user is logged in (is a client side cookie check to avoid loading flash)
    isLoggedIn?: boolean;
}

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
        position: 'fixed',
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
                transition: 'max-height 0.1s ease-out',
            },
            [`&.open`]: {
                maxHeight: '360px',
            },
        },
    },
}));

export default function Navbar(props: { isLoggedIn?: boolean }) {
    const { classes } = useStyles();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const page = document.getElementById('page');
        if (page) {
            document.body.style.setProperty(
                'overflow',
                open ? 'hidden' : 'auto'
            );
            document
                .getElementById('page')
                ?.style.setProperty('filter', open ? 'blur(4px)' : 'none');
            page.onclick = () => setOpen(false);
        }
    }, [open]);

    return (
        <>
            <nav className={classes.nav + (open ? ' open' : '')}>
                <div className={classes.leftSection}>
                    <Link className={classes.logoLink} href="/">
                        <Logo height={50} color="white" />
                    </Link>
                    {/* <HamburgerIcon
                        isOpen={open}
                        onClick={() => setOpen(!open)}
                    /> */}
                    <NavButton
                        className={classes.navButton}
                        direction="down"
                        opened={open}
                        color="white"
                        thickness={2}
                        onClick={() => setOpen(!open)}
                        hoverEffect={!isMobile}
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
                    {/* Pass isLoggedIn to check client side login and avoid loading when logged out */}
                    <UserMenu isLoggedIn={props.isLoggedIn} />
                </div>
            </nav>
        </>
    );
}
