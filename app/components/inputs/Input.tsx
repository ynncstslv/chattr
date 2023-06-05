'use client';

import { FC } from 'react';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import clsx from 'clsx';

interface InputProps {
	id: string;
	label: string;
	type?: string;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	disabled?: boolean;
}

const Input: FC<InputProps> = ({
	id,
	label,
	type,
	required,
	register,
	errors,
	disabled,
}) => {
	return (
		<div>
			<label
				htmlFor={id}
				className="block font-medium text-sm leading-6 text-gray-900"
			>
				{label}
			</label>
			<div className="mt-2">
				<input
					id={id}
					type={type}
					autoComplete={id}
					disabled={disabled}
					{...register(id, { required })}
					className={clsx(
						`form-input w-full block py-1.5 text-gray-900 border-0 rounded-md shadow-sm ring-inset ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`,
						errors[id] && 'focus:ring-rose-500',
						disabled && 'opacity-50 cursor-default'
					)}
				/>
			</div>
		</div>
	);
};

export default Input;
