import React from 'react';
import { CheckboxGroup } from './CheckboxGroup';
import { RadioGroup } from './RadioGroup';
import { FormInput } from './FormInput';
import { FINANCIAL_GOALS, INVESTMENT_HORIZON_OPTIONS } from '../constants';
import { FormData } from '../types/form';

interface FinancialGoalsProps {
  formData: FormData;
  onGoalChange: (value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHorizonChange: (value: string) => void;
}

export const FinancialGoals: React.FC<FinancialGoalsProps> = ({
  formData,
  onGoalChange,
  onInputChange,
  onHorizonChange,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Select your financial goals:</h3>
        <CheckboxGroup
          options={FINANCIAL_GOALS}
          selectedValues={formData.selectedGoals}
          onChange={onGoalChange}
        />
      </div>

      {formData.selectedGoals.includes('other') && (
        <FormInput
          label="Please specify your other goal"
          name="otherGoalDescription"
          value={formData.otherGoalDescription}
          onChange={onInputChange}
          placeholder="Describe your goal"
          icon={() => null}
        />
      )}

      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Investment Timeline:</h3>
        <RadioGroup
          name="investmentHorizon"
          options={INVESTMENT_HORIZON_OPTIONS}
          value={formData.investmentHorizon}
          onChange={onHorizonChange}
        />
      </div>
    </div>
  );
};