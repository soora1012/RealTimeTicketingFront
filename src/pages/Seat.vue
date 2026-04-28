<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const userId = "user_1";
const concertTitle = route.query.concertTitle || "A 콘서트";

const selectedSeat = ref(null);

const seats = ref([
  { seatId: 1, seatName: "A1", price: 50000, status: "AVAILABLE" },
  { seatId: 2, seatName: "A2", price: 50000, status: "AVAILABLE" },
  { seatId: 3, seatName: "A3", price: 50000, status: "RESERVED" },
  { seatId: 4, seatName: "B1", price: 40000, status: "AVAILABLE" },
  { seatId: 5, seatName: "B2", price: 40000, status: "AVAILABLE" },
  { seatId: 6, seatName: "B3", price: 40000, status: "RESERVED" },
  { seatId: 7, seatName: "C1", price: 30000, status: "AVAILABLE" },
  { seatId: 8, seatName: "C2", price: 30000, status: "AVAILABLE" },
  { seatId: 9, seatName: "C3", price: 30000, status: "AVAILABLE" },
]);

const selectSeat = (seat) => {
  if (seat.status !== "AVAILABLE") return;
  selectedSeat.value = seat;
};

const goConfirm = () => {
  if (!selectedSeat.value) return;

  sessionStorage.setItem("gate:reservationConfirm", "ok");

  router.push({
    path: "/reservationConfirm",
    query: {
      concertTitle,
      seatId: selectedSeat.value.seatId,
      seatName: selectedSeat.value.seatName,
      price: selectedSeat.value.price,
    },
  });
};
</script>

<template>
  <main class="app-page seat-page">
    <section class="seat-container">
      <header class="seat-header">
        <p class="eyebrow">RealTime Ticketing_김소라</p>
        <h1>좌석 선택</h1>
        <p class="description">
          {{ userId }}님, {{ concertTitle }}에서 예약할 좌석을 선택해주세요.
        </p>
      </header>

      <section class="seat-layout">
        <div class="stage">STAGE</div>

        <section class="seat-map" aria-label="좌석 선택 영역">
          <button
            v-for="seat in seats"
            :key="seat.seatId"
            type="button"
            class="app-card seat-button"
            :class="{
              selected: selectedSeat?.seatId === seat.seatId,
              reserved: seat.status === 'RESERVED'
            }"
            :disabled="seat.status === 'RESERVED'"
            @click="selectSeat(seat)"
          >
            <strong>{{ seat.seatName }}</strong>
            <span>{{ seat.price.toLocaleString() }}원</span>
          </button>
        </section>

        <section class="summary-row">
          <div class="summary-info">
            <span>선택 좌석</span>
            <strong>{{ selectedSeat?.seatName || "-" }}</strong>
          </div>

          <div class="summary-info">
            <span>가격</span>
            <strong>
              {{ selectedSeat ? selectedSeat.price.toLocaleString() + "원" : "-" }}
            </strong>
          </div>

          <button
            type="button"
            class="confirm-button"
            :disabled="!selectedSeat"
            @click="goConfirm"
          >
            예약 확인하기
          </button>
        </section>
      </section>
    </section>
  </main>
</template>

<style scoped>
.seat-page {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 56px 20px 32px;
  box-sizing: border-box;
  color: #111827;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.seat-container {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
}

.seat-header {
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

.seat-layout {
  display: grid;
  gap: 18px;
}

.stage {
  width: 100%;
  height: 52px;
  border-radius: 18px;
  background: #111827;
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 5px;
}

.seat-map {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.seat-button {
  min-height: 92px;
  padding: 16px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  gap: 6px;
  text-align: center;
  color: #111827;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.seat-button:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.22);
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.08);
}

.seat-button strong {
  font-size: 20px;
  font-weight: 900;
}

.seat-button span {
  font-size: 13px;
  font-weight: 800;
  color: #6b7280;
}

.seat-button.selected {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}

.seat-button.selected span {
  color: rgba(255, 255, 255, 0.82);
}

.seat-button.reserved {
  background: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.75;
}

.seat-button.reserved span {
  color: #9ca3af;
}

.summary-row {
  display: grid;
  grid-template-columns: 1fr 1fr 180px;
  gap: 14px;
  align-items: stretch;
}

.summary-info {
  min-height: 68px;
  padding: 14px 18px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid #e5e7eb;
  display: grid;
  gap: 5px;
}

.summary-info span {
  font-size: 13px;
  font-weight: 800;
  color: #6b7280;
}

.summary-info strong {
  font-size: 17px;
  font-weight: 900;
  color: #111827;
}

.confirm-button {
  height: 68px;
  border-radius: 18px;
  background: #111827;
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  appearance: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.confirm-button:disabled {
  background: #9ca3af;
}

@media (max-width: 767px) {
  .seat-page {
    padding: 22px 14px 28px;
  }

  .seat-container {
    max-width: 100%;
  }

  .seat-header {
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

  .stage {
    height: 46px;
    border-radius: 16px;
    letter-spacing: 4px;
  }

  .seat-map {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .seat-button {
    min-height: 76px;
    padding: 12px 8px;
    border-radius: 18px;
  }

  .seat-button strong {
    font-size: 17px;
  }

  .seat-button span {
    font-size: 11px;
  }

  .summary-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .summary-info {
    min-height: 58px;
    padding: 13px 14px;
    border-radius: 16px;
  }

  .confirm-button {
    height: 48px;
    border-radius: 14px;
  }
}
</style>