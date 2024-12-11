import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { InvestmentData } from '../types/investment';
import { App } from './App';

interface InvestmentDashboardProps {
  data?: InvestmentData;
  onDataUpdate?: (data: InvestmentData) => void;
  theme?: 'light' | 'dark';
}

export default function InvestmentDashboard({ 
  data,
  onDataUpdate,
  theme = 'dark'
}: InvestmentDashboardProps) {
  return (
    <ThemeProvider initialTheme={theme}>
      <App 
        initialData={data}
        onDataUpdate={onDataUpdate}
      />
    </ThemeProvider>
  );
}