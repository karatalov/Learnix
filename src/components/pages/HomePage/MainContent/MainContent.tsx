'use client'

import { useEffect, useState } from 'react'
import { ArrowDown, UserIcon } from 'lucide-react'
import './MainContent.scss'

const WORDS = ['Front-End', 'UI/UX', 'Full-Stack']

export default function MainContent() {
	const [text, setText] = useState('')
	const [wordIndex, setWordIndex] = useState(0)
	const [charIndex, setCharIndex] = useState(0)

	useEffect(() => {
		const currentWord = WORDS[wordIndex]

		let timeout: NodeJS.Timeout

		if (charIndex < currentWord.length) {
			timeout = setTimeout(() => {
				setText((prev) => prev + currentWord[charIndex])
				setCharIndex((c) => c + 1)
			}, 80)
		} else {
			timeout = setTimeout(() => {
				setText('')
				setCharIndex(0)
				setWordIndex((w) => (w + 1) % WORDS.length)
			}, 1200)
		}

		return () => clearTimeout(timeout)
	}, [charIndex, wordIndex])

	const scrollToAbout = () => {
		document.getElementById('about')?.scrollIntoView({
			behavior: 'smooth',
		})
	}

	return (
		<section id="mainContent">
			<div className="mainContent-overlay" />

			<div className="mainContent-glow mainContent-glow-1" />
			<div className="mainContent-glow mainContent-glow-2" />

			<div className="container">
				<div className="mainContent-content">
					<div className="mainContent-user-badge">
						<UserIcon size={18} />
						<span>Начни путь разработчика</span>
					</div>

					<h1 className="mainContent-title">
						Стань профессиональным{' '}
						<span className="mainContent-gradient-text">
							{text}
							<span className="cursor">|</span>
						</span>
						<br />
						разработчиком с Learnix
					</h1>

					<p className="mainContent-subtitle">
						Практическое обучение с нуля до работы. Освой востребованные навыки,
						собери портфолио и получи работу в IT.
					</p>

					<div className="mainContent-actions">
						<button className="btn-primary">Начать обучение 🚀</button>

						<button className="btn-secondary">Посмотреть курсы</button>

						<button className="btn-ghost" onClick={scrollToAbout}>
							<ArrowDown size={18} />
						</button>
					</div>

					<button className="scroll-indicator" onClick={scrollToAbout}>
						<ArrowDown size={18} />
					</button>
				</div>
			</div>
		</section>
	)
}
