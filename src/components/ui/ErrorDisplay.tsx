import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Wifi, Clock, HelpCircle } from 'lucide-react';
import { Button } from './Button';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
  onBack?: () => void;
  retryCount?: number;
  maxRetries?: number;
}

export function ErrorDisplay({ 
  error, 
  onRetry, 
  onBack, 
  retryCount = 0, 
  maxRetries = 3 
}: ErrorDisplayProps) {
  const getErrorType = (errorMessage: string) => {
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return 'network';
    }
    if (errorMessage.includes('timeout') || errorMessage.includes('time')) {
      return 'timeout';
    }
    if (errorMessage.includes('API key') || errorMessage.includes('authentication')) {
      return 'auth';
    }
    if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
      return 'quota';
    }
    return 'general';
  };

  const errorType = getErrorType(error);

  const errorConfig = {
    network: {
      icon: Wifi,
      title: 'Connection Issue',
      description: 'Unable to connect to our travel planning service. Please check your internet connection.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    timeout: {
      icon: Clock,
      title: 'Request Timeout',
      description: 'The request took too long to process. Our servers might be busy.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
    auth: {
      icon: AlertTriangle,
      title: 'Authentication Error',
      description: 'There was an issue with the API configuration. Please try again later.',
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
    },
    quota: {
      icon: AlertTriangle,
      title: 'Service Limit Reached',
      description: 'We\'ve reached our daily limit for trip generation. Please try again tomorrow.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    general: {
      icon: HelpCircle,
      title: 'Something Went Wrong',
      description: 'We encountered an unexpected error while creating your trip.',
      color: 'text-gray-500',
      bgColor: 'bg-gray-100 dark:bg-gray-900/20',
    },
  };

  const config = errorConfig[errorType];
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl text-center max-w-md mx-auto"
    >
      <div className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
        <IconComponent className={`w-8 h-8 ${config.color}`} />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {config.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        {config.description}
      </p>

      {/* Technical Error Details (Collapsible) */}
      <details className="mb-6 text-left">
        <summary className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
          Technical Details
        </summary>
        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 font-mono">
          {error}
        </div>
      </details>

      {/* Retry Information */}
      {retryCount > 0 && (
        <div className="mb-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Retry attempt {retryCount} of {maxRetries}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {retryCount < maxRetries && (
          <Button onClick={onRetry} className="min-w-[140px]">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
        
        {onBack && (
          <Button variant="outline" onClick={onBack} className="min-w-[140px]">
            ← Back to Form
          </Button>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          If the problem persists, please try again in a few minutes or contact support.
        </p>
      </div>
    </motion.div>
  );
}