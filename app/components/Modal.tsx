'use client';

import { FC, Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { IoClose } from 'react-icons/io5';

interface ModalProps {
	children: React.ReactNode;
	isOpen?: boolean;
	onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>
				<div className="fixed inset-0 overflow-y-auto z-10">
					<div className="min-h-full flex items-center justify-center p-4 text-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="w-full relative px-4 pb-4 text-left rounded-lg bg-white shadow-xsl overflow-hidden transform transition-all sm:w-full sm:max-w-lg sm:p-6 sm:my-8">
								<div className="hidden absolute top-0 right-0 pt-4 pr-4 z-10 sm:block">
									<button
										type="button"
										className="text-gray-400 rounded-md bg-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
										onClick={onClose}
									>
										<span className="sr-only">Close Modal</span>
										<IoClose className="w-6 h-6" />
									</button>
								</div>
								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default Modal;
