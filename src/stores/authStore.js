import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLogin: false,
    user: null,
    accessToken: null
  }),

  getters: {
    loginCheck: (state) => state.isLogin || false,
    token: (state) => state.accessToken || null,
    loginId: (state) => state.user?.loginId || null,
    userName: (state) => state.user?.userName || null,
    passwordResetCount: (state) => state.user?.passwordResetCount ?? 0
  },

  actions: {
    login(accessToken) {
      this.isLogin = true
      this.accessToken = accessToken
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
      this.accessToken = null
    }
  },
  persist: {
    storage: sessionStorage
  }
})