import React, { useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLDivElement>;
  fromRef: React.RefObject<HTMLDivElement>;
  toRef: React.RefObject<HTMLDivElement>;
  duration?: number;
  delay?: number;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  duration = 1,
  delay = 0,
}: AnimatedBeamProps) {
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const from: Point = {
        x: fromRect.left - containerRect.left + fromRect.width / 2,
        y: fromRect.top - containerRect.top + fromRect.height / 2,
      };

      const to: Point = {
        x: toRect.left - containerRect.left + toRect.width / 2,
        y: toRect.top - containerRect.top + toRect.height / 2,
      };

      // Create smooth curve using cubic bezier
      const c1: Point = {
        x: from.x,
        y: from.y + (to.y - from.y) / 2,
      };

      const c2: Point = {
        x: to.x,
        y: to.y - (to.y - from.y) / 2,
      };

      setPath(`M ${from.x},${from.y} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${to.x},${to.y}`);
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, [containerRef, fromRef, toRef]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        '--duration': `${duration}s`,
        '--delay': `${delay}s`,
      } as React.CSSProperties}
    >
      <path
        d={path}
        className="stroke-foreground/20 dark:stroke-foreground/10"
        fill="none"
        strokeWidth="1"
        strokeDasharray="8,8"
        pathLength="1"
        style={{
          animation: `dash calc(var(--duration) * 1s) linear infinite`,
          animationDelay: 'calc(var(--delay) * 1s)',
        }}
      />
    </svg>
  );
}