import React from 'react';
import clsx from 'clsx';
import { ThemeToggle } from './ThemeToggle';
import { BarChart2, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { formatExplanationText } from '../utils/textFormatters';



interface DashboardHeaderProps {
  viewMode: 'visual' | 'text';
  setViewMode: (mode: 'visual' | 'text') => void;
  explanation: string;
}

export function DashboardHeader({ viewMode, setViewMode, explanation }: DashboardHeaderProps) {
  const { theme } = useTheme();
  const formattedSections = formatExplanationText(explanation);

  return (
    <div className="flex flex-col gap-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Investment Portfolio Overview
        </h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <div className="flex gap-1 sm:gap-2 bg-card/50 p-1 rounded-lg backdrop-blur-sm border border-border/40">
            <button
              onClick={() => setViewMode('visual')}
              className={clsx(
                'flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-md text-xs sm:text-sm transition-all duration-200',
                viewMode === 'visual' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-200'
              )}
            >
              <BarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Visual
            </button>
            <button
              onClick={() => setViewMode('text')}
              className={clsx(
                'flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-md text-xs sm:text-sm transition-all duration-200',
                viewMode === 'text'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-200'
              )}
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Text
            </button>
          </div>
        </div>
      </div>
      <div className="bg-card/50 rounded-xl p-4 sm:p-6 border border-border/40 backdrop-blur-sm">
        <div className="space-y-4">
          {formattedSections.map((section, index) => (
            <div key={index} className="space-y-2">
              {section.title && (
                <h3 className="text-lg font-semibold text-foreground">
                  {section.title}
                </h3>
              )}
              {section.content.map((item, i) => (
                <div key={i}>
                  {item.type === 'text' && (
                    <p className="text-foreground/90 dark:text-foreground/80">
                      {item.content}
                    </p>
                  )}
                  {item.type === 'bullet' && (
                    <div className="flex items-baseline gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <p className="text-foreground/90 dark:text-foreground/80">
                        {item.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}