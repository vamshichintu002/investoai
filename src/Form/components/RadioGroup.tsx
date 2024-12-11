import React from 'react';
import { motion } from 'framer-motion';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <motion.label
          key={option.value}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start p-3 border border-dark-border rounded-lg cursor-pointer hover:bg-dark-card/50 transition-all group"
        >
          <div className="relative mt-1">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="peer sr-only"
            />
            <div className="w-5 h-5 rounded-full border-2 border-dark-border transition-all bg-dark-card peer-checked:border-blue-500 group-hover:border-blue-400">
              <div className={`w-3 h-3 rounded-full bg-blue-500 absolute top-1 left-1 transition-transform ${
                value === option.value ? 'scale-100' : 'scale-0'
              }`} />
            </div>
          </div>
          <div className="ml-3">
            <div className="font-medium text-gray-200">{option.label}</div>
            {option.description && (
              <div className="text-sm text-gray-400">{option.description}</div>
            )}
          </div>
        </motion.label>
      ))}
    </div>
  );
};