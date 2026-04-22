import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Space_Grotesk } from 'next/font/google'
import './globals.scss'
import Header from '@/components/layout/Header/Header'

const geist = Geist({
	variable: '--font-geist',
	subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
	variable: '--font-space',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Learnix — Платформа для студентов',
	description:
		'Learnix — современная платформа для обучения студентов. Прокачивай знания, проходи тесты, зарабатывай XP и повышай уровень.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ru" className={`${geist.variable} ${spaceGrotesk.variable}`}>
			<body>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	)
}
