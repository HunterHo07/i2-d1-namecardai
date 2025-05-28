'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const TiltCard = ({ 
  children, 
  className = '',
  tiltMaxAngleX = 15,
  tiltMaxAngleY = 15,
  perspective = 1000,
  scale = 1.05,
  transitionDuration = 400,
  gyroscope = true,
  glareEnable = true,
  glareMaxOpacity = 0.7,
  glareColor = '#ffffff',
  glarePosition = 'bottom',
  reset = true,
  ...props 
}) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    
    if (!card) return;

    let requestId;
    let timeout;

    const handleMouseMove = (e) => {
      if (!isHovered) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / (rect.height / 2)) * tiltMaxAngleX;
      const rotateY = (mouseX / (rect.width / 2)) * tiltMaxAngleY;
      
      requestId = requestAnimationFrame(() => {
        card.style.transform = `
          perspective(${perspective}px) 
          rotateX(${-rotateX}deg) 
          rotateY(${rotateY}deg) 
          scale3d(${scale}, ${scale}, ${scale})
        `;
        
        if (glare && glareEnable) {
          const glareX = (mouseX / rect.width) * 100;
          const glareY = (mouseY / rect.height) * 100;
          const glareOpacity = Math.min(
            Math.sqrt(mouseX * mouseX + mouseY * mouseY) / 
            Math.sqrt(rect.width * rect.width + rect.height * rect.height) * 
            glareMaxOpacity, 
            glareMaxOpacity
          );
          
          glare.style.background = `
            radial-gradient(
              circle at ${50 + glareX}% ${50 + glareY}%, 
              ${glareColor} 0%, 
              transparent 50%
            )
          `;
          glare.style.opacity = glareOpacity;
        }
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      card.style.transition = `transform ${transitionDuration}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      
      if (reset) {
        card.style.transform = `
          perspective(${perspective}px) 
          rotateX(0deg) 
          rotateY(0deg) 
          scale3d(1, 1, 1)
        `;
        
        if (glare && glareEnable) {
          glare.style.opacity = 0;
        }
      }
      
      timeout = setTimeout(() => {
        card.style.transition = '';
      }, transitionDuration);
    };

    // Gyroscope effect for mobile
    const handleDeviceOrientation = (e) => {
      if (!gyroscope || !isHovered) return;
      
      const rotateX = (e.beta - 90) * (tiltMaxAngleX / 90);
      const rotateY = e.gamma * (tiltMaxAngleY / 90);
      
      requestId = requestAnimationFrame(() => {
        card.style.transform = `
          perspective(${perspective}px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          scale3d(${scale}, ${scale}, ${scale})
        `;
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    if (gyroscope && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      
      if (gyroscope && window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
      
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [
    isHovered, 
    tiltMaxAngleX, 
    tiltMaxAngleY, 
    perspective, 
    scale, 
    transitionDuration, 
    gyroscope, 
    glareEnable, 
    glareMaxOpacity, 
    glareColor, 
    reset
  ]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative transform-gpu',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {/* Glare Effect */}
      {glareEnable && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-inherit"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${glareColor} 0%, transparent 50%)`,
            opacity: 0,
            transition: `opacity ${transitionDuration}ms ease-out`,
            mixBlendMode: 'overlay',
            zIndex: 1
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shine Effect */}
      <div 
        className="absolute inset-0 rounded-inherit opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
          transform: 'translateX(-100%)',
          animation: isHovered ? 'shine 1.5s ease-in-out infinite' : 'none'
        }}
      />
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

// Preset configurations
export const TiltPresets = {
  subtle: {
    tiltMaxAngleX: 5,
    tiltMaxAngleY: 5,
    scale: 1.02,
    glareMaxOpacity: 0.3
  },
  
  moderate: {
    tiltMaxAngleX: 10,
    tiltMaxAngleY: 10,
    scale: 1.05,
    glareMaxOpacity: 0.5
  },
  
  dramatic: {
    tiltMaxAngleX: 20,
    tiltMaxAngleY: 20,
    scale: 1.1,
    glareMaxOpacity: 0.8
  },
  
  card: {
    tiltMaxAngleX: 15,
    tiltMaxAngleY: 15,
    scale: 1.05,
    glareEnable: true,
    glareMaxOpacity: 0.6,
    perspective: 1000
  },
  
  nft: {
    tiltMaxAngleX: 25,
    tiltMaxAngleY: 25,
    scale: 1.08,
    glareEnable: true,
    glareMaxOpacity: 0.9,
    perspective: 1200,
    transitionDuration: 300
  }
};

// Enhanced Tilt Card with preset support
export const EnhancedTiltCard = ({ preset, ...props }) => {
  const presetConfig = preset ? TiltPresets[preset] : {};
  const mergedProps = { ...presetConfig, ...props };
  
  return <TiltCard {...mergedProps} />;
};

export default TiltCard;
