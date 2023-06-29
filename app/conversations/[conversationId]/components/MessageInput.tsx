'use client';

import { FC } from 'react';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
	id: string;
	type?: string;
	required?: boolean;
	placeholder?: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const MessageInput: FC<MessageInputProps> = ({
	id,
	type,
	required,
	placeholder,
	register,
	errors,
}) => {
	return (
		<div className="w-full relative">
			<input
				id={id}
				type={type}
				autoComplete={id}
				{...register(id, { required })}
				placeholder={placeholder}
				className="w-full px-4 py-2 font-light text-black rounded-full bg-neutral-100 focus:outline-none"
			/>
		</div>
	);
};

export default MessageInput;
