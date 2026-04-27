// 로그인 및 인증설정 파일
import { api } from "./axios"

/**
 * 로그인 API
 */
export const loginApi = (email, password) => {
  return api.post("/auth/login", {
    email,
    password,
  })
}