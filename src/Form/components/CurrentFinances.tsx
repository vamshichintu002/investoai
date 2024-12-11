import React from 'react';
import { FormInput } from './FormInput';
import { IndianRupee, Wallet, CreditCard, PiggyBank } from 'lucide-react';
import { FormData } from '../types/form';

interface CurrentFinancesProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle: (field: keyof FormData) => void;
}

export const CurrentFinances: React.FC<CurrentFinancesProps> = ({
  formData,
  onChange,
  onToggle,
}) => {
  return (
    <div className="space-y-6">
      <FormInput
        label="What is your current total monthly income?"
        name="monthlyIncome"
        type="number"
        value={formData.monthlyIncome}
        onChange={onChange}
        placeholder="Monthly income in INR"
        icon={IndianRupee}
        required
      />

      <FormInput
        label="What are your total monthly expenses?"
        name="monthlyExpenses"
        type="number"
        value={formData.monthlyExpenses}
        onChange={onChange}
        placeholder="Monthly expenses in INR"
        icon={Wallet}
        required
      />

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.hasDebts}
            onChange={() => onToggle('hasDebts')}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-white">Do you have any existing debts?</span>
        </div>

        {formData.hasDebts && (
          <FormInput
            label="Please specify your debts"
            name="debtDetails"
            value={formData.debtDetails}
            onChange={onChange}
            placeholder="e.g., credit card, home loan, personal loan"
            icon={CreditCard}
          />
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.hasEmergencyFund}
            onChange={() => onToggle('hasEmergencyFund')}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-white">Do you have an emergency fund in place?</span>
        </div>

        {formData.hasEmergencyFund && (
          <FormInput
            label="How many months of expenses does it cover?"
            name="emergencyFundMonths"
            type="number"
            value={formData.emergencyFundMonths}
            onChange={onChange}
            placeholder="Number of months"
            icon={PiggyBank}
            min={1}
          />
        )}
      </div>
    </div>
  );
};