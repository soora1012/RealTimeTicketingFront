<template>
  <div class="loading-overlay">
    <div class="loading-box">
      <div class="loading-bar"></div>
      <p class="loading-text">Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.loading-box {
  width: 280px;
  background: #ffffff;
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.loading-bar {
  position: relative;
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.loading-bar::after {
  content: "";
  position: absolute;
  top: 0;
  left: -40%;
  width: 40%;
  height: 100%;
  background: linear-gradient(
    90deg,
    #2563eb,
    #60a5fa
  );
  border-radius: 999px;
  animation: loading 1s infinite ease-in-out;
}

.loading-text {
  margin: 14px 0 0;
  text-align: center;
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
}

@keyframes loading {
  0% {
    left: -40%;
  }

  100% {
    left: 100%;
  }
}
</style>