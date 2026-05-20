<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores"
import Loading from "@/components/Loading.vue"
import * as api from "@/api"  

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);
const loginForm = ref({
  loginId: "",
  password: "",
  passwordResetCount: 0,
})


const login = async () => {
  try {
    loading.value = true;
    const params = {
      loginId: loginForm.value.loginId,
      password: loginForm.value.password,
    };
    const { data } = await api.login(params);
    const result = data.data;
    authStore.login(result.accessToken);
    sessionStorage.setItem("gate:concertList", "ok");
    router.push("/concertList");
  } catch (error) {
    console.error(error);
    const message = error.response?.data?.error || "오류가 발생했습니다.";
    alert(message);
  } finally {
    loading.value = false
  }
};

const resetPassword = () => { 
  router.replace("/passwordReset"); 
};

const init = () => {
 loginForm.value = {
    loginId : authStore.loginId,
    passwordResetCount : authStore.passwordResetCount,
 }
}

onMounted(() => {  
  init(); 
});
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
            v-model="loginForm.loginId"
            type="text"
            autocomplete="username"
            placeholder="회원 아이디"
            :disabled="true"
          />

          <span>비밀번호</span>
          <input
            v-model="loginForm.password"
            type="password"
            autocomplete="current-password"
            placeholder="비밀번호 입력"
          />
        </label>

        <div class="button-group">
          <button
            v-if="loginForm.passwordResetCount == 0"
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
<Loading v-if="loading" />
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

.button-group > *:only-child {
  grid-column: 1 / -1;
}

.login-button,
.reset-button {
  width: 100%;
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

input:disabled {
  background: #f3f4f6;
  color: #9ca3af;
  border-color: #e5e7eb;
  cursor: not-allowed;
  opacity: 1;
  -webkit-text-fill-color: #9ca3af;
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