'use client';

import { FC } from 'react';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarGroupProps {
	users?: User[];
}

const AvatarGroup: FC<AvatarGroupProps> = ({ users = [] }) => {
	const slicedUsers = users.slice(0, 3);

	const positionMap = {
		0: 'top-0 left-[12px]',
		1: 'bottom-0',
		2: 'right-0 bottom-0',
	};
	return (
		<div className="w-11 h-11 relative">
			{slicedUsers.map((user, index) => (
				<div
					key={user.id}
					className={`w-[21px] h-[21px] inline-block absolute rounded-full overflow-hidden ${
						positionMap[index as keyof typeof positionMap]
					}`}
				>
					<Image
						src={user?.image || '/images/placeholder.jpg'}
						alt="Avatar"
						fill
					/>
				</div>
			))}
		</div>
	);
};

export default AvatarGroup;
