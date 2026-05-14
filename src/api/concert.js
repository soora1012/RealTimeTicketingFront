import { api } from "./axios"

/**
 * 콘서트 리스트
 */
export const concertList = (params) => {
  return api.post("/concert/list", params)
}


export const test = (params) => {
  return api.get("/concert/test", {params})
}