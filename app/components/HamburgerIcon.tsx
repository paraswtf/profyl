import { createStyles } from '@mantine/core';
import React from 'react';

interface Props {
    isOpen?: boolean;
    onClick?: () => void;
}

const useStyles = createStyles((theme) => ({
    hamburgerIcon: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '50px',
        height: '40px',
        cursor: 'pointer',
        overflow: 'visible',
        alignItems: 'center',
        alignContent: 'center',
    },
    line: {
        width: '24px',
        height: '2px',
        backgroundColor: '#fff',
        transition: 'all 0.2s ease',
        borderRadius: '1px',
        marginTop: '-1px',
        marginBottom: '-1px',
    },
    line1: {
        transform: 'translateY(0)',
        '&.open': {
            transform: 'translateY(6px) rotate(45deg) scale(1.4, 1)',
        },
    },
    line2: {
        transform: 'translateY(6px)',
        '&.open': {
            opacity: 0,
        },
    },
    line3: {
        transform: 'translateY(12px)',
        '&.open': {
            transform: 'translateY(6px) rotate(-45deg) scale(1.4, 1)',
        },
    },
}));

export function HamburgerIcon({ isOpen, onClick }: Props) {
    const { classes } = useStyles();

    return (
        <div className={classes.hamburgerIcon} onClick={onClick}>
            <div
                className={`${classes.line} ${classes.line1} ${
                    isOpen ? 'open' : ''
                }`}
            />
            <div
                className={`${classes.line} ${classes.line2} ${
                    isOpen ? 'open' : ''
                }`}
            />
            <div
                className={`${classes.line} ${classes.line3} ${
                    isOpen ? 'open' : ''
                }`}
            />
        </div>
    );
}

export default HamburgerIcon;
