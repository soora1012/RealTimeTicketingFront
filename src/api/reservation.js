import { api } from "./axios"

/**
 * 유저 예약정보 
 */
export const reservationInfo = (params) => {
  return api.get(`/reservation/info`, params)
}


/**
 * 좌석 홀드 
 */
export const reservationHold = (params) => {
  return api.put(`/reservation/hold`, params)
}


/**
 * 좌석예약 완료 
 */
export const reservationCompleted = (params) => {
  return api.put(`/reservation/completed`, params)
}


/**
 * 예약을 완료하지 못함
 */
export const reservationLeave = (params) => {
  return api.delete(`/reservation/leave`, {
    data: params
  })
}

