import React, { useState, useEffect } from 'react';
import { 
  Wallet,
  LogOut,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Coins
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import clsx from 'clsx';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: 'portfolio' | 'other';
  onPageChange: (page: 'portfolio' | 'other') => void;
}

const didYouKnowFacts = [
  "Compound interest is often called the eighth wonder of the world.",
  "The Rule of 72 helps you estimate how long it takes to double your money.",
  "Diversification helps reduce investment risk by spreading investments.",
  "Dollar-cost averaging can help reduce the impact of market volatility.",
  "The first stock exchange was established in Amsterdam in 1602."
];

export function Sidebar({ isOpen, onToggle, currentPage, onPageChange }: SidebarProps) {
  const { theme } = useTheme();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [showHoverArea, setShowHoverArea] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setShowHoverArea(e.clientX <= 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % didYouKnowFacts.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className={clsx(
          'fixed top-1/2 -translate-y-1/2 z-[60] p-2 rounded-lg transition-all duration-300',
          'bg-card/90 border border-border/40 backdrop-blur-sm',
          'hover:bg-hover shadow-sm',
          isOpen ? 'left-[248px]' : 'left-4'
        )}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {/* Hover trigger area */}
      <div 
        className={clsx(
          'fixed top-0 left-0 w-5 h-full z-40',
          'transition-opacity duration-300',
          showHoverArea ? 'opacity-100' : 'opacity-0'
        )}
        onMouseEnter={() => onToggle()}
      />
      
      {/* Sidebar */}
      <div 
        className={clsx(
          'fixed top-0 left-0 h-full z-50 w-64 transform transition-transform duration-300',
          'border-r border-border/40 backdrop-blur-md',
          'bg-gradient-to-b from-card/95 to-card/80',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        onMouseLeave={() => onToggle()}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
              Investment Analytics
            </h1>
            <nav className="flex-1 space-y-2">
              <button
                onClick={() => onPageChange('portfolio')}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                  'text-foreground hover:bg-accent/10',
                  currentPage === 'portfolio' && 'bg-accent/20'
                )}
              >
                <Wallet className="w-5 h-5" />
                <span className="font-medium">Portfolio</span>
              </button>

              <button
                onClick={() => onPageChange('other')}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                  'text-foreground hover:bg-accent/10',
                  currentPage === 'other' && 'bg-accent/20'
                )}
              >
                <Coins className="w-5 h-5" />
                <span className="font-medium">Other Investment Options</span>
              </button>
            </nav>
          </div>

          {/* Did You Know Section */}
          <div className="mt-auto p-6 border-t border-border/40">
            <div className="bg-card/50 rounded-lg p-4 backdrop-blur-sm border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-foreground">Did You Know?</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {didYouKnowFacts[currentFact]}
              </p>
            </div>

            {/* Logout Button */}
            <button
              className={clsx(
                'w-full mt-4 flex items-center gap-2 px-4 py-3 rounded-lg',
                'text-sm transition-colors text-red-500 hover:bg-red-500/10'
              )}
              onClick={async () => {
                const loadingToast = toast.loading('Logging out...', {
                  icon: '🔄'
                });
                
                // Wait for 2 seconds to show loading state
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                await signOut();
                toast.dismiss(loadingToast);
                
                toast.success('Successfully logged out!', {
                  icon: '👋',
                  duration: 3000
                });
                
                navigate('/');
              }}
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}