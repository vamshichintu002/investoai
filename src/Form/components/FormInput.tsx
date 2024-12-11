import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon: LucideIcon;
  required?: boolean;
  min?: string | number;
  max?: string | number;
  pattern?: string;
  errorMessage?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
  min,
  max,
  pattern,
  errorMessage,
}) => {
  const [error, setError] = React.useState('');
  const [touched, setTouched] = React.useState(false);

  const validateInput = (input: string) => {
    if (required && !input) {
      return 'This field is required';
    }

    if (type === 'number') {
      const num = parseFloat(input);
      if (input && isNaN(num)) {
        return 'Please enter a valid number';
      }
      if (min !== undefined && num < min) {
        return `Value must be at least ${min}`;
      }
      if (max !== undefined && num > max) {
        return `Value must be at most ${max}`;
      }
    }

    if (name === 'name' && input && !/^[A-Za-z\s]*$/.test(input)) {
      return 'Please enter only letters and spaces';
    }

    if (name === 'age' && input) {
      const age = parseInt(input);
      if (isNaN(age) || age < 1 || age > 100) {
        return 'Age must be between 1 and 100';
      }
    }

    if (pattern && input && !new RegExp(pattern).test(input)) {
      return errorMessage || 'Invalid format';
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // For number inputs, allow empty string to handle backspace
    if (type === 'number' && input === '') {
      onChange(e);
      setError('');
      return;
    }

    const validationError = validateInput(input);
    setError(validationError);
    onChange(e);
    if (touched) {
      setError(validationError);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const input = value.toString();
    
    // For number inputs, set to 0 if empty on blur
    if (type === 'number' && input === '') {
      const event = {
        target: {
          name: name,
          value: '0'
        }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
    
    const validationError = validateInput(input);
    setError(validationError);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`block w-full pl-10 pr-3 py-2 bg-dark-input border ${
            touched && error ? 'border-red-500' : 'border-dark-border'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 text-base font-medium transition-all duration-200`}
          style={{
            caretColor: 'white',
            backgroundColor: '#1a1a1a',
            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)'
          }}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          pattern={pattern}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      </div>
      {touched && error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500"
          id={`${name}-error`}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};