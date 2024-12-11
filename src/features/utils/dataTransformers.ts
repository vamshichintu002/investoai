import { InvestmentData, MarketAnalysis } from '../types/investment';

export function transformTrendValue(trend: string): number {
  const lowerTrend = trend.toLowerCase();
  if (lowerTrend.includes('positive') || lowerTrend.includes('high')) return 80;
  if (lowerTrend.includes('stable') || lowerTrend.includes('moderate')) return 60;
  if (lowerTrend.includes('mixed') || lowerTrend.includes('cautious')) return 40;
  return 20;
}

export function generateChartData(marketAnalysis: Record<string, MarketAnalysis>) {
  return Object.entries(marketAnalysis).map(([type, analysis]) => ({
    name: type.replace('_', ' '),
    value: transformTrendValue(analysis.current_trend),
    outlook: transformTrendValue(analysis.outlook)
  }));
}

export function calculateTotalAllocation(data: InvestmentData): number {
  return data.recommendations.reduce(
    (sum, item) => sum + item.allocation_percentage,
    0
  );
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}