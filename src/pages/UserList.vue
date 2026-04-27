<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router";
import * as api from "@/api"  
import Loading from "@/components/Loading.vue"
import Pagination from "@/components/Pagination.vue"

const router = useRouter();
//회원 목록 상태
const userList = ref([]);
//검색 조건
const keyword = ref("");
//페이지 정보
const page = ref(1);
const size = ref(10);
const totalPages = ref(0);
const totalCount = ref(0);
const first = ref(false);
const last = ref(false);
//로딩 이모티콘
const loading = ref(false);

//유저리스트 호출
const loadUserList = async ({ reset = false } = {}) => {
  try {
    if (reset) {
      page.value = 1;
      userList.value = [];
    }

    loading.value = true;
    const { data } = await api.userList(
      page.value,
      size.value,
      keyword.value,
    )
    const result = data.data 
    console.log("결과", result);

    userList.value = result.content
    page.value = result.page
    size.value = result.size
    totalPages.value = result.totalPages
    totalCount.value = result.totalCount
    first.value = result.first
    last.value = result.last
    
  } catch (error) {
    console.error("회원 목록 조회 실패:", error)
  } finally {
    loading.value = false
  }

};

const searchUserList = () => {
  loadUserList();
}

const movePage = (targetPage) => {
  page.value = targetPage
  loadUserList();
}

//로드시 실행되는 함수
onMounted(() => {  
    loadUserList();
});

</script>


<template>
  <main class="page">
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
          v-for="user in userList"
          :key="user.userId"
          class="user-card"
        >

          <div class="user-info">
            <strong>{{ user.userId }}</strong>
          </div>

          <button
            class="enter-button"
          >
            입장하기
          </button>
        </article>
      </section>

      <!-- <button
        class="more-button">
        더보기
      </button> -->

      <p v-if="!userList.length" class="empty">
        조회된 회원이 없습니다.
      </p>
    </section>
  </main>

  <Loading v-if="loading" />

  <Pagination
  :page="page"
  :total-pages="totalPages"
  @change="movePage"
/>

</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f6f7f9;
  padding: 32px 16px;
  box-sizing: border-box;
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
}

h1 {
  margin: 0;
  font-size: 32px;
  line-height: 1.25;
  color: #111827;
}

.description {
  margin: 12px 0 0;
  color: #6b7280;
  font-size: 15px;
  line-height: 1.6;
}

.search-box {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.search-box input {
  flex: 1;
  height: 48px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 0 14px;
  font-size: 15px;
  background: #fff;
  box-sizing: border-box;
}

.search-box button,
.enter-button,
.more-button {
  border: 0;
  cursor: pointer;
  font-weight: 600;
}

.search-box button {
  width: 88px;
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
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.user-info strong {
  color: #111827;
  font-size: 16px;
}

.user-info span {
  color: #6b7280;
  font-size: 14px;
  word-break: break-all;
}

.enter-button {
  flex-shrink: 0;
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  background: #2563eb;
  color: #fff;
}

.more-button {
  width: 100%;
  height: 48px;
  margin-top: 20px;
  border-radius: 12px;
  background: #e5e7eb;
  color: #111827;
}

.empty {
  margin-top: 32px;
  text-align: center;
  color: #6b7280;
}

/* 모바일 */
@media (max-width: 480px) {
  .page {
    padding: 24px 14px;
  }

  h1 {
    font-size: 26px;
  }

  .description {
    font-size: 14px;
  }

  .search-box {
    flex-direction: column;
  }

  .search-box button {
    width: 100%;
    height: 46px;
  }

  .user-card {
    align-items: stretch;
    flex-direction: column;
  }

  .enter-button {
    width: 100%;
  }
}
</style>