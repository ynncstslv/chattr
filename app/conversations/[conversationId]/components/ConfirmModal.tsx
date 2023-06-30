'use client';

import { FC, useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import useConversation from '@/app/hooks/useConversation';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Dialog } from '@headlessui/react';

import Modal from '@/app/components/Modal';
import Button from '@/app/components/Button';

import { FiAlertTriangle } from 'react-icons/fi';

interface ConfirmModalProps {
	isOpen?: boolean;
	onClose: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const { conversationId } = useConversation();

	const onDelete = useCallback(() => {
		setIsLoading(true);

		axios
			.delete(`/api/conversations/${conversationId}`)
			.then(() => {
				onClose();
				router.push('/conversations');
				router.refresh();
			})
			.catch(() => toast.error('Something went wrong!'))
			.finally(() => {
				setIsLoading(false);
			});
	}, [conversationId, router, onClose]);
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="sm:flex sm:items-start">
				<div className="w-12 h-12 flex flex-shrink-0 items-center justify-center mx-auto rounded-full bg-red-100 sm:w-10 sm:h-10 sm:mx-0">
					<FiAlertTriangle className="w-6 h-6 text-red-600" />
				</div>
				<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
					<Dialog.Title
						as="h3"
						className="font-semibold text-base leading-6 text-gray-900"
					>
						Delete Conversation
					</Dialog.Title>
					<div className="mt-2">
						<p className="text-sm text-gray-500">
							Are you sure you want to delete this conversation? This action can
							not be undone.
						</p>
					</div>
				</div>
			</div>
			<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
				<Button danger onClick={onDelete} disabled={isLoading}>
					Delete
				</Button>
				<Button secondary onClick={onClose} disabled={isLoading}>
					Cancel
				</Button>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
