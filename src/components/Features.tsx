import React from 'react';
import { Brain, Shield, TrendingUp, Clock, PieChart, Users } from 'lucide-react';
import { Card } from './ui/Card';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced algorithms analyze market trends and provide personalized recommendations'
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Smart portfolio diversification to protect and grow your investments'
  },
  {
    icon: TrendingUp,
    title: 'Real-time Monitoring',
    description: 'Track your portfolio performance with real-time updates and insights'
  },
  {
    icon: Clock,
    title: '24/7 Automation',
    description: 'Continuous portfolio monitoring and automatic rebalancing'
  },
  {
    icon: PieChart,
    title: 'Smart Diversification',
    description: 'Optimal asset allocation across multiple investment categories'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Access to financial advisors when you need human expertise'
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Intelligent Investment Features
          </h2>
          <p className="text-xl text-gray-600">
            Powered by cutting-edge AI technology to maximize your returns
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity" />
                <feature.icon className="h-12 w-12 text-indigo-600 relative" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}