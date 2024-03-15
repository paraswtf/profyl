interface Props {
    height?: number;
    className: string;
    onClick?: () => void;
}

export default function SunIcon(
    props: Props = { height: 100, className: 'SunIcon' }
) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
            height={props.height || 24}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#fff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={props.onClick}
            style={{ marginTop: -(props.height ?? 24) }}
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
        </svg>
    );
}
