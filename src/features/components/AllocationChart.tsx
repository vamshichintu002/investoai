import React from 'react';
import { PieChart } from 'lucide-react';

interface AllocationChartProps {
  data: {
    investment_type: string;
    allocation_percentage: number;
  }[];
}

export function AllocationChart({ data }: AllocationChartProps) {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mb-4">
        <PieChart className="w-12 h-12 text-gray-600" />
      </div>
      <div className="w-full space-y-4">
        {data.map((item, index) => (
          <div key={item.investment_type} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{item.investment_type.replace('_', ' ')}</span>
              <span className="text-sm font-semibold">
                {item.allocation_percentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${colors[index]} h-2 rounded-full`}
                style={{ width: `${item.allocation_percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}