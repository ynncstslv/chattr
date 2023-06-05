import { FC } from 'react';

import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
	icon: IconType;
	label: string;
	onClick: () => void;
}

const AuthSocialButton: FC<AuthSocialButtonProps> = ({
	icon: Icon,
	label,
	onClick,
}) => {
	return (
		<button
			type="button"
			className="w-full inline-flex items-center justify-center px-4 py-2 text-gray-500 rounded-md bg-white shadow-sm ring-inset ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
			onClick={onClick}
		>
			<Icon />
			<div className="ml-2 text-sm">{label}</div>
		</button>
	);
};

export default AuthSocialButton;

/*

inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offiset-0

*/
