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
               class="p-8 bg-white rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer flex items-center justify-center">
            <div class="flex items-center text-center space-y-4 ">
              <img src="@/assets/images/partners/irys.png" alt="IRYS" class="w-189px h-140px object-contain" />
              <p class="text-4xl font-bold dark:bg-gray-800">IRYS</p>
            </div>
          </div>

          <!-- DESAI.XYZ 合作伙伴 -->
          <div
               class="p-8 bg-white rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer flex items-center justify-center">
            <div class="flex  items-center text-center space-y-4">
              <img src="@/assets/images/partners/desai.png" alt="DESAI.XYZ" class="w-189px h-140px object-contain" />
              <p class="text-4xl font-bold dark:bg-gray-800">DESAI.XYZ</p>
            </div>
          </div>
          <!-- WTF 合作伙伴 -->
          <div
               class="p-8 bg-white rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer flex items-center justify-center">
            <div class="flex  items-center text-center space-y-4">
              <img src="@/assets/images/partners/wtf.png" alt="WTF" class="w-189px h-140px object-contain" />
              <p class="text-4xl font-bold dark:bg-gray-800">WTF</p>
            </div>
          </div>
          <!-- DJDOG 合作伙伴 -->
          <div
               class="p-8 bg-white rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer flex items-center justify-center">
            <div class="flex  items-center text-center space-y-4">
              <img src="@/assets/images/partners/djdog.png" alt="DJDOG" class="w-189px h-140px object-contain" />
              <p class="text-4xl font-bold dark:bg-gray-800">DJDOG</p>
            </div>
          </div>
          <!-- Dlife 合作伙伴 -->
          <div
               class="p-8 bg-white rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer flex items-center justify-center">
            <div class="flex  items-center text-center space-y-4">
              <img src="@/assets/images/partners/dlife.png" alt="Dlife" class="w-189px h-140px object-contain" />
              <p class="text-4xl font-bold dark:bg-gray-800">DLIFE</p>
            </div>
          </div>
          <!-- Z2H 合作伙伴 -->
          <div
               class="p-8 bg-white rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer flex items-center justify-center">
            <div class="flex  items-center text-center space-y-4">
              <img src="@/assets/images/partners/z2h.png" alt="Z2H" class="w-189px h-140px object-contain" />
              <p class="text-4xl font-bold dark:bg-gray-800">Z2H_Academy</p>
            </div>
          </div>
          <!-- Trol 合作伙伴 -->
          <div
               class="p-8 bg-white rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer flex items-center justify-center">
            <div class="flex  items-center text-center space-y-4">
              <img src="@/assets/images/partners/trol.png" alt="Trol" class="w-189px h-140px object-contain" />
              <p class="text-4xl font-bold dark:bg-gray-800">TROL</p>
            </div>
          </div>
          <!-- Coconnect 合作伙伴 -->
          <div
               class="p-8 bg-white rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer flex items-center justify-center">
            <div class="flex  items-center text-center space-y-4">
              <img src="@/assets/images/partners/coconnect.png" alt="Coconnect"
                   class="w-189px h-140px object-contain" />
              <p class="text-4xl font-bold dark:bg-gray-800">Co-Connect</p>
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
