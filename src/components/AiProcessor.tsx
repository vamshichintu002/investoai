import React from 'react';
import { Circle } from './ui/Circle';
import { Brain } from 'lucide-react';

interface AiProcessorProps {
  circleRef?: React.RefObject<HTMLDivElement>;
}

export function AiProcessor({ circleRef }: AiProcessorProps) {
  return (
    <div className="relative">
      <Circle 
        ref={circleRef} 
        className="size-16 md:size-20 bg-gradient-to-br from-primary to-blue-600 p-3 md:p-4"
      >
        <Brain className="h-full w-full text-white" />
      </Circle>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-medium">
          Processing...
        </span>
      </div>
    </div>
  );
}