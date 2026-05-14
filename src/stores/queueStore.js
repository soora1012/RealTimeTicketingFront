import { defineStore } from "pinia"

export const queueStore = defineStore("queue", {
  state: () => ({
    queue: null
  }),

  getters: {
    accessAllowed: (state) => state.queue?.accessAllowed || false,
    concertScheduleId: (state) => state.queue?.concertScheduleId ?? 0,
    queueNumber: (state) => state.queue?.queueNumber ?? 0
  },
  
  actions: {
    setQueue(queue) {
      this.queue = queue;
    }
  },
  persist: {
    storage: sessionStorage
  }
})