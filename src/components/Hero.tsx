import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';
import { Button } from './ui/Button';
import { HeroVisualization } from './HeroVisualization';

export function Hero() {
  const { openSignUp } = useClerk();

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      const offset = 80; // Height of the fixed header
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="hero-gradient text-foreground min-h-[calc(100vh-4rem)] pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Personal
              <span className="block mt-2 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                AI Investment Advisor
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Get personalized investment recommendations powered by advanced AI algorithms. 
              Build and manage your portfolio with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="secondary"
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 flex items-center justify-center w-full sm:w-auto"
                onClick={() => openSignUp()}
              >
                Start Investing <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
                onClick={() => scrollToSection('#why-choose-us')}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="w-full max-w-2xl mx-auto lg:max-w-none">
            <HeroVisualization />
          </div>
        </div>
      </div>
    </div>
  );
}