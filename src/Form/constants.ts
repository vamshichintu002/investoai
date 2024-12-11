export const STEP_TITLES = [
  "Personal Information",
  "Financial Goals",
  "Risk Assessment",
  "Current Finances",
  "Investment Preferences",
  "Additional Details"
];

export const RISK_TOLERANCE_OPTIONS = [
  {
    value: 'low',
    label: 'Low Risk Tolerance',
    description: 'Prefer stability and minimal risk, even if it means lower potential returns.'
  },
  {
    value: 'moderate',
    label: 'Moderate Risk Tolerance',
    description: 'Balance between stability and growth, comfortable with some market fluctuations.'
  },
  {
    value: 'high',
    label: 'High Risk Tolerance',
    description: 'Comfortable with significant market fluctuations for potentially higher returns.'
  }
];

export const INVESTMENT_HORIZON_OPTIONS = [
  {
    value: 'short',
    label: 'Short-term (0-3 years)',
    description: 'Planning to use funds within the next 3 years'
  },
  {
    value: 'medium',
    label: 'Medium-term (3-7 years)',
    description: 'Planning to use funds in 3-7 years'
  },
  {
    value: 'long',
    label: 'Long-term (7+ years)',
    description: 'Planning to use funds after 7 or more years'
  }
];

export const FINANCIAL_GOALS = [
  { value: 'retirement', label: 'Retirement Planning' },
  { value: 'home', label: 'Buying a Home' },
  { value: 'education', label: 'Education Funding' },
  { value: 'wealth', label: 'Wealth Accumulation' },
  { value: 'other', label: 'Other' }
];

export const INVESTMENT_TYPES = [
  { value: 'stocks', label: 'Stocks' },
  { value: 'mutualFunds', label: 'Mutual Funds' },
  { value: 'bonds', label: 'Bonds/Fixed Deposits' },
  { value: 'gold', label: 'Gold' },
  { value: 'etfs', label: 'ETFs' },
  { value: 'realEstate', label: 'Real Estate' },
  { value: 'crypto', label: 'Cryptocurrencies' },
  { value: 'other', label: 'Others' }
];

export const INVESTMENT_KNOWLEDGE_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

export const INVESTMENT_MANAGEMENT_PREFERENCES = [
  { value: 'handson', label: 'Hands-on' },
  { value: 'handsoff', label: 'Hands-off' },
  { value: 'collaborative', label: 'Collaborative' }
];