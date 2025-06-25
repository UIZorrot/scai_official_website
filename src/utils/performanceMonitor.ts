/**
 * Performance monitoring utilities for homepage animations
 */

export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = 0;
  private fps = 0;
  private isMonitoring = false;
  private animationFrame?: number;
  private fpsCallback?: (fps: number) => void;

  constructor() {
    this.measureFPS = this.measureFPS.bind(this);
  }

  /**
   * Start monitoring FPS
   */
  startMonitoring(callback?: (fps: number) => void) {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.fpsCallback = callback;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.animationFrame = requestAnimationFrame(this.measureFPS);
  }

  /**
   * Stop monitoring FPS
   */
  stopMonitoring() {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  /**
   * Get current FPS
   */
  getCurrentFPS(): number {
    return this.fps;
  }

  /**
   * Measure FPS using requestAnimationFrame
   */
  private measureFPS(currentTime: number) {
    if (!this.isMonitoring) return;

    this.frameCount++;
    
    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.frameCount = 0;
      this.lastTime = currentTime;
      
      if (this.fpsCallback) {
        this.fpsCallback(this.fps);
      }
    }
    
    this.animationFrame = requestAnimationFrame(this.measureFPS);
  }

  /**
   * Check if animations are performing well (>= 55 FPS)
   */
  isPerformanceGood(): boolean {
    return this.fps >= 55;
  }

  /**
   * Get performance status
   */
  getPerformanceStatus(): 'excellent' | 'good' | 'poor' {
    if (this.fps >= 58) return 'excellent';
    if (this.fps >= 50) return 'good';
    return 'poor';
  }
}

/**
 * Utility to measure paint and layout performance
 */
export class LayoutPerformanceMonitor {
  private observer?: PerformanceObserver;
  private layoutShiftScore = 0;
  private paintTimes: number[] = [];

  /**
   * Start monitoring layout shifts and paint times
   */
  startMonitoring() {
    if ('PerformanceObserver' in window) {
      // Monitor layout shifts
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift') {
            this.layoutShiftScore += (entry as any).value;
          }
          if (entry.entryType === 'paint') {
            this.paintTimes.push(entry.startTime);
          }
        }
      });

      try {
        this.observer.observe({ entryTypes: ['layout-shift', 'paint'] });
      } catch (e) {
        console.warn('Performance monitoring not fully supported');
      }
    }
  }

  /**
   * Stop monitoring
   */
  stopMonitoring() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  /**
   * Get cumulative layout shift score
   */
  getLayoutShiftScore(): number {
    return this.layoutShiftScore;
  }

  /**
   * Get paint performance metrics
   */
  getPaintMetrics() {
    return {
      firstPaint: this.paintTimes[0] || 0,
      paintCount: this.paintTimes.length,
      averagePaintTime: this.paintTimes.length > 0 
        ? this.paintTimes.reduce((a, b) => a + b, 0) / this.paintTimes.length 
        : 0
    };
  }

  /**
   * Check if layout performance is good (CLS < 0.1)
   */
  isLayoutPerformanceGood(): boolean {
    return this.layoutShiftScore < 0.1;
  }
}

/**
 * Memory usage monitor for detecting memory leaks in animations
 */
export class MemoryMonitor {
  private initialMemory = 0;
  private isSupported = false;

  constructor() {
    // @ts-ignore - performance.memory is not in TypeScript types but exists in Chrome
    this.isSupported = 'memory' in performance;
    if (this.isSupported) {
      // @ts-ignore
      this.initialMemory = performance.memory.usedJSHeapSize;
    }
  }

  /**
   * Get current memory usage
   */
  getCurrentMemoryUsage(): number {
    if (!this.isSupported) return 0;
    // @ts-ignore
    return performance.memory.usedJSHeapSize;
  }

  /**
   * Get memory usage increase since initialization
   */
  getMemoryIncrease(): number {
    if (!this.isSupported) return 0;
    return this.getCurrentMemoryUsage() - this.initialMemory;
  }

  /**
   * Check if memory usage is reasonable (< 50MB increase)
   */
  isMemoryUsageGood(): boolean {
    if (!this.isSupported) return true;
    return this.getMemoryIncrease() < 50 * 1024 * 1024; // 50MB
  }
}

/**
 * Comprehensive performance monitor that combines all metrics
 */
export class ComprehensivePerformanceMonitor {
  private fpsMonitor = new PerformanceMonitor();
  private layoutMonitor = new LayoutPerformanceMonitor();
  private memoryMonitor = new MemoryMonitor();
  private isRunning = false;

  /**
   * Start comprehensive monitoring
   */
  start(fpsCallback?: (fps: number) => void) {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.fpsMonitor.startMonitoring(fpsCallback);
    this.layoutMonitor.startMonitoring();
  }

  /**
   * Stop monitoring
   */
  stop() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    this.fpsMonitor.stopMonitoring();
    this.layoutMonitor.stopMonitoring();
  }

  /**
   * Get comprehensive performance report
   */
  getPerformanceReport() {
    return {
      fps: {
        current: this.fpsMonitor.getCurrentFPS(),
        status: this.fpsMonitor.getPerformanceStatus(),
        isGood: this.fpsMonitor.isPerformanceGood()
      },
      layout: {
        shiftScore: this.layoutMonitor.getLayoutShiftScore(),
        isGood: this.layoutMonitor.isLayoutPerformanceGood(),
        paintMetrics: this.layoutMonitor.getPaintMetrics()
      },
      memory: {
        current: this.memoryMonitor.getCurrentMemoryUsage(),
        increase: this.memoryMonitor.getMemoryIncrease(),
        isGood: this.memoryMonitor.isMemoryUsageGood()
      },
      overall: {
        isGood: this.fpsMonitor.isPerformanceGood() && 
                this.layoutMonitor.isLayoutPerformanceGood() && 
                this.memoryMonitor.isMemoryUsageGood()
      }
    };
  }
}

// Export singleton instance for easy use
export const performanceMonitor = new ComprehensivePerformanceMonitor();
