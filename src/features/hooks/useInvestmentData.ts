import { useState, useEffect } from 'react';
import { InvestmentData } from '../types/investment';
import { investmentDataService } from '../services/investmentDataService';

export function useInvestmentData() {
  const [state, setState] = useState<{
    data: InvestmentData | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = investmentDataService.subscribe((newState) => {
      setState({
        data: newState.data,
        loading: newState.isLoading,
        error: newState.error
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const updateData = async (newData: InvestmentData) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updated = await investmentDataService.updateInvestmentData(newData);
      setState(prev => ({ ...prev, data: updated, loading: false }));
      return updated;
    } catch (err) {
      console.error('Error updating data:', err);
      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return null;
    }
  };

  const refreshData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await investmentDataService.fetchInvestmentData();
      setState(prev => ({ ...prev, data, loading: false }));
      return data;
    } catch (err) {
      console.error('Error refreshing data:', err);
      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return null;
    }
  };

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    updateData,
    refreshData
  };
}