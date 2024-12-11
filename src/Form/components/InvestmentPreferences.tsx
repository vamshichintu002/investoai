import React from 'react';
import { CheckboxGroup } from './CheckboxGroup';
import { RadioGroup } from './RadioGroup';
import { FormInput } from './FormInput';
import { INVESTMENT_TYPES } from '../constants';
import { FormData } from '../types/form';
import { Settings } from 'lucide-react';

interface InvestmentPreferencesProps {
  formData: FormData;
  onInvestmentChange: (value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStyleChange: (value: string) => void;
  onToggle: (field: keyof FormData) => void;
}

export const InvestmentPreferences: React.FC<InvestmentPreferencesProps> = ({
  formData,
  onInvestmentChange,
  onInputChange,
  onStyleChange,
  onToggle,
}) => {
  const managementStyles = [
    { value: 'active', label: 'Active Management', description: 'Frequent trading and portfolio adjustments' },
    { value: 'passive', label: 'Passive Management', description: 'Buy-and-hold strategy' },
    { value: 'notSure', label: 'Not Sure', description: 'Need guidance on management style' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Which types of investments interest you?</h3>
        <CheckboxGroup
          options={INVESTMENT_TYPES}
          selectedValues={formData.selectedInvestments}
          onChange={onInvestmentChange}
        />
      </div>

      {formData.selectedInvestments.includes('other') && (
        <FormInput
          label="Please specify other investments"
          name="otherInvestmentDescription"
          value={formData.otherInvestmentDescription}
          onChange={onInputChange}
          placeholder="Describe other investments"
          icon={Settings}
        />
      )}

      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Investment Management Style:</h3>
        <RadioGroup
          name="managementStyle"
          options={managementStyles}
          value={formData.managementStyle}
          onChange={onStyleChange}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.hasEthicalPreferences}
            onChange={() => onToggle('hasEthicalPreferences')}
            className="w-4 h-4 text-blue-500 bg-dark-card border-dark-border focus:ring-blue-500"
          />
          <span className="text-gray-200">Do you have any ethical or social investment preferences?</span>
        </div>

        {formData.hasEthicalPreferences && (
          <FormInput
            label="Please specify your ethical preferences"
            name="ethicalPreferences"
            value={formData.ethicalPreferences}
            onChange={onInputChange}
            placeholder="e.g., ESG investing, avoiding certain industries"
            icon={Settings}
          />
        )}
      </div>
    </div>
  );
};