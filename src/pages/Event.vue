<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const goSeat = () => {
  // gate 토큰 심기
  sessionStorage.setItem("gate:seat", "1")
  router.push("/seat")
}
</script>

<template>
  <div class="wrap">
    <h1>Real Time Ticketing</h1>

    <button class="btn" @click="goSeat">
      좌석 선택
    </button>
  </div>
</template>

<style>
.wrap{
  padding:40px;
}

.btn{
  background:#111;
  color:white;
  padding:14px 24px;
  border-radius:8px;
  border:none;
  font-size:16px;
  cursor:pointer;
}
</style>
