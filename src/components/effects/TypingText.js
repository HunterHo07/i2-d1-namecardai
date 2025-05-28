'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const TypingText = ({
  texts = ['Your Name. Reinvented.'],
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  loop = true,
  className = '',
  cursorClassName = '',
  showCursor = true,
  onComplete = null
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentFullText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        if (loop || currentTextIndex < texts.length - 1) {
          setIsDeleting(true);
        }
        return;
      }

      if (isDeleting) {
        // Deleting characters
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        // Typing characters
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        } else {
          // Finished typing current text
          if (texts.length === 1 && !loop) {
            // Single text, no loop - we're done
            if (onComplete) onComplete();
            return;
          }
          // Pause before deleting (if looping) or moving to next
          setIsPaused(true);
        }
      }
    }, isPaused ? pauseTime : isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [
    currentText, 
    currentTextIndex, 
    isDeleting, 
    isPaused, 
    texts, 
    speed, 
    deleteSpeed, 
    pauseTime, 
    loop, 
    onComplete
  ]);

  const Cursor = () => (
    <span 
      className={cn(
        'inline-block w-0.5 bg-neon-blue animate-pulse ml-1',
        cursorClassName
      )}
      style={{ 
        animation: 'blink 1s infinite',
        height: '1em'
      }}
    />
  );

  return (
    <span className={cn('inline-block', className)}>
      {currentText}
      {showCursor && <Cursor />}
      
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};

// Preset configurations for common use cases
export const TypingTextPresets = {
  hero: {
    speed: 80,
    deleteSpeed: 40,
    pauseTime: 3000,
    className: 'text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-blue to-electric-purple bg-clip-text text-transparent',
    cursorClassName: 'bg-neon-blue h-12 md:h-16'
  },
  
  subtitle: {
    speed: 60,
    deleteSpeed: 30,
    pauseTime: 2000,
    className: 'text-xl md:text-2xl text-text-secondary',
    cursorClassName: 'bg-electric-purple h-6 md:h-8'
  },
  
  feature: {
    speed: 50,
    deleteSpeed: 25,
    pauseTime: 1500,
    className: 'text-lg text-text-primary',
    cursorClassName: 'bg-cyber-green h-5'
  },
  
  code: {
    speed: 30,
    deleteSpeed: 15,
    pauseTime: 1000,
    className: 'font-mono text-matrix-green',
    cursorClassName: 'bg-matrix-green h-4'
  }
};

// Enhanced typing text with preset support
export const EnhancedTypingText = ({ preset, ...props }) => {
  const presetConfig = preset ? TypingTextPresets[preset] : {};
  const mergedProps = { ...presetConfig, ...props };
  
  return <TypingText {...mergedProps} />;
};

export default TypingText;
