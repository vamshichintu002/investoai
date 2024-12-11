import React from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface AreaChartProps {
  data: any[];
  title: string;
  subtitle: string;
  value: string;
  change: number;
}

export function AreaChart({ data, title, subtitle, value, change }: AreaChartProps) {
  return (
    <div className="bg-[#111] rounded-lg p-4 text-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm text-gray-400">{title}</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-semibold">{value}</p>
            <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
              labelStyle={{ color: '#9CA3AF' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}