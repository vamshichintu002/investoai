// Components
export { default as InvestmentDashboard } from './components/InvestmentDashboard';
export { ThemeProvider } from './contexts/ThemeContext';

// Types
export type * from './types/investment';

// Hooks
export { useInvestmentData } from './hooks/useInvestmentData';

// Utils
export { formatExplanationText } from './utils/textFormatters';
export { 
  transformTrendValue,
  generateChartData,
  calculateTotalAllocation,
  formatPercentage 
} from './utils/dataTransformers';