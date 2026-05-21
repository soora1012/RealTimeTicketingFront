import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@/stores"
import NotFound from "@/pages/NotFound.vue"
import UserList from "@/pages/UserList.vue"
import Login from "@/pages/Login.vue"
import Mypage from "@/pages/Mypage.vue"
import ConcertList from "@/pages/ConcertList.vue"
import Seat from "@/pages/Seat.vue"
import Queue from "@/pages/Queue.vue"
import PaymentComplete from "@/pages/paymentComplete.vue"
import ReservationComplete from "@/pages/ReservationComplete.vue"
import PasswordReset from "@/pages/PasswordReset.vue"
import PasswordResetComplete from "@/pages/PasswordResetComplete.vue"


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "UserList", component: UserList }, 
    { path: "/login", name: "Login", component: Login },
    { path: "/passwordReset", name: "PasswordReset", component: PasswordReset },
    { path: "/passwordResetComplete", name: "PasswordResetComplete", component: PasswordResetComplete },
    { path: "/concertList", name: "ConcertList", component: ConcertList },
    { path: "/mypage", name: "Mypage", component: Mypage },
    { path: "/seat", name: "Seat", component: Seat, meta: { gate: "seat" } },
    { path: "/queue", name: "Queue", component: Queue, meta: { gate: "queue" } },
    { path: "/paymentComplete", name: "PaymentComplete", component: PaymentComplete, meta: { gate: "paymentComplete" } },
    { path: "/reservationComplete", name: "ReservationComplete", component: ReservationComplete, meta: { gate: "reservationComplete" } },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound
    }
  ]
})

router.beforeEach((to) => {

   const publicPages = [
    "UserList",
    "Login",
    "PasswordReset",
    "PasswordResetComplete",
    "NotFound"
  ]

  if (publicPages.includes(to.name)) {
    return true
  }
  
  const authStore = useAuthStore()
  if (!authStore.loginCheck) {
    return { name: "UserList" }
  }

  const gate = to.meta.gate
  if (!gate) return true

  const token = sessionStorage.getItem(`gate:${gate}`)
  if (!token) {
    return { name: "NotFound" }
  }

  return true
})

export default router