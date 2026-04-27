<script setup>
import { computed } from "vue"

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})

console.log("props", props)

const emit = defineEmits(["change"])

const groupSize = 10

const currentPage = computed(() => Math.max(props.page, 1))

const currentGroup = computed(() => {
  return Math.floor((currentPage.value - 1) / groupSize)
})

const startPage = computed(() => {
  return currentGroup.value * groupSize + 1
})

const endPage = computed(() => {
  return Math.min(startPage.value + groupSize - 1, props.totalPages)
})

const pageNumbers = computed(() => {
  const pages = []

  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i)
  }

  return pages
})

const movePage = (targetPage) => {
  if (targetPage < 1) return
  if (targetPage > props.totalPages) return
  if (targetPage === currentPage.value) return

  emit("change", targetPage)
}

const goFirst = () => {
  movePage(1)
}

const goPrevGroup = () => {
  movePage(Math.max(startPage.value - groupSize, 1))
}

const goNextGroup = () => {
  movePage(Math.min(endPage.value + 1, props.totalPages))
}

const goLast = () => {
  console.log("page", props.page)
  console.log("totalPages", props.totalPages)

  movePage(props.totalPages)
}
</script>

<template>
  <nav
    v-if="totalPages > 0"
    class="pagination"
  >
    <button
      class="page-button"
      :disabled="currentPage === 1"
      @click="goFirst"
    >
      &lt;&lt;
    </button>

    <button
      class="page-button"
      :disabled="startPage === 1"
      @click="goPrevGroup"
    >
      &lt;
    </button>

    <button
      v-for="num in pageNumbers"
      :key="num"
      class="page-button"
      :class="{ active: num === currentPage }"
      @click="movePage(num)"
    >
      {{ num }}
    </button>

    <button
      class="page-button"
      :disabled="endPage >= totalPages"
      @click="goNextGroup"
    >
      &gt;
    </button>

    <button
      class="page-button"
      :disabled="currentPage === totalPages"
      @click="goLast"
    >
      &gt;&gt;
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.page-button {
  min-width: 38px;
  height: 38px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #ffffff;
  color: #111827;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.page-button:hover:not(:disabled) {
  background: #f3f4f6;
}

.page-button.active {
  background: #111827;
  border-color: #111827;
  color: #ffffff;
}

.page-button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
</style>