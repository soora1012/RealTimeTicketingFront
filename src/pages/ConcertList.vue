<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const userId = "user_1";

const concerts = [
  { concertId: 1, title: "A 콘서트", remainingSeatCount: 521 },
  { concertId: 2, title: "B 콘서트", remainingSeatCount: 1502 },
  { concertId: 3, title: "C 콘서트", remainingSeatCount: 0 },
  { concertId: 4, title: "D 콘서트", remainingSeatCount: 84 },
];

const goToSeat = (concert) => {
  if (concert.remainingSeatCount <= 0) return;

  sessionStorage.setItem("gate:seat", "ok");

  router.push({
    path: "/seat",
    query: {
      concertId: concert.concertId,
      concertTitle: concert.title,
    },
  });
};
</script>

<template>
  <main class="app-page concert-page">
    <section class="concert-container">
      <header class="concert-header">
        <p class="eyebrow">RealTime Ticketing_김소라</p>
        <h1>예약 가능 콘서트</h1>
        <p class="description">
          {{ userId }}님, 예매할 콘서트를 선택해주세요.
        </p>
      </header>

      <section class="concert-list">
        <button
          v-for="concert in concerts"
          :key="concert.concertId"
          type="button"
          class="app-card concert-row"
          :class="{ soldout: concert.remainingSeatCount <= 0 }"
          :disabled="concert.remainingSeatCount <= 0"
          @click="goToSeat(concert)"
        >
          <div class="concert-info">
            <strong>{{ concert.title }}</strong>
            <span>
              {{ concert.remainingSeatCount > 0 ? "예약 가능" : "예약 마감" }}
            </span>
          </div>

          <em>
            {{
              concert.remainingSeatCount > 0
                ? concert.remainingSeatCount.toLocaleString() + "석"
                : "마감"
            }}
          </em>
        </button>
      </section>
    </section>
  </main>
</template>

<style scoped>
.concert-page {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 56px 20px 32px;
  box-sizing: border-box;
  color: #111827;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.concert-container {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
}

.concert-header {
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

.concert-list {
  display: grid;
  gap: 14px;
}

.concert-row {
  width: 100%;
  min-height: 76px;
  padding: 18px 20px;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  text-align: left;
  color: #111827;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.concert-row:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.22);
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.08);
}

.concert-info {
  display: grid;
  gap: 5px;
  min-width: 0;
}

.concert-info strong {
  color: #111827;
  font-size: 17px;
  font-weight: 900;
  overflow-wrap: anywhere;
}

.concert-info span {
  color: #2563eb;
  font-size: 13px;
  font-weight: 800;
}

.concert-row em {
  flex-shrink: 0;
  min-width: 92px;
  height: 42px;
  padding: 0 14px;
  border-radius: 999px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;

  font-style: normal;
  font-size: 14px;
  font-weight: 900;
}

.concert-row.soldout {
  background: #f3f4f6;
  opacity: 0.78;
  cursor: not-allowed;
}

.concert-row.soldout .concert-info strong,
.concert-row.soldout .concert-info span {
  color: #9ca3af;
}

.concert-row.soldout em {
  background: #e5e7eb;
  color: #6b7280;
}

@media (max-width: 767px) {
  .concert-page {
    padding: 22px 14px 28px;
  }

  .concert-container {
    max-width: 100%;
  }

  .concert-header {
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

  .concert-list {
    gap: 10px;
  }

  .concert-row {
    min-height: 64px;
    padding: 14px;
    border-radius: 18px;
  }

  .concert-info strong {
    font-size: 16px;
  }

  .concert-info span {
    font-size: 12px;
  }

  .concert-row em {
    min-width: 74px;
    height: 38px;
    padding: 0 12px;
    font-size: 12px;
  }
}

</style>