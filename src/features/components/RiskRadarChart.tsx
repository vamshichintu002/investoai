import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface RiskRadarChartProps {
  risks: string[];
}

export function RiskRadarChart({ risks }: RiskRadarChartProps) {
  // Convert risks to radar chart data with severity scores
  const chartData = risks.map(risk => ({
    risk,
    severity: risk.toLowerCase().includes('high') ? 80 :
              risk.toLowerCase().includes('moderate') ? 60 : 40
  }));

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="risk" />
          <Radar
            name="Risk Level"
            dataKey="severity"
            stroke="#F59E0B"
            fill="#F59E0B"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}