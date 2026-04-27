<script setup>
import { ref, onMounted } from "vue"
import * as api from "@/api"
const time = ref(120)

onMounted(()=>{
  setInterval(()=>{
    if(time.value > 0){
      time.value--
    }
  },1000)
}) 

//로그인 정보 가져오기
const login = async () => {
  try {
    const { data } = await api.loginApi(
      "dd",
      "ddd"
    )

    console.log("로그인 성공:", data)

    localStorage.setItem(
      "accessToken",
      data.accessToken
    )

    message.value = "로그인 성공"
  } catch (error) {
    console.error("로그인 실패:", error)

    if (error.response) {
      message.value =
        error.response.data.message || "로그인 실패"
    } else {
      message.value = "서버 연결 실패"
    }
  }
}

</script>

<template>
  <div class="wrap">
    <h2>Intro</h2>
    <div @click="login">버튼</div>
  </div>
</template>

<style>
.wrap{
  padding:40px;
}

.btn{
  background:#111;
  color:white;
  padding:12px 24px;
  border-radius:8px;
  border:none;
}
</style>
