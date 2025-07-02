<template>
  <div class="theme-toggle">
    <UButton
             @click="handleClick"
             variant="ghost"
             color="neutral"
             size="lg"
             :icon="themeIcon"
             :title="themeTitle"
             :aria-label="themeTitle"
             :disabled="isAnimating"
             class="theme-toggle-button"
             :class="[
              'text-white dark:text-gray-200',
              'border border-white/30 dark:border-gray-600/50',
              'bg-white/10 dark:bg-gray-800/50',
              'hover:bg-white/20 dark:hover:bg-gray-700/50',
            ]" />
  </div>
</template>

<script setup lang="ts">
import { useThemeTransition } from '~/composables/useThemeTransition'

const { toggleTheme, colorMode, isAnimating: getIsAnimating } = useThemeTransition()

// 响应式状态
const isAnimating = ref(false)

// 计算属性
const themeTitle = computed(() => {
  if (isAnimating.value) {
    return '主题切换中...'
  }
  return colorMode.value === 'light' ? '切换到深色模式' : '切换到浅色模式'
})

const themeIcon = computed(() => {
  if (isAnimating.value) {
    return 'i-heroicons-arrow-path' // 加载图标
  }
  return colorMode.value === 'light' ? 'i-heroicons-sun' : 'i-heroicons-moon'
})

// 方法 - 主题切换处理
const handleClick = async (event: MouseEvent) => {
  if (isAnimating.value) return

  try {
    isAnimating.value = true
    await toggleTheme(event)
  } catch (error) {
    console.error('主题切换失败:', error)
  } finally {
    isAnimating.value = false
  }
}

// 监听动画状态（如果 composable 提供了状态）
watchEffect(() => {
  if (typeof getIsAnimating === 'function') {
    isAnimating.value = getIsAnimating()
  }
})
</script>

<style scoped>
.theme-toggle-button {
  /* 确保按钮有足够的点击区域 */
  min-width: 44px;
  min-height: 44px;
}

/* 图标旋转动画 */
.theme-toggle-button[disabled] :deep(.i-heroicons-arrow-path) {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* 主题切换时的微妙动画 */
.theme-toggle-button :deep(.i-heroicons-sun),
.theme-toggle-button :deep(.i-heroicons-moon) {
  transition: transform 0.3s ease-in-out;
}

.theme-toggle-button:hover :deep(.i-heroicons-sun),
.theme-toggle-button:hover :deep(.i-heroicons-moon) {
  transform: rotate(15deg) scale(1.1);
}
</style>
