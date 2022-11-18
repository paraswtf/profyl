import { Card, Container, Text, Input, Spacer, Button, Checkbox, Tooltip } from "@nextui-org/react";
import type { NextPage } from "next";
import env from "../lib/env";
import { LockIcon, NoLockIcon, UnLockIcon } from "../lib/icons/LockIcon";
import { WebIcon } from "../lib/icons/WebIcon";
import { LinkLockIcon, LinkIcon, AddLinkIcon } from "../lib/icons/LinkIcon";
import { useState } from "react";

const Home: NextPage = () => {
	const [url, setUrl] = useState("");
	const [password, setPassword] = useState<string | null>("");

	function handleURLChange(event: any) {
		setUrl(event.currentTarget.value);
	}

	return (
		<Container
			display="flex"
			alignItems="center"
			justify="center"
			css={{ minHeight: "100vh" }}
		>
			<Card css={{ mw: "420px", p: "20px" }}>
				<Text
					size={24}
					weight="bold"
					css={{
						as: "center",
						mb: "20px"
					}}
				>
					URL Shortner
				</Text>
				<Input
					labelLeft={
						//@ts-ignore
						<WebIcon
							filled
							size={20}
						/>
					}
					placeholder={env.BASE_URL}
					width="100%"
				/>
				<Spacer y={1} />
				<Input.Password
					placeholder="no password"
					width="100%"
					clearable
					labelLeft={
						password?.length ? (
							//@ts-ignore
							<LockIcon
								filled
								size={20}
							/>
						) : (
							//@ts-ignore
							<UnLockIcon
								filled
								size={20}
							/>
						)
					}
					onChangeCapture={(e) => setPassword(e.currentTarget.value ?? null)}
					onClearClick={() => setPassword(null)}
				/>
				<Spacer y={1} />
				<Tooltip content={"Login to use this feature"}>
					<Input
						placeholder="login to use custom url"
						width="100%"
						clearable
						labelLeft={env.BASE_URL.split("//")[1] + "/"}
						labelRight={
							//@ts-ignore
							<LinkLockIcon
								filled
								size={20}
							/>
						}
						disabled
					/>
				</Tooltip>
				<Spacer y={1} />
				<Checkbox
					size="sm"
					defaultSelected={false}
					isDisabled
				>
					Use username in URL
				</Checkbox>
				<Spacer y={1.6} />
				<Button auto>Generate Link</Button>
			</Card>
		</Container>
	);
};

export default Home;
