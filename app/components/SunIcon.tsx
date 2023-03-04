import { createStyles, useMantineTheme } from '@mantine/core';
import Link from 'next/link';

interface Props {
    height?: number;
    partial?: boolean;
    color?: string;
}

const useStyles = createStyles((theme, _params, getRef) => ({
    p: {
        ref: getRef('p'),
        transform: 'translate(0px, 0px)',
    },
    pLower: {
        ref: getRef('pLower'),
        transform: 'translate(0px, 0px)',
    },
    pCurve: {
        ref: getRef('pCurve'),
        transform: 'translate(0px, 0px)',
    },
    r: {
        ref: getRef('r'),
        transform: 'translate(0px, 0px)',
    },
    o: {
        ref: getRef('o'),
        transform: 'translate(0px, 0px)',
    },
    f: {
        ref: getRef('f'),
        transform: 'translate(0px, 0px)',
    },
    y: {
        ref: getRef('y'),
        transform: 'translate(0px, 0px)',
    },
    l: {
        ref: getRef('l'),
        transform: 'translate(0px, 0px)',
    },
    logo: {
        transition: 'all 0.2s ease-in-out',
        '&>*': {
            transition: 'all 0.2s ease-in-out',
        },
        ['&:hover']: {
            //opacity: 0.25,
            [`& .${getRef('p')}`]: {
                transform: 'translate(0px, 0px)',
            },
            [`& .${getRef('r')}`]: {
                transform: 'translate(0px, -25px)',
            },
            [`& .${getRef('o')}`]: {
                transform: 'translate(0px, 25px)',
            },
            [`& .${getRef('f')}`]: {
                transform: 'translate(0px, -25px)',
            },
            [`& .${getRef('y')}`]: {
                transform: 'translate(0px, 25px)',
            },
            [`& .${getRef('l')}`]: {
                transform: 'translate(0px, -30px)',
            },
        },
    },
}));

export default function SunIcon(
    props: Props = { height: 100, partial: false }
) {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-sun"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#fff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="4" />
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
        </svg>
    );
}
