import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { MAX_MESSAGE } from '@/shared/config/footer'
import { FormColProps } from '@/types/footer.types'

export function FormCol({
	status,
	contact,
	message,
	company,
	errors,
	remaining,
	isBusy,
	onContactChange,
	onMessageChange,
	onCompanyChange,
	onBlur,
	onSubmit,
}: FormColProps) {
	return (
		<div className="footer-col form-col">
			<div className="form-card">
				<h3>
					<span className="title-accent" />
					Написать мне
				</h3>
				<p className="form-subtitle">Отвечу в течение 24 часов</p>
				<form onSubmit={onSubmit} className="footer-form" noValidate>
					<input
						value={company}
						onChange={(e) => onCompanyChange(e.target.value)}
						tabIndex={-1}
						autoComplete="off"
						aria-hidden="true"
						style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
					/>
					<div className="input-wrapper">
						<input
							type="text"
							placeholder="Email или Telegram"
							value={contact}
							onChange={(e) => onContactChange(e.target.value)}
							disabled={isBusy}
							onBlur={onBlur}
							aria-invalid={!!errors.contact}
							aria-label="Контакт"
						/>
						{errors.contact && (
							<div className="field-error" role="alert">
								{errors.contact}
							</div>
						)}
					</div>
					<div className="input-wrapper">
						<textarea
							placeholder="Ваше сообщение..."
							rows={4}
							value={message}
							onChange={(e) => onMessageChange(e.target.value)}
							disabled={isBusy}
							onBlur={onBlur}
							aria-invalid={!!errors.message}
							aria-label="Сообщение"
							maxLength={MAX_MESSAGE}
						/>
						<div className="field-meta">
							<span className={`counter${remaining < 80 ? ' warn' : ''}`}>
								{remaining}
							</span>
						</div>
						{errors.message && (
							<div className="field-error" role="alert">
								{errors.message}
							</div>
						)}
					</div>
					<button
						type="submit"
						className={`form-btn ${status}`}
						disabled={isBusy}
					>
						{status === 'loading' && (
							<>
								<Loader2 className="animate-spin" size={18} /> Отправляю...
							</>
						)}
						{status === 'success' && (
							<>
								<CheckCircle size={18} /> Отправлено!
							</>
						)}
						{status === 'error' && (
							<>
								<AlertCircle size={18} /> Ошибка
							</>
						)}
						{status === 'idle' && (
							<>
								Отправить <Send size={16} />
							</>
						)}
					</button>
					<div className="form-status" role="status" aria-live="polite">
						{status === 'success' && 'Сообщение доставлено, скоро свяжусь!'}
						{status === 'error' &&
							!errors.message &&
							'Что-то пошло не так, попробуйте ещё раз.'}
					</div>
				</form>
			</div>
		</div>
	)
}
