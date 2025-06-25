import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className={`animate-spin ${sizeClasses[size]} border-2 border-[#00F0FF] border-t-transparent rounded-full ${className}`} />
  );
}

interface LoadingCardProps {
  title?: string;
  description?: string;
  className?: string;
}

export function LoadingCard({ title, description, className = "" }: LoadingCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div 
      className={`bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center text-center py-8">
        <LoadingSpinner size="lg" className="mb-4" />
        <h3 className="text-lg font-semibold text-[#00F0FF] mb-2">
          {title || t("common.loading") || "Loading..."}
        </h3>
        {description && (
          <p className="text-gray-400 text-sm">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

interface ErrorCardProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorCard({ title, description, onRetry, className = "" }: ErrorCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div 
      className={`bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-red-500/20 p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center text-center py-8">
        <div className="text-red-400 text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-red-400 mb-2">
          {title || t("common.error") || "Error"}
        </h3>
        {description && (
          <p className="text-gray-400 text-sm mb-4">
            {description}
          </p>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-colors"
          >
            {t("common.retry") || "Retry"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: string;
  className?: string;
}

export function EmptyState({ title, description, action, icon = "📭", className = "" }: EmptyStateProps) {
  const { t } = useLanguage();

  return (
    <motion.div 
      className={`bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center text-center py-8">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">
          {title || t("common.noData") || "No data available"}
        </h3>
        {description && (
          <p className="text-gray-400 text-sm mb-4">
            {description}
          </p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="px-4 py-2 rounded-lg bg-[#00F0FF]/20 border border-[#00F0FF]/50 text-[#00F0FF] hover:bg-[#00F0FF]/30 transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>
    </motion.div>
  );
}

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className = "", lines = 1 }: SkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i}
          className={`bg-gray-700/50 rounded ${i === lines - 1 ? 'w-3/4' : 'w-full'} h-4 ${i > 0 ? 'mt-2' : ''}`}
        />
      ))}
    </div>
  );
}

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message }: PageLoadingProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-[#00F0FF] mb-2">
          {t("common.loading") || "Loading..."}
        </h2>
        {message && (
          <p className="text-gray-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showPercentage?: boolean;
}

export function ProgressBar({ progress, className = "", showPercentage = true }: ProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        {showPercentage && (
          <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
        )}
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-[#00F0FF] to-[#00A8FF] h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info";
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ status, children, className = "" }: StatusBadgeProps) {
  const statusStyles = {
    success: "bg-green-500/20 border-green-500/50 text-green-400",
    warning: "bg-yellow-500/20 border-yellow-500/50 text-yellow-400", 
    error: "bg-red-500/20 border-red-500/50 text-red-400",
    info: "bg-[#00F0FF]/20 border-[#00F0FF]/50 text-[#00F0FF]"
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[status]} ${className}`}>
      {children}
    </span>
  );
}
