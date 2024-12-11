import React from 'react';
import { Card } from './ui/Card';
import { TrendBarChart } from './charts/TrendBarChart';
import { MarketAnalysis } from '../types/investment';
import { BarChart2, TrendingUp } from 'lucide-react';

interface MarketAnalysisCardProps {
  marketAnalysis: Record<string, MarketAnalysis>;
}

export function MarketAnalysisCard({ marketAnalysis }: MarketAnalysisCardProps) {
  const chartData = Object.entries(marketAnalysis).map(([type, analysis]) => ({
    name: type.replace('_', ' '),
    value: analysis.current_trend.toLowerCase().includes('positive') ? 80 :
           analysis.current_trend.toLowerCase().includes('stable') ? 60 :
           analysis.current_trend.toLowerCase().includes('mixed') ? 40 : 20,
    outlook: analysis.outlook.toLowerCase().includes('positive') ? 80 :
             analysis.outlook.toLowerCase().includes('moderate') ? 60 :
             analysis.outlook.toLowerCase().includes('cautious') ? 40 : 20
  }));

  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-foreground">Market Analysis</h2>
      </div>
      <div className="mb-6">
        <TrendBarChart data={chartData} />
      </div>
      <div className="space-y-4">
        {Object.entries(marketAnalysis).map(([type, analysis]) => (
          <div key={type} className="border-t border-border pt-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <h3 className="text-sm font-medium text-foreground">{type.replace('_', ' ')}</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-foreground/90 dark:text-foreground/80">{analysis.current_trend}</p>
              <p className="text-sm text-foreground/90 dark:text-foreground/80">{analysis.outlook}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}