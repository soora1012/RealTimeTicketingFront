import { api } from "./axios"

/**
 * 좌석 List 
 */
export const seatList = (id, params) => {
  return api.get(`/seat/list/${id}`, params)
}


/**
 * 유저 예약정보 
 */
export const reservationInfo = (params) => {
  return api.get(`/seat/reservationInfo`, params)
}


/**
 * 좌석 홀드 
 */
export const seatHold = (params) => {
  return api.post(`/seat/hold`, params)
}


/**
 * 좌석예약 완료 
 */
export const seatReservation = (params) => {
  return api.post(`/seat/reservation`, params)
}


/**
 * 예약을 완료하지 못함
 */
export const seatLeave = (params) => {
  return api.post(`/seat/leave`, params)
}

