import axios from "axios"
import { getToken, logout } from "./auth"

const API_BASE_URL = "http://localhost:8000" // Replace with your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout()
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default api
