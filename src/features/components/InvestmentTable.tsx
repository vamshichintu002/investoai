import React from 'react';
import { InvestmentRecommendation } from '../types/investment';
import { Card } from './ui/Card';

interface InvestmentTableProps {
  recommendations: InvestmentRecommendation[];
}

export function InvestmentTable({ recommendations }: InvestmentTableProps) {
  return (
    <Card className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-400">
            <th className="py-2 px-4">Investment Type</th>
            <th className="py-2 px-4">Allocation</th>
            <th className="py-2 px-4">Entry Strategy</th>
            <th className="py-2 px-4">Exit Strategy</th>
            <th className="py-2 px-4">Risk Mitigation</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((rec) => (
            <tr key={rec.investment_type} className="border-t border-gray-800">
              <td className="py-2 px-4">{rec.investment_type.replace('_', ' ')}</td>
              <td className="py-2 px-4">{rec.allocation_percentage}%</td>
              <td className="py-2 px-4">{rec.entry_strategy}</td>
              <td className="py-2 px-4">{rec.exit_strategy}</td>
              <td className="py-2 px-4">{rec.risk_mitigation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}