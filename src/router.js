import { createRouter, createWebHistory } from "vue-router"
import Event from "./pages/Event.vue"
import Seat from "./pages/Seat.vue"
import Checkout from "./pages/Checkout.vue"
import NotFound from "./pages/NotFound.vue"
import Intro from "./pages/Intro.vue"
import UserList from "./pages/UserList.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Intro } ,
    { path: "/userlist", component: UserList, meta: { gate: "userlist" } },
    { path: "/event", component: Event, meta: { gate: "event" } },
    { path: "/seat", component: Seat, meta: { gate: "seat" } },
    { path: "/checkout", component: Checkout, meta: { gate: "checkout" } },
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

  // 버튼 클릭으로 들어올 때만 심어주는 토큰
  const token = sessionStorage.getItem(`gate:${gate}`)
  if (!token) {
    // 직접 입력/새로고침 차단
    return { name: "NotFound" }
  }

  // 1회용 토큰: 통과 후 제거 (새로고침도 막힘)
  sessionStorage.removeItem(`gate:${gate}`)
  return true
})

export default router