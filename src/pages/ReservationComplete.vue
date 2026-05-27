<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router";
import { useAuthStore, useSeatStore } from "@/stores"
import Loading from "@/components/Loading.vue"
import * as api from "@/api"  


const router = useRouter();
const authStore = useAuthStore();
const seatStore = useSeatStore();
const loading = ref(false);
const loginForm = ref({
  loginId: "",
});

const seatForm = ref({
  seatId: "",
  concertScheduleId: "",
  sectionName: "",
  rowName: "",
  seatNumber: "",
  price: "",
  state: "",
  concertSequence: "",
  concertTitle: "",
});

const goConcertList = () => {
  router.push("/concertList");
};


const init = () => {
  sessionStorage.removeItem("gate:reservationComplete");
  loginForm.value = {
      loginId : authStore.loginId,
  };
  seatForm.value = {
    seatId: seatStore.seatId,
    concertScheduleId: seatStore.concertScheduleId,
    sectionName: seatStore.sectionName,
    rowName: seatStore.rowName,
    seatNumber: seatStore.seatNumber,
    price: seatStore.price,
    state: seatStore.state,
    concertSequence: seatStore.concertSequence,
    concertTitle: seatStore.concertTitle,
  }
}


onMounted(() => {  
  init(); 
});
</script>

<template>
  <main class="app-page complete-page">
    <section class="complete-container">
      <header class="complete-header">
        <p class="eyebrow">RealTime Ticketing_김소라</p>
        <h1>예약 완료</h1>
        <p class="description">
          예약이 정상적으로 완료되었습니다.
        </p>
      </header>

      <section class="complete-content">
        <article class="app-card complete-card">
          <div class="success-icon" aria-hidden="true">
            ✓
          </div>

          <strong class="complete-title">
            예매가 완료되었습니다
          </strong>

          <p class="complete-message">
            선택하신 좌석 정보는 아래에서 확인할 수 있습니다.
          </p>
        </article>

        <article class="app-card reservation-info">
          <div>
            <span>회원</span>
            <strong>{{ loginForm.loginId}}</strong>
          </div>

          <div>
            <span>공연</span>
            <strong>{{ seatForm.concertTitle + "_" + seatForm.concertSequence }}</strong>
          </div>

          <div>
            <span>좌석</span>
            <strong>{{ seatForm.rowName + seatForm.seatNumber + "/" + seatForm.sectionName }}</strong>
          </div>

          <div>
            <span>가격</span>
            <strong>{{ seatForm.price.toLocaleString() }}원</strong>
          </div>
        </article>

        <div class="button-group">
          <button
            type="button"
            class="secondary-button"
            @click="goConcertList"
          >
            다른 공연 보기
          </button>
        </div>
      </section>
    </section>
  </main>
  <Loading v-if="loading" />
</template>

<style scoped>
.complete-page {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 56px 20px 32px;
  box-sizing: border-box;
  color: #111827;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.complete-container {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
}

.complete-header {
  margin-bottom: 26px;
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 14px;
  color: #5f6b7a;
  word-break: keep-all;
}

h1 {
  margin: 0;
  font-size: 38px;
  line-height: 1.2;
  letter-spacing: -1.1px;
  color: #111827;
}

.description {
  margin: 12px 0 0;
  color: #6b7280;
  font-size: 16px;
  line-height: 1.6;
  word-break: keep-all;
}

.complete-content {
  display: grid;
  gap: 14px;
}

.complete-card {
  min-height: 220px;
  padding: 34px 28px;
  border-radius: 24px;
  display: grid;
  justify-items: center;
  align-content: center;
  text-align: center;
  gap: 12px;
}

.success-icon {
  width: 68px;
  height: 68px;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 34px;
  font-weight: 900;
  box-shadow: 0 14px 32px rgba(37, 99, 235, 0.22);
}

.complete-title {
  margin-top: 8px;
  font-size: 24px;
  font-weight: 900;
  color: #111827;
  letter-spacing: -0.5px;
}

.complete-message {
  margin: 0;
  color: #6b7280;
  font-size: 15px;
  line-height: 1.6;
}

.reservation-info {
  padding: 18px 20px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.reservation-info div {
  display: grid;
  gap: 6px;
  min-width: 0;
}

.reservation-info span {
  font-size: 13px;
  font-weight: 800;
  color: #6b7280;
}

.reservation-info strong {
  font-size: 17px;
  font-weight: 900;
  color: #111827;
  overflow-wrap: anywhere;
}

.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.primary-button,
.secondary-button {
  height: 52px;
  border-radius: 16px;
  font-size: 15px;
  font-weight: 900;
  appearance: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.primary-button {
  background: #111827;
  color: #fff;
}

.secondary-button {
  background: #2563eb;
  color: #fff;
}

.primary-button:hover {
  background: #030712;
}

.secondary-button:hover {
  background: #1d4ed8;
}

@media (max-width: 767px) {
  .complete-page {
    padding: 22px 14px 28px;
  }

  .complete-container {
    max-width: 100%;
  }

  .complete-header {
    margin-bottom: 18px;
  }

  .eyebrow {
    font-size: 12px;
  }

  h1 {
    font-size: 28px;
    line-height: 1.2;
    letter-spacing: -0.7px;
  }

  .description {
    font-size: 14px;
    line-height: 1.55;
  }

  .complete-content {
    gap: 10px;
  }

  .complete-card {
    min-height: 190px;
    padding: 28px 20px;
    border-radius: 20px;
  }

  .success-icon {
    width: 58px;
    height: 58px;
    font-size: 29px;
  }

  .complete-title {
    font-size: 21px;
  }

  .complete-message {
    font-size: 14px;
  }

  .reservation-info {
    grid-template-columns: 1fr;
    padding: 14px;
    border-radius: 18px;
    gap: 12px;
  }

  .reservation-info strong {
    font-size: 16px;
  }

  .button-group {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .primary-button,
  .secondary-button {
    height: 48px;
    border-radius: 14px;
  }
}
</style>