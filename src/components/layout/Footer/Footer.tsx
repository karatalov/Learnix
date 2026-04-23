'use client'
import { SOCIAL_LINKS } from '@/shared/config/footer'
import { useFooterForm } from './useFooterForm'
import { BrandCol } from './ui/BrandCol'
import { NavCol } from './ui/NavCol'
import { FormCol } from './ui/FormCol'
import './Footer.scss'

export default function Footer() {
	const form = useFooterForm()
	const currentYear = new Date().getFullYear()

	return (
		<footer className="footer">
			<div className="footer-background" aria-hidden="true">
				<div className="footer-circle footer-circle-1" />
				<div className="footer-circle footer-circle-2" />
				<div className="footer-circle footer-circle-3" />
			</div>

			<div className="container">
				<div className="footer-grid">
					<BrandCol />
					<NavCol />
					<FormCol
						status={form.status}
						contact={form.contact}
						message={form.message}
						company={form.company}
						errors={form.errors}
						remaining={form.remaining}
						isBusy={form.isBusy}
						onContactChange={form.setContact}
						onMessageChange={form.setMessage}
						onCompanyChange={form.setCompany}
						onBlur={form.validate}
						onSubmit={form.handleSubmit}
					/>
				</div>

				<div className="footer-divider" />

				<div className="footer-bottom">
					<div className="copyright">
						© {currentYear} <span className="brand-name">Karatalov</span>. Все
						права защищены.
					</div>
					<div className="social-links">
						{SOCIAL_LINKS.map(({ name, url, icon, color }) => (
							<a
								key={name}
								href={url}
								target="_blank"
								rel="noreferrer"
								className="social-icon"
								aria-label={name}
								title={name}
								style={{ '--social-color': color } as React.CSSProperties}
							>
								{icon}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}
