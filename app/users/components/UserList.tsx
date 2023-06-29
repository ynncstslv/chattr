'use client';

import { FC } from 'react';

import { User } from '@prisma/client';

import UserBox from './UserBox';

interface UserListProps {
	items: User[];
}

const UserList: FC<UserListProps> = ({ items }) => {
	return (
		<aside className="w-full block fixed left-0 pb-20 inset-y-0 border-r border-gray-200 overflow-y-auto lg:w-80 lg:block lg:left-20 lg:pb-0">
			<div className="px-5">
				<div className="flex-col">
					<div className="py-4 font-bold text-2xl text-neutral-800">Users</div>
				</div>
				{items.map((item) => (
					<UserBox key={item.id} data={item} />
				))}
			</div>
		</aside>
	);
};

export default UserList;