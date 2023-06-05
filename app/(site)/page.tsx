import Image from 'next/image';

export default function Home() {
	return (
		<div className="min-h-full flex flex-col justify-center py-12 bg-gray-100 sm:px-6 lg:px-8">
			<div className="sm:w-full sm:max-w-md sm:mx-auto">
				<Image
					src="/images/logo.png"
					alt="Logo"
					width={48}
					height={48}
					className="w-auto mx-auto"
				/>
				<h2 className="mt-6 font-bold text-3xl text-center tracking-tight text-gray-900">
					Sign in to your account!
				</h2>
			</div>
			{/* Auth Form */}
		</div>
	);
}
