'use client'

import {
	Mail,
	Lock,
	UserPlus,
	AlertCircle,
	Eye,
	EyeOff,
	Loader2,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import './RegisterPage.scss'

const scorePassword = (p: string) => {
	let s = 0
	if (p.length >= 6) s++
	if (p.length >= 10) s++
	if (/[A-Z]/.test(p)) s++
	if (/[0-9]/.test(p)) s++
	if (/[^A-Za-z0-9]/.test(p)) s++
	return Math.min(s, 5)
}

export default function RegisterPage() {
	const router = useRouter()

	const [nickname, setNickname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')

	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [showPass, setShowPass] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)
	const [capsLock, setCapsLock] = useState(false)

	const normalizedEmail = useMemo(() => email.trim(), [email])
	const normalizedNickname = useMemo(() => nickname.trim(), [nickname])
	const passScore = useMemo(() => scorePassword(password), [password])

	const validate = () => {
		if (!normalizedNickname) {
			setError('Введите никнейм')
			return false
		}

		if (normalizedNickname.length < 3) {
			setError('Никнейм минимум 3 символа')
			return false
		}

		if (!normalizedEmail) {
			setError('Введите email')
			return false
		}

		if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
			setError('Некорректный email')
			return false
		}

		if (!password) {
			setError('Введите пароль')
			return false
		}

		if (password.length < 6) {
			setError('Пароль минимум 6 символов')
			return false
		}

		if (confirm !== password) {
			setError('Пароли не совпадают')
			return false
		}

		return true
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		if (!validate()) return

		setLoading(true)

		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: normalizedEmail,
					password,
					nickname: normalizedNickname,
				}),
			})

			const data = await res.json()

			if (!res.ok) {
				setError(data.error)
				setLoading(false)
				return
			}

			const loginRes = await signIn('credentials', {
				email: normalizedEmail,
				password,
				redirect: false,
			})

			if (loginRes?.error) {
				setError('Ошибка при авто-входе')
				setLoading(false)
				return
			}

			router.push('/')
		} catch {
			setError('Ошибка сервера')
			setLoading(false)
		}
	}

	return (
		<section id="register-page">
			<div className="auth-container">
				<div className="auth-card">
					<div className="auth-header">
						<div className="icon-wrapper">
							<UserPlus size={32} />
						</div>
						<h2>Регистрация</h2>
						<p>Создайте аккаунт</p>
					</div>

					{error && (
						<div className="error-message">
							<AlertCircle size={18} />
							<span>{error}</span>
						</div>
					)}

					<form onSubmit={handleSubmit}>
						{/* 🔥 НИКНЕЙМ */}
						<div className="input-group">
							<UserPlus className="input-icon" size={20} />
							<input
								type="text"
								placeholder="Никнейм"
								value={nickname}
								onChange={(e) => setNickname(e.target.value)}
								disabled={loading}
							/>
						</div>

						<div className="input-group">
							<Mail className="input-icon" size={20} />
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={loading}
							/>
						</div>

						<div className="input-group">
							<Lock className="input-icon" size={20} />
							<input
								type={showPass ? 'text' : 'password'}
								placeholder="Пароль"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={loading}
								onKeyUp={(e) =>
									setCapsLock(e.getModifierState?.('CapsLock') ?? false)
								}
							/>

							<button
								type="button"
								className="pass-toggle"
								onClick={() => setShowPass((v) => !v)}
							>
								{showPass ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>

						{capsLock && <div className="caps-hint">Caps Lock включён</div>}

						<div className="strength">
							<div className="strength-bar">
								<span className={`fill s-${passScore}`} />
							</div>
						</div>

						<div className="input-group">
							<Lock className="input-icon" size={20} />
							<input
								type={showConfirm ? 'text' : 'password'}
								placeholder="Повторите пароль"
								value={confirm}
								onChange={(e) => setConfirm(e.target.value)}
								disabled={loading}
							/>

							<button
								type="button"
								className="pass-toggle"
								onClick={() => setShowConfirm((v) => !v)}
							>
								{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>

						<button type="submit" className="btn-primary" disabled={loading}>
							{loading ? (
								<>
									<Loader2 className="animate-spin" size={18} />
									Создание...
								</>
							) : (
								'Зарегистрироваться'
							)}
						</button>
					</form>

					<div className="auth-footer">
						<span>Уже есть аккаунт?</span>
						<a href="/login">Войти</a>
					</div>
				</div>
			</div>
		</section>
	)
}
