"use client";
import React, { useState } from "react";
import styles from "./index.module.css";

interface Props {
	h?: number;
	isNavOpen?: boolean;
	fill?: string;
	strokeWidth?: number;
	onClick?: () => void;
}

function Hamburger(props: Props) {
	const { h, isNavOpen, fill, strokeWidth, onClick } = {
		h: 48,
		isNavOpen: false,
		fill: "var(--white)",
		strokeWidth: 4,
		...props
	};

	//Og viewbox is only 24x24, so we need to scale down the strokewidth first
	const scaling = 24 / h;
	const scaledSw = strokeWidth * scaling;

	return (
		<svg
			className={styles.hamburger + (isNavOpen ? " " + styles.open : "")}
			width={h}
			height={h}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
		>
			{/* <path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3 5.75C3 5.33579 3.33579 5 3.75 5H20.25C20.6642 5 21 5.33579 21 5.75C21 6.16421 20.6642 6.5 20.25 6.5H3.75C3.33579 6.5 3 6.16421 3 5.75Z"
				fill={fill}
			/> */}
			{/* <path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3 11.75C3 11.3358 3.33579 11 3.75 11H20.25C20.6642 11 21 11.3358 21 11.75C21 12.1642 20.6642 12.5 20.25 12.5H3.75C3.33579 12.5 3 12.1642 3 11.75Z"
				fill={fill}
			/> */}
			{/* <path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3 17.75C3 17.3358 3.33579 17 3.75 17H20.25C20.6642 17 21 17.3358 21 17.75C21 18.1642 20.6642 18.5 20.25 18.5H3.75C3.33579 18.5 3 18.1642 3 17.75Z"
				fill={fill}
			/> */}
			<line
				className={styles.top}
				x1={scaledSw}
				x2={24 - scaledSw}
				y1="5"
				y2="5"
				stroke={fill}
				strokeWidth={scaledSw}
				strokeLinecap="round"
			/>
			<line
				className={styles.middle}
				x1={scaledSw}
				x2={24 - scaledSw}
				y1="12"
				y2="12"
				stroke={fill}
				strokeWidth={scaledSw}
				strokeLinecap="round"
			/>
			<line
				className={styles.bottom}
				x1={scaledSw}
				x2={24 - scaledSw}
				y1="19"
				y2="19"
				stroke={fill}
				strokeWidth={scaledSw}
				strokeLinecap="round"
			/>
		</svg>
	);
}

export default Hamburger;
