import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CheckboxGroupProps {
  options: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (value: string) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <motion.label
          key={option.value}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-3 p-3 border border-dark-border rounded-lg cursor-pointer hover:bg-dark-card/50 transition-all group"
        >
          <div className="relative">
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <div className="w-5 h-5 border-2 border-dark-border rounded transition-all bg-dark-card peer-checked:border-blue-500 peer-checked:bg-blue-500 group-hover:border-blue-400">
              <Check 
                className={`w-4 h-4 text-white absolute top-0.5 left-0.5 transition-transform ${
                  selectedValues.includes(option.value) ? 'scale-100' : 'scale-0'
                }`}
              />
            </div>
          </div>
          <span className="text-gray-200">{option.label}</span>
        </motion.label>
      ))}
    </div>
  );
};