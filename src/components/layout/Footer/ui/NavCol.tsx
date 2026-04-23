import { NAV_LINKS } from '@/shared/config/footer'
import Link from 'next/link'

export function NavCol() {
	return (
		<div className="footer-col nav-col">
			<h3>
				<span className="title-accent" />
				Навигация
			</h3>
			<ul>
				{NAV_LINKS.map(({ href, label }) => (
					<li key={href}>
						<Link href={href}>
							<span className="nav-line" />
							{label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
