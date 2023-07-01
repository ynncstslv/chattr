'use client';

import { FC, useMemo, useState } from 'react';

import Link from 'next/link';

import { Conversation, User } from '@prisma/client';

import useOtherUser from '@/app/hooks/useOtherUser';

import Avatar from '@/app/components/Avatar';
import useActiveList from '@/app/hooks/useActiveList';

import AvatarGroup from '@/app/components/AvatarGroup';
import ProfileDrawer from './ProfileDrawer';

import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';

interface HeaderProps {
	conversation: Conversation & {
		users: User[];
	};
}

const Header: FC<HeaderProps> = ({ conversation }) => {
	const otherUser = useOtherUser(conversation);

	const [drawerOpen, setDrawerOpen] = useState(false);

	const { members } = useActiveList();

	const isActive = members.indexOf(otherUser?.email!) !== -1;

	const statusText = useMemo(() => {
		if (conversation.isGroup) {
			return `${conversation.users.length} members`;
		}

		// will be dynamic later
		return isActive ? 'Active' : 'Offline';
	}, [conversation, isActive]);

	return (
		<>
			<ProfileDrawer
				data={conversation}
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			/>
			<div className="w-full flex items-center justify-between px-4 py-3 border-b-[1px] bg-white shadow-sm sm:px-4 lg:px-6">
				<div className="flex items-center gap-3">
					<Link
						href="/conversations"
						className="block text-pink-500 cursor-pointer transition hover:text-pink-700 lg:hidden"
					>
						<HiChevronLeft size={32} />
					</Link>
					{conversation.isGroup ? (
						<AvatarGroup users={conversation.users} />
					) : (
						<Avatar user={otherUser} />
					)}
					<div className="flex flex-col">
						<div>{conversation.name || otherUser.name}</div>
						<div className="font-light text-sm text-neutral-500">
							{statusText}
						</div>
					</div>
				</div>
				<HiEllipsisHorizontal
					size={32}
					className="text-pink-500 cursor-pointer transition hover:text-pink-700"
					onClick={() => setDrawerOpen(true)}
				/>
			</div>
		</>
	);
};

export default Header;
