import React, { useState } from 'react';
import { useInvestmentData } from '../hooks/useInvestmentData';
import { Card } from './ui/Card';
import { Upload, X } from 'lucide-react';

export function DataUpdateForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { updateData } = useInvestmentData();
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const newData = JSON.parse(text);
      await updateData(newData);
      setIsOpen(false);
      setError(null);
    } catch (err) {
      setError('Invalid data format. Please check your JSON file.');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Upload className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 p-2 rounded-lg hover:bg-hover transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Update Investment Data</h2>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-500 hover:text-blue-600"
              >
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <p>Click to upload JSON file</p>
                <p className="text-sm text-secondary mt-1">
                  File should match the required data structure
                </p>
              </label>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}