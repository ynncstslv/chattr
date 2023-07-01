'use client';

import { FC } from 'react';

import ReactSelect from 'react-select';

interface SelectProps {
	label: string;
	value?: Record<string, any>;
	options: Record<string, any>[];
	onChange: (value: Record<string, any>) => void;
	disabled?: boolean;
}

const Select: FC<SelectProps> = ({
	label,
	value,
	options,
	onChange,
	disabled,
}) => {
	return (
		<div className="z-[100]">
			<label className="block font-medium text-sm leading-6 text-gray-900">
				{label}
			</label>
			<div className="mt-2">
				<ReactSelect
					value={value}
					options={options}
					onChange={onChange}
					isMulti
					menuPortalTarget={document.body}
					styles={{
						menuPortal: (base) => ({
							...base,
							zIndex: 9999,
						}),
					}}
					classNames={{
						control: () => 'text-sm',
					}}
					isDisabled={disabled}
				/>
			</div>
		</div>
	);
};

export default Select;
