'use client';

import { FC } from 'react';

import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

import useConversation from '@/app/hooks/useConversation';

import axios from 'axios';

import MessageInput from './MessageInput';

import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';

interface FormProps {}

const Form: FC<FormProps> = ({}) => {
	const { conversationId } = useConversation();

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			message: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setValue('message', '', { shouldValidate: true });
		axios.post('/api/messages', { ...data, conversationId });
	};

	return (
		<div className="w-full flex items-center gap-2 px-4 py-4 border-t bg-white lg:gap-4">
			<HiPhoto size={30} className="text-pink-500" />
			<form
				className="w-full flex items-center gap-2 lg:gap-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<MessageInput
					id="message"
					register={register}
					errors={errors}
					placeholder="Write your message..."
					required
				/>
				<button
					type="submit"
					className="p-2 rounded-full bg-indigo-700 cursor-pointer transition hover:bg-indigo-800"
				>
					<HiPaperAirplane size={18} className="text-white" />
				</button>
			</form>
		</div>
	);
};

export default Form;
