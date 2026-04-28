<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userId = ref("user_1");
const password = ref("");

const login = () => {
  sessionStorage.setItem("gate:concertList", "ok");
  router.push("/concertList");
};

const resetPassword = () => {
  alert("비밀번호 초기화 기능 준비 중입니다.");
};
</script>

<template>
  <main class="app-page login-page">
    <section class="login-container">
      <header class="login-header">
        <p class="eyebrow">RealTime Ticketing_김소라</p>
        <h1>로그인</h1>
        <p class="description">
          테스트 회원의 비밀번호를 입력하면 예약 가능한 콘서트 목록으로 이동합니다.
        </p>
      </header>

      <form class="login-form" @submit.prevent="login">
        <label class="app-card form-row">
          <span>회원 아이디</span>
          <input
            v-model="userId"
            type="text"
            autocomplete="username"
            placeholder="user_1"
          />

          <span>비밀번호</span>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="비밀번호 입력"
          />
        </label>

        <div class="button-group">
          <button
            class="reset-button"
            type="button"
            @click="resetPassword"
          >
            비밀번호 초기화
          </button>

           <button class="login-button" type="submit">
            로그인하기
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 56px 20px 32px;
  box-sizing: border-box;
  color: #111827;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.login-container {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
}

.login-header {
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

.login-form {
  display: grid;
  gap: 14px;
}

.form-row {
  min-height: 76px;
  padding: 18px 20px;
  border-radius: 20px;
  display: grid;
  gap: 10px;
}

.form-row span {
  font-size: 14px;
  font-weight: 900;
  color: #374151;
}

.form-row input {
  width: 100%;
  height: 44px;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  padding: 0 15px;
  background: #fff;
  color: #111827;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-row input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 4px;
}

.login-button,
.reset-button {
  height: 52px;
  border-radius: 16px;
  font-size: 15px;
  font-weight: 900;
  appearance: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.login-button {
  background: #2563eb;
  color: #fff;
}

.reset-button {
  background: #111827;
  color: #fff;
}

.login-button:hover {
  background: #1d4ed8;
}

.reset-button:hover {
  background: #030712;
}

@media (max-width: 767px) {
  .login-page {
    padding: 22px 14px 28px;
  }

  .login-container {
    max-width: 100%;
  }

  .login-header {
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

  .login-form {
    gap: 10px;
  }

  .form-row {
    padding: 14px;
    border-radius: 18px;
  }

  .form-row input {
    height: 44px;
    font-size: 16px;
  }

  .button-group {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .login-button,
  .reset-button {
    height: 48px;
    border-radius: 14px;
  }
}

</style>