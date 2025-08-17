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
          <div
               v-for="item in partners"
               class="p-8 bg-white rounded-xl border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer flex items-center justify-center">
            <div class="flex items-center text-center space-y-4" @click="handleOpen(item.url)">
              <img :src="useAssetsImage(`images/partners/${item.image}`)" :alt="item.name"
                   class="w-189px h-140px object-contain" />
              <p class="text-xl font-bold dark:bg-gray-800 sm:text-4xl">{{ item.name }}</p>
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
const { useAssetsImage } = useAssets()


const partners = [
  { name: 'IRYS', image: 'irys.png', url: "https://irys.xyz/" },
  { name: 'DESAI.XYZ', image: 'desai.png', url: "https://x.com/DeSAI_xyz" },
  { name: 'WTF', image: 'wtf.png', url: " https://irys.xyz/" },
  { name: 'DJDOG', image: 'djdog.png', url: "https://dj.dog/" },
  { name: 'Dlife', image: 'dlife.png', url: "https://dlife.xyz/" },
  { name: 'Z2H_Academy', image: 'z2h.png', url: "https://x.com/Z2H_Web3" },
  { name: 'TROL', image: 'trol.png', url: "https://x.com/trolpumpscience" },
  { name: 'Co-Connect', image: 'coconnect.png', url: "https://x.com/CoConnect_" }
];


const handleOpen = (url: string) => {
  if (url) {
    window.open(url, '_blank');
  }
};
</script>

<style scoped>
/* 团队页面样式 */
</style>
