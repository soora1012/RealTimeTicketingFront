import { api } from "./axios"

/**
 * 좌석 List 
 */
export const seatList = (id, params) => {
  return api.get(`/saet/list/${id}`, params)
}


/**
 * 좌석 선택 
 */
export const seatCheck = (id, params) => {
  return api.get(`/saet/checked/${id}`, params)
}
