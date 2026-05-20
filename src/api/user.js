import { api } from "./axios"

/**
 * 유저 로그인
 */
export const login = (params) => {
  return api.post(`/auth/login`, params)
}

/**
 * 유저 비밀번호 초기화
 */
export const resetPassword = (params) => {
  return api.post(`/auth/resetPassword`, params)
}

/**
 * 유저 List
 */
export const userList = (params) => {
  return api.get(`/member/list`, {params})
}

/**
 * MyPage
 */
export const mypage = (params) => {
  return api.get(`/member/mypage`, {params})
}