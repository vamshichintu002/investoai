import React from 'react';
import { Circle } from './ui/Circle';
import { cn } from '../utils/cn';

interface MarketDataPointProps {
  icon: React.ReactNode;
  value: string;
  change: number;
  label: string;
  className?: string;
  circleRef?: React.RefObject<HTMLDivElement>;
}

export function MarketDataPoint({ icon, value, change, label, className, circleRef }: MarketDataPointProps) {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Circle ref={circleRef} className={cn("relative size-10 md:size-12", className)}>
        {icon}
        <span className={cn(
          "absolute -top-1 -right-1 px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs rounded-full font-medium",
          change >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        )}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </Circle>
      <div className="hidden lg:block">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}