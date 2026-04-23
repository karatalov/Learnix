export const runtime = 'nodejs'

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: {},
				password: {},
			},

			async authorize(credentials) {
				try {
					if (!credentials?.email || !credentials?.password) {
						return null
					}

					const user = await prisma.user.findUnique({
						where: { email: credentials.email },
					})

					if (!user) return null

					const isValid = await bcrypt.compare(
						credentials.password,
						user.passwordHash,
					)

					if (!isValid) return null

					return {
						id: user.id,
						email: user.email,
						role: user.role,
					}
				} catch (e) {
					console.error('AUTH ERROR:', e)
					return null
				}
			},
		}),
	],

	session: {
		strategy: 'jwt',
	},

	secret: process.env.NEXTAUTH_SECRET,

	debug: true,

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.role = user.role
			}
			return token
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string
				session.user.role = token.role as string
			}
			return session
		},
	},
})

export { handler as GET, handler as POST }
