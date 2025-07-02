<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-primary transition-colors duration-300">
    <!-- 页面头部 -->
    <AppHeader />

    <!-- 主要内容区域 -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- 页面底部 -->
    <AppFooter />

    <!-- 主题切换动画层 -->
    <div
         id="theme-transition-layer"
         class="theme-transition-layer"></div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' }
  ]
})

// 页面加载完成后的处理
onMounted(() => {
  // 颜色模式会自动通过 @nuxtjs/color-mode 模块处理
  console.log('SCAI 官网布局已加载')
})
</script>

<style>
/* 主题切换动画层样式 - 使用 UnoCSS 兼容的方式 */
.theme-transition-layer {
  /* 基础定位 */
  position: fixed;
  inset: 0;
  z-index: 99999;

  /* 交互和可见性 */
  pointer-events: none;
  opacity: 0;
  background-color: transparent;

  /* 初始裁剪路径 */
  clip-path: circle(0%);

  /* 动画过渡效果 - 更流畅的贝塞尔曲线 */
  transition:
    clip-path 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.3s ease-in-out;

  /* 确保在所有设备上都能正常工作 */
  will-change: clip-path, opacity;
  transform: translateZ(0);
  /* 启用硬件加速 */
}

/* 动画激活状态 */
.theme-transition-layer.active {
  opacity: 1;
}

/* 为了更好的性能，在动画期间禁用某些效果 */
.theme-transition-layer.animating {
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
