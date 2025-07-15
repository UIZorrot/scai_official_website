<template>
  <section class="flex overflow-hidden relative justify-center items-center min-h-screen">
    <!-- 背景图片 -->
    <div class="absolute inset-0">
      <img src="~/assets/images/bg.png" alt="Hero Background" class="object-cover w-full h-full" />
    </div>

    <!-- 鸟类飞行装饰图案 -->
    <div class="overflow-hidden absolute inset-0 opacity-20">
      <div class="absolute top-1/4 left-1/4 animate-float-1">
        <svg class="w-12 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path
                d="M23 12l-2.44-2.78L19.84 10l-1.06 2.78L19.84 14l.72-.22L23 12zM8.5 12l-2.44-2.78L5.34 10l-1.06 2.78L5.34 14l.72-.22L8.5 12z" />
        </svg>
      </div>
      <div class="absolute top-1/3 right-1/3 animate-float-2">
        <svg class="w-10 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path
                d="M23 12l-2.44-2.78L19.84 10l-1.06 2.78L19.84 14l.72-.22L23 12zM8.5 12l-2.44-2.78L5.34 10l-1.06 2.78L5.34 14l.72-.22L8.5 12z" />
        </svg>
      </div>
      <div class="absolute bottom-1/3 left-1/2 animate-float-3">
        <svg class="w-14 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path
                d="M23 12l-2.44-2.78L19.84 10l-1.06 2.78L19.84 14l.72-.22L23 12zM8.5 12l-2.44-2.78L5.34 10l-1.06 2.78L5.34 14l.72-.22L8.5 12z" />
        </svg>
      </div>
      <div class="absolute top-2/3 right-1/4 animate-float-1">
        <svg class="w-8 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path
                d="M23 12l-2.44-2.78L19.84 10l-1.06 2.78L19.84 14l.72-.22L23 12zM8.5 12l-2.44-2.78L5.34 10l-1.06 2.78L5.34 14l.72-.22L8.5 12z" />
        </svg>
      </div>
    </div>

    <!-- 背景装饰元素 -->
    <div class="overflow-hidden absolute inset-0">
      <!-- 浮动的几何图形 -->
      <div
           class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-70 mix-blend-multiply filter blur-xl dark:bg-blue-800 dark:mix-blend-screen animate-blob">
      </div>
      <div
           class="absolute top-1/3 right-1/4 w-64 h-64 bg-red-200 rounded-full opacity-70 mix-blend-multiply filter blur-xl dark:bg-red-800 dark:mix-blend-screen animate-blob animation-delay-2000">
      </div>
      <div
           class="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gray-200 rounded-full opacity-70 mix-blend-multiply filter blur-xl dark:bg-gray-800 dark:mix-blend-screen animate-blob animation-delay-4000">
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="relative z-10 px-4 mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
      <div class="space-y-8 sm:py-10">
        <!-- 主标题 -->
        <div class="px-4 space-y-4 sm:px-0">
          <h1
              class="text-3xl font-bold leading-tight text-white dark:text-gray-100 sm:text-4xl md:text-6xl lg:text-7xl">
            {{ $t("hero.title") }}
          </h1>

          <!-- 副标题 -->
          <h2
              class="px-4 mx-auto max-w-4xl text-xl font-semibold leading-relaxed sm:text-2xl md:text-3xl text-white/90 dark:text-gray-200 sm:px-0">
            {{ $t("hero.subtitle") }}
          </h2>

          <!-- 描述文本 -->
          <p class="px-4 pt-4 mx-auto max-w-4xl text-lg leading-relaxed text-blue-50 sm:text-xl sm:px-0">
            {{ $t("hero.description") }}
          </p>
        </div>

        <!-- CTA 按钮组 -->
        <div class="flex flex-col gap-4 justify-center items-center sm:flex-row sm:gap-6">
          <button class="btn btn-hero-primary cursor-pointer rounded-0"
                  @click="handClick('https://foundation.scai.sh/')">
            {{ $t("hero.exploreEcosystem") }}
            <ArrowRightIcon class="inline ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <!-- <button
                  class="btn btn-hero-secondary border-[#FF3314] bg-[rgba(255,51,20,0.15)]">
            {{ $t('hero.readWhitepaper') }}
          </button> -->

          <button class="btn btn-hero-secondary border-[#FF3314] bg-[rgba(255,51,20,0.15)] cursor-pointer rounded-0"
                  @click="handClick('https://app.scai.sh/')">
            {{ $t("hero.OpenApp") }}
          </button>
        </div>

        <!-- 统计数据 -->
        <div class="grid grid-cols-1 gap-3 px-2 pt-12 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 sm:gap-6 sm:pt-16 sm:px-4">
          <div v-for="stat in stats" :key="stat.label"
               class="p-3 text-center rounded-lg border border-solid border-white backdrop-blur-sm bg-[rgba(0,0,0,0.2)] sm:p-4">
            <div class="text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
              {{ stat.value }}
            </div>
            <div class="mt-1 text-xs text-blue-100 sm:text-sm md:text-base sm:mt-2">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 滚动指示器 -->
    <div class="absolute bottom-8 left-1/2 animate-bounce transform -translate-x-1/2">
      <ChevronDownIcon class="w-6 h-6 text-white/70" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/vue/24/outline";

// 国际化
const { t } = useI18n();

// 统计数据
const stats = computed(() => [
  { value: "102,839", label: t("stats.papers") },
  { value: "17k+", label: t("stats.institutions") },
  { value: "7k+", label: t("stats.partners") },
  { value: "99.9%", label: t("stats.uptime") },
]);

const handClick = (url: string) => {
  window.open(url, "_blank");
};
</script>

<style scoped>
/* 自定义动画 */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

/* 鸟类飞行动画 */
@keyframes float-1 {

  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }

  50% {
    transform: translateY(-20px) translateX(30px);
  }
}

@keyframes float-2 {

  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }

  50% {
    transform: translateY(-15px) translateX(-25px);
  }
}

@keyframes float-3 {

  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }

  50% {
    transform: translateY(-25px) translateX(20px);
  }
}

.animate-float-1 {
  animation: float-1 6s ease-in-out infinite;
}

.animate-float-2 {
  animation: float-2 8s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-float-3 {
  animation: float-3 7s ease-in-out infinite;
  animation-delay: 4s;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* 渐变文字效果 */
.text-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #ef4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
