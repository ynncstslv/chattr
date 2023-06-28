'use client';

import { FC } from 'react';

import Link from 'next/link';

import clsx from 'clsx';

interface DesktopItemProps {
	label: string;
	href: string;
	icon: any;
	active?: boolean;
	onClick?: () => void;
}

const DesktopItem: FC<DesktopItemProps> = ({
	label,
	href,
	icon: Icon,
	active,
	onClick,
}) => {
	const handleClick = () => {
		if (onClick) return onClick();
	};

	return (
		<li onClick={handleClick}>
			<Link
				href={href}
				className={clsx(
					'group flex gap-x-3 p-3 font-semibold text-sm leading-6 text-gray-500 rounded-md hover:text-indigo-600 hover:bg-gray-100',
					active && 'text-indigo-600 bg-gray-100'
				)}
			>
				<Icon className="w-6 h-6 shrink-0" />
				<span className="sr-only">{label}</span>
			</Link>
		</li>
	);
};

export default DesktopItem;
