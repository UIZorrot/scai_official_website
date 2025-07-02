<template>
  <div class="language-toggle">
    <UButton
             @click="switchLanguage(currentLocale?.code)"
             variant="ghost"
             color="neutral"
             size="lg"
             :title="currentLocale?.name"
             :aria-label="currentLocale?.name"
             class="text-white dark:text-gray-200 border border-white/30 dark:border-gray-600/50 bg-white/10 dark:hover:bg-gray-700/50 py-1.5 px-2 cursor-pointer">
      {{ currentLocale?.name?.toUpperCase() || 'ENGLISH' }}
    </UButton>
  </div>
</template>

<script setup lang="ts">

// 国际化相关
const { locale, setLocale, locales } = useI18n()

// 计算属性
const availableLocales = computed(() => locales.value)

const currentLocale = computed(() => {
  return availableLocales.value.find(l => l.code === locale.value) || availableLocales.value[0]
})

// 切换语言
const switchLanguage = (localeCode: 'en' | 'zh') => {
  // 切换语言
  setLocale(localeCode === 'en' ? 'zh' : 'en')
}
</script>

<style scoped>
/* 确保下拉菜单在最顶层 */
.language-toggle {
  position: relative;
  z-index: 60;
}
</style>
