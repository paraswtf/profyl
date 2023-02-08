import Image from "next/image";
import Link from "next/link";

interface Props {
	s?: number;
}

export default function Logo(props: Props = { s: 100 }) {
	return (
		<Link
			href="/"
			style={{ cursor: "pointer" }}
		>
			<Image
				src="/logo.svg"
				alt="Logo"
				width={props.s || 100}
				height={props.s || 100}
				loading="eager"
				style={{ cursor: "pointer" }}
			/>
		</Link>
	);
}
