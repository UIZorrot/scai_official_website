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
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div
               v-for="member in teamMembers"
               :key="member.name"
               class="p-8 bg-white rounded-2xl  b b-solid border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300  hover:scale-[1.02] dark:hover:shadow-gray-900/50 cursor-pointer flex flex-col items-center text-center">
            <!-- 头像 -->
            <img
                 :src="useAssetsImage(`images/head/${member.head}.png`)"
                 :alt="member.name"
                 class="object-cover w-50px h-50px rounded-full border-4 border-white shadow-lg dark:border-gray-600" />
            <div>
              <h3 class="mb-2 text-2xl font-bold text-heading">
                {{ member.name }}
              </h3>
              <p class="text-lg font-semibold text-brand">
                {{ member.role[locale] }}
              </p>
            </div>

            <p class="text-base leading-relaxed text-body">
              {{ member.description[locale] }}
            </p>

            <!-- 社交链接 -->
            <div class="flex justify-center space-x-4 md:justify-start">
              <a :href="member.xlink"
                 class="p-2 text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a :href="member.github"
                 class="p-2 text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 国际化
const { locale } = useI18n()

const { useAssetsImage } = useAssets()


const teamMembers = [
  {
    "name": "Zorrot",
    "role": {
      "en": "Technical Expert",
      "zh": "技术专家"
    },
    "description": {
      "en": "Computer Science PhD",
      "zh": "计算机科学博士"
    },
    "xlink": "https://x.com/ZorrotChen/",
    "github": "https://github.com/UIZorrot/",
    head: 'zc'
  },
  {
    "name": "Keien",
    "role": {
      "en": "Technical Expert",
      "zh": "技术专家"
    },
    "description": {
      "en": "Web3 Engineer",
      "zh": "Web3工程师"
    },
    "xlink": "https://x.com/Happyporter4",
    "github": "https://github.com/keienWang",
    "head": "kw"
  },
  {
    "name": "Heinz",
    "role": {
      "en": "Technical Expert",
      "zh": "技术专家"
    },
    "description": {
      "en": "Serverless DApp Developer",
      "zh": "无服务器DApp开发者"
    },
    "xlink": "https://x.com/seseleek/",
    "github": "https://github.com/hextrump/",
    "head": "hz"
  },
  {
    "name": "YY",
    "role": {
      "en": "Technical Expert",
      "zh": "技术专家"
    },
    "description": {
      "en": "professional full-stack engineer",
      "zh": "专业全栈工程师"
    },
    "xlink": "#",
    "github": "https://github.com/xiaojia21190",
    "head": "yy"
  },
  {
    "name": "Ryan Xiao",
    "role": {
      "en": "Product Design",
      "zh": "产品设计"
    },
    "description": {
      "en": "UI/UX Visual Design Expert ・ Visual Experience Optimizer",
      "zh": "UI/UX 视觉设计专家・视觉体验优化师"
    },
    "xlink": "https://x.com/guobuqiran1821",
    "github": "https://github.com/ckjxxf",
    "head": "kk"
  },
  {
    "name": "P",
    "role": {
      "en": "Market Operation, Product Design",
      "zh": "市场运营, 产品设计"
    },
    "description": {
      "en": "Blockchain application implementation",
      "zh": "区块链应用落地"
    },
    "xlink": "https://x.com/awakeypunky",
    "github": "https://github.com/AwakeyPunky",
    "head": "pp"
  },
  {
    "name": "Erica Deng",
    "role": {
      "en": "Market Operation",
      "zh": "市场运营"
    },
    "description": {
      "en": "WEB3 Business Development and marketing",
      "zh": "WEB3业务发展和营销"
    },
    "xlink": "https://x.com/ricaca00",
    "github": "https://github.com/YOURERICACA",
    "head": "ed"
  },
  {
    "name": "DrLin1895",
    "role": {
      "en": "Market Operation",
      "zh": "市场运营"
    },
    "description": {
      "en": "Biomedical PhD, pharmaceutical scientist",
      "zh": "生物醫學博士，藥物科學家"
    },
    "xlink": "https://x.com/destinylin1113?t=-Bz1tL0IGvStxpfH3YoC9w&s=09",
    "github": "https://www.threads.net/\\@drlin1895",
    "head": "dr"
  },
  {
    "name": "KingmenHuang",
    "role": {
      "en": "Market Operation",
      "zh": "市场运营"
    },
    "description": {
      "en": "Polymer materials application expert, blockchain early player",
      "zh": "高分子材料应用专家，区块链早期玩家"
    },
    "xlink": "https://x.com/KingmenHuang",
    "github": "http://github.com/kingmenHuang",
    "head": "kh"
  },

]

</script>

<style scoped>
/* 团队页面样式 */
</style>
