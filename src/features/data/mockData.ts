export const generateTimeSeriesData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: Math.random() * 100
  }));
};

export const generatePerformanceData = () => {
  return {
    daily: generateTimeSeriesData(30),
    weekly: generateTimeSeriesData(12),
    monthly: generateTimeSeriesData(6)
  };
};