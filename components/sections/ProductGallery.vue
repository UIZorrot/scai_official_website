<template>
  <section id="products" class="py-16 bg-white dark:bg-black">
    <div class="container px-4 mx-auto">
      <!-- 标题区域 -->
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-3xl font-bold text-heading-large md:text-4xl">
          {{ $t('products.title') }}
        </h2>
        <p class="mx-auto max-w-4xl text-lg text-secondary">
          {{ $t('products.subtitle') }}
        </p>
      </div>

      <!-- 产品展示区域 -->
      <div class="grid grid-cols-1 gap-12 mx-auto max-w-7xl lg:grid-cols-2">
        <!-- SCAI SEARCH -->
        <div class="text-center">
          <!-- 产品截图 -->
          <div class="overflow-hidden mb-6 rounded-lg shadow-lg">
            <img
                 src="~/assets/images/1-1.png"
                 alt="SCAI Search Interface"
                 class="object-cover w-full h-64" />
          </div>

          <!-- 产品信息 -->
          <div class="mb-6">
            <h3 class="mb-2 text-2xl font-bold text-heading">
              {{ $t('products.scaiSearch.title') }}
            </h3>
            <p class="mb-4 text-lg text-body">
              {{ $t('products.scaiSearch.subtitle') }}
            </p>
            <p class="text-sm leading-relaxed text-caption">
              {{ $t('products.scaiSearch.description') }}
            </p>
          </div>

          <!-- 访问按钮 -->
          <button
                  class="inline-flex items-center px-8 py-3 font-bold text-white bg-red-500 rounded transition-all duration-300  hover:bg-red-600 hover:shadow-xl hover:scale-105 border border-red-500"
                  @click="handClick('https://search.scai.sh/')">
            {{ $t('products.scaiSearch.visitPlatform') }}
            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        <!-- SCI BOX STORE -->
        <div class="text-center">
          <!-- 产品截图 -->
          <div class="overflow-hidden mb-6 rounded-lg shadow-lg">
            <img
                 src="~/assets/images/2-1.png"
                 alt="SciBox Interface"
                 class="object-cover w-full h-64" />
          </div>

          <!-- 产品信息 -->
          <div class="mb-6">
            <h3 class="mb-2 text-2xl font-bold text-heading">
              {{ $t('products.sciBoxStore.title') }}
            </h3>
            <p class="mb-4 text-lg text-body">
              {{ $t('products.sciBoxStore.subtitle') }}
            </p>
            <p class="text-sm leading-relaxed text-caption">
              {{ $t('products.sciBoxStore.description') }}
            </p>
          </div>

          <!-- 访问按钮 -->
          <button
                  class="inline-flex items-center px-8 py-3 font-bold text-white bg-red-500 rounded transition-all duration-300 hover:bg-red-600 hover:shadow-xl hover:scale-105 border border-red-500 sm:my-6"
                  @click="handClick('https://scibox.store/')">
            {{ $t('products.sciBoxStore.visitPlatform') }}
            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 国际化
const { t } = useI18n()

const handClick = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
/* 简洁的样式 */
</style>
