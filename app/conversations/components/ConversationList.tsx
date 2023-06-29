'use client';

import { FC, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FullConversationType } from '@/app/types';

import useConversation from '@/app/hooks/useConversation';

import clsx from 'clsx';

import ConversationBox from './ConversationBox';

import { MdOutlineGroupAdd } from 'react-icons/md';

interface ConversationListProps {
	initialItems: FullConversationType[];
}

const ConversationList: FC<ConversationListProps> = ({ initialItems }) => {
	const router = useRouter();

	const [items, setItems] = useState(initialItems);

	const { conversationId, isOpen } = useConversation();

	return (
		<aside
			className={clsx(
				'fixed left-0 pb-20 inset-y-0 border-r border-gray-200 overflow-y-auto lg:w-80 lg:block lg:left-20 lg:pb-0',
				isOpen ? 'hidden' : 'w-full block left-0'
			)}
		>
			<div className="px-5">
				<div className="flex justify-between py-4 mb-4 border-b-[1px] border-gray-200">
					<div className="font-bold text-2xl text-indigo-700">
						Conversations
					</div>
					<div className="p-2 text-gray-600 rounded-full bg-gray-100 cursor-pointer transition hover:opacity-75">
						<MdOutlineGroupAdd size={20} />
					</div>
				</div>
				{items.map((item) => (
					<ConversationBox
						key={item.id}
						data={item}
						selected={conversationId === item.id}
					/>
				))}
			</div>
		</aside>
	);
};

export default ConversationList;
