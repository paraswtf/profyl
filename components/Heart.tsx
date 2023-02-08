import Image from "next/image";
import Link from "next/link";

export default function Heart() {
	return (
		<Link
			href="/"
			style={{ cursor: "pointer" }}
		>
			<Image
				src="/heart.svg"
				alt="Logo"
				width={100}
				height={100}
				loading="eager"
				style={{ cursor: "pointer" }}
			/>
		</Link>
	);
}
