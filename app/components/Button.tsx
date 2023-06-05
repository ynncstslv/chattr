'use client';

import { FC } from 'react';

import clsx from 'clsx';

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset' | undefined;
	children?: React.ReactNode;
	fullWidth?: boolean;
	secondary?: boolean;
	danger?: boolean;
	disabled?: boolean;
	onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
	type,
	children,
	fullWidth,
	secondary,
	danger,
	disabled,
	onClick,
}) => {
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className={clsx(
				`flex justify-center px-3 py-2 font-semibold text-sm rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
				disabled && 'opacity-50 cursor-default',
				fullWidth && 'w-full',
				secondary ? 'text-gray-900' : 'text-white',
				danger &&
					'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
				!secondary &&
					!danger &&
					'bg-indigo-500 hover:bg-indigo-600 focus-visible:outline-indigo-600'
			)}
		>
			{children}
		</button>
	);
};

export default Button;
