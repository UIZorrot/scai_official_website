import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white p-4">
          <motion.div
            className="max-w-md w-full bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-red-500/20 p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-red-400 text-6xl mb-6">⚠️</div>
            
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Something went wrong
            </h2>
            
            <p className="text-gray-400 mb-6">
              An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
            </p>

            {/* Error details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 mb-2">
                  Error Details (Development)
                </summary>
                <div className="bg-gray-900/50 rounded-lg p-4 text-xs font-mono text-red-300 overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  <div className="mb-2">
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1">
                      {this.state.error.stack}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap mt-1">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleRetry}
                className="flex-1 px-4 py-2 rounded-lg bg-[#00F0FF]/20 border border-[#00F0FF]/50 text-[#00F0FF] hover:bg-[#00F0FF]/30 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={this.handleReload}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
}

// Specific error boundary for async operations
interface AsyncErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

export function AsyncErrorBoundary({ children, fallback }: AsyncErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={
        fallback ? (
          <ErrorBoundaryFallback fallback={fallback} />
        ) : undefined
      }
    >
      {children}
    </ErrorBoundary>
  );
}

function ErrorBoundaryFallback({ 
  fallback 
}: { 
  fallback: (error: Error, retry: () => void) => ReactNode 
}) {
  const [error, setError] = React.useState<Error>(new Error('Unknown error'));
  const [key, setKey] = React.useState(0);

  const retry = React.useCallback(() => {
    setKey(prev => prev + 1);
  }, []);

  return (
    <div key={key}>
      {fallback(error, retry)}
    </div>
  );
}

// Page-level error boundary
interface PageErrorBoundaryProps {
  children: ReactNode;
  pageName?: string;
}

export function PageErrorBoundary({ children, pageName }: PageErrorBoundaryProps) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log to analytics service
        console.error(`Page Error in ${pageName}:`, error, errorInfo);
        
        // You could send to error tracking service here
        // trackError(error, { page: pageName, ...errorInfo });
      }}
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white p-4">
          <motion.div
            className="max-w-md w-full bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-red-500/20 p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-red-400 text-4xl mb-4">🚫</div>
            <h2 className="text-xl font-bold text-red-400 mb-4">
              Page Error
            </h2>
            <p className="text-gray-400 mb-6">
              {pageName ? `The ${pageName} page` : 'This page'} encountered an error and couldn't load properly.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-lg bg-[#00F0FF]/20 border border-[#00F0FF]/50 text-[#00F0FF] hover:bg-[#00F0FF]/30 transition-colors"
            >
              Reload Page
            </button>
          </motion.div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
