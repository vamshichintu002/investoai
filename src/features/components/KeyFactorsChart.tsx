import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

interface KeyFactorsChartProps {
  factors: string[];
}

export function KeyFactorsChart({ factors }: KeyFactorsChartProps) {
  const { theme } = useTheme();
  const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899'];
  
  const data = factors.map((factor, index) => ({
    name: factor,
    value: Math.floor(Math.random() * 40) + 60,
    color: colors[index % colors.length]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload) return null;

    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: payload[0]?.payload.color }}
          />
          <span className="text-xs font-medium text-foreground">
            Importance: {payload[0]?.value}%
          </span>
        </div>
      </div>
    );
  };

  const textColor = theme === 'dark' ? '#E2E8F0' : '#475569';

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          layout="vertical" 
          margin={{ left: 0, right: 24, top: 8, bottom: 8 }}
        >
          <XAxis 
            type="number" 
            domain={[0, 100]} 
            axisLine={false}
            tickLine={false}
            tick={{ 
              fill: textColor,
              fontSize: 12
            }}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false}
            tickLine={false}
            tick={{ 
              fill: textColor,
              fontSize: 12,
              width: 150,
              lineHeight: 16
            }}
            width={150}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ 
              fill: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              radius: 4
            }}
          />
          <Bar 
            dataKey="value" 
            radius={[0, 4, 4, 0]}
            background={{ 
              fill: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              radius: 4
            }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                fillOpacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}