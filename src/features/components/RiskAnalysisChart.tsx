import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { MarketAnalysis } from '../types/investment';

interface RiskAnalysisChartProps {
  analysis: MarketAnalysis;
  type: string;
}

export function RiskAnalysisChart({ analysis, type }: RiskAnalysisChartProps) {
  const data = analysis.risks.map(risk => ({
    risk,
    value: risk.toLowerCase().includes('high') ? 80 :
           risk.toLowerCase().includes('moderate') ? 60 : 40
  }));

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="risk" stroke="#666" />
          <Radar
            name="Risk Level"
            dataKey="value"
            stroke="#F59E0B"
            fill="#F59E0B"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}