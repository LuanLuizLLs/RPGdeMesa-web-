import axios from 'axios'

/** Service API */
const API = axios.create({
  baseURL: `http://${window.location.hostname}:8080`,
})

export default API