import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  title?: string;
  variant?: AlertVariant;
  children: React.ReactNode;
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const getAlertIcon = (variant: AlertVariant) => {
  switch (variant) {
    case 'info':
      return <Info className="h-5 w-5" />;
    case 'success':
      return <CheckCircle className="h-5 w-5" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5" />;
    case 'error':
      return <AlertCircle className="h-5 w-5" />;
  }
};

const Alert: React.FC<AlertProps> = ({
  title,
  variant = 'info',
  children,
  className,
  dismissible = false,
  onDismiss,
}) => {
  const variantStyles = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-success-50 text-success-800 border-success-200',
    warning: 'bg-warning-50 text-warning-800 border-warning-200',
    error: 'bg-error-50 text-error-800 border-error-200',
  };

  const iconStyles = {
    info: 'text-blue-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
    error: 'text-error-500',
  };

  return (
    <div
      className={cn(
        'rounded-md border p-4 animate-fade-in',
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      <div className="flex">
        <div className={cn('flex-shrink-0', iconStyles[variant])}>
          {getAlertIcon(variant)}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium">{title}</h3>
          )}
          <div className={cn("text-sm", title && "mt-2")}>
            {children}
          </div>
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={cn(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  {
                    'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50': variant === 'info',
                    'bg-success-50 text-success-500 hover:bg-success-100 focus:ring-success-600 focus:ring-offset-success-50': variant === 'success',
                    'bg-warning-50 text-warning-500 hover:bg-warning-100 focus:ring-warning-600 focus:ring-offset-warning-50': variant === 'warning',
                    'bg-error-50 text-error-500 hover:bg-error-100 focus:ring-error-600 focus:ring-offset-error-50': variant === 'error',
                  }
                )}
                onClick={onDismiss}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;