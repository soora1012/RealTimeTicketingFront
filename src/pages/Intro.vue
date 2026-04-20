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

</script>

<template>
  <div class="wrap">
    <h2>Intro</h2>
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
