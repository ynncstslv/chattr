'use client';

import { FC, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { User } from '@prisma/client';

import axios from 'axios';
import { toast } from 'react-hot-toast';

import Modal from '@/app/components/Modal';
import Input from '@/app/components/inputs/Input';
import Select from '@/app/components/inputs/Select';
import Button from '@/app/components/Button';

interface GroupChatModalProps {
	users: User[];
	isOpen?: boolean;
	onClose: () => void;
}

const GroupChatModal: FC<GroupChatModalProps> = ({
	users,
	isOpen,
	onClose,
}) => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		setValue,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			members: [],
		},
	});

	const members = watch('members');

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post('/api/conversations', {
				...data,
				isGroup: true,
			})
			.then(() => {
				router.refresh();
				onClose();
			})
			.catch(() => toast.error('Something went wrong'))
			.finally(() => setIsLoading(false));
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-12">
					<div className="pb-12 border-b border-gray-900/10">
						<h2 className="font-semibold text-base leading-7 text-gray-900">
							Create a Group Chat
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Create a chat with more people.
						</p>
						<div className="flex flex-col gap-y-8 mt-10">
							<Input
								id="name"
								label="Name"
								register={register}
								required
								disabled={isLoading}
								errors={errors}
							/>
							<Select
								label="Members"
								value={members}
								options={users.map((user) => ({
									value: user.id,
									label: user.name,
								}))}
								onChange={(value) =>
									setValue('members', value, { shouldValidate: true })
								}
								disabled={isLoading}
							/>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-end gap-x-6 mt-6">
					<Button
						secondary
						type="button"
						onClick={onClose}
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button type="submit" disabled={isLoading}>
						Create Group
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default GroupChatModal;
