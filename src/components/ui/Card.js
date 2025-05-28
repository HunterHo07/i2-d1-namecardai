'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Card = forwardRef(({ 
  className, 
  variant = 'default',
  hover = true,
  glow = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = `
    relative rounded-xl border backdrop-blur-sm
    transition-all duration-300 ease-out
    overflow-hidden group
  `;

  const variants = {
    default: `
      bg-surface-dark/80 border-electric-purple/20
      hover:border-neon-blue/40 hover:bg-surface-light/80
    `,
    glass: `
      bg-white/5 border-white/10
      hover:bg-white/10 hover:border-white/20
      backdrop-blur-md
    `,
    neon: `
      bg-dark-space/90 border-neon-blue/50
      hover:border-neon-blue hover:bg-dark-space
      shadow-lg shadow-neon-blue/10
    `,
    purple: `
      bg-deep-purple/80 border-electric-purple/30
      hover:border-electric-purple hover:bg-deep-purple
      shadow-lg shadow-electric-purple/10
    `,
    gradient: `
      bg-gradient-to-br from-surface-dark/80 to-deep-purple/80
      border-gradient-to-r from-neon-blue/30 to-electric-purple/30
      hover:from-surface-light/80 hover:to-midnight-blue/80
    `
  };

  const hoverEffects = hover ? `
    hover:scale-[1.02] hover:-translate-y-1
    hover:shadow-2xl hover:shadow-neon-blue/20
  ` : '';

  const glowEffect = glow ? `
    before:absolute before:inset-0 before:rounded-xl
    before:bg-gradient-to-r before:from-neon-blue/20 before:to-electric-purple/20
    before:opacity-0 before:transition-opacity before:duration-300
    hover:before:opacity-100
  ` : '';

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        hoverEffects,
        glowEffect,
        className
      )}
      {...props}
    >
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-blue via-electric-purple to-hologram-pink opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-neon-blue/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
});

Card.displayName = 'Card';

// Card Header Component
const CardHeader = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 pb-4', className)}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

// Card Title Component
const CardTitle = forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-semibold text-text-primary mb-2',
      'bg-gradient-to-r from-neon-blue to-electric-purple bg-clip-text text-transparent',
      className
    )}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

// Card Description Component
const CardDescription = forwardRef(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-text-secondary leading-relaxed', className)}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

// Card Content Component
const CardContent = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 pb-6', className)}
    {...props}
  >
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

// Card Footer Component
const CardFooter = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-6 py-4 border-t border-electric-purple/20',
      'bg-gradient-to-r from-transparent via-electric-purple/5 to-transparent',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

// Export all components
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
};
