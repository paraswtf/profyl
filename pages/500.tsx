import { createStyles, Title, Text, Button, Container, Group, Center } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	root: {
		paddingTop: 80,
		paddingBottom: 120,
		backgroundColor: theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background,
		height: "100vh",
		width: "100vw"
	},

	label: {
		textAlign: "center",
		fontWeight: 900,
		fontSize: 220,
		lineHeight: 1,
		marginBottom: theme.spacing.xl * 1.5,
		color: theme.colors[theme.primaryColor][3],

		[theme.fn.smallerThan("sm")]: {
			fontSize: 120
		}
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		textAlign: "center",
		fontWeight: 900,
		fontSize: 38,
		color: theme.white,

		[theme.fn.smallerThan("sm")]: {
			fontSize: 32
		}
	},

	description: {
		maxWidth: 540,
		margin: "auto",
		marginTop: theme.spacing.xl,
		marginBottom: theme.spacing.xl * 1.5,
		color: theme.colors[theme.primaryColor][1]
	}
}));

export default function ServerError() {
	const { classes } = useStyles();

	return (
		<Center className={classes.root}>
			<Container>
				<div className={classes.label}>500</div>
				<Title className={classes.title}>Something bad just happened...</Title>
				<Text
					size="lg"
					align="center"
					className={classes.description}
				>
					Our servers could not handle your request.
				</Text>
				<Group position="center">
					<Button
						variant="white"
						size="md"
						component="a"
						href="/"
					>
						Go back to home /
					</Button>
				</Group>
			</Container>
		</Center>
	);
}
