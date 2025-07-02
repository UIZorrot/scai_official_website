<template>
  <footer class="py-6 text-white bg-black dark:bg-gray-900">
    <div class="container px-4 mx-auto">
      <div class="flex justify-between items-center">
        <!-- 左侧：Logo和标语 -->
        <div class="flex items-center space-x-3">
          <img
               src="~/assets/images/logo.png"
               alt="SCAI Logo"
               class="object-contain w-8 h-8" />
          <span class="font-medium text-white dark:text-gray-200">
            {{ $t('footer.tagline') }}
          </span>
        </div>

        <!-- 右侧：社交图标 -->
        <div class="flex items-center space-x-4">
          <!-- X (Twitter) -->
          <a
             href="https://twitter.com/scai"
             target="_blank"
             rel="noopener noreferrer"
             class="text-white dark:text-gray-200 transition-colors hover:text-gray-300 dark:hover:text-gray-100">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          <!-- 分享图标 -->
          <a
             href="#"
             class="text-white dark:text-gray-200 transition-colors hover:text-gray-300 dark:hover:text-gray-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </a>

          <!-- GitHub -->
          <a
             href="https://github.com/scai"
             target="_blank"
             rel="noopener noreferrer"
             class="text-white dark:text-gray-200 transition-colors hover:text-gray-300 dark:hover:text-gray-100">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 国际化
const { t } = useI18n()
</script>

<style scoped>
/* 简洁的页脚样式 */
footer {
  margin-top: auto;
}
</style>
