'use client'
import { useState, useEffect } from 'react'
import { Moon, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/shared/config/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import './Header.scss'

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false)
	const pathname = usePathname()
	const { data: session } = useSession()

	useEffect(() => {
		if (!menuOpen) return
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setMenuOpen(false)
		}
		document.addEventListener('keydown', handler)
		return () => document.removeEventListener('keydown', handler)
	}, [menuOpen])

	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [menuOpen])

	return (
		<>
			<header id="header">
				<div className="container">
					<div className="header">
						<Link href="/">
							<Image
								src="/learnix.png"
								alt="logo"
								className="headerLogo"
								width={200}
								height={200}
							/>
						</Link>

						<nav className="nav-desktop">
							{NAV_LINKS.map(({ href, label, icon: Icon }) => (
								<Link
									key={href}
									href={href}
									className={pathname.startsWith(href) ? 'active' : ''}
								>
									<Icon size={18} />
									<span>{label}</span>
								</Link>
							))}
						</nav>

						<div className="actions">
							<button className="langBtn">
								<span className="langPill">KGZ</span>
								<span className="langHint">RU</span>
							</button>
							<button className="theme-toggle">
								<Moon size={18} />
							</button>
							{session ? (
								<>
									<span className="user-email">{session.user.email}</span>
									<button
										onClick={() => signOut({ callbackUrl: '/' })}
										className="login-btn"
									>
										Выйти
									</button>
								</>
							) : (
								<Link href="/login" className="login-btn">
									Войти
								</Link>
							)}
							<button
								className={`burger${menuOpen ? ' burger--open' : ''}`}
								onClick={() => setMenuOpen((v) => !v)}
							>
								{menuOpen ? <X size={22} /> : <Menu size={22} />}
							</button>
						</div>
					</div>
				</div>
			</header>

			<div
				className={`mobile-overlay${menuOpen ? ' open' : ''}`}
				onClick={() => setMenuOpen(false)}
			/>

			<div className={`mobile-drawer${menuOpen ? ' open' : ''}`}>
				<div className="mobile-drawer__top">
					<Image
						src="/learnix.png"
						alt="logo"
						className="mobile-drawer__logo"
						width={110}
						height={110}
					/>
					<button
						className="mobile-drawer__close"
						onClick={() => setMenuOpen(false)}
					>
						<X size={20} />
					</button>
				</div>

				<nav className="mobile-drawer__nav">
					{NAV_LINKS.map(({ href, label, icon: Icon }) => (
						<Link
							key={href}
							href={href}
							className={`mobile-drawer__link${pathname.startsWith(href) ? ' active' : ''}`}
							onClick={() => setMenuOpen(false)}
						>
							<Icon size={20} />
							<span>{label}</span>
						</Link>
					))}
				</nav>

				<div className="mobile-drawer__footer">
					<div className="mobile-drawer__footer-actions">
						<button className="langBtn">
							<span className="langPill">KGZ</span>
							<span className="langHint">RU</span>
						</button>
						<button className="theme-toggle">
							<Moon size={18} />
						</button>
					</div>

					{session ? (
						<>
							<p className="mobile-drawer__email">{session.user.email}</p>
							<button
								onClick={() => signOut({ callbackUrl: '/' })}
								className="mobile-drawer__login"
							>
								Выйти
							</button>
						</>
					) : (
						<Link
							href="/login"
							className="mobile-drawer__login"
							onClick={() => setMenuOpen(false)}
						>
							Войти
						</Link>
					)}
				</div>
			</div>
		</>
	)
}
