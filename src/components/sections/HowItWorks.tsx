import React from 'react';
import { Card } from '../ui/Card';
import { BorderBeam } from '../ui/BorderBeam';
import { 
  UserCircle2, 
  BrainCircuit, 
  LayoutDashboard, 
  Bell,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    icon: UserCircle2,
    title: 'Profile Creation',
    description: 'Share your financial goals, risk tolerance, and investment preferences through our intuitive interface.',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: BrainCircuit,
    title: 'Strategy Development',
    description: 'Our AI analyzes your profile and current market conditions to create your personalized investment strategy.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: LayoutDashboard,
    title: 'Portfolio Management',
    description: 'Receive ongoing recommendations and adjustments to keep your portfolio aligned with your goals.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Bell,
    title: 'Regular Updates',
    description: 'Stay informed with clear reports and notifications about your portfolio\'s performance and recommended actions.',
    color: 'from-pink-500 to-rose-500'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="pt-8 pb-20 bg-gradient-to-b from-background to-muted/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Your journey to smarter investing in four simple steps
          </p>
        </div>

        <div className="relative">
          <div className="absolute hidden lg:block left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-rose-500/20 -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
                  </div>
                )}
                
                <Card className="relative p-6 overflow-hidden">
                  <BorderBeam
                    size={400}
                    duration={20}
                    delay={index * 2}
                    colorFrom={`hsl(var(--primary))`}
                    colorTo="#3b82f6"
                  />
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                    
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg mb-6`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}