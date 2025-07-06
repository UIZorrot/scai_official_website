# SCAI Official Website

这是 SCAI (Specialized Cognitive AI) 的官方网站，采用现代化的 Web 技术栈构建，为用户提供关于 SCAI 项目的全面信息。

## 📦 安装依赖

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## 🔧 开发服务器

启动开发服务器 `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 🏗️ 生产构建

构建生产版本:

```bash
# npm
npm run build

# pm2
pm2 start ecosystem.config.js --env production
```

## 👀 预览生产版本

本地预览生产构建:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## 📁 项目结构

```
scai_official_website/
├── components/           # Vue 组件
│   ├── sections/        # 页面区块组件
│   ├── AppHeader.vue    # 头部组件
│   ├── AppFooter.vue    # 底部组件
│   ├── ThemeToggle.vue  # 主题切换
│   └── LanguageToggle.vue # 语言切换
├── i18n/                # 国际化配置
│   └── locales/         # 语言文件
├── assets/              # 静态资源
│   ├── css/            # 样式文件
│   └── images/         # 图片资源
├── pages/               # 页面路由
├── composables/         # 组合式函数
└── layouts/             # 布局模板
```

## 🌐 部署

查看 [Nuxt 部署文档](https://nuxt.com/docs/getting-started/deployment) 了解更多部署信息。

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests 来改进项目。

## 📄 许可证

本项目采用相应的开源许可证，详情请查看项目许可证文件。
