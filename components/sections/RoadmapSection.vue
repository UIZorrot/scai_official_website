<template>
  <section id="roadmap" class="py-16 bg-white dark:bg-black">
    <div class="container px-4 mx-auto">
      <!-- 标题区域 -->
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-3xl font-bold text-heading-large md:text-4xl">
          {{ $t('roadmap.title') }}
        </h2>
      </div>

      <!-- 路线图季度列表 -->
      <div class="mx-auto space-y-4 max-w-4xl ">
        <!-- 动态渲染所有季度 -->
        <div
             v-for="quarter in quarters"
             :key="quarter.id"
             class="rounded-lg border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-lg shadow-md">

          <!-- 季度标题 - 可点击 -->
          <div
               @click="toggleQuarter(quarter.id)"
               class="flex justify-between items-center p-4 cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div>
              <h3 class="text-lg font-bold text-heading">{{ $t(`roadmap.${quarter.id}.title`) }}</h3>
              <p class="text-sm text-caption">{{ $t(`roadmap.${quarter.id}.subtitle`) }}</p>
            </div>
            <svg
                 class="w-5 h-5 text-gray-400 transition-transform duration-300"
                 :class="{ 'rotate-180': expandedQuarters.includes(quarter.id) }"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <!-- 展开的内容 - 带动画 -->
          <Transition name="expand">
            <div v-if="expandedQuarters.includes(quarter.id)" class="overflow-hidden">
              <div class="px-4 pb-4 space-y-3">
                <!-- 2025Q3 的详细任务 -->
                <template v-if="quarter.id === '2025Q3'">
                  <!-- 已完成任务 -->
                  <div
                       class="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800 transition-all duration-200 hover:shadow-md">
                    <span class="text-sm text-body">{{ $t('roadmap.2025Q3.tasks.communityMigration')
                      }}</span>
                    <span
                          class="px-2 py-1 text-xs font-medium text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-800 rounded">
                      {{ $t('roadmap.status.completed') }}
                    </span>
                  </div>

                  <!-- 即将到来的任务 -->
                  <div
                       class="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-all duration-200 hover:shadow-md">
                    <span class="text-sm text-body">{{ $t('roadmap.2025Q3.tasks.partnership') }}</span>
                    <span
                          class="px-2 py-1 text-xs font-medium text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-800 rounded">
                      {{ $t('roadmap.status.upcoming') }}
                    </span>
                  </div>

                  <div
                       class="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-all duration-200 hover:shadow-md">
                    <span class="text-sm text-body">{{ $t('roadmap.2025Q3.tasks.hackathon') }}</span>
                    <span
                          class="px-2 py-1 text-xs font-medium text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-800 rounded">
                      {{ $t('roadmap.status.upcoming') }}
                    </span>
                  </div>

                  <div
                       class="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-all duration-200 hover:shadow-md">
                    <span class="text-sm text-body">{{ $t('roadmap.2025Q3.tasks.nftCollection')
                      }}</span>
                    <span
                          class="px-2 py-1 text-xs font-medium text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-800 rounded">
                      {{ $t('roadmap.status.upcoming') }}
                    </span>
                  </div>
                </template>

                <!-- 其他季度的占位内容 -->
                <template v-else>
                  <div class="p-4 text-center text-muted bg-gray-50 dark:bg-gray-800 rounded">
                    <p class="text-sm">{{ $t('roadmap.status.upcoming') }} - 详细信息即将发布</p>
                  </div>
                </template>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 国际化
const { t } = useI18n()

// 季度数据
const quarters = ref([
  { id: '2025Q3' },
  { id: '2025Q4' },
  { id: '2026Q1' },
  { id: '2026Q2' },
  { id: '2026Q3' },
  { id: '2026Q4' }
])

// 展开的季度列表 - 默认展开 2025Q3
const expandedQuarters = ref(['2025Q3'])

// 切换季度展开/折叠
const toggleQuarter = (quarterId: string) => {
  const index = expandedQuarters.value.indexOf(quarterId)
  if (index > -1) {
    // 如果已展开，则折叠
    expandedQuarters.value.splice(index, 1)
  } else {
    // 如果未展开，则展开
    expandedQuarters.value.push(quarterId)
  }
}

// 移除复杂的动画钩子函数，使用纯 CSS 动画
</script>

<style scoped>
/* 优化的展开/折叠动画 */
.expand-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.6, 1);
  overflow: hidden;
}

.expand-enter-from {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-5px);
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
  /* 设置一个足够大的最大高度 */
  opacity: 1;
  transform: translateY(0);
}
</style>
