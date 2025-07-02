<template>
  <section id="team" class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container px-4 mx-auto">
      <!-- 标题区域 -->
      <div class="mb-16 text-center">
        <h2 class="mb-6 text-4xl font-bold text-heading md:text-5xl">
          {{ $t('team.title') }}
        </h2>
        <p class="mx-auto max-w-3xl text-xl leading-relaxed text-body">
          {{ $t('team.subtitle') }}
        </p>
      </div>

      <!-- 团队成员展示 -->
      <div class="mx-auto">
        <!-- 主要团队成员 -->
        <div class="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
               v-for="member in teamMembers"
               :key="member.name"
               class="p-8 bg-white rounded-2xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] dark:hover:shadow-gray-900/50 ">
            <div class="flex flex-col items-center text-center md:flex-row md:text-left md:items-start">
              <!-- 头像 -->
              <div class="mb-6 md:mb-0 md:mr-8">
                <div class="relative">
                  <img
                       src="~/assets/images/logo.png"
                       alt="Dr. Alex Chen"
                       class="object-cover w-32 h-32 rounded-full border-4 border-white shadow-lg dark:border-gray-600" />
                  <!-- 在线状态指示器 -->
                  <div
                       class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800">
                  </div>
                </div>
              </div>

              <!-- 成员信息 -->
              <div class="flex-1 space-y-4">
                <div>
                  <h3 class="mb-2 text-2xl font-bold text-heading">
                    {{ member.name }}
                  </h3>
                  <p class="text-lg font-semibold text-brand">
                    {{ member.role }}
                  </p>
                </div>

                <p class="text-base leading-relaxed text-body">
                  {{ $t('team.memberDescription') }}
                </p>

                <!-- 社交链接 -->
                <div class="flex justify-center space-x-4 md:justify-start">
                  <a href="#"
                     class="p-2 text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-300">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="#"
                     class="p-2 text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-300">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                            d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a href="#"
                     class="p-2 text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-300">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                            d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                    </svg>
                  </a>
                </div>
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
const { t } = useI18n()

const teamMembers = [
  {
    name: 'Dr. Alex Chen',
    role: 'CEO',
    description: 'Dr. Alex Chen is the CEO of SCAI.',
  },
  {
    name: 'Dr. Alex Chen',
    role: 'CEO',
    description: 'Dr. Alex Chen is the CEO of SCAI.',
  },
  {
    name: 'Dr. Alex Chen',
    role: 'CEO',
    description: 'Dr. Alex Chen is the CEO of SCAI.',
  },
  {
    name: 'Dr. Alex Chen',
    role: 'CEO',
    description: 'Dr. Alex Chen is the CEO of SCAI.',
  },
  {
    name: 'Dr. Alex Chen',
    role: 'CEO',
    description: 'Dr. Alex Chen is the CEO of SCAI.',
  },
  {
    name: 'Dr. Alex Chen',
    role: 'CEO',
    description: 'Dr. Alex Chen is the CEO of SCAI.',
  },
  {
    name: 'Dr. Alex Chen',
    role: 'CEO',
    description: 'Dr. Alex Chen is the CEO of SCAI.',
  },
  {
    name: 'Dr. Alex Chen',
    role: 'CEO',
    description: 'Dr. Alex Chen is the CEO of SCAI.',
  },
]

</script>

<style scoped>
/* 团队页面样式 */
</style>
