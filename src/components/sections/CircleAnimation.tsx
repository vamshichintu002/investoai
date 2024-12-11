import React from 'react';
import { OrbitingCircles } from '../ui/OrbitingCircles';
import { 
  Coins,
  BarChart2,
  LineChart,
  TrendingUp,
  Building2,
  Gem,
  PieChart
} from 'lucide-react';

export function CircleAnimation() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Diversified Investment Portfolio
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Our AI optimizes your investments across multiple asset classes
          </p>
        </div>
        
        <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
          <div className="relative size-[300px] md:size-[500px]">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <h3 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-foreground/80 to-foreground bg-clip-text text-transparent">
                Investo
              </h3>
            </div>

            {/* Market Data Icons */}
            <OrbitingCircles radius={80} duration={20} showPath>
              <div className="bg-blue-600 dark:bg-blue-500 p-2 md:p-3 rounded-xl shadow-lg">
                <BarChart2 className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
            </OrbitingCircles>

            <OrbitingCircles radius={80} duration={20} initialRotation={120} showPath>
              <div className="bg-green-600 dark:bg-green-500 p-2 md:p-3 rounded-xl shadow-lg">
                <Coins className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
            </OrbitingCircles>

            <OrbitingCircles radius={80} duration={20} initialRotation={240} showPath>
              <div className="bg-purple-600 dark:bg-purple-500 p-2 md:p-3 rounded-xl shadow-lg">
                <Gem className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
            </OrbitingCircles>

            {/* Investment Types */}
            <OrbitingCircles radius={160} duration={30} showPath>
              <div className="bg-orange-600 dark:bg-orange-500 p-2 md:p-3 rounded-xl shadow-lg">
                <LineChart className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
            </OrbitingCircles>

            <OrbitingCircles radius={160} duration={30} initialRotation={120} showPath>
              <div className="bg-red-600 dark:bg-red-500 p-2 md:p-3 rounded-xl shadow-lg">
                <Building2 className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
            </OrbitingCircles>

            <OrbitingCircles radius={160} duration={30} initialRotation={240} showPath>
              <div className="bg-indigo-600 dark:bg-indigo-500 p-2 md:p-3 rounded-xl shadow-lg">
                <PieChart className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
            </OrbitingCircles>
          </div>
        </div>
      </div>
    </section>
  );
}