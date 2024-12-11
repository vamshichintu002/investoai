import React from 'react';
import { Card } from './ui/Card';
import { InvestmentRecommendation } from '../types/investment';
import { Tag, Bookmark, ArrowRight } from 'lucide-react';

interface RecommendedInvestmentsProps {
  recommendations: InvestmentRecommendation[];
}

export function RecommendedInvestments({ recommendations }: RecommendedInvestmentsProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <Bookmark className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-slate-100">Recommended Investments</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec) => (
          <div key={rec.investment_type} className="space-y-4">
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-emerald-500" />
              <h3 className="text-base font-medium text-slate-100">
                {rec.investment_type.replace('_', ' ')}
              </h3>
            </div>
            <div className="space-y-3">
              {rec.specific_suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="bg-[#23262d] rounded-lg p-4 hover:bg-[#2a2d35] transition-all duration-200 border border-white/[0.03] group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      <h4 className="font-medium text-slate-100">{suggestion.name}</h4>
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
        ))}
      </div>
    </Card>
  );
}