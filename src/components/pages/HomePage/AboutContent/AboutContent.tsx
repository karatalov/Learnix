'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import './AboutContent.scss'

export default function AboutContent() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const el = sectionRef.current
		if (!el) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.25 },
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	return (
		<section
			id="aboutContent"
			ref={sectionRef}
			className={visible ? 'is-visible' : ''}
		>
			<div className="container">
				<div className="aboutContent">
					<div className="aboutContent-data">
						<h3>
							О платформе <span>Learnix</span>
						</h3>

						<p className="aboutContent-intro">
							Learnix — это современная образовательная платформа для студентов
							и начинающих разработчиков, которая помогает освоить
							востребованные навыки в IT и построить карьеру.
						</p>

						<ul className="aboutContent-points">
							<li>🚀 Практика вместо теории</li>
							<li>📚 Полноценные курсы</li>
							<li>🏆 Система XP и уровней</li>
							<li>💼 Подготовка к работе</li>
						</ul>

						<p className="aboutContent-outro">
							Мы не просто обучаем — мы помогаем тебе стать разработчиком и
							выйти на новый уровень в карьере.
						</p>
					</div>

					<div className="aboutContent-image">
						<Image src="/me.jpg" alt="me" width={200} height={200} />
					</div>
				</div>
			</div>
		</section>
	)
}
