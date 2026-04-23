'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CATEGORIES, SKILLS } from '@/shared/config/skills'
import { getLevelColor } from '@/utils/getLevelColor'
import { Category } from '@/shared/types/skills.types'
import Image from 'next/image'
import './SkillsContent.scss'

export default function SkillsContent() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const [visible, setVisible] = useState(false)
	const [query, setQuery] = useState('')
	const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
	const [hoveredCard, setHoveredCard] = useState<string | null>(null)

	useEffect(() => {
		const el = sectionRef.current
		if (!el) return
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true)
					obs.disconnect()
				}
			},
			{ threshold: 0.15 },
		)
		obs.observe(el)
		return () => obs.disconnect()
	}, [])

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase()
		return SKILLS.filter((s) => {
			const matchCategory =
				activeCategory === 'All' || s.category === activeCategory
			const matchSearch =
				!q ||
				s.name.toLowerCase().includes(q) ||
				s.desc.toLowerCase().includes(q)
			return matchCategory && matchSearch
		})
	}, [query, activeCategory])

	const getLevelLabel = (level: number) => {
		if (level >= 90) return 'Эксперт'
		if (level >= 75) return 'Продвинутый'
		if (level >= 55) return 'Средний'
		return 'Начинающий'
	}

	return (
		<section
			ref={sectionRef}
			className={`skills-section${visible ? ' is-visible' : ''}`}
		>
			<div className="skills-orb skills-orb--1" aria-hidden="true" />
			<div className="skills-orb skills-orb--2" aria-hidden="true" />
			<div className="skills-orb skills-orb--3" aria-hidden="true" />

			<div className="skills-container">
				<div className="skills-header">
					<div className="skills-title-block">
						<span className="skills-eyebrow">Портфолио</span>
						<h2 className="skills-title">Мои навыки</h2>
						<p className="skills-subtitle">
							Технологии и инструменты которыми я владею
						</p>
					</div>

					<div className="skills-controls">
						<div className="skills-search-wrap">
							<svg
								className="skills-search-icon"
								viewBox="0 0 20 20"
								fill="none"
							>
								<circle
									cx="9"
									cy="9"
									r="6"
									stroke="currentColor"
									strokeWidth="1.5"
								/>
								<path
									d="M14 14l3 3"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
							<input
								className="skills-search"
								placeholder="Поиск навыков..."
								value={query}
								onChange={(e) => setQuery(e.target.value)}
							/>
							{query && (
								<button
									className="skills-search-clear"
									onClick={() => setQuery('')}
									aria-label="Очистить поиск"
								>
									<svg viewBox="0 0 16 16" fill="none">
										<path
											d="M4 4l8 8M12 4l-8 8"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
										/>
									</svg>
								</button>
							)}
						</div>

						<div className="chip-row">
							{CATEGORIES.map((c) => (
								<button
									key={c}
									type="button"
									className={`chip${activeCategory === c ? ' active' : ''}`}
									onClick={() => setActiveCategory(c)}
								>
									{c === 'All' ? 'Все' : c}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className="skills-count">
					{filtered.length > 0
						? `${filtered.length} навык${filtered.length === 1 ? '' : filtered.length < 5 ? 'а' : 'ов'}`
						: ''}
				</div>

				<div className="skills-grid">
					{filtered.length === 0 && (
						<div className="skills-empty">
							<svg
								viewBox="0 0 48 48"
								fill="none"
								className="skills-empty-icon"
							>
								<circle
									cx="24"
									cy="24"
									r="20"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeDasharray="4 3"
								/>
								<path
									d="M17 31c1.5-2.5 4-4 7-4s5.5 1.5 7 4"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
								<circle cx="18" cy="20" r="2" fill="currentColor" />
								<circle cx="30" cy="20" r="2" fill="currentColor" />
							</svg>
							<span>Ничего не найдено</span>
							<button
								className="skills-empty-reset"
								onClick={() => {
									setQuery('')
									setActiveCategory('All')
								}}
							>
								Сбросить фильтры
							</button>
						</div>
					)}

					{filtered.map((skill, index) => {
						const color = getLevelColor(skill.level)
						const cardKey = skill.name + skill.category
						const isHovered = hoveredCard === cardKey

						return (
							<div
								className={`skill-card${visible ? ' skill-card--visible' : ''}`}
								key={cardKey}
								style={{ '--delay': `${index * 0.05}s` } as React.CSSProperties}
								onMouseEnter={() => setHoveredCard(cardKey)}
								onMouseLeave={() => setHoveredCard(null)}
							>
								<div
									className="skill-card__glow"
									style={{ '--glow-color': color } as React.CSSProperties}
								/>

								<div className="skill-icon-wrapper">
									<div className="skill-icon-ring" />
									<Image
										src={skill.icon}
										alt={skill.name}
										className="skill-icon"
										width={60}
										height={60}
										quality={100}
									/>
								</div>

								<h3 className="skill-name">{skill.name}</h3>

								<div className="skill-meta">
									<span className="skill-category">{skill.category}</span>
									<span
										className="skill-level-badge"
										style={{ '--level-color': color } as React.CSSProperties}
									>
										{getLevelLabel(skill.level)}
									</span>
								</div>

								<div className="skill-bar-wrap">
									<div className="skill-bar">
										<span
											className="skill-bar-fill"
											style={{
												width: visible ? `${skill.level}%` : '0%',
												background: `linear-gradient(90deg, ${color}99, ${color})`,
												boxShadow: isHovered ? `0 0 12px ${color}80` : 'none',
												transitionDelay: visible
													? `${index * 0.05 + 0.3}s`
													: '0s',
											}}
										/>
										<span
											className="skill-bar-shine"
											style={{
												width: visible ? `${skill.level}%` : '0%',
												transitionDelay: visible
													? `${index * 0.05 + 0.3}s`
													: '0s',
											}}
										/>
									</div>
									<span className="skill-percent" style={{ color }}>
										{skill.level}%
									</span>
								</div>

								<p className="skill-desc">{skill.desc}</p>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
