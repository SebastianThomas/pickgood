import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
export default axiosInstance

import { useStore as useAuthStore } from '../store/authStore'
import pinia from '../store/pinia'

axiosInstance.interceptors.request.use(
  config => {
    const authStore = useAuthStore(pinia)
    const token = authStore.localAccessToken
    if (typeof token !== 'undefined' && token.length > 0) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)
axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const originalConfig = err.config
    if (originalConfig.url !== '/auth/signin' && err.response) {
      // AccessToken was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        try {
          const authStore = useAuthStore(pinia)
          await authStore.refreshAccessToken()
          return axiosInstance(originalConfig)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }
    return Promise.reject(err)
  }
)
