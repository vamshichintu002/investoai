import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface CircleProps {
  className?: string;
  children?: React.ReactNode;
}

export const Circle = forwardRef<HTMLDivElement, CircleProps>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'z-10 flex items-center justify-center rounded-full border-2 border-border bg-white p-2 md:p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:bg-background',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Circle.displayName = 'Circle';