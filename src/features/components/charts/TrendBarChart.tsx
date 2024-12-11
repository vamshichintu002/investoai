import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface TrendBarChartProps {
  data: Array<{
    name: string;
    value: number;
    outlook: number;
  }>;
}

export function TrendBarChart({ data }: TrendBarChartProps) {
  const { theme } = useTheme();
  const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;

    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="font-medium text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-secondary">{entry.name}:</span>
            <span className="font-medium">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barGap={8}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 
            vertical={false}
          />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ 
              fill: 'var(--text-secondary)',
              fontSize: 12
            }}
            dy={8}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ 
              fill: 'var(--text-secondary)',
              fontSize: 12
            }}
            dx={-8}
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
            name="Current Trend"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-trend-${index}`}
                fill={colors[index % colors.length]}
                fillOpacity={0.8}
              />
            ))}
          </Bar>
          <Bar 
            dataKey="outlook" 
            name="Outlook"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-outlook-${index}`}
                fill={colors[index % colors.length]}
                fillOpacity={0.4}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}