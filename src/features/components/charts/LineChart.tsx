import React from 'react';
import { Line, LineChart as RechartsLineChart, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: Array<{ date: string; value: number }>;
}

export function LineChart({ data }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}