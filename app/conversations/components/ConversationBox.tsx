'use client';

import { FC, useCallback, useMemo } from 'react';

import { useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';

import useOtherUser from '@/app/hooks/useOtherUser';

import { Conversation, Message, User } from '@prisma/client';
import { FullConversationType } from '@/app/types';

import clsx from 'clsx';
import format from 'date-fns/format';

import Avatar from '@/app/components/Avatar';

interface ConversationBoxProps {
	data: FullConversationType;
	selected?: boolean;
}

const ConversationBox: FC<ConversationBoxProps> = ({ data, selected }) => {
	const otherUser = useOtherUser(data);

	const session = useSession();
	const router = useRouter();

	const handleClick = useCallback(() => {
		router.push(`/conversations/${data.id}`);
	}, [data.id, router]);

	const lastMessage = useMemo(() => {
		const messages = data.messages || [];

		return messages[messages.length - 1];
	}, [data.messages]);

	const userEmail = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	const hasSeen = useMemo(() => {
		if (!lastMessage) {
			return false;
		}

		const seenArray = lastMessage.seen || [];

		if (!userEmail) {
			return false;
		}

		return seenArray.filter((user) => user.email === userEmail).length !== 0;
	}, [userEmail, lastMessage]);

	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) {
			return 'Sent an image.';
		}

		if (lastMessage?.body) {
			return lastMessage.body;
		}

		return 'Just started a conversation.';
	}, [lastMessage]);

	return (
		<div
			className={clsx(
				'w-full flex items-center space-x-3 relative p-3 rounded-lg cursor-pointer transition hover:bg-neutral-100',
				selected ? 'bg-neutral-100' : 'bg-white'
			)}
			onClick={handleClick}
		>
			<Avatar user={otherUser} />
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="flex items-center justify-between mb-1">
						<p className="font-medium text-md text-gray-900">
							{data.name || otherUser.name}
						</p>
						{lastMessage?.createdAt && (
							<p className="font-light text-xs text-gray-400">
								{format(new Date(lastMessage.createdAt), 'p')}
							</p>
						)}
					</div>
					<p
						className={clsx(
							'truncate text-sm',
							hasSeen ? 'text-gray-500' : 'font-medium text-black'
						)}
					>
						{lastMessageText}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ConversationBox;
