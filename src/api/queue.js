import { api } from "./axios"

/**
 * 대기열 들어가기 API
 */
export const queueEnter = (id, params) => {
  return api.post(`/queue/enter/${id}`, params)
}


/**
 * 대기열 떠나기 API
 */
export const queuLeave = (id, params) => {
  return api.delete(`/queue/leave/${id}`, params)
}