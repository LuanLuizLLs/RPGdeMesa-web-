import axios from 'axios'
import Token from './token'

const API = (route, params = {}) => {
	const api = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
		headers: {
			authorization: `Bearer ${Token.get()}`
		}
	})

	return {
		async post(callback) {
			try {
				const response = await api.post(route, params)
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async get(callback) {
			try {
				const response = await api.get(route, { params })
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async patch(callback) {
			try {
				const response = await api.patch(route, params)
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async delete(callback) {
			try {
				const response = await api.delete(route, { params })
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
	}
}

export default API