import React from 'react';
import { RadioGroup } from './RadioGroup';
import { FormInput } from './FormInput';
import { RISK_TOLERANCE_OPTIONS } from '../constants';
import { FormData } from '../types/form';
import { AlertTriangle } from 'lucide-react';

interface RiskAssessmentProps {
  formData: FormData;
  onRiskToleranceChange: (value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RiskAssessment: React.FC<RiskAssessmentProps> = ({
  formData,
  onRiskToleranceChange,
  onInputChange,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">How would you describe your risk tolerance?</h3>
        <RadioGroup
          name="riskTolerance"
          options={RISK_TOLERANCE_OPTIONS}
          value={formData.riskTolerance}
          onChange={onRiskToleranceChange}
        />
      </div>

      <FormInput
        label="On a scale of 1 to 10, how comfortable are you with potential investment fluctuations?"
        name="riskComfortLevel"
        type="number"
        value={formData.riskComfortLevel}
        onChange={onInputChange}
        placeholder="Enter a number between 1 and 10"
        icon={AlertTriangle}
        min={1}
        max={10}
        required
      />
    </div>
  );
};