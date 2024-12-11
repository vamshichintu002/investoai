export interface FormData {
  // Personal Information
  name: string;
  phone: string;
  age: string;
  employmentStatus: string;
  annualIncome: string;
  maritalStatus: string;
  dependents: string;

  // Financial Goals
  selectedGoals: string[];
  otherGoalDescription: string;
  investmentHorizon: string;

  // Risk Assessment
  riskTolerance: 'low' | 'moderate' | 'high' | '';
  riskComfortLevel: string;

  // Current Finances
  monthlyIncome: string;
  monthlyExpenses: string;
  hasDebts: boolean;
  debtDetails: string;
  hasEmergencyFund: boolean;
  emergencyFundMonths: string;

  // Investment Preferences
  selectedInvestments: string[];
  otherInvestmentDescription: string;
  managementStyle: 'active' | 'passive' | 'notSure' | '';
  
  // Additional Details
  hasEthicalPreferences: boolean;
  ethicalPreferences: string;
  interestedInTaxAdvantaged: boolean;
  needsLiquidity: boolean;
  liquidityTimeframe: string;
  investmentKnowledge: 'beginner' | 'intermediate' | 'advanced' | '';
  hasInvestmentExperience: boolean;
  investmentExperience: string;
  planningLifeChanges: boolean;
  lifeChangesDetails: string;
  investmentInvolvement: 'handson' | 'handsoff' | 'collaborative' | '';
}