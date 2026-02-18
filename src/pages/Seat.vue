<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const seats = ["A1","A2","A3","B1","B2","B3"]

const selectSeat = (seat) => {
  console.log("선택:", seat)

  // checkout 진입 토큰
  sessionStorage.setItem("gate:checkout", "1")
  router.push("/checkout")
}
</script>

<template>
  <div class="wrap">
    <h2>좌석 선택</h2>

    <div class="grid">
      <button
        v-for="s in seats"
        :key="s"
        class="seat"
        @click="selectSeat(s)"
      >
        {{s}}
      </button>
    </div>
  </div>
</template>

<style>
.wrap{
  padding:40px;
}

.grid{
  display:grid;
  grid-template-columns:repeat(3,80px);
  gap:12px;
  margin-top:20px;
}

.seat{
  height:60px;
  border-radius:8px;
  border:1px solid #ddd;
  background:white;
  cursor:pointer;
}
</style>
