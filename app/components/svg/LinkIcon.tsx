interface Props {
    height?: number;
    className?: string;
}

export default function LinkIcon(
    props: Props = { height: 24, className: 'LinkIcon' }
) {
    return (
        <svg
            className={props.className}
            height={props.height}
            viewBox="0 0 11 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            <path
                d="M5.25159 8.98488C4.76147 8.97988 4.27528 9.07273 3.8215 9.25799C3.36771 9.44324 2.95545 9.71719 2.60887 10.0638C2.26228 10.4104 1.98834 10.8226 1.80308 11.2764C1.61782 11.7302 1.52498 12.2164 1.52998 12.7065L1.52998 18.6611C1.52998 19.6481 1.92207 20.5947 2.62001 21.2927C3.31795 21.9906 4.26456 22.3827 5.25159 22.3827C6.23862 22.3827 7.18523 21.9906 7.88317 21.2927C8.58111 20.5947 8.97321 19.6481 8.97321 18.6611V17.9168M5.25153 14.9394C5.74165 14.9444 6.22784 14.8515 6.68163 14.6663C7.13542 14.481 7.54767 14.2071 7.89426 13.8605C8.24084 13.5139 8.51479 13.1016 8.70005 12.6479C8.8853 12.1941 8.97815 11.7079 8.97315 11.2178L8.97315 5.26318C8.97315 4.27615 8.58105 3.32954 7.88311 2.6316C7.18518 1.93366 6.23857 1.54157 5.25153 1.54156C4.2645 1.54156 3.31789 1.93366 2.61996 2.6316C1.92202 3.32954 1.52992 4.27615 1.52992 5.26318L1.52992 6.0075"
                stroke="#E5EEFF"
                strokeWidth="2.52632"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}