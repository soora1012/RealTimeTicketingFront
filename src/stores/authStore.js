import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLogin: false,
    user: null
  }),

  getters: {
    loginId: (state) => state.user?.loginId || null,
    userName: (state) => state.user?.userName || null,
    passwordResetCount: (state) => state.user?.passwordResetCount ?? 0
  },

  actions: {
    login(user) {
      this.isLogin = true
      this.user = user
    },
    setUser(user) {
      this.user = user;
    },
    setPasswordResetCount(passwordResetCount) {
      this.user.passwordResetCount = passwordResetCount;
    },
    logout() {
      this.isLogin = false
      this.user = null
    }
  },
  persist: {
    storage: sessionStorage
  }
})