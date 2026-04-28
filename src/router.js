import { createRouter, createWebHistory } from "vue-router"

import NotFound from "@/pages/NotFound.vue"
import UserList from "@/pages/UserList.vue"
import Login from "@/pages/Login.vue"
import ConcertList from "@/pages/ConcertList.vue"
import Seat from "@/pages/Seat.vue"
import Queue from "@/pages/Queue.vue"
import ReservationComplete from "@/pages/ReservationComplete.vue"
import PasswordReset from "@/pages/PasswordReset.vue"
import PasswordResetComplete from "@/pages/PasswordResetComplete.vue"


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: UserList },
    { path: "/login", component: Login, meta: { gate: "login" } },
    { path: "/concertList", component: ConcertList, meta: { gate: "concertList" } },
    { path: "/seat", component: Seat, meta: { gate: "seat" } },
    { path: "/queue", component: Queue },
    { path: "/reservationComplete", component: ReservationComplete },
    { path: "/passwordReset", component: PasswordReset },
    { path: "/passwordResetComplete", component: PasswordResetComplete },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound
    }
  ]
})

router.beforeEach((to) => {
  const gate = to.meta.gate
  if (!gate) return true

  //버튼 클릭으로 들어올 때만 심어주는 토큰
  const token = sessionStorage.getItem(`gate:${gate}`)
  if (!token) {
    return { name: "NotFound" }
  }

  return true
})

export default router