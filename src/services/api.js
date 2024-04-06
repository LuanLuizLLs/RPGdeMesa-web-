import axios from 'axios'

const api = axios.create({
	baseURL: `http://${window.location.hostname}:8000`,
})

const API = (prefix = '', params = {}) => {
	return {
		create: (callback) => api.post(`${prefix}/create`, params).then(callback),
		read: (callback) => api.get(`${prefix}/read`, { params }).then(callback),
		update: (callback) => api.patch(`${prefix}/update`, params).then(callback),
		delete: (callback) => api.delete(`${prefix}/delete`, { params }).then(callback),
	}
}

export default API