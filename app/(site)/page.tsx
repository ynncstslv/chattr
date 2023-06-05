import Image from 'next/image';
import AuthForm from './components/AuthForm';

export default function Home() {
	return (
		<div className="min-h-full flex flex-col justify-center py-12 bg-gray-100 sm:px-6 lg:px-8">
			<div className="sm:w-full sm:max-w-md sm:mx-auto">
				<div className="flex flex-col items-center justify-center">
					<Image
						src="/images/logo.png"
						alt="Logo"
						width={52}
						height={52}
						className="w-auto mx-auto"
					/>
					<h1 className="font-extrabold text-5xl text-indigo-700">Chattr</h1>
				</div>
			</div>
			<AuthForm />
		</div>
	);
}
