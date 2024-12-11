import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-full font-medium transition-all duration-300 ease-in-out',
        {
          'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg hover:scale-105': variant === 'primary',
          'text-gray-700 hover:text-indigo-600 hover:bg-gray-100/50': variant === 'secondary',
          'text-gray-700 hover:text-indigo-600': variant === 'ghost',
        },
        {
          'px-4 py-1.5 text-sm': size === 'sm',
          'px-6 py-2': size === 'md',
          'px-8 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}