'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/demo', label: 'Demo' },
    { href: '/pitch', label: 'Pitch' },
    { href: '/why-us', label: 'Why Us' },
    { href: '/roadmap', label: 'Roadmap' }
  ];

  const Logo = () => (
    <Link href="/" className="flex items-center space-x-3 group">
      {/* Custom SVG Logo */}
      <div className="relative">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          className="transition-transform duration-300 group-hover:scale-110"
        >
          {/* Outer ring */}
          <circle 
            cx="20" 
            cy="20" 
            r="18" 
            fill="none" 
            stroke="url(#logoGradient)" 
            strokeWidth="2"
            className="animate-pulse"
          />
          
          {/* Inner design */}
          <path 
            d="M12 20 L20 12 L28 20 L20 28 Z" 
            fill="url(#logoGradient)" 
            className="opacity-80"
          />
          
          {/* Center dot */}
          <circle 
            cx="20" 
            cy="20" 
            r="3" 
            fill="#00f5ff"
            className="animate-ping"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ff006e" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-neon-blue/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Brand name */}
      <span className="text-xl font-bold font-display bg-gradient-to-r from-neon-blue to-electric-purple bg-clip-text text-transparent">
        NameCardAI
      </span>
    </Link>
  );

  const NavLink = ({ href, label, mobile = false }) => {
    const isActive = pathname === href;
    
    return (
      <Link
        href={href}
        className={cn(
          'relative px-3 py-2 text-sm font-medium transition-all duration-300',
          'hover:text-neon-blue',
          mobile ? 'block w-full text-left' : 'inline-block',
          isActive 
            ? 'text-neon-blue' 
            : 'text-text-secondary hover:text-text-primary'
        )}
        onClick={() => mobile && setIsMobileMenuOpen(false)}
      >
        {label}
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue to-electric-purple" />
        )}
        
        {/* Hover effect */}
        <div className="absolute inset-0 bg-neon-blue/10 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </Link>
    );
  };

  const MobileMenuButton = () => (
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden p-2 text-text-secondary hover:text-neon-blue transition-colors duration-300"
      aria-label="Toggle mobile menu"
    >
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        {isMobileMenuOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  );

  return (
    <>
      <nav 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'bg-dark-space/95 backdrop-blur-md border-b border-electric-purple/20 shadow-lg shadow-neon-blue/10' 
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                variant="primary" 
                size="sm"
                className="font-semibold"
              >
                Get Started
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <MobileMenuButton />
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-dark-space/95 backdrop-blur-md border-t border-electric-purple/20">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <NavLink key={item.href} {...item} mobile />
              ))}
              
              <div className="pt-4 border-t border-electric-purple/20">
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="w-full font-semibold"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;
