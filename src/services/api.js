import axios from 'axios'

/** Service API */
const API = axios.create({
  baseURL: `http://${window.location.hostname}:8080`,
})

/** Request to API */
export const requestAPI = (prefix = '', data = {}) => {
  return {
    create: (callback) => API.post(`${prefix}/create`, data).then(callback),
    read: (callback) => API.get(`${prefix}/read`, { params: data }).then(callback),
    update: (callback) => API.patch(`${prefix}/update`, data).then(callback),
    delete: (callback) => API.delete(`${prefix}/delete`, data).then(callback),
  }
}

export default API