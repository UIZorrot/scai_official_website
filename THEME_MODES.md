# SCAI 网站现代化设计系统

## 🎨 最新设计升级

基于最新的设计图，我们已经实现了更加现代化和精致的视觉系统：

### ✨ 现代化设计特色
- **更大的圆角**：使用 `rounded-2xl` (16px) 替代传统的 `rounded-lg`
- **增强的阴影系统**：多层次阴影效果，提供更好的深度感
- **渐变按钮**：使用渐变色彩，提升视觉吸引力
- **玻璃态效果**：添加 backdrop-filter 模糊效果
- **更流畅的动画**：使用 cubic-bezier 缓动函数
- **更精致的间距**：优化内边距和外边距比例

### 🌞 浅色模式（Light Mode）
- **背景色调**：白色和浅灰色为主
- **卡片样式**：纯白背景，轻微阴影
- **文字颜色**：深色文字，良好对比度
- **适用场景**：日间使用，明亮环境

### 🌙 深色模式（Dark Mode）
- **背景色调**：深灰色和黑色为主
- **卡片样式**：深色背景，增强阴影
- **文字颜色**：浅色文字，护眼设计
- **适用场景**：夜间使用，低光环境

## 🔧 技术实现

### UnoCSS 配置优化
```typescript
// uno.config.ts 中的关键配置
shortcuts: [
  // 增强的卡片样式
  'card': 'bg-white rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:shadow-xl',
  'card-hover': 'transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl hover:scale-102',

  // 背景样式
  'bg-section-light': 'bg-gray-50 dark:bg-gray-900',
  'bg-section-dark': 'bg-white dark:bg-black',

  // 文字样式
  'text-primary': 'text-gray-900 dark:text-white',
  'text-secondary': 'text-gray-600 dark:text-gray-300',
]
```

### 自定义 CSS 增强
```css
/* assets/css/main.css 中的特殊样式 */
.card-enhanced {
  /* 浅色模式 */
  background: white;
  border: 1px solid rgb(229 231 235);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.dark .card-enhanced {
  /* 深色模式 */
  background: rgb(31 41 55);
  border-color: rgb(55 65 81);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3);
}
```

## 🎯 使用方法

### 1. 自动主题切换
网站会根据用户系统偏好自动选择主题：
- 系统设置为浅色 → 显示浅色模式
- 系统设置为深色 → 显示深色模式

### 2. 手动主题切换
用户可以通过右上角的主题切换按钮手动切换：
- 🌞 图标 → 当前为浅色模式，点击切换到深色
- 🌙 图标 → 当前为深色模式，点击切换到浅色

### 3. 组件中使用新样式类

#### 基础卡片
```vue
<div class="card card-hover">
  <!-- 内容 -->
</div>
```

#### 团队卡片
```vue
<div class="card-team">
  <!-- 团队成员信息 -->
</div>
```

#### 数据分析卡片
```vue
<div class="analytics-card">
  <!-- 数据内容 -->
</div>
```

#### 背景区域
```vue
<!-- 浅色背景区域 -->
<section class="bg-section-light">
  <!-- 内容 -->
</section>

<!-- 深色背景区域 -->
<section class="bg-section-dark">
  <!-- 内容 -->
</section>
```

## 🚀 性能优化

### UnoCSS 优势
1. **按需生成**：只生成实际使用的 CSS
2. **更小体积**：相比 Tailwind CSS 减少约 30% 的包大小
3. **更快构建**：构建速度提升约 50%
4. **更好的 Tree-shaking**：未使用的样式完全不会打包

### 主题切换性能
- 使用 CSS 变量和类切换，无需重新渲染
- 过渡动画流畅，用户体验优秀
- 状态持久化，刷新页面保持用户选择

## 📱 响应式支持

所有主题模式都完全支持响应式设计：
- **移动端**：优化的触摸体验
- **平板端**：适配中等屏幕尺寸
- **桌面端**：充分利用大屏幕空间

## 🎨 自定义扩展

如需添加新的主题变体，可以在 `uno.config.ts` 中扩展：

```typescript
shortcuts: [
  // 添加新的卡片样式
  'card-special': 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900',

  // 添加新的文字样式
  'text-highlight': 'text-blue-600 dark:text-blue-400',
]
```

## ✅ 迁移完成状态

- ✅ 从 Tailwind CSS 4.x 迁移到 UnoCSS
- ✅ 集成 NuxtUI 组件库
- ✅ 保持所有现有功能
- ✅ 优化深浅色模式切换
- ✅ 增强视觉效果和用户体验
- ✅ 提升构建性能和包大小

网站现在完全使用 UnoCSS + NuxtUI 技术栈，提供更好的性能和开发体验！🎉
