import { api } from "./axios"

/**
 * 좌석 List 
 */
export const seatList = (id, params) => {
  return api.get(`/seat/list/${id}`, params)
}


/**
 * 좌석 queue 삭제 
 */
export const seatLeave = (id, params) => {
  return api.delete(`/seat/leave/${id}`, params)
}
