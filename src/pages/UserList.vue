<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router";
import * as api from "@/api"  
import Loading from "@/components/Loading.vue"
import Pagination from "@/components/Pagination.vue"
import { useDevice } from "@/composables/useDevice";
import { useAuthStore } from "@/stores/authStore"


const { isMobile } = useDevice();
const router = useRouter();
const authStore = useAuthStore()
const keyword = ref("");
const loading = ref(false);
const userForm = ref({
  list : [],
  page : 1,
  size : 10,
  totalPages : 0,
  totalCount : 0,
  first : false,
  last : false,
})


const loadUserList = async ({ reset = false } = {}) => {
  try {
    if (reset) {
      userForm.value.page = 1;
      userForm.value.list = [];
    }
    loading.value = true;

    const params = {
      page: userForm.value.page,
      size: userForm.value.size,
      keyword: keyword.value
    };
    const { data } = await api.userList(params);
    const result = data.data;
    userForm.value = {
      list : result.content,
      page : result.page,
      size : result.size,
      totalPages : result.totalPages,
      totalCount : result.totalCount,
      first : result.first,
      last : result.last,
    };
 
  } catch (error) {
    console.error("Error:", error);
    const message = error.response?.data?.error || "오류가 발생했습니다.";
    alert(message);
  } finally {
    loading.value = false
  }
};

const searchUserList = () => {
  loadUserList();
}

const movePage = (targetPage) => {
  userForm.value.page = targetPage
  loadUserList();
}

const goToLogin = (user) => {
  authStore.setUser({
    userId: user.userId,
    passwordResetCount: user.passwordResetCount,
  });
  sessionStorage.setItem("gate:login", "ok");
  router.push("/login");
};


const init = () => {
  loadUserList(); 
}

onMounted(() => {  
  init(); 
});
</script>


<template>
  <main class="app-page page">
    <section class="container">
      <header class="header">
        <p class="eyebrow">RealTime Ticketing_김소라</p>
        <h1>테스트 회원 선택</h1>
        <p class="description">
          회원을 선택하면 테스트용 JWT 토큰이 발급되고 예약 화면으로 이동합니다.
        </p>
      </header>

      <div class="search-box">
        <input
          v-model="keyword"
          type="text"
          placeholder="아이디 검색"
          @keyup.enter="searchUserList"
        />

        <button @click="searchUserList">
          검색
        </button>
      </div>

      <section class="user-list">
        <article
          v-for="user in userForm.list"
          :key="user.userId"
          class="app-card user-card"
        >

          <div class="user-info">
            <div class="user-row">
              <strong>{{ user.userId }}</strong>
              <span
                v-if="user.passwordResetCount != 0"
                class="user-state">
                비밀번호 설정됨
              </span>
            </div>
          </div>

          <button
            class="enter-button"
            @click="goToLogin(user)">
            입장하기
          </button>

        </article>
      </section>

      <button
        v-if="isMobile"
        class="more-button">
        더보기
      </button>

      <p v-if="!userForm.list.length" class="empty">
        조회된 회원이 없습니다.
      </p>
    </section>
  </main>


  <Pagination
    v-if="!isMobile"
    :page="userForm.page"
    :total-pages="userForm.totalPages"
    @change="movePage"
  />

<Loading v-if="loading" />
</template>

<style scoped>
.page {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 32px 16px;
  box-sizing: border-box;
  background-color: #f6f7f9;
  background-image:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 32%),
    linear-gradient(180deg, #f7f8fb 0%, #eef1f5 100%);
  color: #111827;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
}

.header {
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 14px;
  color: #5f6b7a;
  word-break: keep-all;
}

h1 {
  margin: 0;
  font-size: 32px;
  line-height: 1.25;
  letter-spacing: -0.8px;
  color: #111827;
}

.description {
  margin: 12px 0 0;
  color: #6b7280;
  font-size: 15px;
  line-height: 1.6;
  word-break: keep-all;
}

.search-box {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.search-box input {
  flex: 1;
  min-width: 0;
  height: 48px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 0 14px;
  font-size: 15px;
  background: #fff;
  box-sizing: border-box;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-box input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.search-box button,
.enter-button,
.more-button {
  border: 0;
  cursor: pointer;
  font-weight: 700;
  font-family: inherit;
  appearance: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.search-box button {
  width: 88px;
  height: 48px;
  border-radius: 12px;
  background: #111827;
  color: #fff;
}

.user-list {
  display: grid;
  gap: 12px;
}

.user-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  box-sizing: border-box;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.user-card:hover {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.2);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
}

.user-info {
  display: flex;
  min-width: 0;
}

.user-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex-wrap: wrap;
}

.user-state {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: 999px;
  background: #fef3c7;
  color: #92400e;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
}

.user-info strong {
  color: #111827;
  font-size: 16px;
  font-weight: 800;
  overflow-wrap: anywhere;
}

.enter-button {
  flex-shrink: 0;
  min-width: 84px;
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  background: #2563eb;
  color: #fff;
}

.enter-button:hover {
  background: #1d4ed8;
}

.more-button {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border-radius: 14px;
  background: #111827;
  color: #fff;
  font-size: 15px;
}

.more-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.empty {
  margin-top: 32px;
  text-align: center;
  color: #6b7280;
}

.user-top {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.using-badge {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: #fef3c7;
  color: #92400e;
  font-size: 12px;
  font-weight: 800;
}

/* 모바일 */
@media (max-width: 767px) {
  .page {
    padding: 20px 14px;
  }

  .header {
    margin-bottom: 18px;
  }

  .eyebrow {
    font-size: 12px;
  }

  h1 {
    font-size: 28px;
    line-height: 1.2;
  }

  .description {
    font-size: 14px;
    line-height: 1.55;
  }

  .search-box {
    flex-direction: row;
    gap: 8px;
    margin-bottom: 18px;
  }

  .search-box input {
    height: 44px;
    font-size: 16px;
    border-radius: 14px;
  }

  .search-box button {
    width: 74px;
    height: 44px;
    border-radius: 14px;
    font-size: 14px;
  }

  .user-list {
    gap: 10px;
  }

  .user-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 64px;
    padding: 14px 14px;
    border-radius: 18px;
  }

  .user-info strong {
    font-size: 16px;
  }

  .enter-button {
    width: auto;
    min-width: 86px;
    height: 38px;
    padding: 0 14px;
    border-radius: 12px;
    font-size: 14px;
  }

  .more-button {
    height: 48px;
    margin-top: 16px;
    border-radius: 14px;
  }
}

</style>