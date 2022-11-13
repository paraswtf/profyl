import axios from "axios";
import { Flex, Heading, Input, Button, FormControl, FormLabel, Switch, useColorMode, useColorModeValue, Center } from "@chakra-ui/react";

import React from "react";
import env from "../lib/env";

export default function Redirect({ slug }: any) {
	const { toggleColorMode } = useColorMode();
	const formBackground = useColorModeValue("gray.100", "gray.700");

	return (
		<Flex
			h="100vh"
			alignItems="center"
			justifyContent="center"
		>
			<Flex
				flexDirection="column"
				bg={formBackground}
				p={12}
				borderRadius={8}
				boxShadow="lg"
				h="600"
				w="400"
			>
				<Heading mb={6}>Password Protected URL</Heading>
				<Input
					placeholder="**********"
					type="password"
					variant="filled"
					mb={6}
				/>
				<Button
					colorScheme="teal"
					mb={8}
				>
					Submit
				</Button>
				<FormControl
					display="flex"
					alignItems="center"
				>
					<FormLabel
						htmlFor="dark_mode"
						mb="0"
					>
						Enable Dark Mode?
					</FormLabel>
					<Switch
						id="dark_mode"
						colorScheme="teal"
						size="lg"
						onChange={toggleColorMode}
					/>
				</FormControl>
			</Flex>
		</Flex>
	);
}

export const getServerSideProps = async (context: { params: { slug: string[] } }) => {
	const slug = context.params.slug;

	let redirect = null;

	if (slug && Array.isArray(slug) && slug.length !== 0 && slug.length < 2) {
		redirect =
			(
				await axios
					.post(env.BASE_URL + "/api/urls/geturl", {
						slug: slug.join("/")
					})
					.catch((err) => {
						if (err?.response?.status === 401) return { data: { locked: true } };
						return null;
					})
			)?.data ?? null;
	}

	if (!redirect) {
		return {
			redirect: {
				destination: "/404"
			}
		};
	}

	if (redirect.locked) {
		return {
			props: {
				slug: slug.join("/")
			}
		};
	}

	return {
		redirect: {
			destination: redirect.url
		}
	};
};
