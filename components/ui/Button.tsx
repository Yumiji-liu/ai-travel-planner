'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500 shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30': variant === 'primary',
            'bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-400 shadow-lg shadow-amber-500/25': variant === 'secondary',
            'border-2 border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100 hover:border-slate-400': variant === 'outline',
            'bg-transparent text-slate-600 hover:bg-slate-100': variant === 'ghost',
          },
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
