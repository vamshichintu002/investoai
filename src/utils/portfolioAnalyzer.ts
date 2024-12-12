import axios from 'axios';

const PORTFOLIO_ANALYSIS_API = 'https://new-fastapi-production.up.railway.app/analyze-portfolio';

export async function analyzePortfolio(portfolioData: any) {
  try {
    const response = await axios.post(PORTFOLIO_ANALYSIS_API, portfolioData);
    return response.data;
  } catch (error) {
    console.error('Error analyzing portfolio:', error);
    throw error;
  }
}
