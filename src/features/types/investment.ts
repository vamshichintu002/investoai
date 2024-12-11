export interface InvestmentSuggestion {
  name: string;
  ticker: string;
  rationale: string;
}

export interface InvestmentRecommendation {
  investment_type: string;
  allocation_percentage: number;
  details: string;
  specific_suggestions: InvestmentSuggestion[];
  entry_strategy: string;
  exit_strategy: string;
  risk_mitigation: string;
}

export interface MarketAnalysis {
  current_trend: string;
  outlook: string;
  key_factors: string[];
  risks: string[];
  specific_suggestions: InvestmentSuggestion[];
}

export interface InvestmentData {
  explanation: string;
  recommendations: InvestmentRecommendation[];
  market_analysis: Record<string, MarketAnalysis>;
  review_schedule: string;
  disclaimer: string;
}

export interface InvestmentDataSource {
  fetchInvestmentData: () => Promise<InvestmentData>;
  updateInvestmentData: (data: Partial<InvestmentData>) => Promise<InvestmentData>;
}