import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-2xl hover:shadow-2xl',
        'border border-border/50',
        'group hover:scale-[1.02] transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}