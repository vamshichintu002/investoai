import React from 'react';
import { Button } from '../ui/Button';

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          Get Started Today
        </h2>
        <p className="text-xl text-indigo-100 mb-12">
          Transform your investment strategy with personalized, AI-powered portfolio management.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-indigo-600 hover:bg-indigo-50"
          >
            Schedule Demo
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="border-2 border-white text-white hover:bg-white/10"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}