'use client';

import { FC } from 'react';

import { User } from '@prisma/client';

import useActiveList from '../hooks/useActiveList';

import Image from 'next/image';

interface AvatarProps {
	user?: User;
}

const Avatar: FC<AvatarProps> = ({ user }) => {
	const { members } = useActiveList();

	const isActive = members.indexOf(user?.email!) !== -1;

	return (
		<div className="relative">
			<div className="w-9 h-9 inline-block relative rounded-full overflow-hidden md:h-11 md:w-11">
				<Image
					src={user?.image || '/images/placeholder.jpg'}
					alt="Avatar"
					fill
				/>
			</div>
			{isActive && (
				<span className="w-2 h-2 block absolute top-0 right-0 rounded-full ring-2 ring-white bg-green-500 md:w-3 md:h-3" />
			)}
		</div>
	);
};

export default Avatar;
