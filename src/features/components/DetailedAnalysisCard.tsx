import React from 'react';
import { Card } from './ui/Card';
import { RiskAnalysisChart } from './RiskAnalysisChart';
import { KeyFactorsChart } from './KeyFactorsChart';
import { MarketAnalysis } from '../types/investment';
import { TrendingUp, AlertTriangle, Key, Target, Tag } from 'lucide-react';

interface DetailedAnalysisCardProps {
  type: string;
  analysis: MarketAnalysis;
}

export function DetailedAnalysisCard({ type, analysis }: DetailedAnalysisCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">{type.replace('_', ' ')} Analysis</h3>
      </div>
      
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-green-500" />
            <h4 className="font-medium text-foreground">Current Trend & Outlook</h4>
          </div>
          <div className="space-y-2">
            <p className="text-foreground/90 dark:text-foreground/80">{analysis.current_trend}</p>
            <p className="text-foreground/90 dark:text-foreground/80">{analysis.outlook}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-4 h-4 text-purple-500" />
            <h4 className="font-medium text-foreground">Key Factors</h4>
          </div>
          <div className="pl-4">
            <KeyFactorsChart factors={analysis.key_factors} />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h4 className="font-medium text-foreground">Risk Analysis</h4>
          </div>
          <RiskAnalysisChart analysis={analysis} type={type} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-blue-500" />
            <h4 className="font-medium text-foreground">Specific Suggestions</h4>
          </div>
          <div className="grid gap-3">
            {analysis.specific_suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="bg-[#23262d] rounded-lg p-4 hover:bg-[#2a2d35] transition-all duration-200 border border-white/[0.03]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-400" />
                    <h5 className="font-medium text-slate-100">{suggestion.name}</h5>
                  </div>
                  <span className="text-sm px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {suggestion.ticker}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {suggestion.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}