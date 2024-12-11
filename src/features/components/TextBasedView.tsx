import React from 'react';
import { Card } from './ui/Card';
import { InvestmentData } from '../types/investment';
import { 
  TrendingUp, 
  PieChart, 
  AlertTriangle, 
  Target, 
  ArrowRight, 
  Calendar, 
  Info,
  DollarSign,
  BarChart2,
  Shield,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface TextBasedViewProps {
  data: InvestmentData;
}

export function TextBasedView({ data }: TextBasedViewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-purple-500" />
          <span className="font-medium text-foreground">Review Schedule:</span>
          <span className="text-foreground/70">{data.review_schedule}</span>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-6">
          <PieChart className="w-5 h-5 text-green-500" />
          <h2 className="text-xl font-bold text-foreground">Portfolio Allocation</h2>
        </div>
        <div className="space-y-8">
          {data.recommendations.map((rec) => (
            <div key={rec.investment_type} className="border-b border-border last:border-0 pb-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold">
                  <span className="font-medium text-foreground">{rec.investment_type.replace('_', ' ')}</span>
                  <span className="ml-2 text-blue-500">({rec.allocation_percentage}%)</span>
                </h3>
              </div>
              
              <div className="space-y-4 pl-7">
                <p className="text-foreground/80 leading-relaxed">{rec.details}</p>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-foreground">
                    <Target className="w-4 h-4 text-purple-500" />
                    Specific Suggestions
                  </h4>
                  <div className="space-y-2">
                    {rec.specific_suggestions.map((suggestion, index) => (
                      <div key={index} className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <ArrowRight className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-foreground">{suggestion.name}</span>
                          <span className="text-sm text-foreground/70">({suggestion.ticker})</span>
                        </div>
                        <p className="text-sm text-foreground/70 pl-6">{suggestion.rationale}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                    <h4 className="text-sm font-semibold text-foreground">Entry Strategy</h4>
                  </div>
                  <p className="text-sm text-foreground/70 pl-6">{rec.entry_strategy}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ArrowDownRight className="w-4 h-4 text-blue-500" />
                    <h4 className="text-sm font-semibold text-foreground">Exit Strategy</h4>
                  </div>
                  <p className="text-sm text-foreground/70 pl-6">{rec.exit_strategy}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-500" />
                    <h4 className="text-sm font-semibold text-foreground">Risk Mitigation</h4>
                  </div>
                  <p className="text-sm text-foreground/70 pl-6">{rec.risk_mitigation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-6">
          <BarChart2 className="w-5 h-5 text-purple-500" />
          <h2 className="text-xl font-bold text-foreground">Market Analysis</h2>
        </div>
        <div className="space-y-8">
          {Object.entries(data.market_analysis).map(([type, analysis]) => (
            <div key={type} className="border-b border-border last:border-0 pb-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-foreground">{type.replace('_', ' ')}</h3>
              </div>
              
              <div className="space-y-4 pl-7">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-foreground">Current Trend:</span>
                    <span className="text-foreground/70">{analysis.current_trend}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-foreground">Outlook:</span>
                    <span className="text-foreground/70">{analysis.outlook}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-foreground">
                    <Info className="w-4 h-4 text-purple-500" />
                    Key Factors
                  </h4>
                  <ul className="space-y-2">
                    {analysis.key_factors.map((factor, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-foreground/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-foreground">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Risks
                  </h4>
                  <ul className="space-y-2">
                    {analysis.risks.map((risk, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-foreground/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-muted">
        <div className="flex gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
          <p className="text-sm text-foreground/70 italic leading-relaxed">{data.disclaimer}</p>
        </div>
      </Card>
    </div>
  );
}

export default TextBasedView;