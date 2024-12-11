import React from 'react';
import { Card } from '../ui/Card';
import { BorderBeam } from '../ui/BorderBeam';
import { 
  Brain, 
  PieChart,
  LineChart,
  TrendingUp,
  Shield,
  Target,
  Activity,
  Eye,
  AlertCircle,
  BarChart,
  GoalChart,
  Lock
} from 'lucide-react';

const features = [
  {
    title: 'Smart Portfolio Generation',
    icon: Brain,
    items: [
      {
        title: 'Risk Profile Analysis',
        description: 'Customized asset allocation based on your risk profile',
        icon: Target
      },
      {
        title: 'Dynamic Rebalancing',
        description: 'Automatic portfolio adjustments to maintain optimal allocation',
        icon: Activity
      },
      {
        title: 'Multi-factor Analysis',
        description: 'Comprehensive evaluation using multiple market factors',
        icon: PieChart
      }
    ]
  },
  {
    title: 'Comprehensive Reporting',
    icon: LineChart,
    items: [
      {
        title: 'Performance Tracking',
        description: 'Real-time monitoring of your investment performance',
        icon: TrendingUp
      },
      {
        title: 'Risk Analysis',
        description: 'Detailed risk assessment and visualization',
        icon: AlertCircle
      },
      {
        title: 'Goal Progress',
        description: 'Track your progress towards financial goals',
        icon: Target
      }
    ]
  },
  {
    title: 'Personal Assistant',
    icon: Shield,
    items: [
      {
        title: '24/7 Support',
        description: 'Chat anytime for instant answers about your investments',
        icon: Eye
      },
      {
        title: 'Market Data',
        description: 'Access real-time market information and analytics',
        icon: BarChart
      },
      {
        title: 'Learn & Grow',
        description: 'Understand complex financial concepts with personalized explanations',
        icon: Brain
      }
    ]
  }
];

export function KeyFeatures() {
  return (
    <section id="key-features" className="py-16 bg-gradient-to-b from-background to-muted/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Advanced tools and insights for smarter investing
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="space-y-6">
              <Card className="p-6 relative overflow-hidden group">
                <BorderBeam
                  size={400}
                  duration={20}
                  delay={index * 2}
                  colorFrom={`hsl(var(--primary))`}
                  colorTo="#3b82f6"
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      {feature.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {feature.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-muted/50 group"
                      >
                        <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}