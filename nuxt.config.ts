// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },

  // 组件自动导入配置
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/components/sections',
      pathPrefix: false,
    }
  ],
  ui: {
    fonts: false,
  },

  // 启用的模块
  modules: [
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
    '@nuxt/ui'
  ],

  // 颜色模式配置
  colorMode: {
    preference: 'system', // 默认主题，'system' 表示跟随系统
    fallback: 'light',    // 当 system 不可用时回退到 light
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    //  关键配置：class 后缀，设置为空字符串
    //  这样深色模式的 class 就是 'dark'，而不是 'dark-mode'
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  // 国际化配置
  i18n: {
    defaultLocale: 'en',
    langDir: 'locales/',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'zh', name: '中文', file: 'zh.json' }
    ],
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  // CSS 配置
  css: ['~/assets/css/main.css'],

  // 应用配置
  app: {
    head: {
      title: 'SCAI - Web3 Brain for Science',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'SCAI - Web3 Brain for Science' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/rocket-icon.png' }
      ]
    }
  }
})
