export const LinkIcon = ({ fill = "currentColor", filled, size, height, width, label, ...props }) => {
	if (filled) {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size || width}
				height={size || height}
				viewBox="0 0 24 24"
				{...props}
			>
				<path
					fill={fill}
					d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"
				/>
			</svg>
		);
	}
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size || width}
			height={size || height}
			viewBox="0 0 24 24"
			{...props}
		>
			<path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
		</svg>
	);
};

export const AddLinkIcon = ({ fill = "currentColor", filled, size, height, width, label, ...props }) => {
	if (filled) {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size || width}
				height={size || height}
				viewBox="0 0 24 24"
				{...props}
			>
				<path
					fill={fill}
					d="M7,7H11V9H7A3,3 0 0,0 4,12A3,3 0 0,0 7,15H11V17H7A5,5 0 0,1 2,12A5,5 0 0,1 7,7M17,7A5,5 0 0,1 22,12H20A3,3 0 0,0 17,9H13V7H17M8,11H16V13H8V11M17,12H19V15H22V17H19V20H17V17H14V15H17V12Z"
				/>
			</svg>
		);
	}
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size || width}
			height={size || height}
			viewBox="0 0 24 24"
			{...props}
		>
			<path d="M7,7H11V9H7A3,3 0 0,0 4,12A3,3 0 0,0 7,15H11V17H7A5,5 0 0,1 2,12A5,5 0 0,1 7,7M17,7A5,5 0 0,1 22,12H20A3,3 0 0,0 17,9H13V7H17M8,11H16V13H8V11M17,12H19V15H22V17H19V20H17V17H14V15H17V12Z" />
		</svg>
	);
};

export const LinkLockIcon = ({ fill = "currentColor", filled, size, height, width, label, ...props }) => {
	if (filled) {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size || width}
				height={size || height}
				viewBox="0 0 24 24"
				{...props}
			>
				<path
					fill={fill}
					d="M23 16V15.5A2.5 2.5 0 0 0 18 15.5V16A1 1 0 0 0 17 17V21A1 1 0 0 0 18 22H23A1 1 0 0 0 24 21V17A1 1 0 0 0 23 16M22 16H19V15.5A1.5 1.5 0 0 1 22 15.5M7 8.9H11V7H7A5 5 0 0 0 7 17H11V15.1H7A3.1 3.1 0 0 1 7 8.9M8 11V13H16V11M13 15.1V17H15V15.1M17 7H13V8.9H17A3.09 3.09 0 0 1 19.94 11A5.12 5.12 0 0 1 20.5 11H21.9A5 5 0 0 0 17 7Z"
				/>
			</svg>
		);
	}
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size || width}
			height={size || height}
			viewBox="0 0 24 24"
			{...props}
		>
			<path d="M23 16V15.5A2.5 2.5 0 0 0 18 15.5V16A1 1 0 0 0 17 17V21A1 1 0 0 0 18 22H23A1 1 0 0 0 24 21V17A1 1 0 0 0 23 16M22 16H19V15.5A1.5 1.5 0 0 1 22 15.5M7 8.9H11V7H7A5 5 0 0 0 7 17H11V15.1H7A3.1 3.1 0 0 1 7 8.9M8 11V13H16V11M13 15.1V17H15V15.1M17 7H13V8.9H17A3.09 3.09 0 0 1 19.94 11A5.12 5.12 0 0 1 20.5 11H21.9A5 5 0 0 0 17 7Z" />
		</svg>
	);
};
