'use client';

import { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';

const ProblemSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // 3D Tilt Effect
  useEffect(() => {
    const handleMouseMove = (e, card) => {
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = (card) => {
      if (!card) return;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    cardsRef.current.forEach((card) => {
      if (card) {
        const mouseMoveHandler = (e) => handleMouseMove(e, card);
        const mouseLeaveHandler = () => handleMouseLeave(card);
        
        card.addEventListener('mousemove', mouseMoveHandler);
        card.addEventListener('mouseleave', mouseLeaveHandler);
        
        return () => {
          card.removeEventListener('mousemove', mouseMoveHandler);
          card.removeEventListener('mouseleave', mouseLeaveHandler);
        };
      }
    });
  }, []);

  const problems = [
    {
      icon: '🗑️',
      title: 'Paper Cards Get Lost',
      description: '88% of business cards are thrown away within a week. Your investment literally goes in the trash.',
      stat: '7B+ cards wasted yearly'
    },
    {
      icon: '📱',
      title: 'Tech Dependency',
      description: 'QR codes need cameras, NFC needs compatible devices. What happens when tech fails?',
      stat: '30% compatibility issues'
    },
    {
      icon: '😴',
      title: 'Boring & Forgettable',
      description: 'Static cards blend into the noise. No engagement, no story, no lasting impression.',
      stat: '95% forgotten instantly'
    },
    {
      icon: '🔄',
      title: 'Manual Effort Required',
      description: 'Typing contact info, updating details, managing connections. Too much friction.',
      stat: '5 minutes per contact'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-midnight-blue to-deep-purple relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,255,0.1),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            <span className="bg-gradient-to-r from-hologram-pink to-quantum-gold bg-clip-text text-transparent">
              The Problem with Traditional Networking
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            In a digital world, we're still stuck with analog solutions that waste time, money, and opportunities.
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <Card
              key={index}
              ref={el => cardsRef.current[index] = el}
              variant="glass"
              className="h-full transition-all duration-300 cursor-pointer transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Icon */}
                <div className="text-4xl mb-4 text-center">{problem.icon}</div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-text-primary mb-3 text-center">
                  {problem.title}
                </h3>
                
                {/* Description */}
                <p className="text-text-secondary text-center mb-4 flex-grow">
                  {problem.description}
                </p>
                
                {/* Stat */}
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-hologram-pink/20 text-hologram-pink rounded-full text-sm font-medium">
                    {problem.stat}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-text-secondary mb-6">
            It's time for a solution that works in the real world.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-hologram-pink to-quantum-gold mx-auto rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
