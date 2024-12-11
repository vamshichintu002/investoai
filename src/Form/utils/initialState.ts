import { FormData } from '../types/form';

export const initialFormData: FormData = {
  name: '',
  phone: '',
  age: '18',
  employmentStatus: '',
  annualIncome: '0',
  maritalStatus: '',
  dependents: '0',
  
  selectedGoals: [],
  otherGoalDescription: '',
  investmentHorizon: '',
  
  riskTolerance: '',
  riskComfortLevel: '1',  // Set to minimum valid value
  
  monthlyIncome: '0',
  monthlyExpenses: '0',
  hasDebts: false,
  debtDetails: '',
  hasEmergencyFund: false,
  emergencyFundMonths: '0',
  
  selectedInvestments: [],
  otherInvestmentDescription: '',
  managementStyle: '',
  
  hasEthicalPreferences: false,
  ethicalPreferences: '',
  interestedInTaxAdvantaged: false,
  needsLiquidity: false,
  liquidityTimeframe: '',
  investmentKnowledge: '',
  hasInvestmentExperience: false,
  investmentExperience: '',
  planningLifeChanges: false,
  lifeChangesDetails: '',
  investmentInvolvement: '',
  additionalComments: '',
};