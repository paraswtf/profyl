interface Props {
    height?: number;
    className: string;
    onClick?: () => void;
}

export default function MoonIcon(
    props: Props = { height: 100, className: 'SunIcon' }
) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
            height={props.height || 24}
            viewBox="0 0 20 21"
            onClick={props.onClick}
            fill="none"
            stroke="#000"
            style={{ marginTop: -(props.height ?? 24) }}
        >
            <path
                d="M10 1.85532C10.132 1.85532 10.263 1.85532 10.393 1.85532C9.10837 3.04903 8.28262 4.65516 8.05932 6.39454C7.83602 8.13392 8.22928 9.89655 9.17076 11.3761C10.1122 12.8555 11.5424 13.9584 13.2126 14.4928C14.8829 15.0272 16.6876 14.9595 18.313 14.3013C17.6878 15.8058 16.6658 17.1124 15.3562 18.0816C14.0466 19.0508 12.4985 19.6464 10.8769 19.8047C9.2554 19.9631 7.62129 19.6783 6.14892 18.9807C4.67654 18.2832 3.42114 17.199 2.51661 15.8439C1.61209 14.4888 1.09238 12.9136 1.01291 11.2863C0.933445 9.65898 1.29721 8.04062 2.0654 6.60383C2.83359 5.16705 3.97739 3.96574 5.37479 3.12805C6.77219 2.29036 8.37078 1.84771 10 1.84732V1.85532Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
