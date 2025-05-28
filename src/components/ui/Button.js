'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  ...props 
}, ref) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 
    font-medium transition-all duration-300 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden group
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-neon-blue to-electric-purple
      text-white border border-transparent
      hover:from-electric-purple hover:to-hologram-pink
      focus:ring-neon-blue
      shadow-lg shadow-neon-blue/25
      hover:shadow-xl hover:shadow-electric-purple/30
    `,
    secondary: `
      bg-surface-dark border border-electric-purple/30
      text-text-primary hover:text-neon-blue
      hover:border-neon-blue/50 hover:bg-surface-light
      focus:ring-electric-purple
      shadow-md shadow-electric-purple/10
    `,
    outline: `
      bg-transparent border-2 border-neon-blue
      text-neon-blue hover:bg-neon-blue hover:text-dark-space
      focus:ring-neon-blue
      hover:shadow-lg hover:shadow-neon-blue/25
    `,
    ghost: `
      bg-transparent border border-transparent
      text-text-secondary hover:text-neon-blue
      hover:bg-surface-dark/50
      focus:ring-electric-purple
    `,
    danger: `
      bg-gradient-to-r from-hologram-pink to-red-500
      text-white border border-transparent
      hover:from-red-500 hover:to-hologram-pink
      focus:ring-hologram-pink
      shadow-lg shadow-hologram-pink/25
    `,
    success: `
      bg-gradient-to-r from-cyber-green to-green-500
      text-dark-space border border-transparent
      hover:from-green-500 hover:to-cyber-green
      focus:ring-cyber-green
      shadow-lg shadow-cyber-green/25
    `
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-2xl'
  };

  const LoadingSpinner = () => (
    <svg 
      className="animate-spin h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const GlowEffect = () => (
    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-electric-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-inherit" />
  );

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <GlowEffect />
      
      {loading && <LoadingSpinner />}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      
      <span className="relative z-10">{children}</span>
      
      {icon && iconPosition === 'right' && !loading && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
