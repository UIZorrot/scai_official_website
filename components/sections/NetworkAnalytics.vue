<template>
  <section id="network" class="py-16 bg-gray-50 dark:bg-black">
    <div class="container px-4 mx-auto">
      <!-- 标题区域 -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-heading mb-4">
          {{ $t('analytics.title') }}
        </h2>
        <p class="text-lg text-secondary max-w-4xl mx-auto">
          {{ $t('analytics.subtitle') }}
        </p>
      </div>

      <!-- 三个分析卡片 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <!-- Network Activity -->
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-xl font-bold text-heading mb-6">
            {{ $t('analytics.networkActivity.title') }}
          </h3>

          <!-- 顶部统计 -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div class="text-sm text-caption mb-1">{{ $t('analytics.networkActivity.governance')
              }}</div>
              <div class="text-xl font-bold text-brand">2,847</div>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">{{ $t('analytics.networkActivity.totalStaked')
              }}</div>
              <div class="text-xl font-bold text-blue-600 dark:text-blue-400">18M <span
                      class="text-sm text-gray-500 dark:text-gray-400">SCAI</span></div>
            </div>
          </div>

          <!-- Epoch 列表 -->
          <div class="space-y-3">
            <div v-for="epoch in networkEpochs" :key="epoch.id" class="flex justify-between items-center py-2">
              <span class="text-sm text-gray-600 dark:text-gray-300">{{ $t('analytics.networkActivity.epoch') }} {{
                epoch.id }}</span>
              <span class="font-semibold text-gray-900 dark:text-gray-100">{{ epoch.value.toLocaleString() }} <span
                      class="text-xs text-gray-500 dark:text-gray-400">SCAI</span></span>
            </div>
          </div>
        </div>

        <!-- Research Papers -->
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {{ $t('analytics.researchPapers.title') }}
          </h3>

          <!-- 顶部统计 -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">{{ $t('analytics.researchPapers.totalPapers')
              }}</div>
              <div class="text-xl font-bold text-green-600 dark:text-green-400">2,847</div>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">{{ $t('analytics.researchPapers.thisMonth') }}
              </div>
              <div class="text-xl font-bold text-green-600 dark:text-green-400">18M <span
                      class="text-sm text-gray-500 dark:text-gray-400">SCAI</span></div>
            </div>
          </div>

          <!-- 百分比进度条 -->
          <div class="space-y-4">
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-300">{{
                  $t('analytics.researchPapers.decentralizedPercent') }}</span>
                <span class="text-sm font-semibold">72%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-green-500 dark:bg-green-400 h-2 rounded-full" style="width: 72%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-300">{{
                  $t('analytics.researchPapers.blockchainPercent') }}</span>
                <span class="text-sm font-semibold">18%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-green-400 dark:bg-green-300 h-2 rounded-full" style="width: 18%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-300">{{ $t('analytics.researchPapers.privacyPercent')
                }}</span>
                <span class="text-sm font-semibold">10%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-green-300 h-2 rounded-full" style="width: 10%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Token Economics -->
        <div class="bg-white rounded-lg border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 class="text-xl font-bold text-black dark:text-white mb-6">
            {{ $t('analytics.tokenEconomics.title') }}
          </h3>

          <!-- 顶部统计 -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">{{ $t('analytics.tokenEconomics.totalBurned')
              }}</div>
              <div class="text-xl font-bold text-orange-600 dark:text-orange-400">2,847</div>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">{{ $t('analytics.tokenEconomics.foundation') }}
              </div>
              <div class="text-xl font-bold text-orange-600 dark:text-orange-400">120M <span
                      class="text-sm text-gray-500 dark:text-gray-400">SCAI</span></div>
            </div>
          </div>

          <!-- Token Epoch 列表 -->
          <div class="space-y-3">
            <div v-for="epoch in tokenEpochs" :key="epoch.id" class="flex justify-between items-center py-2">
              <span class="text-sm text-gray-600 dark:text-gray-300">{{ $t('analytics.tokenEconomics.epoch') }} {{
                epoch.id }}</span>
              <span class="font-semibold text-black dark:text-white">{{ epoch.value.toLocaleString() }} <span
                      class="text-xs text-gray-500 dark:text-gray-400">SCAI</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 国际化
const { t } = useI18n()

// 模拟数据
const networkEpochs = [
  { id: 1, value: 12000000 },
  { id: 1, value: 12000000 },
  { id: 1, value: 12000000 },
  { id: 1, value: 12000000 }
]

const tokenEpochs = [
  { id: 1, value: 1000000 },
  { id: 1, value: 1200000 },
  { id: 1, value: 1500000 },
  { id: 1, value: 1800000 },
  { id: 1, value: 2000000 }
]
</script>

<style scoped>
/* 简洁的样式 */
</style>
