<template>
  <section id="roadmap" class="py-16 bg-white dark:bg-black">
    <div class="container px-4 mx-auto">
      <!-- 标题区域 -->
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-3xl font-bold text-heading-large md:text-4xl">
          {{ $t('roadmap.title') }}
        </h2>
      </div>

      <!-- 路线图季度列表 -->
      <div class="mx-auto space-y-4 max-w-4xl">
        <!-- 动态渲染所有季度 -->
        <div
             v-for="quarter in quarters"
             :key="quarter.id"
             class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-lg">

          <!-- 季度标题 - 可点击 -->
          <div
               @click="toggleQuarter(quarter.id)"
               class="flex justify-between items-center p-4 cursor-pointer transition-colors duration-200  dark:hover:bg-gray-800">
            <div>
              <h3 class="text-lg font-bold text-heading">{{ $t(`roadmap.${quarter.id}.title`) }}</h3>
              <p class="text-sm text-caption">{{ $t(`roadmap.${quarter.id}.subtitle`) }}</p>
            </div>
            <svg
                 class="w-5 h-5 text-gray-400 transition-transform duration-300"
                 :class="{ 'rotate-180': expandedQuarters.includes(quarter.id) }"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <!-- 展开的内容 - 带动画 -->
          <Transition name="expand">
            <div v-if="expandedQuarters.includes(quarter.id)" class="overflow-hidden ">
              <div class="px-4 pb-4 space-y-3 ">
                <!-- 动态渲染每个季度的任务 -->
                <div
                     v-for="[taskKey, task] in Object.entries(quarter.tasks)"
                     :key="taskKey"
                     class="flex justify-between items-center p-3 rounded border transition-all duration-200"
                     :class="getTaskStatusClass(task.status)">
                  <span class="text-sm text-body">{{ getLocale(task) }}</span>
                  <span
                        class="px-2 py-1 text-xs font-medium rounded"
                        :class="getStatusBadgeClass(task.status)">
                    {{ getLocale(task.status) }}
                  </span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 国际化
const { t, locale } = useI18n()


