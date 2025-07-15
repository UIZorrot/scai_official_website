import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  // 预设配置
  presets: [
    presetWind3(
      {
        dark: 'class',
      }
    ),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        heroicons: () => import('@iconify-json/heroicons/icons.json').then(i => i.default),
      },
    }),
    presetTypography(),
  ],

  // 转换器
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],

  // 主题配置 - 与原 Tailwind 配置保持一致
  theme: {
    colors: {
      // Primary 颜色系统 (蓝色系)
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
        950: '#082f49',
      },
      // Secondary 颜色系统 (灰色系)
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
      },
      // Accent 颜色系统 (橙色系)
      accent: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
        950: '#431407',
      },
      // Success 颜色系统 (绿色系)
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
        950: '#052e16',
      },
      // Warning 颜色系统 (黄色系)
      warning: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
        950: '#422006',
      },
      // Error 颜色系统 (红色系)
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
        950: '#450a0a',
      },
      // Info 颜色系统 (青色系)
      info: {
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
        950: '#083344',
      },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
      'slide-up': 'slideUp 0.5s ease-out',
      'blob': 'blob 7s infinite',
      'spin': 'spin 1s linear infinite',
      'theme-expand': 'themeExpand 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      'theme-contract': 'themeContract 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideUp: {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      blob: {
        '0%': { transform: 'translate(0px, 0px) scale(1)' },
        '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
        '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        '100%': { transform: 'translate(0px, 0px) scale(1)' },
      },
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
      themeExpand: {
        '0%': { clipPath: 'circle(0% at var(--click-x, 50%) var(--click-y, 50%))' },
        '100%': { clipPath: 'circle(150% at var(--click-x, 50%) var(--click-y, 50%))' },
      },
      themeContract: {
        '0%': { clipPath: 'circle(150% at var(--click-x, 50%) var(--click-y, 50%))' },
        '100%': { clipPath: 'circle(0% at var(--click-x, 50%) var(--click-y, 50%))' },
      },
      pulseSoft: {
        '0%, 100%': { opacity: '1', transform: 'scale(1)' },
        '50%': { opacity: '0.8', transform: 'scale(1.05)' },
      },
    },
  },

  // 自定义规则
  rules: [
    // 文字阴影工具类
    ['text-shadow', { 'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)' }],
    ['text-shadow-lg', { 'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.2)' }],

    // 背景模糊工具类
    ['backdrop-blur-xs', { 'backdrop-filter': 'blur(2px)' }],

    // 滚动条隐藏
    ['scrollbar-hide', {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
      '&::-webkit-scrollbar': 'none !important',
    }],

    // 动画延迟类
    ['animation-delay-2000', { 'animation-delay': '2s' }],
    ['animation-delay-4000', { 'animation-delay': '4s' }],
    ['border-b-1', { 'border-bottom': '1px solid rgba(0, 0, 0, 0.15)' }],
  ],

  // 快捷方式
  shortcuts: [
    // 按钮基础样式 - 现代化设计
    {
      'btn': 'inline-flex justify-center items-center px-6 py-3 text-sm font-semibold rounded-xl border border-transparent shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105',
      'btn-primary': 'text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500 shadow-blue-500/25 dark:shadow-blue-400/25',
      'btn-secondary': 'text-gray-700 bg-white border-gray-200 hover:bg-gray-50 focus:ring-gray-500 shadow-gray-500/10 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700',
      'btn-accent': 'text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:ring-orange-500 shadow-orange-500/25',
      'btn-hero-primary': 'text-white bg-red-600 hover:bg-red-700 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300',
      'btn-hero-secondary': 'text-white border-2 border-white/70 hover:bg-white/10 hover:border-white backdrop-blur-sm transition-all duration-300',
      'btn-lg': 'px-8 py-4 text-base rounded-2xl',
      'btn-sm': 'px-4 py-2 text-xs rounded-lg',
    },

    // 卡片样式 - 根据新设计优化
    {
      'card': 'bg-white rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl p-6',
      'card-hover': 'transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1',
      'card-team': 'bg-white rounded-2xl shadow-xl border border-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:shadow-3xl p-8',
      'card-analytics': 'bg-white rounded-xl shadow-md border border-gray-100 dark:bg-gray-900 dark:border-gray-700 p-6',
      'card-product': 'bg-white rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700 overflow-hidden',
    },

    // 背景样式 - 更精致的渐变和间距
    {
      'bg-section-light': 'bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800',
      'bg-section-dark': 'bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900',
      'bg-hero': 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800',
      'section-padding': 'py-20 px-4 sm:px-6 lg:px-8',
      'container-max': 'mx-auto max-w-7xl',
    },

    // 文字样式 - 语义化文本颜色系统
    {
      // 基础文本颜色
      'text-primary': 'text-gray-900 dark:text-white',
      'text-secondary': 'text-gray-600 dark:text-gray-300',
      'text-muted': 'text-gray-500 dark:text-gray-400',

      // 专门的文本类型
      'text-heading': 'text-gray-900 dark:text-gray-100',           // 标题文字
      'text-heading-large': 'text-black dark:text-white',          // 大标题文字
      'text-body': 'text-gray-700 dark:text-gray-300',             // 正文内容
      'text-caption': 'text-gray-600 dark:text-gray-400',          // 说明文字
      'text-label': 'text-gray-700 dark:text-gray-300',            // 表单标签
      'text-placeholder': 'text-gray-400 dark:text-gray-500',      // 占位符文字

      // 链接文字
      'text-link': 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
      'text-link-muted': 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200',

      // 状态文字
      'text-success': 'text-green-700 dark:text-green-300',
      'text-warning': 'text-yellow-700 dark:text-yellow-300',
      'text-error': 'text-red-700 dark:text-red-300',
      'text-info': 'text-blue-700 dark:text-blue-300',

      // 特殊用途
      'text-brand': 'text-blue-600 dark:text-blue-400',            // 品牌色文字
      'text-accent': 'text-orange-600 dark:text-orange-400',       // 强调色文字
      'text-inverse': 'text-white dark:text-gray-900',             // 反色文字（用于深色背景）
    },

    // 状态样式
    {
      'status-success': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800',
      'status-warning': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800',
      'status-error': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800',
      'status-info': 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900 dark:text-cyan-200 dark:border-cyan-800',
    },

    // 主题切换动画相关样式
    {
      'theme-transition-smooth': 'transition-all duration-300 ease-in-out',
      'theme-transition-fast': 'transition-all duration-150 ease-in-out',
      'theme-transition-slow': 'transition-all duration-500 ease-in-out',
      'theme-button': 'relative overflow-hidden backdrop-blur-sm border border-white/30 dark:border-gray-600/50 bg-white/10 dark:bg-gray-800/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl',
      'theme-button-disabled': 'cursor-not-allowed opacity-50 pointer-events-none',
      'theme-icon-spin': 'animate-spin',
      'theme-icon-hover': 'transition-transform duration-300 ease-in-out hover:rotate-15 hover:scale-110',
    },
  ],

  // 内容扫描路径
  content: {
    filesystem: [
      './components/**/*.{js,vue,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './app.vue',
      './error.vue'
    ]
  },
})
