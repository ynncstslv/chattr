'use client';

import { FC, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { User } from '@prisma/client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';

import Modal from '../Modal';
import Input from '../inputs/Input';
import Button from '../Button';

interface SettingsModalProps {
	currentUser: User;
	isOpen?: boolean;
	onClose: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({
	currentUser,
	isOpen,
	onClose,
}) => {
	const router = useRouter();

	const [isLoading, setIsloading] = useState(false);

	const {
		register,
		setValue,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: currentUser?.name,
			image: currentUser?.image,
		},
	});

	const image = watch('image');

	const handleUpload = (result: any) => {
		setValue('image', result?.info?.secure_url, {
			shouldValidate: true,
		});
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsloading(true);

		axios
			.post('/api/settings', data)
			.then(() => {
				router.refresh();
				onClose();
			})
			.catch(() => toast.error('Something went wrong!'))
			.finally(() => setIsloading(false));
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-12">
					<div className="pb-12 border-b border-gray-900/10">
						<h2 className="font-semibold text-base leading-7 text-gray-900">
							Profile
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Edit your information.
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
							<div>
								<label className="block font-medium text-sm leading-6 text-gray-900">
									Photo
								</label>
								<div className="flex items-center gap-x-3 mt-2">
									<Image
										width="48"
										height="48"
										className="rounded-full"
										src={
											image || currentUser?.image || '/images/placeholder.jpg'
										}
										alt="Avatar"
									/>
									<CldUploadButton
										options={{ maxFiles: 1 }}
										onUpload={handleUpload}
										uploadPreset="bzebhrpi"
									>
										<Button type="button" secondary disabled={isLoading}>
											Upload Image
										</Button>
									</CldUploadButton>
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-end gap-x-6 mt-6">
						<Button secondary onClick={onClose} disabled={isLoading}>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							Save
						</Button>
					</div>
				</div>
			</form>
		</Modal>
	);
};

export default SettingsModal;
