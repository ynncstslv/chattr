'use client';

import { useState } from 'react';

import useRoutes from '@/app/hooks/useRoutes';

import DesktopItem from './DesktopItem';

const DesktopSidebar = () => {
	const routes = useRoutes();

	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="hidden justify-between lg:w-20 lg:flex lg:flex-col lg:fixed lg:left-0 lg:pb-4 lg:inset-y-0 lg:border-r-[1px] lg:bg-white lg:overflow-y-auto lg:z-40 xl:px-6">
			<nav className="flex flex-col justify-between mt-4">
				<ul role="list" className="flex flex-col items-center space-y-1">
					{routes.map((item) => (
						<DesktopItem
							key={item.label}
							label={item.label}
							href={item.href}
							icon={item.icon}
							active={item.active}
							onClick={item.onClick}
						/>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default DesktopSidebar;