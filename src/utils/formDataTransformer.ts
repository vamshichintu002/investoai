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
  tax_advantaged_options: string;
  liquidity_needs: string;
  investment_knowledge: string;
  previous_investments: string;
  involvement_level: string;
}

export class FormDataTransformer {
  private static capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  private static formatInvestmentPreference(pref: string): string {
    const prefMap: { [key: string]: string } = {
      'stocks': 'Stocks',
      'mutualFunds': 'Mutual_Funds',
      'bonds': 'Bonds',
      'gold': 'Gold',
      'etfs': 'ETFs',
      'realEstate': 'Real_Estate'
    };
    return prefMap[pref] || pref;
  }

  private static formatInvestmentHorizon(horizon: string): string {
    const horizonMap: { [key: string]: string } = {
      'short': 'Short-term',
      'medium': 'Medium-term',
      'long': 'Long-term'
    };
    return horizonMap[horizon] || horizon;
  }

  private static toBooleanString(value: boolean): string {
    return value ? 'True' : 'False';
  }

  static transformToApiFormat(formData: FormData): ApiRequestData {
    // Map goals to the required format with capitalized goal types
    const financialGoals: FinancialGoal[] = formData.selectedGoals.map(goal => ({
      goal_type: this.capitalizeFirstLetter(goal),
      target_amount: 100000, // Default value, should be customized based on goal type
      timeline_years: 10 // Default value, should be customized based on goal type
    }));

    const result: ApiRequestData = {
      age: formData.age,
      employment_status: this.capitalizeFirstLetter(formData.employmentStatus),
      annual_income: formData.annualIncome,
      marital_status: this.capitalizeFirstLetter(formData.maritalStatus),
      dependents: parseInt(formData.dependents),
      financial_goals: financialGoals,
      investment_horizon: this.formatInvestmentHorizon(formData.investmentHorizon),
      risk_tolerance: this.capitalizeFirstLetter(formData.riskTolerance),
      comfort_with_fluctuations: formData.riskComfortLevel,
      monthly_income: formData.monthlyIncome,
      monthly_expenses: formData.monthlyExpenses,
      existing_debts: formData.hasDebts ? formData.debtDetails : "None",
      emergency_fund_months: formData.emergencyFundMonths,
      investment_preferences: formData.selectedInvestments.map(pref => this.formatInvestmentPreference(pref)),
      ethical_criteria: formData.hasEthicalPreferences ? formData.ethicalPreferences : "None",
      tax_advantaged_options: this.toBooleanString(formData.interestedInTaxAdvantaged),
      liquidity_needs: formData.needsLiquidity ? formData.liquidityTimeframe.trim() : "No immediate needs",
      investment_knowledge: formData.investmentKnowledge || "Beginner",
      previous_investments: formData.hasInvestmentExperience ? formData.investmentExperience : "None",
      involvement_level: this.capitalizeFirstLetter(formData.investmentInvolvement)
    };

    return result;
  }
}
