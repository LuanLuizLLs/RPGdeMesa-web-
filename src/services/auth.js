import axios from 'axios'
import Token from './token'

const Auth = (params = {}) => {
	const auth = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
		headers: {
			authorization: `Bearer ${Token.get()}`
		}
	})

	return {
		async me(callback) {
			try {
				const response = await auth.get('auth/me')
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async register(callback) {
			try {
				const response = await auth.post('auth/register', params)
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async recover(callback) {
			try {
				const response = await auth.patch('auth/recover', params)
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async login(callback) {
			try {
				const response = await auth.post('auth/login', params)
				Token.set(response.data.token)
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async logout(callback) {
			try {
				const response = await auth.post('auth/logout')
				Token.remove()
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
	}
}

export default Auth