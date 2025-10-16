import axios from 'axios'
import Token from './token'

const api = axios.create({
	baseURL: `http://${window.location.hostname}:8000`,
})

const Auth = (params = {}) => {
	const token = Token.get()

	if (token) {
		api.defaults.headers.authorization = `Bearer ${Token.get()}`
	}

	return {
		async me(callback) {
			try {
				const response = await api.get('auth/me')
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async register(callback) {
			try {
				const response = await api.post('auth/register', params)
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async recover(callback) {
			try {
				const response = await api.patch('auth/recover', params)
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async login(callback) {
			try {
				const response = await api.post('auth/login', params)
				Token.set(response.data.token)
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async logout(callback) {
			try {
				const response = await api.post('auth/logout')
				Token.remove()
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
	}
}

export default Auth