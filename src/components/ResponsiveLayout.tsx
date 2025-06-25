import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveLayout({ children, className = "" }: ResponsiveLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-[#0F172A] text-white ${className}`}>
      {children}
    </div>
  );
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
}

export function ResponsiveGrid({ 
  children, 
  columns = { sm: 1, md: 2, lg: 3, xl: 4 }, 
  gap = 6,
  className = "" 
}: ResponsiveGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2", 
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6"
  };

  const gapClass = `gap-${gap}`;
  
  const responsiveClasses = [
    columns.sm && `grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`
  ].filter(Boolean).join(" ");

  return (
    <div className={`grid ${responsiveClasses} ${gapClass} ${className}`}>
      {children}
    </div>
  );
}

interface ResponsiveCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  delay?: number;
}

export function ResponsiveCard({ children, title, className = "", delay = 0 }: ResponsiveCardProps) {
  return (
    <motion.div
      className={`bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-4 sm:p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {title && (
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#00F0FF]">
          {title}
        </h3>
      )}
      {children}
    </motion.div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileMenu({ isOpen, onClose, children }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <motion.div
        className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-[#0F172A] border-l border-[#00F0FF]/20 shadow-xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface BreakpointIndicatorProps {
  show?: boolean;
}

export function BreakpointIndicator({ show = false }: BreakpointIndicatorProps) {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("");

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) setCurrentBreakpoint("xs");
      else if (width < 768) setCurrentBreakpoint("sm");
      else if (width < 1024) setCurrentBreakpoint("md");
      else if (width < 1280) setCurrentBreakpoint("lg");
      else if (width < 1536) setCurrentBreakpoint("xl");
      else setCurrentBreakpoint("2xl");
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white px-2 py-1 rounded text-xs font-mono">
      {currentBreakpoint} ({window.innerWidth}px)
    </div>
  );
}

interface ResponsiveSectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  containerClassName?: string;
}

export function ResponsiveSection({ 
  children, 
  title, 
  subtitle, 
  className = "",
  containerClassName = ""
}: ResponsiveSectionProps) {
  return (
    <section className={`py-8 sm:py-12 lg:py-16 ${className}`}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {(title || subtitle) && (
          <div className="text-center mb-8 sm:mb-12">
            {title && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00F0FF] mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

interface ResponsiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export function ResponsiveButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = ""
}: ResponsiveButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-[#00F0FF] to-[#00A8FF] text-[#0F172A] hover:shadow-lg hover:shadow-[#00F0FF]/30",
    secondary: "bg-[#0F172A] border border-[#00F0FF]/50 text-[#00F0FF] hover:bg-[#00F0FF]/10",
    outline: "border border-[#00F0FF]/30 text-[#00F0FF] hover:border-[#00F0FF]/60 hover:bg-[#00F0FF]/5"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base sm:px-6 sm:py-3",
    lg: "px-6 py-3 text-lg sm:px-8 sm:py-4"
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
}
