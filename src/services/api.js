import axios from 'axios'

/** Service API */
const base = axios.create({
  baseURL: `http://${window.location.hostname}:8080`,
})

/**
 * Request to API
 * @param {String} prefix route name
 * @param {Object} params parameters for sending
 * @returns
 */
const API = (prefix = '', params = {}) => {
  const routes = {
    create: `${prefix}/create`,
    read: `${prefix}/read`,
    update: `${prefix}/update`,
    delete: `${prefix}/delete`,
  }

  return {
    create: (callback) => base.post(routes.create, params).then(callback),
    read: (callback) => base.get(routes.read, { params }).then(callback),
    update: (callback) => base.patch(routes.update, params).then(callback),
    delete: (callback) => base.delete(routes.delete, { params }).then(callback),
  }
}

export default API