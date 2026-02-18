import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:8080"
})

export const holdSeat = (seatId) =>
  api.post(`/seat/${seatId}/hold`)

export const confirmSeat = (seatId) =>
  api.post(`/reservation/confirm`, { seatId })
