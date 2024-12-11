import React from 'react';
import { FormInput } from './FormInput';
import { Calendar, Settings } from 'lucide-react';
import { FormData } from '../types/form';
import { RadioGroup } from './RadioGroup';
import { INVESTMENT_MANAGEMENT_PREFERENCES } from '../constants';

interface AdditionalInfoProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle: (field: keyof FormData) => void;
  onInvolvementChange: (value: string) => void;
}

export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
  formData,
  onChange,
  onToggle,
  onInvolvementChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.planningLifeChanges}
            onChange={() => onToggle('planningLifeChanges')}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-white">Are you planning any major life changes in the near future?</span>
        </div>

        {formData.planningLifeChanges && (
          <FormInput
            label="Please specify the life changes"
            name="lifeChangesDetails"
            value={formData.lifeChangesDetails}
            onChange={onChange}
            placeholder="e.g., marriage, career change, relocation"
            icon={Calendar}
          />
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium text-white mb-4">How involved do you want to be in managing your investments?</h3>
        <RadioGroup
          name="investmentInvolvement"
          options={INVESTMENT_MANAGEMENT_PREFERENCES}
          value={formData.investmentInvolvement}
          onChange={onInvolvementChange}
        />
      </div>
    </div>
  );
};