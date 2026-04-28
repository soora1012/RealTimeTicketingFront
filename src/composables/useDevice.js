import { ref, computed, onMounted, onUnmounted } from "vue";

export function useDevice() {
  const width = ref(0);
  const height = ref(0);
  const userAgent = ref("");

  const updateDevice = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
    userAgent.value = navigator.userAgent.toLowerCase();
  };

  onMounted(() => {
    updateDevice();
    window.addEventListener("resize", updateDevice);
    window.addEventListener("orientationchange", updateDevice);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateDevice);
    window.removeEventListener("orientationchange", updateDevice);
  });

  const isMobile = computed(() => width.value <= 767);
  const isTablet = computed(() => width.value >= 768 && width.value <= 1024);
  const isDesktop = computed(() => width.value > 1024);

  const isIOS = computed(() =>
    /iphone|ipad|ipod/.test(userAgent.value)
  );

  const isAndroid = computed(() =>
    /android/.test(userAgent.value)
  );

  const isSafari = computed(() =>
    /safari/.test(userAgent.value) &&
    !/chrome|crios|android/.test(userAgent.value)
  );

  const isTouchDevice = computed(() =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    isIOS,
    isAndroid,
    isSafari,
    isTouchDevice,
  };
}