import Image from "next/image";
import Link from "next/link";

export default function Logo() {
	return (
		<Link
			href="/"
			style={{ cursor: "pointer" }}
		>
			<Image
				src="/logo.svg"
				alt="Logo"
				width={100}
				height={100}
				loading="eager"
				style={{ cursor: "pointer" }}
			/>
		</Link>
	);
}