// 季度数据
const quarters = ref([
  {
    id: '2025Q3',
    title: "2025Q3",
    subtitle: {
      "zh": "基金会与社区",
      "en": "Foundation & Community"
    },
    tasks: {
      "communityMigration": {
        "zh": "完成社区迁移和初始代币分发",
        "en": "Complete community migration and initial token distribution",
        "status": {
          "zh": "已完成",
          "en": "Completed"
        }
      },
      "partnership": {
        "zh": "初步建立整个产品体系的互通",
        "en": "Establish a strategic research partnership relationship",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
      "hackathon": {
        "zh": "使用SCAI参与大量黑客松",
        "en": "Participate in many hackathons using SCAI",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
      "nftCollection": {
        "zh": "发布SCA研究NFT收藏",
        "en": "Release the SCA Research NFT Collection",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      }
    }
  },
  {
    id: '2025Q4',
    title: "2025Q4",
    subtitle: {
      "zh": "平台开发",
      "en": "Platform Development"
    },
    tasks: {
      "communityMigration": {
        "zh": "完成个人学术主页功能",
        "en": "Complete personal academic homepage function",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
      "partnership": {
        "zh": "建立完全基于去中心化存储的系统",
        "en": "Establish a completely decentralized storage system",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
      "hackathon": {
        "zh": "完善整个投稿流程",
        "en": "Improve the entire submission process",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
      "nftCollection": {
        "zh": "开启基金会质押项目",
        "en": "Start the foundation staking project",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      }
    }
  },
  {
    id: '2026Q1',
    title: "2026Q1",
    subtitle: {
      "zh": "高级功能",
      "en": "Advanced Features"
    },
    tasks: {
      "communityMigration": {
        "zh": "获取DOI发行机构的支持",
        "en": "Obtain support from DOI publishers",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
      "partnership": {
        "zh": "基金会对SCAI生态的活动进行空投和资助",
        "en": "Airdrop and funding for SCAI ecosystem activities",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
      "hackathon": {
        "zh": "建立基于DID的学术论坛",
        "en": "Establish a DID-based academic forum",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
    }
  },
  {
    id: '2026Q2',
    title: "2026Q2",
    subtitle: {
      "zh": "生态系统扩展",
      "en": "Ecosystem Expansion"
    },
    tasks: {
      "communityMigration": {
        "zh": "使用AI完善整体审阅和发行流程",
        "en": "Use AI to improve the entire review and publication process",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
      "partnership": {
        "zh": "确定完善的审阅和作者激励体系",
        "en": "Determine a perfect review and author incentive system",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
      "hackathon": {
        "zh": "正式开启预印本服务",
        "en": "Officially launch the preprint service",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
    }
  },
  {
    id: '2026Q3',
    title: "2026Q3",
    subtitle: {
      "zh": "DeFi集成",
      "en": "DeFi Integration"
    },
    tasks: {
      "communityMigration": {
        "zh": "提供科研成果传播和转化路径",
        "en": "Provide a path for the dissemination and transformation of scientific research results",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
      "partnership": {
        "zh": "完善出版前所需的论文润色，修改，审查工具链",
        "en": "Improve the tools for paper editing, modification, and review before publication",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
      "hackathon": {
        "zh": "启动DAO进行社区提案和建设方向的确认",
        "en": "Launch a DAO to confirm community proposals and build direction",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
    }
  },
  {
    id: '2026Q4',
    title: "2026Q4",
    subtitle: {
      "zh": "AI集成",
      "en": "AI Integration"
    },
    tasks: {
      "communityMigration": {
        "zh": "基金会接触和孵化其他项目",
        "en": "Contact and incubate other projects",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
      "partnership": {
        "zh": "建立满足EI条件的期刊",
        "en": "Establish journals that meet EI conditions",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      },
      "hackathon": {
        "zh": "积极接触更多科研机构",
        "en": "Contact more scientific research institutions",
        "status": {
          "zh": "未开始",
          "en": "Upcoming"
        }
      }
    }
  }
])

// 展开的季度列表 - 默认展开 2025Q3
const expandedQuarters = ref(['2025Q3'])

// 切换季度展开/折叠
const toggleQuarter = (quarterId: string) => {
  // const index = expandedQuarters.value.indexOf(quarterId)
  // if (index > -1) {
  //   // 如果已展开，则折叠
  //   expandedQuarters.value.splice(index, 1)
  // } else {
  //   // 如果未展开，则展开
  //   expandedQuarters.value.push(quarterId)
  // }

  // 保持一个季度展开
  // if (expandedQuarters.value.length > 1) {
  // }
  expandedQuarters.value = [quarterId]
}

const getLocale = computed(() => (zhData: { zh: string, en: string }) => {
  return locale.value === 'zh' ? zhData['zh'] : zhData['en']
})

// 获取任务状态对应的样式类
const getTaskStatusClass = (status: { zh: string, en: string }) => {
  const statusText = getLocale.value(status).toLowerCase()
  if (statusText.includes('已完成') || statusText.includes('completed')) {
    return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
  } else if (statusText.includes('进行中') || statusText.includes('progress')) {
    return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
  } else {
    return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
  }
}

// 获取状态徽章的样式类
const getStatusBadgeClass = (status: { zh: string, en: string }) => {
  const statusText = getLocale.value(status).toLowerCase()
  if (statusText.includes('已完成') || statusText.includes('completed')) {
    return 'text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-800'
  } else if (statusText.includes('进行中') || statusText.includes('progress')) {
    return 'text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-800'
  } else {
    return 'text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-800'
  }
}

//实时监听语言是否切换，如果不写下面的监听，当你语言进行切换后需要刷新页面才能切换页面上的，
watch(() => locale.value, () => {
  console.log(locale.value)
})


</script>

<style scoped>
/* 优化的展开/折叠动画 */
.expand-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.6, 1);
  overflow: hidden;
}

.expand-enter-from {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-5px);
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
  /* 设置一个足够大的最大高度 */
  opacity: 1;
  transform: translateY(0);
}
</style>
