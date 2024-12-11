import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from './Card';

interface ErrorMessageProps {
  error: Error | null;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold mb-2">Error Loading Data</h2>
            <p className="text-secondary">{error?.message || 'An unexpected error occurred'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}