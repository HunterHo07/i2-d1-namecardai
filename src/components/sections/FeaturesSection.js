'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const FeaturesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  const features = [
    {
      category: "AR Technology",
      title: "3D Card Rendering",
      description: "Real-time 3D business cards with immersive animations and interactive elements",
      icon: "🎯",
      demo: "Live 3D Preview",
      benefits: ["WebGL powered", "60fps animations", "Cross-platform"]
    },
    {
      category: "Sharing Methods",
      title: "Multi-Modal Access",
      description: "Share via QR codes, NFC tags, camera scan, or just remembering a name",
      icon: "📱",
      demo: "Scan Simulation",
      benefits: ["No app required", "Universal compatibility", "Instant access"]
    },
    {
      category: "Recognition",
      title: "Smart Detection",
      description: "AI-powered face and name recognition for seamless card discovery",
      icon: "🔍",
      demo: "Recognition Demo",
      benefits: ["Face matching", "Name search", "Auto-suggestions"]
    },
    {
      category: "Customization",
      title: "Visual Effects",
      description: "Choose from preset animations or create custom AR experiences",
      icon: "✨",
      demo: "Effect Gallery",
      benefits: ["Preset themes", "Custom animations", "Brand integration"]
    },
    {
      category: "Analytics",
      title: "Engagement Tracking",
      description: "Track views, interactions, and networking effectiveness",
      icon: "📊",
      demo: "Analytics Dashboard",
      benefits: ["View metrics", "Interaction data", "ROI tracking"]
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % features.length);
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, features.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const FeatureCard = ({ feature, index, isActive }) => (
    <div
      className={`transition-all duration-500 ${
        isActive
          ? 'scale-100 opacity-100 z-10'
          : 'scale-95 opacity-60 z-0'
      }`}
      style={{
        transform: `translateX(${(index - currentSlide) * 100}%)`,
      }}
    >
      <Card
        variant="glass"
        className="h-full min-h-[400px] relative overflow-hidden"
        hover={isActive}
        glow={isActive}
      >
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{feature.icon}</div>
          <div className="text-sm text-neon-blue font-semibold mb-2">
            {feature.category}
          </div>
          <CardTitle className="text-2xl mb-4">
            {feature.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-text-secondary text-center leading-relaxed">
            {feature.description}
          </p>

          {/* Demo Preview */}
          <div className="bg-dark-space/50 rounded-lg p-4 text-center">
            <div className="text-sm text-electric-purple mb-2">
              {feature.demo}
            </div>
            <div className="w-full h-24 bg-gradient-to-r from-neon-blue/20 to-electric-purple/20 rounded-lg flex items-center justify-center">
              <div className="animate-pulse text-text-secondary">
                Interactive Demo
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            {feature.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
                <span className="text-sm text-text-secondary">{benefit}</span>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full"
          >
            Try {feature.title}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-midnight-blue to-deep-purple relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,245,255,0.1),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            <span className="bg-gradient-to-r from-neon-blue to-electric-purple bg-clip-text text-transparent">
              MVP Features
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Experience the future of networking with our cutting-edge AR technology and intelligent features
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Feature Cards */}
          <div className="relative h-[500px] overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-500 ease-in-out h-full">
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <FeatureCard
                    feature={feature}
                    index={index}
                    isActive={index === currentSlide}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-neon-blue scale-125'
                    : 'bg-text-secondary/30 hover:bg-text-secondary/60'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => handleSlideChange((currentSlide - 1 + features.length) % features.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface-dark/80 backdrop-blur-sm border border-electric-purple/30 rounded-full flex items-center justify-center text-text-primary hover:bg-surface-light/80 hover:border-neon-blue/50 transition-all duration-300"
          >
            ←
          </button>

          <button
            onClick={() => handleSlideChange((currentSlide + 1) % features.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface-dark/80 backdrop-blur-sm border border-electric-purple/30 rounded-full flex items-center justify-center text-text-primary hover:bg-surface-light/80 hover:border-neon-blue/50 transition-all duration-300"
          >
            →
          </button>
        </div>

        {/* Feature Grid Preview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                index === currentSlide
                  ? 'border-neon-blue bg-neon-blue/10'
                  : 'border-electric-purple/30 bg-surface-dark/50 hover:border-electric-purple/60'
              }`}
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <div className="text-sm font-medium text-text-primary">
                {feature.title}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
