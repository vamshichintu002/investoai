interface FormData {
  name: string;
  phone: string;
  age: number;
  employmentStatus: string;
  annualIncome: number;
  maritalStatus: string;
  dependents: string;
  selectedGoals: Array<{
    goal_type: string;
    target_amount: number;
    timeline_years: number;
  }>;
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
}

interface ApiRequestData {
  age: number;
  employment_status: string;
  annual_income: number;
  marital_status: string;
  dependents: number;
  financial_goals: Array<{
    goal_type: string;
    target_amount: number;
    timeline_years: number;
  }>;
  investment_horizon: string;
  risk_tolerance: string;
  comfort_with_fluctuations: number;
  monthly_income: number;
  monthly_expenses: number;
  existing_debts: string;
  emergency_fund_months: number;
  investment_preferences: string[];
  management_style: string;
  ethical_criteria: string;
  tax_advantaged_options: boolean;
  liquidity_needs: string;
  investment_knowledge: string;
  previous_investments: string;
  involvement_level: string;
  major_life_changes: boolean;
  life_change_details: string;
}

export default class FormDataTransformer {
  static transformToApiFormat(formData: FormData): ApiRequestData {
    // Convert dependents to number, defaulting to 0 if invalid
    const dependentsNum = parseInt(formData.dependents);
    const dependentsValue = isNaN(dependentsNum) ? 0 : dependentsNum;

    // Ensure financial goals are properly formatted
    const financialGoals = formData.selectedGoals?.map(goal => ({
      goal_type: goal.goal_type || "",
      target_amount: Number(goal.target_amount) || 0,
      timeline_years: Number(goal.timeline_years) || 0
    })) || [];

    // Handle boolean questions with proper defaults
    const hasDebts = formData.hasDebts === undefined ? false : formData.hasDebts;
    const hasEmergencyFund = formData.hasEmergencyFund === undefined ? false : formData.hasEmergencyFund;
    const hasEthicalPreferences = formData.hasEthicalPreferences === undefined ? false : formData.hasEthicalPreferences;
    const planningLifeChanges = formData.planningLifeChanges === undefined ? false : formData.planningLifeChanges;

    return {
      age: Number(formData.age) || 0,
      employment_status: formData.employmentStatus || "",
      annual_income: Number(formData.annualIncome) || 0,
      marital_status: formData.maritalStatus || "",
      dependents: dependentsValue,
      financial_goals: financialGoals,
      investment_horizon: formData.investmentHorizon || "",
      risk_tolerance: formData.riskTolerance || "",
      comfort_with_fluctuations: Number(formData.riskComfortLevel) || 0,
      monthly_income: Number(formData.monthlyIncome) || 0,
      monthly_expenses: Number(formData.monthlyExpenses) || 0,
      existing_debts: hasDebts ? (formData.debtDetails || "") : "",
      emergency_fund_months: hasEmergencyFund ? (Number(formData.emergencyFundMonths) || 0) : 0,
      investment_preferences: formData.selectedInvestments || [],
      management_style: formData.managementStyle || "",
      ethical_criteria: hasEthicalPreferences ? (formData.ethicalPreferences || "") : "",
      tax_advantaged_options: Boolean(formData.interestedInTaxAdvantaged) || false,
      liquidity_needs: formData.needsLiquidity ? (formData.liquidityTimeframe || "") : "",
      investment_knowledge: formData.investmentKnowledge || "",
      previous_investments: formData.hasInvestmentExperience ? (formData.investmentExperience || "") : "",
      involvement_level: formData.investmentInvolvement || "",
      major_life_changes: planningLifeChanges,
      life_change_details: planningLifeChanges ? (formData.lifeChangesDetails || "") : ""
    };
  }
}
