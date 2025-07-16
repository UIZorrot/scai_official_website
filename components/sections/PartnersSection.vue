<template>
  <section id="partners" class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container px-4 mx-auto">
      <!-- 标题区域 -->
      <div class="mb-16 text-center">
        <h2 class="mb-6 text-4xl font-bold text-heading md:text-5xl">
          {{ $t("partners.title") }}
        </h2>
        <p class="mx-auto max-w-3xl text-xl leading-relaxed text-body">
          {{ $t("partners.subtitle") }}
        </p>
      </div>

      <div class="mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 mx-auto">
          <!-- IRYS 合作伙伴 -->
          <div
               class="p-8 bg-white rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer">
            <div class="flex flex-col sm:flex-row items-center text-center space-y-4">
              <img src="@/assets/images/partners/irys.png" alt="IRYS" class="w-189px h-140px object-contain" />
              <div class="flex sm:flex-row flex-col sm:items-start items-center ml-4 justify-center">
                <p class="text-4xl font-bold text-heading m-0">
                  {{ $t("partners.irys.title") }}
                </p>
                <p class="text-lg text-gray-600 dark:text-gray-300 text-left">
                  {{ $t("partners.irys.subtitle") }}
                </p>
              </div>
            </div>
          </div>

          <!-- DESAI.XYZ 合作伙伴 -->
          <div
               class="p-8 bg-white rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer">
            <div class="flex flex-col sm:flex-row items-center text-center space-y-4">
              <img src="@/assets/images/partners/desai.png" alt="DESAI.XYZ" class="w-189px h-140px object-contain" />
              <div class="flex sm:flex-row flex-col sm:items-start items-center ml-4 justify-center">
                <p class="text-4xl font-bold text-heading m-0">
                  {{ $t("partners.desai.title") }}
                </p>
                <p class="text-lg text-gray-600 dark:text-gray-300 text-left">
                  {{ $t("partners.desai.subtitle") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 国际化
const { t } = useI18n();
</script>

<style scoped>
/* 团队页面样式 */
</style>
