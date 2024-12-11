interface FormData {
  name: string;
  phone: string;
  age: number;
  employmentStatus: string;
  annualIncome: number;
  maritalStatus: string;
  dependents: string;
  selectedGoals: string[];
  otherGoalDescription: string;
  investmentHorizon: string;
  riskTolerance: string;
  riskComfortLevel: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  hasDebts: boolean;
  debtDetails: string;
  hasEmergencyFund: boolean;
  emergencyFundMonths: number;
  selectedInvestments: string[];
  otherInvestmentDescription: string;
  managementStyle: string;
  hasEthicalPreferences: boolean;
  ethicalPreferences: string;
  interestedInTaxAdvantaged: boolean;
  needsLiquidity: boolean;
  liquidityTimeframe: string;
  investmentKnowledge: string;
  hasInvestmentExperience: boolean;
  investmentExperience: string;
  planningLifeChanges: boolean;
  lifeChangesDetails: string;
  investmentInvolvement: string;
  additionalComments: string;
}

interface FinancialGoal {
  goal_type: string;
  target_amount: number;
  timeline_years: number;
}

interface ApiRequestData {
  age: number;
  employment_status: string;
  annual_income: number;
  marital_status: string;
  dependents: number;
  financial_goals: FinancialGoal[];
  investment_horizon: string;
  risk_tolerance: string;
  comfort_with_fluctuations: number;
  monthly_income: number;
  monthly_expenses: number;
  existing_debts: string;
  emergency_fund_months: number;
  investment_preferences: string[];
  ethical_criteria: string;
  tax_advantaged_options: boolean;
  liquidity_needs: string;
  investment_knowledge: string;
  previous_investments: string;
  involvement_level: string;
}

export default class FormDataTransformer {
  static transformToApiFormat(formData: FormData): ApiRequestData {
    // Map goals to the required format
    const financialGoals: FinancialGoal[] = formData.selectedGoals.map(goal => ({
      goal_type: goal,
      target_amount: 100000, // Default value, should be customized based on goal type
      timeline_years: 10 // Default value, should be customized based on goal type
    }));

    return {
      age: formData.age,
      employment_status: formData.employmentStatus,
      annual_income: formData.annualIncome,
      marital_status: formData.maritalStatus,
      dependents: parseInt(formData.dependents),
      financial_goals: financialGoals,
      investment_horizon: formData.investmentHorizon,
      risk_tolerance: formData.riskTolerance,
      comfort_with_fluctuations: formData.riskComfortLevel,
      monthly_income: formData.monthlyIncome,
      monthly_expenses: formData.monthlyExpenses,
      existing_debts: formData.hasDebts ? formData.debtDetails : "None",
      emergency_fund_months: formData.emergencyFundMonths,
      investment_preferences: formData.selectedInvestments,
      ethical_criteria: formData.hasEthicalPreferences ? formData.ethicalPreferences : "None",
      tax_advantaged_options: formData.interestedInTaxAdvantaged,
      liquidity_needs: formData.needsLiquidity ? formData.liquidityTimeframe : "No immediate needs",
      investment_knowledge: formData.investmentKnowledge || "Beginner",
      previous_investments: formData.hasInvestmentExperience ? formData.investmentExperience : "None",
      involvement_level: formData.investmentInvolvement
    };
  }
}
