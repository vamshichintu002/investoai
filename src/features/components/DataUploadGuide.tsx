import React from 'react';
import { Card } from './ui/Card';
import { FileText, Upload } from 'lucide-react';

export function DataUploadGuide() {
  return (
    <Card className="max-w-2xl mx-auto my-8 p-6">
      <div className="flex items-start gap-4">
        <FileText className="w-6 h-6 text-blue-500 flex-shrink-0" />
        <div>
          <h2 className="text-lg font-semibold mb-4">How to Update Investment Data</h2>
          
          <div className="space-y-4">
            <p className="text-secondary">
              To update the investment data, prepare a JSON file with the following structure:
            </p>

            <div className="bg-hover rounded-lg p-4">
              <pre className="text-sm overflow-x-auto">
                {`{
  "explanation": "string",
  "recommendations": [{
    "investment_type": "string",
    "allocation_percentage": number,
    "details": "string",
    "specific_suggestions": [{
      "name": "string",
      "ticker": "string",
      "rationale": "string"
    }],
    "entry_strategy": "string",
    "exit_strategy": "string",
    "risk_mitigation": "string"
  }],
  "market_analysis": {
    "[key: string]": {
      "current_trend": "string",
      "outlook": "string",
      "key_factors": ["string"],
      "risks": ["string"],
      "specific_suggestions": [{
        "name": "string",
        "ticker": "string",
        "rationale": "string"
      }]
    }
  },
  "review_schedule": "string",
  "disclaimer": "string"
}`}
              </pre>
            </div>

            <div className="flex items-center gap-2 text-sm text-secondary">
              <Upload className="w-4 h-4" />
              <p>Click the upload button in the bottom-right corner to update the data</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}