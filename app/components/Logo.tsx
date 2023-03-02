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

export default function Logo(props: Props = { height: 100, partial: false }) {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    return (
        <svg
            id="profyl-logo"
            data-name="Profyl Logo"
            xmlns="http://www.w3.org/2000/svg"
            height={props.height || 100}
            fill={props.color || theme.colors.blue[6]}
            viewBox={`0 0 ${props.partial ? '900' : '2264.6'} 1000`}
            className={classes.logo}
        >
            <g id="P" className={classes.p}>
                <path
                    id="lower"
                    className={classes.pLower}
                    d="M300,500A100,100,0,0,0,200,600l0,300A100,100,0,0,1,0,900V500.5c0-110.46,89.54-200,200-200l300-.5a100,100,0,0,1,0,200Z"
                />
                <path
                    id="curve"
                    className={classes.pCurve}
                    d="M100,200A100,100,0,0,1,100,0H500C720.91,0,900,179.09,900,400S720.91,800,500,800H400a100,100,0,0,1,0-200l100,0c110.46,0,200-89.54,200-200S610.46,200,500,200Z"
                />
            </g>
            {props.partial ? null : (
                <>
                    <path
                        id="r"
                        className={classes.r}
                        d="M1150.4,462.2a169.74,169.74,0,0,1,19.8,1.2,133.9,133.9,0,0,1,15,2.4l-10.2,108c-4-.8-8.91-1.59-14.7-2.4a188.73,188.73,0,0,0-24.3-1.2,126.09,126.09,0,0,0-30.9,4.2q-16.51,4.2-28.5,18.3t-12,44.1V800H950V468.2h85.2l18,52.8h5.4q13.8-24.6,38.7-41.7T1150.4,462.2Z"
                    />
                    <path
                        id="o"
                        className={classes.o}
                        d="M1515.6,627.2q0,83.4-44.4,128.1T1349.4,800q-48,0-85.2-20.1t-58.5-58.8q-21.3-38.7-21.3-93.9,0-82.2,44.4-126.6t122.4-44.4q48,0,84.9,19.8t58.2,57.9Q1515.59,572,1515.6,627.2Zm-214.8,0q0,42.62,11.4,65.1t38.4,22.5q26.4,0,37.5-22.5t11.1-65.1q0-42.6-11.1-64.2T1350,541.4q-25.8,0-37.5,21.6T1300.8,627.2Z"
                    />
                    <path
                        id="f"
                        className={classes.f}
                        d="M1754.4,554h-70.8V800H1569V554h-43.8V497.6l46.2-28.2V464q0-64.2,26.4-93.6t86.4-29.4a257.45,257.45,0,0,1,46.8,3.9,314.34,314.34,0,0,1,43.8,11.7L1750.2,431a183.42,183.42,0,0,0-18.9-4.2,133.22,133.22,0,0,0-22.5-1.8q-25.2,0-25.2,34.2v9h70.8Z"
                    />
                    <path
                        id="y"
                        className={classes.y}
                        d="M1766.7,468.23h120.6l56.4,190.2a119,119,0,0,1,3.3,16.2q1.49,10.22,2.1,19.8h2.4a153.7,153.7,0,0,1,3.3-20.7q2.1-8.68,3.9-14.7l57.6-190.8h117L2001.9,821q-15,40.2-35.1,67.8t-49.5,41.4q-29.4,13.8-73.2,13.8a210,210,0,0,1-27-1.5q-11.4-1.5-19.8-3.3v-90q6.6,1.2,15.9,2.4a152.28,152.28,0,0,0,19.5,1.2q28.2,0,41.7-16.5a139.74,139.74,0,0,0,21.9-38.1l1.2-3Z"
                    />
                    <path
                        id="l"
                        className={classes.l}
                        d="M2264.6,800H2150V344h114.6Z"
                    />
                </>
            )}
        </svg>
    );
}
