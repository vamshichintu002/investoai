import React from 'react';
import { Card } from '../ui/Card';
import { BorderBeam } from '../ui/BorderBeam';

const reasons = [
  {
    title: 'Truly Personal Investment Strategies',
    description: 'Your investment journey is unique. Our AI-powered advisor analyzes your financial goals, risk tolerance, and market conditions to create a portfolio strategy that\'s tailored specifically for you.'
  },
  {
    title: 'Real-Time Market Intelligence',
    description: 'Stay ahead of market trends with our dynamic portfolio recommendations that adjust to changing market conditions. Our advanced algorithms continuously monitor and analyze market data to keep your investments optimized.'
  },
  {
    title: 'Personal Assistant',
    description: 'Chat with our AI assistant to get instant answers about your portfolio, market trends, and investment opportunities. Get real-time market data, portfolio updates, and personalized recommendations through natural conversations that help you stay informed and make better investment decisions.'
  }
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Why Choose Our Portfolio Advisor?
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="p-6 md:p-8 relative overflow-hidden group">
              <BorderBeam
                size={400}
                duration={20}
                delay={index * 2}
                colorFrom="hsl(var(--primary))"
                colorTo="#3b82f6"
              />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}