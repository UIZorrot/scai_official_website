<template>
  <section id="products" class="bg-section-light section-padding">
    <div class="container-max">
      <!-- 标题区域 -->
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold text-heading md:text-4xl lg:text-5xl">
          我们的产品
        </h2>
        <p class="mx-auto max-w-3xl text-xl text-secondary">
          为科学研究提供全方位的Web3解决方案，从数据搜索到分析工具，助力科学发现。
        </p>
      </div>

      <!-- 产品网格 -->
      <div class="grid grid-cols-1 gap-8 mb-16 lg:grid-cols-2">
        <!-- SCAI Search -->
        <div class="card-product card-hover group">
          <div class="flex items-start space-x-6 p-8">
            <div class="flex-shrink-0">
              <div
                   class="flex justify-center items-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <MagnifyingGlassIcon class="w-8 h-8 text-white" />
              </div>
            </div>
            <div class="flex-1">
              <h3 class="mb-3 text-2xl font-semibold text-heading">
                SCAI Search
              </h3>
              <p class="mb-6 text-body">
                智能化的科学文献搜索引擎，基于AI技术提供精准的研究资料检索和推荐。
              </p>
              <button class="btn btn-primary">
                了解更多
                <ArrowRightIcon class="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- 产品截图 -->
          <div class="overflow-hidden mt-8 rounded-lg shadow-lg">
            <img
                 src="~/assets/images/1-1.png"
                 alt="SCAI Search 产品界面"
                 class="object-cover w-full h-48 transition-transform duration-300 hover:scale-105" />
          </div>
        </div>

        <!-- SCI BOX Studio -->
        <div class="card-product card-hover group">
          <div class="flex items-start space-x-6 p-8">
            <div class="flex-shrink-0">
              <div
                   class="flex justify-center items-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                <CubeIcon class="w-8 h-8 text-white" />
              </div>
            </div>
            <div class="flex-1">
              <h3 class="mb-3 text-2xl font-semibold text-heading">
                SCI BOX Studio
              </h3>
              <p class="mb-6 text-body">
                集成化的科研工作台，提供数据分析、可视化和协作功能的一站式解决方案。
              </p>
              <button class="btn btn-primary group-hover:bg-purple-600">
                了解更多
                <ArrowRightIcon class="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- 产品截图 -->
          <div class="overflow-hidden mt-8 rounded-lg shadow-lg">
            <img
                 src="~/assets/images/2-1.png"
                 alt="SCI BOX Studio 产品界面"
                 class="object-cover w-full h-48 transition-transform duration-300 hover:scale-105" />
          </div>
        </div>
      </div>

      <!-- 网络分析部分 -->
      <div class="p-8 card">
        <div class="mb-12 text-center">
          <h3 class="mb-4 text-3xl font-bold text-heading">
            网络分析
          </h3>
          <p class="text-xl text-secondary">
            实时监控和分析网络活动，提供深度洞察和数据驱动的决策支持。
          </p>
        </div>

        <!-- 分析指标网格 -->
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
               v-for="metric in networkMetrics"
               :key="metric.label"
               class="p-6 text-center bg-gray-50 rounded-lg dark:bg-gray-700">
            <div class="mb-2 text-3xl font-bold" :class="metric.color">
              {{ metric.value }}
            </div>
            <div class="mb-1 text-sm text-caption">
              {{ metric.label }}
            </div>
            <div class="text-xs text-muted">
              {{ metric.change }}
            </div>
          </div>
        </div>

        <!-- CTA 按钮 -->
        <div class="mt-12 text-center">
          <button class="btn btn-accent btn-lg">
            查看详细分析
            <ChartBarIcon class="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  MagnifyingGlassIcon,
  CubeIcon,
  ArrowRightIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline'

// 网络分析指标
const networkMetrics = [
  {
    label: 'Network Activity',
    value: '2.4M',
    change: '+12.5% from last month',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    label: 'Research Papers',
    value: '156K',
    change: '+8.2% from last month',
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    label: 'Token Economics',
    value: '$2.1M',
    change: '+15.3% from last month',
    color: 'text-purple-600 dark:text-purple-400'
  }
]
</script>

<style scoped>
/* 组件特定样式 */
.card {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

:global(.dark) .card-hover:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}
</style>
