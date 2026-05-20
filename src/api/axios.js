import axios from "axios"
import { useAuthStore } from "@/stores"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})


/**
 * 요청 인터셉터
 * 요청 전에 accessToken 자동 추가
 */
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

/**
 * 응답 인터셉터
 * 공통 에러 처리 가능
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 예: 401 처리
    if (error.response?.status === 401) {
      console.error("인증 만료")
    }

    return Promise.reject(error)
  }
)