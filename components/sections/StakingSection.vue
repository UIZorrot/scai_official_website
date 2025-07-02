<template>
  <section id="staking" class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container px-4 mx-auto">
      <!-- 主容器 -->
      <div class="mx-auto max-w-6xl">
        <!-- 标题区域 -->
        <div class="mb-12 text-center">
          <h2 class="flex justify-center items-center mb-6 text-4xl font-bold text-heading">
            💰 {{ $t('staking.title') }}
          </h2>

          <!-- 说明文字区域 -->
          <div class="mx-auto max-w-4xl space-y-4">
            <p class="text-base leading-relaxed text-body">
              {{ $t('staking.description') }}
            </p>
            <p class="text-base leading-relaxed text-body">
              {{ $t('staking.joinDescription') }}
            </p>
          </div>
        </div>

        <!-- 三个模块卡片 -->
        <div class="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
          <!-- Foundation Fund -->
          <div
               class="p-8 text-center bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
            <h3 class="mb-4 text-xl font-bold text-heading">
              {{ $t('staking.foundationFund') }}
            </h3>
            <p class="text-caption">
              {{ $t('staking.foundationFundDesc') }}
            </p>
          </div>

          <!-- Governance -->
          <div
               class="p-8 text-center bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
            <h3 class="mb-4 text-xl font-bold text-heading">
              {{ $t('staking.governance') }}
            </h3>
            <p class="text-caption">
              {{ $t('staking.governanceDesc') }}
            </p>
          </div>

          <!-- Rewards -->
          <div
               class="p-8 text-center bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
            <h3 class="mb-4 text-xl font-bold text-heading">
              {{ $t('staking.rewards') }}
            </h3>
            <p class="text-caption">
              {{ $t('staking.rewardsDesc') }}
            </p>
          </div>
        </div>

        <!-- CTA 按钮 -->
        <div class="text-center">
          <NuxtLink
                    to="#foundation"
                    class="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-red-500 rounded-lg shadow-lg transition-all duration-300 hover:bg-red-600 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 no-underline">
            {{ $t('staking.visitFoundation') }}
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 国际化
const { t } = useI18n()
</script>

<style scoped>
/* 简洁的样式 */
</style>
