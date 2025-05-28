'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Simplified 3D Card with CSS transforms (more stable than Three.js)
const SimpleCard3D = ({ 
  cardData, 
  theme = 'cyber', 
  className = '',
  onClick,
  ...props 
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Theme configurations
  const themes = {
    cyber: {
      primary: '#00f5ff',
      secondary: '#8b5cf6',
      accent: '#ff006e',
      gradient: 'from-neon-blue via-electric-purple to-hologram-pink'
    },
    matrix: {
      primary: '#00ff41',
      secondary: '#008f11',
      accent: '#00ff88',
      gradient: 'from-cyber-green via-matrix-green to-green-400'
    },
    neon: {
      primary: '#ff0080',
      secondary: '#8000ff',
      accent: '#00ffff',
      gradient: 'from-hologram-pink via-electric-purple to-neon-blue'
    },
    sunset: {
      primary: '#ff0080',
      secondary: '#ff6b35',
      accent: '#ffd700',
      gradient: 'from-hologram-pink via-orange-500 to-quantum-gold'
    },
    eco: {
      primary: '#00ff88',
      secondary: '#00cc6a',
      accent: '#66ff99',
      gradient: 'from-cyber-green via-green-500 to-emerald-400'
    }
  };

  const currentTheme = themes[theme] || themes.cyber;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      if (!isHovered) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / (rect.height / 2)) * -10;
      const rotateY = (mouseX / (rect.width / 2)) * 10;
      
      setMousePosition({ x: rotateX, y: rotateY });
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale3d(1.05, 1.05, 1.05)
      `;
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      card.style.transition = 'transform 0.1s ease-out';
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease-out';
      setMousePosition({ x: 0, y: 0 });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered]);

  return (
    <div className={cn('relative w-full h-full', className)} {...props}>
      <div
        ref={cardRef}
        onClick={onClick}
        className="relative w-full h-full cursor-pointer transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Main Card */}
        <div className={`
          relative w-full h-full rounded-2xl overflow-hidden
          bg-gradient-to-br ${currentTheme.gradient}
          shadow-2xl border border-white/20
          ${isHovered ? 'shadow-3xl' : ''}
        `}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div 
                className="text-4xl filter drop-shadow-lg"
                style={{ 
                  filter: `drop-shadow(0 0 10px ${currentTheme.primary})`,
                  transform: `translateZ(20px) rotateY(${mousePosition.y * 0.5}deg)`
                }}
              >
                {cardData.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {cardData.name}
                </h3>
                <p className="text-white/80 text-sm">
                  {cardData.title}
                </p>
              </div>
            </div>

            {/* Company & Industry */}
            <div className="text-center">
              <p className="text-lg font-semibold mb-2" style={{ color: currentTheme.primary }}>
                {cardData.company}
              </p>
              <p className="text-white/70 text-sm">
                {cardData.industry}
              </p>
              <p className="text-white/60 text-xs mt-2 italic">
                {cardData.aiPersonality?.voiceIntro?.substring(0, 60)}...
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-sm font-bold" style={{ color: currentTheme.accent }}>
                  {cardData.cardAnalytics?.totalViews?.toLocaleString()}
                </div>
                <div className="text-xs text-white/60">Views</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm font-bold" style={{ color: currentTheme.secondary }}>
                  {cardData.cardAnalytics?.engagementRate}%
                </div>
                <div className="text-xs text-white/60">Engagement</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm font-bold text-white">
                  {cardData.verification?.trustScore}%
                </div>
                <div className="text-xs text-white/60">Trust</div>
              </div>
            </div>
          </div>

          {/* Floating Particles */}
          <div className="absolute top-4 right-4">
            <div 
              className="w-3 h-3 rounded-full animate-ping"
              style={{ backgroundColor: currentTheme.primary }}
            />
          </div>
          
          <div className="absolute bottom-4 left-4">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: currentTheme.accent }}
            />
          </div>

          {/* Hover Glow Effect */}
          {isHovered && (
            <div 
              className="absolute inset-0 rounded-2xl opacity-20 transition-opacity duration-300"
              style={{ 
                background: `radial-gradient(circle at 50% 50%, ${currentTheme.primary}, transparent 70%)`,
                filter: 'blur(20px)'
              }}
            />
          )}

          {/* AI Status Indicator */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: currentTheme.primary }}
            />
            <span className="text-xs text-white/80 font-mono">AI</span>
          </div>
        </div>

        {/* Reflection Effect */}
        <div 
          className="absolute inset-x-0 bottom-0 h-1/3 rounded-b-2xl opacity-20"
          style={{
            background: `linear-gradient(to top, ${currentTheme.primary}20, transparent)`,
            transform: 'translateZ(-10px) rotateX(180deg)',
            filter: 'blur(2px)'
          }}
        />
      </div>
    </div>
  );
};

export default SimpleCard3D;
