import React, { useState, useEffect } from 'react';
import { TrendingUp, Menu, X } from 'lucide-react';
import { Navigation } from './Navigation';
import { ThemeToggle } from './ThemeToggle';
import { AuthButtons } from './auth/AuthButtons';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 px-4 sm:px-6 lg:px-8">
      <nav
        className={`
          mx-auto max-w-[95%] my-4
          ${isScrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 shadow-lg' 
            : 'bg-white/50 dark:bg-gray-900/50'
          }
          backdrop-blur-md rounded-full transition-all duration-300
        `}
      >
        <div className="py-3 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <span className="ml-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Investo AI
              </span>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-foreground" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              <Navigation />
              <ThemeToggle />
              <div className="flex items-center space-x-3">
                <AuthButtons />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`
          fixed inset-0 bg-white/95 dark:bg-gray-900/95 transition-all duration-300 md:hidden
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
      >
        <div className="h-full flex flex-col px-4 pt-20">
          <Navigation mobile onNavClick={closeMenu} />
          <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <AuthButtons onClose={closeMenu} />
          </div>
        </div>
      </div>
    </header>
  );
}