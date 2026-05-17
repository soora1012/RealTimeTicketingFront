<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref({
  userId: "user_1",
  grade: "VIP",
  reservationCount: 3,
});

const reservationList = ref([
  {
    reservationId: 1,
    concertName: "SPRING FESTIVAL 2026",
    seat: "VIP A-12",
    status: "예매 완료",
    price: "88,000원",
    date: "2026.05.17",
  },
  {
    reservationId: 2,
    concertName: "SUMMER LIVE TOUR",
    seat: "R B-04",
    status: "결제 완료",
    price: "77,000원",
    date: "2026.06.01",
  },
  {
    reservationId: 3,
    concertName: "WINTER STAGE",
    seat: "S C-21",
    status: "취소 완료",
    price: "66,000원",
    date: "2026.04.11",
  },
]);

const goConcertList = () => {
  router.push("/concertList");
};

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <main class="app-page my-page">
    <section class="my-container">
      <header class="my-header">
        <p class="eyebrow">RealTime Ticketing_김소라</p>

        <h1>마이페이지</h1>

        <p class="description">
          예약 정보 및 결제 내역을 확인할 수 있습니다.
        </p>
      </header>

      <section class="profile-section">
        <article class="app-card profile-card">
          <div class="profile-top">
            <div class="profile-badge">
              {{ user.grade }}
            </div>

            <strong class="profile-user">
              {{ user.userId }}
            </strong>
          </div>

          <div class="profile-summary">
            <div class="summary-box">
              <span>예약 건수</span>
              <strong>{{ user.reservationCount }}건</strong>
            </div>

            <div class="summary-box">
              <span>회원 등급</span>
              <strong>{{ user.grade }}</strong>
            </div>
          </div>
        </article>
      </section>

      <section class="reservation-section">
        <div class="section-title-wrap">
          <strong class="section-title">
            예약 내역
          </strong>

          <span class="reservation-count">
            총 {{ reservationList.length }}건
          </span>
        </div>

        <div class="reservation-list">
          <article
            v-for="reservation in reservationList"
            :key="reservation.reservationId"
            class="app-card reservation-card"
          >
            <div class="reservation-top">
              <strong class="concert-title">
                {{ reservation.concertName }}
              </strong>

              <span
                class="status-badge"
                :class="{
                  completed: reservation.status === '결제 완료',
                  reserved: reservation.status === '예매 완료',
                  canceled: reservation.status === '취소 완료',
                }"
              >
                {{ reservation.status }}
              </span>
            </div>

            <div class="reservation-info">
              <div class="info-row">
                <span>좌석</span>
                <strong>{{ reservation.seat }}</strong>
              </div>

              <div class="info-row">
                <span>결제 금액</span>
                <strong>{{ reservation.price }}</strong>
              </div>

              <div class="info-row">
                <span>예약일</span>
                <strong>{{ reservation.date }}</strong>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div class="button-group">
        <button
          type="button"
          class="secondary-button"
          @click="goConcertList"
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
  </main>
</template>

<style scoped>
.my-page {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 56px 20px 40px;
  box-sizing: border-box;
  color: #111827;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.my-container {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
}

.my-header {
  margin-bottom: 28px;
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 14px;
  color: #5f6b7a;
  word-break: keep-all;
}

h1 {
  margin: 0;
  font-size: 40px;
  line-height: 1.2;
  letter-spacing: -1.2px;
  color: #111827;
}

.description {
  margin: 12px 0 0;
  color: #6b7280;
  font-size: 16px;
  line-height: 1.6;
}

.profile-section {
  margin-bottom: 22px;
}

.profile-card {
  padding: 28px;
  border-radius: 26px;
}

.profile-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 22px;
}

.profile-badge {
  min-width: 74px;
  height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 900;
}

.profile-user {
  font-size: 30px;
  letter-spacing: -0.7px;
}

.profile-summary {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.summary-box {
  min-height: 90px;
  padding: 18px;
  border-radius: 18px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.summary-box span {
  font-size: 14px;
  color: #6b7280;
  font-weight: 700;
}

.summary-box strong {
  font-size: 24px;
  letter-spacing: -0.5px;
}

.section-title-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.section-title {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.5px;
}

.reservation-count {
  color: #6b7280;
  font-size: 14px;
  font-weight: 700;
}

.reservation-list {
  display: grid;
  gap: 14px;
}

.reservation-card {
  padding: 24px;
  border-radius: 22px;
}

.reservation-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 20px;
}

.concert-title {
  font-size: 24px;
  line-height: 1.35;
  letter-spacing: -0.6px;
}

.status-badge {
  flex-shrink: 0;
  min-width: 92px;
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 900;
}

.status-badge.completed {
  background: rgba(37, 99, 235, 0.12);
  color: #2563eb;
}

.status-badge.reserved {
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
}

.status-badge.canceled {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
}

.reservation-info {
  display: grid;
  gap: 12px;
}

.info-row {
  min-height: 56px;
  padding: 0 16px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.info-row span {
  color: #6b7280;
  font-size: 14px;
  font-weight: 700;
}

.info-row strong {
  color: #111827;
  font-size: 15px;
}

.button-group {
  margin-top: 18px;
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
  .my-container {
    max-width: 860px;
  }
}

@media (max-width: 767px) {
  .my-page {
    padding: 22px 14px 28px;
  }

  .my-container {
    max-width: 100%;
  }

  .my-header {
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

  .profile-card {
    padding: 18px;
    border-radius: 20px;
  }

  .profile-top {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 18px;
  }

  .profile-user {
    font-size: 24px;
  }

  .profile-summary {
    grid-template-columns: 1fr;
  }

  .summary-box {
    min-height: 78px;
    border-radius: 16px;
  }

  .summary-box strong {
    font-size: 21px;
  }

  .section-title {
    font-size: 18px;
  }

  .reservation-count {
    font-size: 12px;
  }

  .reservation-card {
    padding: 18px;
    border-radius: 18px;
  }

  .reservation-top {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .concert-title {
    font-size: 20px;
  }

  .info-row {
    min-height: 52px;
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
  .my-page {
    padding: 20px 12px 26px;
  }

  h1 {
    font-size: 25px;
  }

  .concert-title {
    font-size: 18px;
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