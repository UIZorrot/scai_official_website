// composables/useThemeTransition.ts - UnoCSS 主题切换动画完整版
import { useColorMode } from '#imports'

export const useThemeTransition = () => {
  const colorMode = useColorMode()

  const themeColors: Record<string, string> = {
    // 使用项目中的实际颜色配置
    light: '#ffffff',
    dark: '#111827', // 更深的灰色，与 UnoCSS 配置保持一致
  }

  // 用于防止在动画播放时重复点击
  let isAnimating = false

  // 切换函数，它必须接收 MouseEvent 来获取点击坐标
  const toggle = async (event: MouseEvent) => {
    if (isAnimating) return
    isAnimating = true

    const transitionLayer = document.getElementById('theme-transition-layer')
    if (!transitionLayer) {
      console.error('动画层元素 #theme-transition-layer 未找到。')
      isAnimating = false
      return
    }

    try {
      // 1. 获取点击坐标
      const x = event.clientX
      const y = event.clientY

      // 2. 确定目标主题和动画颜色
      const targetTheme = colorMode.value === 'dark' ? 'light' : 'dark'
      const targetColor = themeColors[targetTheme]

      // 3. 计算覆盖全屏所需的最终半径
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      ) + 50 // 增加一点余量确保完全覆盖

      // 4. 准备动画：在点击位置创建一个半径为0的、带颜色的圆
      transitionLayer.style.backgroundColor = targetColor
      transitionLayer.style.clipPath = `circle(0px at ${x}px ${y}px)`

      // 确保动画层可见
      transitionLayer.style.opacity = '1'

      // 等待一帧，确保浏览器应用了上面的初始样式
      await new Promise(resolve => requestAnimationFrame(resolve))

      // 5. 播放展开动画
      transitionLayer.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`

      // 6. 等待动画展开到一半时切换主题
      await new Promise(resolve => setTimeout(resolve, 300)) // 动画总时长的一半

      // 在动画中途切换真实的主题
      colorMode.preference = targetTheme

      // 7. 等待动画完全结束
      await new Promise(resolve => {
        const handleTransitionEnd = () => {
          transitionLayer.removeEventListener('transitionend', handleTransitionEnd)
          resolve(undefined)
        }
        transitionLayer.addEventListener('transitionend', handleTransitionEnd)

        // 设置一个超时作为备用，防止事件未触发
        setTimeout(() => {
          transitionLayer.removeEventListener('transitionend', handleTransitionEnd)
          resolve(undefined)
        }, 800)
      })

      // 8. 动画结束后，开始收缩动画
      await new Promise(resolve => setTimeout(resolve, 100)) // 短暂停留

      // 开始收缩动画
      transitionLayer.style.clipPath = `circle(0px at ${x}px ${y}px)`

      // 等待收缩动画结束
      await new Promise(resolve => {
        const handleTransitionEnd = () => {
          transitionLayer.removeEventListener('transitionend', handleTransitionEnd)
          resolve(undefined)
        }
        transitionLayer.addEventListener('transitionend', handleTransitionEnd)

        setTimeout(() => {
          transitionLayer.removeEventListener('transitionend', handleTransitionEnd)
          resolve(undefined)
        }, 800)
      })

      // 9. 重置动画层
      transitionLayer.style.backgroundColor = 'transparent'
      transitionLayer.style.opacity = '0'
      transitionLayer.style.clipPath = 'circle(0%)'

    } catch (error) {
      console.error('主题切换动画出错:', error)
      // 确保即使出错也能切换主题
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'

      // 重置动画层
      transitionLayer.style.backgroundColor = 'transparent'
      transitionLayer.style.opacity = '0'
      transitionLayer.style.clipPath = 'circle(0%)'
    } finally {
      // 10. 释放动画锁
      isAnimating = false
    }
  }

  return {
    toggleTheme: toggle,
    colorMode,
    isAnimating: () => isAnimating,
  }
}
