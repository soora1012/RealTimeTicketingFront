<script setup>
import { ref, onMounted } from "vue"

const time = ref(120)

onMounted(()=>{
  setInterval(()=>{
    if(time.value > 0){
      time.value--
    }
  },1000)
})

const confirm = () => {
  alert("예매 완료")
}
</script>

<template>
  <div class="wrap">
    <h2>결제 대기</h2>

    <p>남은시간 {{time}}</p>

    <button class="btn" @click="confirm">
      결제하기
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
  padding:12px 24px;
  border-radius:8px;
  border:none;
}
</style>
