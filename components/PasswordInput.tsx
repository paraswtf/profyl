import { PasswordInput as PWI, PasswordInputProps as PWIProps, Progress } from "@mantine/core";

const requirements = [
	{ re: /[0-9]/, label: "Includes number" },
	{ re: /[a-z]/, label: "Includes lowercase letter" },
	{ re: /[A-Z]/, label: "Includes uppercase letter" },
	{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" }
];

function getStrength(password: string) {
	let multiplier = 0;

	requirements.forEach((requirement) => {
		if (!requirement.re.test(password)) {
			multiplier += 1;
		}
	});

	return 100 - (100 / requirements.length) * multiplier;
}

export default function PasswordInput(props: PWIProps & { value: string }) {
	const strength = getStrength(props.value);
	const color = strength === 100 ? "teal" : "yellow";

	return (
		<div>
			<PWI {...props} />
			<Progress
				color={color}
				value={strength}
				size={2}
			/>
		</div>
	);
}
