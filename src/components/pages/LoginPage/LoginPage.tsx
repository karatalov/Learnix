'use client'

import { Mail, Lock, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useMemo, useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import './LoginPage.scss'

export const LoginPage = () => {
	const router = useRouter()
	const { status } = useSession()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [showPass, setShowPass] = useState(false)
	const [capsLock, setCapsLock] = useState(false)

	const normalizedEmail = useMemo(() => email.trim(), [email])
	const normalizedPassword = useMemo(() => password, [password])

	const validate = () => {
		if (!normalizedEmail) {
			setError('Введите email')
			return false
		}

		if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
			setError('Некорректный email')
			return false
		}

		if (!normalizedPassword) {
			setError('Введите пароль')
			return false
		}

		if (normalizedPassword.length < 6) {
			setError('Пароль минимум 6 символов')
			return false
		}

		return true
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		if (!validate()) return

		setLoading(true)

		const res = await signIn('credentials', {
			email: normalizedEmail,
			password: normalizedPassword,
			redirect: false,
		})

		if (res?.error) {
			setError('Неверный логин или пароль')
			setLoading(false)
			return
		}

		router.push('/')
	}

	const handleGoogleLogin = () => {
		signIn('google', {
			callbackUrl: '/',
		})
	}

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/')
		}
	}, [status, router])

	return (
		<section id="auth-page">
			<div className="auth-container">
				<div className="auth-card">
					<div className="auth-header">
						<h2>Вход</h2>
						<p>Войдите в аккаунт</p>
					</div>

					{error && (
						<div className="error-message">
							<AlertCircle size={18} />
							<span>{error}</span>
						</div>
					)}

					<form onSubmit={handleSubmit}>
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
								disabled={loading}
							>
								{showPass ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>

						{capsLock && <div className="caps-hint">Caps Lock включён</div>}

						<button type="submit" className="btn-primary" disabled={loading}>
							{loading ? (
								<>
									<Loader2 className="animate-spin" size={18} />
									Вход...
								</>
							) : (
								'Войти'
							)}
						</button>
					</form>

					<div className="divider">
						<span>или</span>
					</div>

					<button
						onClick={handleGoogleLogin}
						className="btn-google"
						disabled={loading}
					>
						Войти через Google
					</button>

					<div className="auth-footer">
						<span>Нет аккаунта?</span>
						<a href="/register">Зарегистрироваться</a>
					</div>
				</div>
			</div>
		</section>
	)
}
