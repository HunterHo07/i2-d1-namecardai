'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { EnhancedTypingText } from '@/components/effects/TypingText';
import MatrixEffect from '@/components/effects/MatrixEffect';

const HeroSection = () => {
  const heroRef = useRef(null);
  const floatingElementsRef = useRef([]);

  // Floating elements animation
  useEffect(() => {
    const elements = floatingElementsRef.current;
    
    elements.forEach((element, index) => {
      if (element) {
        const delay = index * 0.5;
        const duration = 3 + Math.random() * 2;
        
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
      }
    });
  }, []);

  const heroTexts = [
    "Your Name. Reinvented.",
    "Not Just a Card—An Experience.",
    "Connect in 3D. Remember Forever.",
    "The Future of Networking Is Here."
  ];

  const FloatingCard = ({ index, className = '' }) => (
    <div
      ref={el => floatingElementsRef.current[index] = el}
      className={`absolute opacity-20 animate-float ${className}`}
      style={{
        animationName: 'float',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate'
      }}
    >
      <div className="w-16 h-10 bg-gradient-to-r from-neon-blue to-electric-purple rounded-lg shadow-lg shadow-neon-blue/25 transform rotate-12" />
    </div>
  );

  const StatsCard = ({ number, label, delay = 0 }) => (
    <div 
      className="text-center group"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-2xl md:text-3xl font-bold font-display text-neon-blue mb-1 group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>
      <div className="text-sm text-text-secondary">{label}</div>
    </div>
  );

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-space via-deep-purple to-midnight-blue"
    >
      {/* Matrix Background Effect */}
      <MatrixEffect 
        className="absolute inset-0" 
        density={0.6}
        speed={80}
        opacity={0.3}
      />
      
      {/* Floating 3D Elements */}
      <FloatingCard index={0} className="top-20 left-10" />
      <FloatingCard index={1} className="top-40 right-20" />
      <FloatingCard index={2} className="bottom-40 left-20" />
      <FloatingCard index={3} className="bottom-20 right-10" />
      <FloatingCard index={4} className="top-60 left-1/3" />
      <FloatingCard index={5} className="bottom-60 right-1/3" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight">
              <EnhancedTypingText
                preset="hero"
                texts={heroTexts}
                speed={100}
                deleteSpeed={50}
                pauseTime={3000}
                loop={true}
              />
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              AR-enhanced digital business cards that let you share stunning, interactive profiles via 
              <span className="text-neon-blue font-semibold"> QR, NFC, facial recognition, or camera scan</span>
              —no app required.
            </p>
          </div>

          {/* Mini Demo Preview */}
          <div className="relative max-w-md mx-auto">
            <div className="bg-surface-dark/80 backdrop-blur-md rounded-2xl p-6 border border-electric-purple/30 hover:border-neon-blue/50 transition-all duration-300 group">
              <div className="relative">
                {/* Simulated 3D Card */}
                <div className="w-full h-32 bg-gradient-to-br from-neon-blue via-electric-purple to-hologram-pink rounded-xl shadow-2xl shadow-neon-blue/30 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                  <div className="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="p-4 h-full flex flex-col justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                        <div>
                          <div className="w-16 h-2 bg-white/30 rounded mb-1"></div>
                          <div className="w-12 h-1.5 bg-white/20 rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="w-20 h-1.5 bg-white/30 rounded"></div>
                        <div className="w-16 h-1.5 bg-white/20 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating particles */}
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-neon-blue rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-electric-purple rounded-full animate-pulse"></div>
              </div>
              
              <p className="text-sm text-text-secondary mt-4 group-hover:text-neon-blue transition-colors duration-300">
                ✨ Live 3D Card Preview
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/demo">
              <Button 
                variant="primary" 
                size="lg"
                className="text-lg font-semibold px-8 py-4 shadow-2xl shadow-neon-blue/30 hover:shadow-electric-purple/40"
              >
                Try Live Demo
              </Button>
            </Link>
            
            <Link href="/pitch">
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg font-semibold px-8 py-4"
              >
                Watch Pitch
              </Button>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto pt-12 border-t border-electric-purple/20">
            <StatsCard number="88%" label="Cards Thrown Away" delay={0.2} />
            <StatsCard number="7B+" label="Cards Printed Yearly" delay={0.4} />
            <StatsCard number="70%" label="Better Retention" delay={0.6} />
            <StatsCard number="0" label="App Downloads" delay={0.8} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-neon-blue rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neon-blue rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(12deg); }
          100% { transform: translateY(-20px) rotate(15deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
