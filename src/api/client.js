import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'https://ecommerce.routemisr.com/api/v1'

export const api = axios.create({
  baseURL: API_BASE,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.token = token
  return config
})
