import axios from 'axios'
import Token from './token'

const API = (prefix = '', params = {}) => {
	const api = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
		headers: {
			authorization: `Bearer ${Token.get()}`
		}
	})

	return {
		async create(callback) {
			try {
				const response = await api.post(prefix.concat('/create'), params)
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async read(callback) {
			try {
				const response = await api.get(prefix.concat('/read'), { params })
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async update(callback) {
			try {
				const response = await api.patch(prefix.concat('/update'), params)
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
		async delete(callback) {
			try {
				const response = await api.delete(prefix.concat('/delete'), { params })
				callback(response)
			} catch ({ response }) {
				throw callback(response)
			}
		},
	}
}

export default API