import { api } from "./axios"

/**
 * 좌석 List 
 */
export const seatList = (id, params) => {
  return api.get(`/seat/list/${id}`, params)
}


/**
 * 좌석 선택 
 */
export const reservationInfo = (params) => {
  return api.get(`/seat/reservationInfo`, params)
}
