<template>
  <section id="partners" class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container px-4 mx-auto">
      <!-- 标题区域 -->
      <div class="mb-16 text-center">
        <h2 class="mb-6 text-4xl font-bold text-heading md:text-5xl">
          {{ $t("partners.title") }}
        </h2>
        <!-- <p class="mx-auto max-w-3xl text-xl leading-relaxed text-body">
          {{ $t("partners.subtitle") }}
        </p> -->
      </div>

      <div class="mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mx-auto">
          <!-- IRYS 合作伙伴 -->
          <div
               class="p-8 bg-black rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer">
            <div class="flex flex-col items-center text-center space-y-4">
              <img src="@/assets/images/partners/irys.png" alt="IRYS" class="w-189px h-140px object-contain" />
            </div>
          </div>

          <!-- DESAI.XYZ 合作伙伴 -->
          <div
               class="p-8 bg-black rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer">
            <div class="flex flex-col items-center text-center space-y-4">
              <img src="@/assets/images/partners/desai.png" alt="DESAI.XYZ" class="w-189px h-140px object-contain" />
            </div>
          </div>
          <!-- WTF 合作伙伴 -->
          <div
               class="p-8 bg-black rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer">
            <div class="flex flex-col items-center text-center space-y-4">
              <img src="@/assets/images/partners/wtf.png" alt="DESAI.XYZ" class="w-189px h-140px object-contain" />
            </div>
          </div>
          <!-- DJDOG 合作伙伴 -->
          <div
               class="p-8 bg-black rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer">
            <div class="flex flex-col items-center text-center space-y-4">
              <img src="@/assets/images/partners/djdog.png" alt="DJDOG" class="w-189px h-140px object-contain" />
            </div>
          </div>
          <!-- Dlife 合作伙伴 -->
          <div
               class="p-8 bg-black rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer">
            <div class="flex flex-col items-center text-center space-y-4">
              <img src="@/assets/images/partners/dlife.png" alt="Dlife" class="w-189px h-140px object-contain" />
            </div>
          </div>
          <!-- Z2H 合作伙伴 -->
          <div
               class="p-8 bg-black rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer">
            <div class="flex flex-col items-center text-center space-y-4">
              <img src="@/assets/images/partners/z2h.png" alt="Z2H" class="w-189px h-140px object-contain" />
            </div>
          </div>
          <!-- Trol 合作伙伴 -->
          <div
               class="p-8 bg-black rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer">
            <div class="flex flex-col items-center text-center space-y-4">
              <img src="@/assets/images/partners/trol.png" alt="Trol" class="w-189px h-140px object-contain" />
            </div>
          </div>
          <!-- Coconnect 合作伙伴 -->
          <div
               class="p-8 bg-black rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer">
            <div class="flex flex-col items-center text-center space-y-4">
              <img src="@/assets/images/partners/coconnect.png" alt="Coconnect"
                   class="w-189px h-140px object-contain" />
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
