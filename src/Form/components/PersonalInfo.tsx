import React from 'react';
import { FormInput } from './FormInput';
import { User, Phone, Briefcase, IndianRupee, Users } from 'lucide-react';
import { FormData } from '../types/form';

interface PersonalInfoProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <FormInput
        label="What is your name?"
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder="Enter your full name"
        icon={User}
        required
        pattern="[A-Za-z\s]{2,50}"
      />

      <FormInput
        label="What is your phone number?"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={onChange}
        placeholder="Enter your 10-digit phone number"
        icon={Phone}
        required
        pattern="[0-9]{10}"
      />
      
      <FormInput
        label="What is your age?"
        name="age"
        type="number"
        value={formData.age}
        onChange={onChange}
        placeholder="Enter your age"
        icon={User}
        required
        min={1}
        max={100}
      />
      
      <FormInput
        label="What is your employment status?"
        name="employmentStatus"
        value={formData.employmentStatus}
        onChange={onChange}
        placeholder="e.g., Employed, Self-employed, Retired"
        icon={Briefcase}
        required
      />
      
      <FormInput
        label="What is your annual income?"
        name="annualIncome"
        type="number"
        value={formData.annualIncome}
        onChange={onChange}
        placeholder="Annual income in INR"
        icon={IndianRupee}
        required
      />
      
      <FormInput
        label="What is your marital status?"
        name="maritalStatus"
        value={formData.maritalStatus}
        onChange={onChange}
        placeholder="e.g., Single, Married, Divorced"
        icon={Users}
        required
      />
      
      <FormInput
        label="Number of dependents"
        name="dependents"
        type="number"
        value={formData.dependents}
        onChange={onChange}
        placeholder="Number of dependents"
        icon={Users}
        min={0}
      />
    </div>
  );
};