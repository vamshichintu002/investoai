import React from 'react';
import { InvestmentData } from '../types/investment';
import { useInvestmentData } from '../hooks/useInvestmentData';
import { DashboardHeader } from './DashboardHeader';
import { Card } from './ui/Card';
import { AllocationPieChart } from './charts/AllocationPieChart';
import { MarketAnalysisCard } from './MarketAnalysisCard';
import { DetailedAnalysisCard } from './DetailedAnalysisCard';
import { InvestmentTable } from './InvestmentTable';
import { RecommendedInvestments } from './RecommendedInvestments';
import { TextBasedView } from './TextBasedView';
import { ChatWidget } from './ChatWidget';

interface AppProps {
  initialData?: InvestmentData;
  onDataUpdate?: (data: InvestmentData) => void;
}

export function App({ initialData, onDataUpdate }: AppProps) {
  const { data, loading, error } = useInvestmentData(initialData);
  const [viewMode, setViewMode] = React.useState<'visual' | 'text'>('visual');

  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading data</div>;

  const allocationData = data.recommendations.map(rec => ({
    name: rec.investment_type.replace('_', ' '),
    value: rec.allocation_percentage
  }));

  return (
    <div className="min-h-screen bg-background">
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <DashboardHeader 
            viewMode={viewMode} 
            setViewMode={setViewMode}
            explanation={data.explanation}
          />

          {viewMode === 'visual' ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card variant="gradient">
                  <h2 className="text-lg font-semibold mb-6">Portfolio Allocation</h2>
                  <AllocationPieChart data={allocationData} />
                </Card>
                <MarketAnalysisCard marketAnalysis={data.market_analysis} />
              </div>

              <InvestmentTable recommendations={data.recommendations} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(data.market_analysis).map(([type, analysis]) => (
                  <DetailedAnalysisCard key={type} type={type} analysis={analysis} />
                ))}
              </div>

              <RecommendedInvestments recommendations={data.recommendations} />
            </>
          ) : (
            <TextBasedView data={data} />
          )}
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}