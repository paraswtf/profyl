import { createStyles, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';

interface Props {}

const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: 'min-content',
        alignItems: 'center',
        height: '170px',
        padding: '10px',
        cursor: 'pointer',
        '&:hover': {
            [`& .${getRef('line')}`]: {
                height: '100px',
            },
            [`& .${getRef('sun')}`]: {
                stroke: theme.colors.yellow[4],
                fill: theme.colors.yellow[3],
                scale: '1.2',
            },
            [`& .${getRef('moon')}`]: {
                stroke: theme.colors.dark[4],
                fill: theme.colors.yellow[1],
                scale: '1.2',
            },
        },
        marginLeft: '-45px',
        marginRight: '-20px',
        marginTop: '-10px',
    },
    line: {
        ref: getRef('line'),
        height: '120px',
        width: '1px',
        backgroundColor: '#3A4C5E',
        marginBottom: 30,
        transition: 'all ease-in-out 0.2s',
        borderRadius: '0.5px',
    },
    sun: {
        ref: getRef('sun'),
        transition: 'all ease-in-out 0.1s',
        padding: '10px',
        stroke: theme.colors.yellow[2],
        fill: theme.colors.yellow[1],
        '&.light': {
            transform: 'rotate(0.5turn)',
            opacity: 0,
        },
    },
    moon: {
        ref: getRef('moon'),
        transition: 'all ease-in-out 0.1s',
        padding: '13px',
        paddingLeft: '14px',
        paddingRight: '12px',
        stroke: theme.colors.dark[6],
        fill: theme.colors.yellow[2],
        '&.dark': {
            transform: 'rotate(0.5turn)',
            opacity: 0,
        },
    },
}));

function ThemeToggle(props: Props) {
    const {} = props;
    const {
        classes: { container, line, sun, moon },
    } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <div className={container} onClick={() => toggleColorScheme()}>
            <div className={line} />
            <SunIcon className={sun + ' ' + colorScheme} height={44} />
            <MoonIcon className={moon + ' ' + colorScheme} height={44} />
        </div>
    );
}

export default ThemeToggle;
