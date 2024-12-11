import React from 'react';
import { WhyChooseUs } from './sections/WhyChooseUs';
import { CircleAnimation } from './sections/CircleAnimation';
import { KeyFeatures } from './sections/KeyFeatures';
import { HowItWorks } from './sections/HowItWorks';

export function MainContent() {
  return (
    <div className="space-y-16">
      <WhyChooseUs />
      <CircleAnimation />
      <KeyFeatures />
      <HowItWorks />
    </div>
  );
}