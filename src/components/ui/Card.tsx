import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, children, hover = false }) => {
  return (
    <div className={cn(
      'bg-white rounded-lg shadow',
      hover && 'transition-all duration-200 hover:shadow-md hover:-translate-y-1',
      className
    )}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children }) => {
  return (
    <div className={cn('p-5 border-b', className)}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ className, children }) => {
  return (
    <h3 className={cn('text-lg font-semibold', className)}>
      {children}
    </h3>
  );
};

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ className, children }) => {
  return (
    <div className={cn('p-5', className)}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className, children }) => {
  return (
    <div className={cn('p-5 border-t', className)}>
      {children}
    </div>
  );
};