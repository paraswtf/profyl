"use-client";
import React from "react";
import { createStyles, MantineNumberSize } from "@mantine/styles";
import { Text } from "@mantine/core";
import NextLink from "next/link";

interface Props {
	children: React.ReactNode;
	size?: MantineNumberSize;
	href: string;
	underline?: boolean;
	forceRefresh?: boolean;
}

function Link(props: Props) {
	const useStyles = createStyles((theme) => ({
		text: {
			display: "inline-block",
			position: "relative",
			fontWeight: 700,
			color: "white",
			...(props.underline
				? {
						":after": {
							content: '""',
							position: "absolute",
							width: "100%",
							transform: "scaleX(0)",
							height: "1px",
							bottom: "10%",
							left: "0",
							backgroundColor: "white",
							transformOrigin: "bottom left",
							transition: "transform 0.20s ease-out"
						},
						":hover:after": {
							transform: "scaleX(1)",
							transformOrigin: "bottom left"
						}
				  }
				: {})
		}
	}));
	const { classes } = useStyles();
	const { children, size, href } = props;

	return (
		<NextLink
			href={href}
			{...(props.forceRefresh ? { target: "_top" } : {})}
		>
			<Text
				className={classes.text}
				size={size}
			>
				{children}
			</Text>
		</NextLink>
	);
}

export default Link;
