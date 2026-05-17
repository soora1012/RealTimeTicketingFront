import { defineStore } from "pinia"

export const useQueueStore = defineStore("queue", {
  state: () => ({
    queue: null
  }),

  getters: {
    active: (state) => state.queue?.active || false,
    concertScheduleId: (state) => state.queue?.concertScheduleId ?? 0,
    totalCount: (state) => state.queue?.totalCount ?? 0,
    aheadCount: (state) => state.queue?.aheadCount ?? 0,
    myPosition: (state) => state.queue?.myPosition ?? 0,
    concertSequence: (state) => state.queue?.concertSequence || "",
    concertTitle: (state) => state.queue?.concertTitle || "",
  },

  actions: {
    setQueue(queue) {

      console.log(queue)
      this.queue = queue;
    }
  },
  persist: {
    storage: sessionStorage
  }
})