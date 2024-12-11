import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface AllocationPieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function AllocationPieChart({ data }: AllocationPieChartProps) {
  const { theme } = useTheme();
  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, value }) => `${name} (${value}%)`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => `${value}%`}
          contentStyle={{ 
            backgroundColor: 'var(--card-background)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)'
          }}
        />
        <Legend 
          formatter={(value) => (
            <span style={{ color: 'var(--text-primary)' }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}