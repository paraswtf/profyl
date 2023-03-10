import { createStyles, useMantineTheme } from '@mantine/core';
import Link from 'next/link';

interface Props {
    height?: number;
    className: string;
    onClick?: () => void;
}

const useStyles = createStyles((theme, _params, getRef) => ({}));

export default function SunIcon(
    props: Props = { height: 100, className: 'SunIcon' }
) {
    const theme = useMantineTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
            height={props.height || 24}
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#fff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            onClick={props.onClick}
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
        </svg>
    );
}
