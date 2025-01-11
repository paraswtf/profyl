"use client";
import React, { useState } from "react";
import styles from "./index.module.css";
import Logo from "../Logo";
import Hamburger from "../Hamburger";
import { cn } from "@/lib/utils";

interface Props {}

function Navbar(props: Props) {
	const {} = props;
	const [open, setOpen] = useState(false);

	return (
		<div
			className={cn(
				"z-50 backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 transition ease-in-out delay-150f",
				styles.bg,
				open && styles.open
			)}
		>
			<nav
				className={cn(styles.navbar, open && styles.open)}
				tabIndex={1}
				onBlur={() => setOpen(false)}
			>
				<div className={styles.navbarHead}>
					<Logo
						h={60}
						fill="var(--white)"
					/>
					<Hamburger
						onClick={() => setOpen((curr) => !curr)}
						isNavOpen={open}
					/>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
