import React from 'react';
import { cn } from '../../utils/cn';

export interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  showPath?: boolean;
  initialRotation?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 50,
  showPath = false,
  initialRotation = 0,
}: OrbitingCirclesProps) {
  return (
    <>
      {showPath && (
        <div className="absolute inset-0">
          <svg viewBox="0 0 500 500" className="size-full">
            <circle
              cx="250"
              cy="250"
              r={radius}
              fill="none"
              className="stroke-gray-200/50 dark:stroke-gray-700/50"
              strokeWidth="1"
            />
          </svg>
        </div>
      )}
      <div
        style={{
          '--orbit-duration': `${duration}s`,
          '--orbit-radius': `${radius}px`,
          '--initial-rotation': `${initialRotation}deg`,
        } as React.CSSProperties}
        className={cn(
          "absolute left-1/2 top-1/2",
          "animate-orbit",
          { "[animation-direction:reverse]": reverse },
          className
        )}
      >
        {children}
      </div>
    </>
  );
}