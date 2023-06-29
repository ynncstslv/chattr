'use client';

import { FC } from 'react';

import Link from 'next/link';

import clsx from 'clsx';

interface MobileItemProps {
	href: string;
	icon: any;
	active?: boolean;
	onClick?: () => void;
}

const MobileItem: FC<MobileItemProps> = ({
	href,
	icon: Icon,
	active,
	onClick,
}) => {
	const handleClick = () => {
		if (onClick) {
			return onClick();
		}
	};

	return (
		<Link
			href={href}
			className={clsx(
				'group flex gap-x-3 px-8 py-4 font-semibold text-sm leading-6 text-indigo-200 hover:text-indigo-800 hover:bg-gray-100',
				active && 'text-pink-600 bg-indigo-800'
			)}
			onClick={handleClick}
		>
			<Icon className="w-6 h-6" />
		</Link>
	);
};

export default MobileItem;
