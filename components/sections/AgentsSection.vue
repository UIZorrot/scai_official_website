<template>
  <section class="py-16 bg-white dark:bg-black">
    <div class="w-full px-10">
      <div class=" flex justify-between items-center">
        <!-- 左边重复图片 -->
        <div class="flex items-center space-x-4">
          <div class="logo"></div>
        </div>

        <!-- 中间文字 -->
        <div class="flex-1 px-8 text-center">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl">
            INCUBATED BY SCAI COMMUNITY
          </h2>
        </div>

        <!-- 右边重复图片 -->
        <div class="flex items-center space-x-4">
          <div class="logo"></div>
        </div>
      </div>
    </div>

    <!-- 多代理协作说明区域 -->
    <div class="py-12 mt-12 bg-[#3FB5F7] ">
      <div class="container px-4 mx-auto text-center">
        <p class="mx-auto max-w-4xl text-lg font-bold leading-relaxed text-white dark:text-gray-100 md:text-xl">
          {{ $t('sections.multipleAgents') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// 国际化
const { t } = useI18n()
</script>
<style scoped>
.logo {
  width: 26dvw;
  height: 50px;
  background-image: url('~/assets/images/radis_logo.png');
  background-repeat: space;
  background-size: 50px 50px;
}
</style>
