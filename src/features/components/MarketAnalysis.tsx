import React from 'react';
import { TrendingUp, AlertTriangle, BarChart2 } from 'lucide-react';
import { TrendChart } from './TrendChart';
import { RiskRadarChart } from './RiskRadarChart';

interface MarketAnalysisProps {
  analysis: {
    current_trend: string;
    outlook: string;
    key_factors: string[];
    risks: string[];
  };
  type: string;
}

export function MarketAnalysis({ analysis, type }: MarketAnalysisProps) {
  const trendData = [{
    type,
    trend: analysis.current_trend,
    outlook: analysis.outlook
  }];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <p className="text-sm font-medium text-gray-600">Trend & Outlook</p>
          </div>
          <BarChart2 className="w-5 h-5 text-gray-400" />
        </div>
        <TrendChart data={trendData} />
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">Key Factors</p>
        <ul className="text-sm space-y-1">
          {analysis.key_factors.map((factor, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span>{factor}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <p className="text-sm font-medium text-gray-600">Risk Analysis</p>
        </div>
        <RiskRadarChart risks={analysis.risks} />
      </div>
    </div>
  );
}