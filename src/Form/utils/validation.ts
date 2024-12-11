export const validateAge = (value: string): string => {
  if (!value) return '';
  const age = parseInt(value);
  if (isNaN(age) || age < 1 || age > 100) {
    return 'Age must be between 1 and 100';
  }
  return '';
};

export const validateAmount = (value: string): string => {
  if (!value) return '';
  const amount = parseFloat(value);
  if (isNaN(amount) || amount < 0) {
    return 'Please enter a valid amount';
  }
  return '';
};

export const validateText = (value: string): string => {
  if (!value) return '';
  if (!/^[A-Za-z\s]*$/.test(value)) {
    return 'Please enter only letters and spaces';
  }
  return '';
};

export const validateNumber = (value: string, min: number, max: number): string => {
  if (!value) return '';
  const num = parseInt(value);
  if (isNaN(num) || num < min || num > max) {
    return `Please enter a number between ${min} and ${max}`;
  }
  return '';
};

export const validatePhone = (value: string): string => {
  if (!value) return '';
  if (!/^[0-9]{10}$/.test(value)) {
    return 'Please enter a valid 10-digit phone number';
  }
  return '';
};

export const validateName = (value: string): string => {
  if (!value) return '';
  if (!/^[A-Za-z\s]{2,50}$/.test(value)) {
    return 'Name must be 2-50 characters long and contain only letters and spaces';
  }
  return '';
};