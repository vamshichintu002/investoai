import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Circle, ArrowRight, Loader2 } from 'lucide-react';

interface LoadingSequenceProps {
  onComplete?: () => void;
  isSubmitting: boolean;
}

const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete, isSubmitting }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const steps = [
    { label: "Analyzing Personal Profile", details: "Age, Employment, Family Status" },
    { label: "Calculating Financial Capacity", details: "Income, Expenses, Savings Potential" },
    { label: "Evaluating Risk Profile", details: "Risk Tolerance, Investment Timeline" },
    { label: "Processing Investment Preferences", details: "Asset Classes, Ethics, Tax" },
    { label: "Analyzing Market Conditions", details: "Current Trends, Opportunities" },
    { label: "Generating Portfolio Mix", details: "Asset Allocation Strategy" },
    { label: "Selecting Investment Products", details: "Specific Investment Recommendations" },
    { label: "Preparing Final Report", details: "Portfolio Summary, Entry Strategy" }
  ];

  useEffect(() => {
    setShowProgress(true);

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (isSubmitting) {
      // Calculate time per step based on expected submission time
      const totalSteps = steps.length;
      const stepInterval = Math.floor(250); // Adjust this value based on your needs

      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          // Keep the animation running but don't complete the last step
          // until submission is done
          if (prev < totalSteps - 2) {
            return prev + 1;
          }
          return prev;
        });
      }, stepInterval);
    } else {
      // When submission is complete, quickly complete remaining steps
      setCurrentStep(steps.length - 1);
      if (onComplete) {
        setTimeout(onComplete, 1000); // Give time to see completion state
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isSubmitting]);

  const getStepClass = (index: number) => {
    if (index < currentStep) return 'translate-x-0 opacity-100';
    if (index === currentStep) return 'translate-x-0 opacity-100';
    return 'translate-x-4 opacity-0';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-lg z-50 p-4">
      <div className="w-full max-w-2xl mx-auto p-4 md:p-8 space-y-4 rounded-xl shadow-2xl 
                    bg-gradient-to-br from-[#ffffff0a] to-[#ffffff03]
                    backdrop-blur-md backdrop-saturate-150 border border-[#ffffff1a]">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center">
          <span className="bg-gradient-to-r from-[#4169E1] to-[#9370DB] bg-clip-text text-transparent">
            Generating Your Investment Portfolio
          </span>
        </h2>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-black/20 backdrop-blur-sm rounded-full overflow-hidden mb-6 md:mb-8 
                      border border-[#ffffff0a]">
          <div 
            className="h-full bg-gradient-to-r from-[#4169E1] to-[#9370DB] transition-all duration-1000 ease-out"
            style={{ 
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
              opacity: showProgress ? 1 : 0 
            }}
          />
        </div>

        <div className="space-y-3 md:space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex items-start space-x-3 md:space-x-4 transition-all duration-500 ease-out 
                         p-2 md:p-3 rounded-lg bg-[#ffffff0a] backdrop-blur-sm ${getStepClass(index)}`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="mt-1 transition-all duration-300 shrink-0">
                {index < currentStep ? (
                  <CheckCircle2 className="text-[#4169E1] w-5 h-5 md:w-6 md:h-6 animate-scale drop-shadow-glow" />
                ) : index === currentStep ? (
                  <div className="relative">
                    <Circle className="text-[#4169E1] w-5 h-5 md:w-6 md:h-6 drop-shadow-glow" />
                    <Loader2 className="absolute top-0 left-0 w-5 h-5 md:w-6 md:h-6 animate-spin text-[#4169E1] drop-shadow-glow" />
                  </div>
                ) : (
                  <Circle className="text-[#ffffff30] w-5 h-5 md:w-6 md:h-6" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 
                    className={`font-medium text-sm md:text-base transition-colors duration-300 ${
                      index <= currentStep ? 'text-white' : 'text-[#ffffff40]'
                    }`}
                  >
                    {step.label}
                  </h3>
                  {index === currentStep && (
                    <ArrowRight className="w-4 h-4 text-[#4169E1] animate-bounce drop-shadow-glow" />
                  )}
                </div>
                <p 
                  className={`text-xs md:text-sm transition-all duration-300 ${
                    index <= currentStep ? 'text-[#ffffffcc]' : 'text-[#ffffff40]'
                  }`}
                >
                  {step.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-8 text-center">
          <div 
            className="inline-block px-4 md:px-6 py-2 md:py-3 rounded-full 
                       bg-gradient-to-br from-[#ffffff0a] to-[#ffffff03]
                       backdrop-blur-md border border-[#ffffff1a]
                       shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <p className="text-xs md:text-sm bg-gradient-to-r from-[#4169E1] to-[#9370DB] bg-clip-text text-transparent font-medium">
              {currentStep === steps.length - 1 
                ? "Analysis Complete! Preparing Your Portfolio..." 
                : "Analyzing Your Financial Data..."}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-scale {
          animation: scale 2s infinite;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(65, 105, 225, 0.5));
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default LoadingSequence;
