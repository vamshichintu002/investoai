import React, { useRef } from 'react';
import { AnimatedBeam } from './ui/AnimatedBeam';
import { MarketDataPoint } from './MarketDataPoint';
import { AiProcessor } from './AiProcessor';
import { UserPreferences } from './UserPreferences';
import { 
  BarChart2, 
  LineChart,
  DollarSign,
  Building2,
  Gem
} from 'lucide-react';

const marketData = [
  { icon: <BarChart2 className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />, value: "S&P 500: 4,783.45", change: 1.2, label: "Stock Market" },
  { icon: <LineChart className="h-5 w-5 md:h-6 md:w-6 text-green-600" />, value: "10Y: 3.95%", change: -0.5, label: "Bond Yields" },
  { icon: <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />, value: "EUR/USD: 1.0892", change: 0.3, label: "Forex" },
  { icon: <Building2 className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />, value: "REIT: 2,145.32", change: -0.8, label: "Real Estate" },
  { icon: <Gem className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />, value: "BTC: $42,892", change: 2.5, label: "Crypto" }
];

export function HeroVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const marketRefs = marketData.map(() => useRef<HTMLDivElement>(null));

  return (
    <div
      ref={containerRef}
      className="relative flex h-[300px] sm:h-[400px] md:h-[500px] w-full items-center justify-between overflow-hidden rounded-lg border bg-white/50 dark:bg-white/5 backdrop-blur-sm p-3 sm:p-4 md:p-6 lg:p-10 shadow-xl"
    >
      {/* Market Data Column */}
      <div className="flex flex-col justify-center gap-3 sm:gap-4 md:gap-6">
        {marketData.map((data, index) => (
          <MarketDataPoint
            key={index}
            circleRef={marketRefs[index]}
            {...data}
          />
        ))}
      </div>

      {/* AI Processor */}
      <div className="flex items-center justify-center">
        <AiProcessor circleRef={aiRef} />
      </div>

      {/* User Profile */}
      <div className="flex items-center justify-center">
        <UserPreferences circleRef={userRef} />
      </div>

      {/* Animated Beams */}
      {marketRefs.map((ref, index) => (
        <AnimatedBeam
          key={index}
          containerRef={containerRef}
          fromRef={ref}
          toRef={aiRef}
          duration={2}
          delay={index * 0.2}
        />
      ))}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={userRef}
        duration={2}
        delay={1}
      />
    </div>
  );
}