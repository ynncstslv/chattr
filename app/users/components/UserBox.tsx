'use client';

import { FC, useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';

import { User } from '@prisma/client';

import Avatar from '@/app/components/Avatar';

interface UserBoxProps {
	data: User;
}

const UserBox: FC<UserBoxProps> = ({ data }) => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const handleClick = useCallback(() => {
		setIsLoading(true);

		axios
			.post('/api/conversations', { userId: data.id })
			.then((data) => {
				router.push(`/conversations/${data.data.id}`);
			})
			.finally(() => setIsLoading(false));
	}, [data, router]);

	return (
		<div
			className="w-full flex items-center space-x-3 relative p-3 rounded-lg bg-white cursor-pointer transition hover:bg-neutral-100"
			onClick={handleClick}
		>
			<Avatar user={data} />
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="flex items-center justify-between mb-1">
						<p className="font-medium text-sm text-gray-900">{data.name}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserBox;
