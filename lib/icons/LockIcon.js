export const LockIcon = ({ fill = "currentColor", filled, size, height, width, label, ...props }) => {
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
					d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
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
			<path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
		</svg>
	);
};

export const NoLockIcon = ({ fill = "currentColor", filled, size, height, width, label, ...props }) => {
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
					d="M9 5.82L7.36 4.16C8.09 2.31 9.89 1 12 1C14.76 1 17 3.24 17 6V8H18C19.11 8 20 8.9 20 10V16.8L11.2 8H15V6C15 4.34 13.66 3 12 3C10.41 3 9.11 4.25 9 5.82M22.11 21.46L20.84 22.73L19.46 21.35C19.1 21.75 18.58 22 18 22H6C4.89 22 4 21.11 4 20V10C4 8.89 4.9 8 6 8H6.11L1.11 3L2.39 1.73L22.11 21.46M13.85 15.74L11.26 13.15C10.5 13.44 10 14.16 10 15C10 16.11 10.9 17 12 17C12.84 17 13.56 16.5 13.85 15.74Z"
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
			<path d="M9 5.82L7.36 4.16C8.09 2.31 9.89 1 12 1C14.76 1 17 3.24 17 6V8H18C19.11 8 20 8.9 20 10V16.8L11.2 8H15V6C15 4.34 13.66 3 12 3C10.41 3 9.11 4.25 9 5.82M22.11 21.46L20.84 22.73L19.46 21.35C19.1 21.75 18.58 22 18 22H6C4.89 22 4 21.11 4 20V10C4 8.89 4.9 8 6 8H6.11L1.11 3L2.39 1.73L22.11 21.46M13.85 15.74L11.26 13.15C10.5 13.44 10 14.16 10 15C10 16.11 10.9 17 12 17C12.84 17 13.56 16.5 13.85 15.74Z" />
		</svg>
	);
};

export const UnLockIcon = ({ fill = "currentColor", filled, size, height, width, label, ...props }) => {
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
					d="M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z"
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
			<path d="M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z" />
		</svg>
	);
};
