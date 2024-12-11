import React from 'react';
import { Circle } from './ui/Circle';
import { User, Target, TrendingUp, Shield } from 'lucide-react';

interface UserPreferencesProps {
  circleRef?: React.RefObject<HTMLDivElement>;
}

export function UserPreferences({ circleRef }: UserPreferencesProps) {
  return (
    <div className="space-y-3 md:space-y-4">
      <Circle ref={circleRef} className="size-10 md:size-12 bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/20">
        <User className="h-5 w-5 md:h-6 md:w-6 text-primary" />
      </Circle>
      <div className="space-y-1.5 md:space-y-2 hidden lg:block">
        <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
          <Target className="h-3 w-3 md:h-4 md:w-4 text-primary" />
          <span>Growth Focus</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
          <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
          <span>Moderate Risk</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
          <Shield className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
          <span>10yr Horizon</span>
        </div>
      </div>
    </div>
  );
}