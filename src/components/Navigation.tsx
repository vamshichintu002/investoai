import React from 'react';
import { useAuth, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../contexts/FormContext';
import { LogOut } from 'lucide-react';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void;
}

const NavItem = ({ href, children, mobile, onClick }: NavItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // Height of the fixed header
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    if (onClick) onClick();
  };

  return (
    <div className={`relative group ${mobile ? 'w-full' : ''}`}>
      <a 
        href={href} 
        onClick={handleClick}
        className={`
          flex items-center text-foreground hover:text-primary transition-colors
          ${mobile 
            ? 'px-4 py-2 w-full hover:bg-gray-100/50 dark:hover:bg-gray-100/50 rounded-lg' 
            : 'px-4 py-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-100/50'
          }
        `}
      >
        <span>{children}</span>
      </a>
    </div>
  );
};

interface NavigationProps {
  mobile?: boolean;
  onNavClick?: () => void;
}

export function Navigation({ mobile, onNavClick }: NavigationProps) {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const { hasFilledForm, isLoading } = useForm();

  const handleLogout = async () => {
    if (onNavClick) onNavClick();
    await signOut();
    navigate('/');
  };

  return (
    <div className={mobile ? 'flex flex-col space-y-2' : 'flex items-center space-x-1'}>
      <NavItem href="#how-it-works" mobile={mobile} onClick={onNavClick}>Our Approach</NavItem>
      <NavItem href="#key-features" mobile={mobile} onClick={onNavClick}>Features</NavItem>
      <NavItem href="#contact" mobile={mobile} onClick={onNavClick}>Contact Us</NavItem>
      {isSignedIn && (
        <button
          onClick={handleLogout}
          className={`
            flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors
            ${mobile 
              ? 'px-4 py-2 w-full hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg justify-center' 
              : 'px-4 py-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/10'
            }
          `}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      )}
    </div>
  );
}