import React, { useState } from "react";
import { createStyles } from "@mantine/styles";
import Link from "./Link";
import data from "./data.json";
//@ts-ignore
import { NavButton } from "react-svg-buttons";
import { useMantineTheme, Divider } from "@mantine/core";
import Logo from "./Logo";

const useStyles = createStyles((theme, _params, getRef) => ({
	nav: {
		overflow: "hidden",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0 80px",
		position: "fixed",
		top: "25px",
		left: "3vw",
		width: "94%",
		height: "100px",
		background: `#121212`,
		boxShadow: `0px 0px 15px #00111255`,
		stroke: "white",
		strokeWidth: "2px",
		borderRadius: "30px 30px 30px 30px",
		zIndex: 99,
		[`@media (max-width: 950px)`]: {
			[`&`]: {
				padding: "0 60px",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "flex-start",
				transition: "height 0.3s ease-in-out, border-radius 0.4s ease-in-out"
			},
			[`&.open`]: {
				height: "450px",
				borderRadius: "50px 50px 50px 50px"
			}
		},
		[`@media (max-width: 750px)`]: {
			[`&`]: {
				padding: "0 40px"
			}
		}
	},
	navLinks: {
		position: "absolute",
		right: "10%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: "25px",
		[`@media (max-width: 950px)`]: {
			[`&`]: {
				position: "absolute",
				flexDirection: "column",
				top: "100px",
				right: "10%",
				width: "80%"
				// left: "50%",
				// /* bring your own prefixes */
				// transform: "translate(-50%, 0)"
			}
		}
	},
	navButton: {
		"cursor": "pointer",
		"position": "absolute",
		"top": "25px",
		"right": "60px",
		"display": "none",
		[`@media (max-width: 950px)`]: {
			[`&`]: {
				right: "60px",
				display: "block"
			}
		},
		[`@media (max-width: 750px)`]: {
			[`&`]: {
				right: "40px"
			}
		},
		"& svg g circle": {
			stroke: "none"
		},
		"strokeLinecap": "round"
	},
	navLogo: {
		position: "absolute",
		top: "25px"
	},
	divider: {
		display: "none",
		[`@media (max-width: 950px)`]: {
			[`&`]: {
				display: "block"
			}
		}
	}
}));

interface Props {
	open: any;
	setOpen: any;
}

function Navbar(props: Props) {
	const { classes } = useStyles();
	const {} = props;
	const theme = useMantineTheme();

	return (
		<div className={classes.nav + (props.open ? " open" : "")}>
			<div className={classes.navLogo}>
				<Logo s={50} />
			</div>
			<div
				className={classes.navLinks}
				onClick={() => {
					props.setOpen(false);
				}}
			>
				<Divider
					color="gray"
					variant="solid"
					w="100%"
					opacity={0.2}
					className={classes.divider}
					label="Pages"
					labelPosition="center"
				/>
				{data.data.links.map(({ url, title }, index) => (
					<Link
						size="md"
						href={url}
						key={index}
						underline
					>
						{title}
					</Link>
				))}
				<Divider
					color="gray"
					variant="solid"
					w="100%"
					opacity={0.2}
					className={classes.divider}
					label="Profyl.in"
					labelPosition="center"
				/>
			</div>
			<NavButton
				className={classes.navButton}
				direction="down"
				opened={props.open}
				color={`#d9c19a`}
				thickness={2}
				onClick={() => props.setOpen(!props.open)}
			/>
		</div>
	);
}

export default Navbar;
