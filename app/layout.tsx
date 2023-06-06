import ToasterContext from './context/ToasterContext';

import './globals.css';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Chattr | Real-Time Messaging',
	description:
		'Whether you are catching up with friends, collaborating with colleagues, or sharing with family, Chattr ensures that you will never miss a message or experience any delays.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ToasterContext />
				{children}
			</body>
		</html>
	);
}
