'use client';

import { useCallback, useState } from 'react';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import AuthSocialButton from './AuthSocialButton';
import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';

import { BsGithub, BsGoogle } from 'react-icons/bs';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
	const [variant, setVariant] = useState<Variant>('LOGIN');
	const [isLoading, setIsLoading] = useState(false);

	const toggleVariant = useCallback(() => {
		if (variant === 'LOGIN') {
			setVariant('REGISTER');
		} else {
			setVariant('LOGIN');
		}
	}, [variant]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		if (variant === 'REGISTER') {
			// axios register
		}

		if (variant === 'LOGIN') {
			// next-auth signin
		}
	};

	const socialAction = (action: string) => {
		setIsLoading(true);

		// next-auth social signin
	};

	return (
		<div className="w-[84%] max-w-sm mx-auto mt-8">
			<div className="px-4 py-8 rounded-lg bg-white shadow sm:px-10">
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					{variant === 'REGISTER' && (
						<Input
							id="name"
							label="Name"
							register={register}
							disabled={isLoading}
							errors={errors}
						/>
					)}
					<Input
						id="email"
						label="Email"
						type="email"
						register={register}
						disabled={isLoading}
						errors={errors}
					/>
					<Input
						id="password"
						label="Password"
						type="password"
						register={register}
						disabled={isLoading}
						errors={errors}
					/>
					<Button type="submit" fullWidth disabled={isLoading}>
						{variant === 'LOGIN' ? 'Sign In' : 'Register'}
					</Button>
				</form>
				<div className="mt-6">
					<div className="relative">
						<div className="flex items-center absolute inset-0">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="flex justify-center relative text-sm">
							<span className="px-2 text-gray-500 bg-white">
								{variant === 'LOGIN' ? 'Or sign in with' : 'Or register with'}
							</span>
						</div>
					</div>
					<div className="flex gap-2 mt-6">
						<AuthSocialButton
							icon={BsGoogle}
							label="Google"
							onClick={() => socialAction('google')}
						/>
						<AuthSocialButton
							icon={BsGithub}
							label="Github"
							onClick={() => socialAction('github')}
						/>
					</div>
				</div>
				<div className="flex gap-2 justify-center py-2 mt-6 text-sm text-gray-500">
					<div>
						{variant === 'LOGIN'
							? 'Are you new to Chattr?'
							: 'Already have an account?'}
					</div>
					<div className="underline cursor-pointer" onClick={toggleVariant}>
						{variant === 'LOGIN' ? 'Create an account!' : 'Sign In!'}{' '}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
