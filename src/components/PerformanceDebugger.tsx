import { useEffect, useState } from 'react';
import { performanceMonitor } from '@/utils/performanceMonitor';

interface PerformanceMetrics {
  fps: {
    current: number;
    status: 'excellent' | 'good' | 'poor';
    isGood: boolean;
  };
  layout: {
    shiftScore: number;
    isGood: boolean;
    paintMetrics: {
      firstPaint: number;
      paintCount: number;
      averagePaintTime: number;
    };
  };
  memory: {
    current: number;
    increase: number;
    isGood: boolean;
  };
  overall: {
    isGood: boolean;
  };
}

interface PerformanceDebuggerProps {
  enabled?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function PerformanceDebugger({ 
  enabled = false, 
  position = 'top-right' 
}: PerformanceDebuggerProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(enabled);

  useEffect(() => {
    if (!enabled) return;

    performanceMonitor.start((fps) => {
      const report = performanceMonitor.getPerformanceReport();
      setMetrics(report);
    });

    // Update metrics every second
    const interval = setInterval(() => {
      const report = performanceMonitor.getPerformanceReport();
      setMetrics(report);
    }, 1000);

    return () => {
      performanceMonitor.stop();
      clearInterval(interval);
    };
  }, [enabled]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle with Ctrl+Shift+P
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!enabled || !isVisible || !metrics) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  const getFPSColor = (fps: number) => {
    if (fps >= 58) return 'text-green-400';
    if (fps >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusColor = (isGood: boolean) => {
    return isGood ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div 
      className={`fixed ${positionClasses[position]} z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-xs font-mono text-white border border-gray-600 max-w-xs`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Performance Monitor</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2">
        {/* FPS */}
        <div>
          <div className="flex justify-between">
            <span>FPS:</span>
            <span className={getFPSColor(metrics.fps.current)}>
              {metrics.fps.current}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={getStatusColor(metrics.fps.isGood)}>
              {metrics.fps.status}
            </span>
          </div>
        </div>

        <hr className="border-gray-600" />

        {/* Layout */}
        <div>
          <div className="flex justify-between">
            <span>Layout Shift:</span>
            <span className={getStatusColor(metrics.layout.isGood)}>
              {metrics.layout.shiftScore.toFixed(4)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Paint Count:</span>
            <span>{metrics.layout.paintMetrics.paintCount}</span>
          </div>
        </div>

        <hr className="border-gray-600" />

        {/* Memory */}
        <div>
          <div className="flex justify-between">
            <span>Memory:</span>
            <span className={getStatusColor(metrics.memory.isGood)}>
              {(metrics.memory.current / 1024 / 1024).toFixed(1)}MB
            </span>
          </div>
          <div className="flex justify-between">
            <span>Increase:</span>
            <span className={getStatusColor(metrics.memory.increase < 10 * 1024 * 1024)}>
              +{(metrics.memory.increase / 1024 / 1024).toFixed(1)}MB
            </span>
          </div>
        </div>

        <hr className="border-gray-600" />

        {/* Overall Status */}
        <div className="text-center">
          <span className={`font-bold ${getStatusColor(metrics.overall.isGood)}`}>
            {metrics.overall.isGood ? '✓ GOOD' : '⚠ NEEDS OPTIMIZATION'}
          </span>
        </div>
      </div>

      <div className="mt-2 text-gray-400 text-xs">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
}

/**
 * Performance testing recommendations component
 */
export function PerformanceRecommendations() {
  const [showRecommendations, setShowRecommendations] = useState(false);

  const recommendations = [
    {
      title: "Animation Performance",
      items: [
        "Use transform3d() instead of transform for hardware acceleration",
        "Prefer opacity and transform over layout-triggering properties",
        "Use will-change sparingly and reset to 'auto' when not needed",
        "Limit particle count on mobile devices",
        "Use requestAnimationFrame for smooth animations"
      ]
    },
    {
      title: "Layout Performance", 
      items: [
        "Avoid animating width, height, top, left properties",
        "Use contain: layout style paint for isolated components",
        "Minimize DOM manipulations during animations",
        "Use CSS transforms instead of changing position properties"
      ]
    },
    {
      title: "Memory Management",
      items: [
        "Clean up event listeners and animation frames",
        "Use passive event listeners where possible",
        "Throttle expensive operations like mouse move handlers",
        "Monitor for memory leaks in long-running animations"
      ]
    }
  ];

  if (!showRecommendations) {
    return (
      <button
        onClick={() => setShowRecommendations(true)}
        className="fixed bottom-4 left-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm z-50"
      >
        Show Performance Tips
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Performance Optimization Guide</h2>
            <button
              onClick={() => setShowRecommendations(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            {recommendations.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
