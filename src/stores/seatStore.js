import { defineStore } from "pinia"

export const useSeatStore = defineStore("seat", {
  state: () => ({
    seat: null
  }),

  getters: {
    seatId: (state) => state.seat?.seatId ?? 0,
    concertScheduleId: (state) => state.seat?.concertScheduleId ?? 0, 
    sectionName: (state) => state.seat?.sectionName || "",
    rowName: (state) => state.seat?.rowName || "",
    seatNumber: (state) => state.seat?.seatNumber || "",
    price: (state) => state.seat?.price ?? 0, 
    state: (state) => state.seat?.state || "",
    concertSequence: (state) => state.seat?.concertSequence || "",
    concertTitle: (state) => state.seat?.concertTitle || "",
  },

  actions: {
    setSeat(seat) {
      this.seat = seat;
    }
  },
  persist: {
    storage: sessionStorage
  }
})