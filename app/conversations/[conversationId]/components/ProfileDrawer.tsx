'use client';

import { FC, Fragment, useMemo, useState } from 'react';

import { Conversation, User } from '@prisma/client';

import useOtherUser from '@/app/hooks/useOtherUser';

import { format } from 'date-fns';
import { Dialog, Transition } from '@headlessui/react';

import Avatar from '@/app/components/Avatar';
import AvatarGroup from '@/app/components/AvatarGroup';
import ConfirmModal from './ConfirmModal';

import { IoClose, IoTrash } from 'react-icons/io5';

interface ProfileDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	data: Conversation & {
		users: User[];
	};
}

const ProfileDrawer: FC<ProfileDrawerProps> = ({ isOpen, onClose, data }) => {
	const otherUser = useOtherUser(data);

	const [confirmOpen, setConfirmOpen] = useState(false);

	const joinedDate = useMemo(() => {
		return format(new Date(otherUser.createdAt), 'PP');
	}, [otherUser.createdAt]);

	const title = useMemo(() => {
		return data.name || otherUser.name;
	}, [data.name, otherUser.name]);

	const statusText = useMemo(() => {
		if (data.isGroup) {
			return `${data.users.length} members`;
		}

		// going to be dynamic
		return 'Active';
	}, [data]);

	return (
		<>
			<ConfirmModal
				isOpen={confirmOpen}
				onClose={() => setConfirmOpen(false)}
			/>
			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={onClose}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-40" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="max-w-full flex fixed right-0 pl-10 inset-y-0 pointer-events-none">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500"
									leaveTo="translate-x-full"
								>
									<Dialog.Panel className="w-screen max-w-md pointer-events-auto">
										<div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
											<div className="px-4 sm:px-6">
												<div className="flex items-start justify-end">
													<div className="h-7 flex items-center ml-3">
														<button
															type="button"
															className="text-gray-400 rounded-md bg-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
															onClick={onClose}
														>
															<span className="sr-only">Close Panel</span>
															<IoClose size={24} />
														</button>
													</div>
												</div>
											</div>
											<div className="flex-1 relative px-4 mt-6 sm:px-6">
												<div className="flex flex-col items-center">
													<div className="mb-2">
														{data.isGroup ? (
															<AvatarGroup users={data.users} />
														) : (
															<Avatar user={otherUser} />
														)}
													</div>
													<div>{title}</div>
													<div className="text-sm text-gray-500">
														{statusText}
													</div>
													<div className="flex gap-10 my-8">
														<div
															className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-75"
															onClick={() => setConfirmOpen(true)}
														>
															<div className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100">
																<IoTrash size={20} />
															</div>
															<div className="font-light text-sm text-neutral-600">
																Delete
															</div>
														</div>
													</div>
													<div className="w-full pt-5 pb-5 sm:px-0 sm:pt-0">
														<dl className="px-4 space-y-8 sm:px-6 sm:space-y-6">
															{!data.isGroup && (
																<div>
																	<dt className="font-medium text-sm text-gray-500 sm:w-40 sm:flex-shrink-0">
																		Email
																	</dt>
																	<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
																		{otherUser.email}
																	</dd>
																</div>
															)}
															{!data.isGroup && (
																<>
																	<hr />
																	<div>
																		<dt className="font-medium text-sm text-gray-500 sm:w-40 sm:flex-shrink-0">
																			Joined:
																		</dt>
																		<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
																			<time dateTime={joinedDate}>
																				{joinedDate}
																			</time>
																		</dd>
																	</div>
																</>
															)}
														</dl>
													</div>
												</div>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default ProfileDrawer;
