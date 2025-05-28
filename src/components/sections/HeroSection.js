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

          {/* Interactive Hero Demo */}
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-surface-dark/80 backdrop-blur-md rounded-3xl p-8 border border-electric-purple/30 hover:border-neon-blue/50 transition-all duration-500 group">

              {/* Demo Header */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  🎭 Interactive Demo Preview
                </h3>
                <p className="text-sm text-text-secondary">
                  Hover and click to experience the magic
                </p>
              </div>

              {/* 3D Card Stack */}
              <div className="relative h-48 flex items-center justify-center">
                {/* Background Cards */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-40 bg-gradient-to-br from-electric-purple/30 to-hologram-pink/30 rounded-xl transform rotate-6 scale-95 opacity-60"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-40 bg-gradient-to-br from-cyber-green/30 to-matrix-green/30 rounded-xl transform -rotate-3 scale-90 opacity-40"></div>
                </div>

                {/* Main Interactive Card */}
                <div className="relative z-10 w-64 h-40 bg-gradient-to-br from-neon-blue via-electric-purple to-hologram-pink rounded-xl shadow-2xl shadow-neon-blue/40 transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-700 cursor-pointer">

                  {/* Card Content */}
                  <div className="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm p-4">
                    <div className="h-full flex flex-col justify-between">

                      {/* Header */}
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg animate-pulse">
                          🤖
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">Dr. Sarah Chen</div>
                          <div className="text-white/70 text-xs">AI Research Director</div>
                        </div>
                      </div>

                      {/* Company */}
                      <div className="text-center">
                        <div className="text-white font-bold text-sm mb-1">TechCorp AI Labs</div>
                        <div className="text-white/60 text-xs italic">
                          "Building the future of AI..."
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex justify-between text-xs">
                        <div className="text-center">
                          <div className="text-cyber-green font-bold">15.4K</div>
                          <div className="text-white/60">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-quantum-gold font-bold">98%</div>
                          <div className="text-white/60">Trust</div>
                        </div>
                        <div className="text-center">
                          <div className="text-hologram-pink font-bold">78%</div>
                          <div className="text-white/60">Engage</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-3 -right-3 w-4 h-4 bg-neon-blue rounded-full animate-ping"></div>
                  <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-electric-purple rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 -right-4 w-2 h-2 bg-cyber-green rounded-full animate-bounce"></div>

                  {/* AI Status */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/30 rounded-full px-2 py-1">
                    <div className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-pulse"></div>
                    <span className="text-white text-xs font-mono">AI</span>
                  </div>
                </div>
              </div>

              {/* Interactive Features */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-surface-light/30 rounded-lg hover:bg-neon-blue/10 transition-colors cursor-pointer group/feature">
                  <div className="text-2xl mb-1 group-hover/feature:scale-110 transition-transform">🎤</div>
                  <div className="text-xs text-text-secondary group-hover/feature:text-neon-blue transition-colors">Voice AI</div>
                </div>
                <div className="text-center p-3 bg-surface-light/30 rounded-lg hover:bg-electric-purple/10 transition-colors cursor-pointer group/feature">
                  <div className="text-2xl mb-1 group-hover/feature:scale-110 transition-transform">👁️</div>
                  <div className="text-xs text-text-secondary group-hover/feature:text-electric-purple transition-colors">AR Scan</div>
                </div>
                <div className="text-center p-3 bg-surface-light/30 rounded-lg hover:bg-cyber-green/10 transition-colors cursor-pointer group/feature">
                  <div className="text-2xl mb-1 group-hover/feature:scale-110 transition-transform">📊</div>
                  <div className="text-xs text-text-secondary group-hover/feature:text-cyber-green transition-colors">Analytics</div>
                </div>
              </div>

              {/* Demo CTA */}
              <div className="text-center mt-6">
                <Link href="/demo">
                  <button className="px-6 py-2 bg-gradient-to-r from-neon-blue to-electric-purple rounded-lg text-white font-semibold text-sm hover:scale-105 transition-transform duration-300 shadow-lg shadow-neon-blue/30">
                    🚀 Try Full Demo
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/demo" className="group">
              <button className="relative px-12 py-5 bg-gradient-to-r from-neon-blue via-electric-purple to-hologram-pink rounded-2xl text-white font-bold text-xl shadow-2xl shadow-neon-blue/40 hover:shadow-electric-purple/60 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-hologram-pink via-electric-purple to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Button content */}
                <div className="relative z-10 flex items-center gap-3">
                  <span className="text-2xl">🚀</span>
                  <span>Get Started Free</span>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </Link>

            <Link href="/pitch" className="group">
              <button className="px-8 py-4 border-2 border-electric-purple/50 rounded-xl text-electric-purple font-semibold text-lg hover:bg-electric-purple/10 hover:border-electric-purple hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <span className="mr-2">📺</span>
                Watch Pitch
              </button>
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
