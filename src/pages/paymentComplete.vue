<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router";
import { useAuthStore, useQueueStore } from "@/stores"
import Loading from "@/components/Loading.vue"
import * as api from "@/api"  

const router = useRouter();
const authStore = useAuthStore();
const queueStore = useQueueStore();
const loading = ref(false);
const loginForm = ref({
  loginId: "",
});
const goReservation = () => {
  router.push("/concertList");
};

const concertName = "SPRING FESTIVAL 2026";
const seatName = "VIP A-12";
const price = "88,000";

const init = () => {
 loginForm.value = {
    loginId : authStore.loginId,
 };

}

onMounted(() => {  
  init(); 
});
</script>

<template>
  <main class="app-page payment-complete-page">
    <section class="payment-complete-container">
      <header class="payment-complete-header">
        <p class="eyebrow">RealTime Ticketing_김소라</p>

        <h1>결제가 완료되었습니다</h1>

        <p class="description">
          좌석 예약 및 결제가 정상적으로 처리되었습니다.
        </p>
      </header>

      <section class="payment-complete-content">
        <article class="app-card payment-complete-card">
          <div class="success-icon">
            ✓
          </div>

          <div class="reservation-user">
            {{ loginForm.loginId }}
          </div>

          <strong class="concert-title">
            {{ concertName }}
          </strong>

          <div class="reservation-info">
            <div class="info-row">
              <span class="label">좌석</span>
              <strong>{{ seatName }}</strong>
            </div>

            <div class="info-row">
              <span class="label">결제 금액</span>
              <strong>{{ price }}원</strong>
            </div>

            <div class="info-row">
              <span class="label">상태</span>
              <strong class="complete-text">
                결제 완료
              </strong>
            </div>
          </div>
        </article>

        <div class="button-group">
          <button
            type="button"
            class="secondary-button"
            @click="goReservation"
          >
            공연 목록 이동
          </button>

          <button
            type="button"
            class="primary-button"
            @click="goHome"
          >
            처음으로 이동
          </button>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.payment-complete-page {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 56px 20px 32px;
  box-sizing: border-box;
  color: #111827;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.payment-complete-container {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
}

.payment-complete-header {
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

.payment-complete-content {
  display: grid;
  gap: 14px;
}

.payment-complete-card {
  padding: 34px 30px;
  border-radius: 24px;
  display: grid;
  gap: 24px;
}

.success-icon {
  width: 72px;
  height: 72px;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 36px;
  font-weight: 900;
  box-shadow: 0 14px 32px rgba(37, 99, 235, 0.22);
}

.reservation-user {
  font-size: 15px;
  font-weight: 800;
  color: #2563eb;
}

.concert-title {
  font-size: 30px;
  line-height: 1.3;
  letter-spacing: -0.8px;
  color: #111827;
}

.reservation-info {
  display: grid;
  gap: 14px;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 58px;
  padding: 0 18px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
}

.label {
  font-size: 14px;
  font-weight: 700;
  color: #6b7280;
}

.info-row strong {
  font-size: 15px;
  color: #111827;
}

.complete-text {
  color: #2563eb !important;
}

.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.primary-button,
.secondary-button {
  height: 54px;
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

@media (max-width: 1024px) {
  .payment-complete-container {
    max-width: 760px;
  }
}

@media (max-width: 767px) {
  .payment-complete-page {
    padding: 22px 14px 28px;
  }

  .payment-complete-container {
    max-width: 100%;
  }

  .payment-complete-header {
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

  .payment-complete-card {
    padding: 24px 18px;
    border-radius: 20px;
    gap: 20px;
  }

  .success-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .concert-title {
    font-size: 24px;
  }

  .info-row {
    min-height: 54px;
    padding: 0 14px;
    border-radius: 14px;
  }

  .button-group {
    grid-template-columns: 1fr;
  }

  .primary-button,
  .secondary-button {
    height: 48px;
    border-radius: 14px;
  }
}

@media (max-width: 360px) {
  .payment-complete-page {
    padding: 20px 12px 26px;
  }

  h1 {
    font-size: 25px;
  }

  .concert-title {
    font-size: 21px;
  }
}

@media (hover: none), (pointer: coarse) {
  .primary-button:hover {
    background: #111827;
  }

  .secondary-button:hover {
    background: #2563eb;
  }
}
</style>