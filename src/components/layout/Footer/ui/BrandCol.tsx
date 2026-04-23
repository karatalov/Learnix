import { Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'

export function BrandCol() {
	return (
		<div className="footer-col brand-col">
			<div className="brand-header">
				<div className="brand-icon">KN</div>
				<Image
					src="/learnix.png"
					alt="Karatalov logo"
					className="footer-logo"
					width={120}
					height={120}
				/>
			</div>

			<p className="footer-desc">
				Разрабатываю современные веб-приложения с чистым кодом и продуманным
				UI-UX.
			</p>

			<div className="footer-contacts">
				<a href="mailto:nursultankaratalov2@gmail.com" className="contact-item">
					<div className="contact-icon">
						<Mail size={16} />
					</div>
					<span>nursultankaratalov2@gmail.com</span>
				</a>

				<a href="tel:+996705159636" className="contact-item">
					<div className="contact-icon">
						<Phone size={16} />
					</div>
					<span>+996 705 15 96 36</span>
				</a>

				<div className="contact-item" role="note">
					<div className="contact-icon">
						<MapPin size={16} />
					</div>
					<span>Ankara | Turkey</span>
				</div>
			</div>
		</div>
	)
}
