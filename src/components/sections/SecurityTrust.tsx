import React from 'react';
import { Lock } from 'lucide-react';
import { Card } from '../ui/Card';

const securityFeatures = [
  'Bank-grade encryption',
  'Regular security audits',
  'Privacy-first approach',
  'Industry compliant'
];

export function SecurityTrust() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Security & Trust
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="p-6 text-center">
              <Lock className="h-8 w-8 mx-auto mb-4 text-indigo-600" />
              <p className="text-gray-700 font-medium">{feature}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}