<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="container mx-auto px-4 py-16">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-heading-large mb-4">
          主题切换动画测试页面
        </h1>
        <p class="text-lg text-body max-w-2xl mx-auto">
          点击右上角的主题切换按钮来体验从点击位置扩散的圆形动画效果。
          动画会从你点击的位置开始，逐渐扩大覆盖整个屏幕，完成主题切换。
        </p>
      </div>

      <!-- 测试内容区域 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <!-- 卡片1 -->
        <div class="card card-hover">
          <div class="mb-4">
            <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-4">
              <Icon name="i-heroicons-sun" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-heading mb-2">浅色主题</h3>
            <p class="text-body">
              明亮清新的浅色主题，适合白天使用，提供清晰的视觉体验。
            </p>
          </div>
        </div>

        <!-- 卡片2 -->
        <div class="card card-hover">
          <div class="mb-4">
            <div class="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <Icon name="i-heroicons-moon" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-heading mb-2">深色主题</h3>
            <p class="text-body">
              优雅的深色主题，减少眼部疲劳，适合夜间或低光环境使用。
            </p>
          </div>
        </div>

        <!-- 卡片3 -->
        <div class="card card-hover">
          <div class="mb-4">
            <div class="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center mb-4">
              <Icon name="i-heroicons-sparkles" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-heading mb-2">动画效果</h3>
            <p class="text-body">
              流畅的圆形扩散动画，从点击位置开始，创造沉浸式的主题切换体验。
            </p>
          </div>
        </div>
      </div>

      <!-- 动画说明 -->
      <div class="bg-section-light rounded-2xl p-8 mb-12">
        <h2 class="text-2xl font-bold text-heading mb-6">动画效果说明</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-heading mb-3">技术实现</h3>
            <ul class="space-y-2 text-body">
              <li class="flex items-start">
                <span class="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                使用 CSS clip-path 属性创建圆形裁剪效果
              </li>
              <li class="flex items-start">
                <span class="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                获取鼠标点击坐标作为动画起始点
              </li>
              <li class="flex items-start">
                <span class="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                计算覆盖全屏所需的最大半径
              </li>
              <li class="flex items-start">
                <span class="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                使用贝塞尔曲线实现流畅的动画过渡
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-heading mb-3">用户体验</h3>
            <ul class="space-y-2 text-body">
              <li class="flex items-start">
                <span class="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                动画期间按钮显示加载状态
              </li>
              <li class="flex items-start">
                <span class="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                防止动画期间重复点击
              </li>
              <li class="flex items-start">
                <span class="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                硬件加速确保动画流畅性
              </li>
              <li class="flex items-start">
                <span class="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                错误处理确保功能可靠性
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 测试按钮区域 -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-heading mb-6">多位置测试</h2>
        <p class="text-body mb-8">
          尝试从页面的不同位置点击主题切换按钮，观察动画从不同起始点的效果。
        </p>
        
        <!-- 分布在不同位置的测试按钮 -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div class="flex justify-center">
            <ThemeToggle />
          </div>
          <div class="flex justify-center">
            <ThemeToggle />
          </div>
          <div class="flex justify-center">
            <ThemeToggle />
          </div>
          <div class="flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <!-- 返回首页 -->
      <div class="text-center mt-12">
        <NuxtLink 
          to="/" 
          class="btn btn-primary inline-flex items-center"
        >
          <Icon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
          返回首页
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
useHead({
  title: '主题切换动画测试 - SCAI',
  meta: [
    { name: 'description', content: '测试主题切换动画效果的页面' }
  ]
})

// 页面加载完成后的处理
onMounted(() => {
  console.log('主题切换测试页面已加载')
})
</script>

<style scoped>
/* 页面特定样式 */
.container {
  max-width: 1200px;
}

/* 确保图标正确显示 */
.icon {
  display: inline-block;
}
</style>
