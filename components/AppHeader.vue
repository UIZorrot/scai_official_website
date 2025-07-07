<template>
  <header
          class="fixed top-0 right-0 left-0 z-50 bg-transparent border-b border-white/20 dark:border-gray-700">
    <nav class="px-4 mx-auto  sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink
                    to="/"
                    class="flex items-center space-x-2 text-xl font-bold text-white dark:text-white transition-colors duration-200 hover:text-red-500 dark:hover:text-white/80 no-underline">
            <img
                 src="~/assets/images/header_icon.png"
                 alt="SCAI Logo"
                 class="object-contain w-10 h-10" />
            <span>SCAI</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="flex items-baseline ml-10 space-x-8">
            <a
               v-for="item in navigation"
               :key="item.name"
               :href="item.href"
               @click="handleNavClick"
               class="px-3 py-2 text-sm font-medium text-white dark:text-white rounded-md transition-colors duration-200 hover:text-red-500 dark:hover:text-white/80 no-underline"
               :class="{
                'text-white dark:text-white font-semibold': activeSection === item.href.slice(1)
              }">
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- Right side actions -->
        <div class="flex items-center space-x-4">
          <!-- Theme Toggle / Settings -->
          <ClientOnly>
            <ThemeToggle />
          </ClientOnly>

          <!-- Language Toggle -->
          <LanguageToggle />

          <!-- Mobile menu button -->
          <button
                  v-if="width < 768"
                  @click="mobileMenuOpen = !mobileMenuOpen"
                  class="btn btn-accent p-1 text-white dark:text-white"
                  aria-expanded="false">
            <span class="sr-only">打开主菜单</span>
            <Bars3Icon
                       v-if="!mobileMenuOpen"
                       class="block w-6 h-6"
                       aria-hidden="true" />
            <XMarkIcon
                       v-else
                       class="block w-6 h-6"
                       aria-hidden="true" />
          </button>
        </div>

      </div>

      <!-- Mobile menu -->
      <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 transform scale-95"
                  enter-to-class="opacity-100 transform scale-100" leave-active-class="transition duration-75 ease-in"
                  leave-from-class="opacity-100 transform scale-100" leave-to-class="opacity-0 transform scale-95">
        <div v-show="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 border-t bg-white/10 border-white/20 sm:px-3">
            <a v-for="item in navigation" :key="item.name" :href="item.href" @click="handleNavClick"
               class="block px-3 py-2 text-base font-medium text-white rounded-md transition-colors duration-200 hover:bg-red-500 dark:hover:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10 no-underline"
               :class="{
                'text-white font-semibold bg-white/20': activeSection === item.href.slice(1)
              }">
              {{ item.name }}
            </a>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

// 国际化
const { t } = useI18n()

// 导航菜单项
const navigation = computed(() => [
  { name: t('nav.scaich'), href: 'https://search.scai.sh/' },
  { name: t('nav.scibox'), href: 'https://scibox.store/' },
  { name: t('nav.foundation'), href: 'https://foundation.scai.sh/' },
  { name: t('nav.community'), href: 'https://discord.gg/2kM8dRd5' },
])

// 响应式状态
const mobileMenuOpen = ref(false)
const activeSection = ref('')

// 路由相关
const route = useRoute()

// 平滑滚动导航处理
const handleNavClick = (event: Event) => {
  event.preventDefault()
  const target = event.target as HTMLAnchorElement
  const href = target.getAttribute('href')

  // 关闭移动端菜单
  mobileMenuOpen.value = false

  if (href === '/') {
    // 回到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
    activeSection.value = ''
  } else if (href?.startsWith('#')) {
    // 滚动到锚点
    const elementId = href.slice(1)
    const element = document.getElementById(elementId)
    if (element) {
      const headerHeight = 80 // 固定头部高度
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({ top: elementPosition, behavior: 'smooth' })
      activeSection.value = elementId
    }
  }
}

// 监听滚动，更新活动section
const updateActiveSection = () => {
  const sections = ['products', 'solutions', 'about', 'contact']
  const headerHeight = 80

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= headerHeight && rect.bottom > headerHeight) {
        activeSection.value = sectionId
        return
      }
    }
  }

  // 如果没有section在视口中，检查是否在顶部
  if (window.scrollY < 100) {
    activeSection.value = ''
  }
}

// 监听路由变化，关闭移动端菜单
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

// 监听窗口大小变化，在桌面端关闭移动端菜单
const { width } = useWindowSize()
watch(width, (newWidth) => {
  if (newWidth >= 768) {
    mobileMenuOpen.value = false
  }
})

// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection() // 初始化
})

// 组件卸载时移除监听
onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<style scoped>
header {
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 90%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}
</style>
