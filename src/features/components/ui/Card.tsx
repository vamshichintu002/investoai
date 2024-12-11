import React from 'react';
import clsx from 'clsx';
import { useTheme } from '../../contexts/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient';
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const { theme } = useTheme();
  
  return (
    <div 
      className={clsx(
        'rounded-xl p-6',
        'bg-card border border-border/40',
        'shadow-sm hover:shadow-md transition-all duration-300',
        'backdrop-blur-[2px]',
        variant === 'gradient' && theme === 'dark' && [
          'bg-gradient-to-br from-card/90 to-card/50',
          'border-white/[0.05]'
        ],
        className
      )}
    >
      {children}
    </div>
  );
}