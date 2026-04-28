<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const userId = route.query.userId || "user_1";
const concertTitle = route.query.concertTitle || "A 콘서트";

const waitingCount = ref(520);
const totalQueue = ref(1000);

const progress = computed(() => {
  return Math.max(8, 100 - (waitingCount.value / totalQueue.value) * 100);
});

const goConcertList = () => {
  sessionStorage.setItem("gate:concertList", "ok");
  router.push("/concertList");
};
</script>

<template>
  <main class="app-page queue-page">
    <section class="queue-container">
      <header class="queue-header">
        <p class="eyebrow">RealTime Ticketing_김소라</p>
        <h1>대기열 입장</h1>
        <p class="description">
          {{ userId }}님, 순서가 되면 예약 가능한 콘서트 화면으로 이동합니다.
        </p>
      </header>

      <section class="queue-content">
        <article class="app-card queue-status-card">
          <span class="status-label">현재 대기</span>

          <strong class="waiting-number">
            {{ waitingCount.toLocaleString() }}명
          </strong>

          <p class="status-message">
            접속자가 많아 순서대로 입장 중입니다.
          </p>

          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
        </article>

        <article class="app-card queue-info-card">
          <div>
            <span>선택 공연</span>
            <strong>{{ concertTitle }}</strong>
          </div>

          <div>
            <span>대기 상태</span>
            <strong>입장 대기 중</strong>
          </div>
        </article>

        <button
          type="button"
          class="enter-button"
          @click="goConcertList"
        >
          테스트용 바로 입장
        </button>
      </section>
    </section>
  </main>
</template>

<style scoped>
.queue-page {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 56px 20px 32px;
  box-sizing: border-box;
  color: #111827;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.queue-container {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
}

.queue-header {
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

.queue-content {
  display: grid;
  gap: 14px;
}

.queue-status-card {
  padding: 32px 28px;
  border-radius: 24px;
  text-align: center;
}

.status-label {
  display: inline-flex;
  margin-bottom: 12px;
  color: #6b7280;
  font-size: 15px;
  font-weight: 800;
}

.waiting-number {
  display: block;
  font-size: 56px;
  line-height: 1.05;
  letter-spacing: -1.8px;
  color: #111827;
  font-weight: 900;
}

.status-message {
  margin: 14px 0 24px;
  color: #6b7280;
  font-size: 15px;
  line-height: 1.6;
}

.progress-track {
  width: 100%;
  height: 18px;
  border-radius: 999px;
  background: #e5e7eb;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: #2563eb;
  transition: width 0.25s ease;
}

.queue-info-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  padding: 18px 20px;
  border-radius: 20px;
}

.queue-info-card div {
  display: grid;
  gap: 6px;
}

.queue-info-card span {
  font-size: 13px;
  font-weight: 800;
  color: #6b7280;
}

.queue-info-card strong {
  font-size: 17px;
  font-weight: 900;
  color: #111827;
}

.enter-button {
  height: 52px;
  border-radius: 16px;
  background: #111827;
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  appearance: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.enter-button:hover {
  background: #030712;
}

@media (max-width: 767px) {
  .queue-page {
    padding: 22px 14px 28px;
  }

  .queue-container {
    max-width: 100%;
  }

  .queue-header {
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

  .queue-content {
    gap: 10px;
  }

  .queue-status-card {
    padding: 28px 20px;
    border-radius: 20px;
  }

  .waiting-number {
    font-size: 46px;
  }

  .status-message {
    margin: 12px 0 20px;
    font-size: 14px;
  }

  .progress-track {
    height: 16px;
  }

  .queue-info-card {
    grid-template-columns: 1fr;
    padding: 14px;
    border-radius: 18px;
  }

  .queue-info-card strong {
    font-size: 16px;
  }

  .enter-button {
    height: 48px;
    border-radius: 14px;
  }
}
</style>