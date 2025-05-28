'use client';

import { useState, useEffect } from 'react';
import SimpleCard3D from './SimpleCard3D';
import Button from '@/components/ui/Button';

const SimpleCarousel = ({ cards, onCardSelect, activeCardIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(activeCardIndex);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, cards.length]);

  // Update parent when card changes
  useEffect(() => {
    if (onCardSelect && cards[currentIndex]) {
      onCardSelect(cards[currentIndex], currentIndex);
    }
  }, [currentIndex, cards, onCardSelect]);

  const handleCardSelect = (index) => {
    console.log('Card selected:', index); // Debug log
    setCurrentIndex(index);
    setIsAutoPlaying(false);

    if (onCardSelect && cards[index]) {
      onCardSelect(cards[index], index);
    }

    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextCard = (e) => {
    console.log('Next card clicked'); // Debug log
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const newIndex = (currentIndex + 1) % cards.length;
    console.log('Moving to index:', newIndex); // Debug log

    setCurrentIndex(newIndex);
    setIsAutoPlaying(false);

    if (onCardSelect && cards[newIndex]) {
      onCardSelect(cards[newIndex], newIndex);
    }

    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevCard = (e) => {
    console.log('Previous card clicked'); // Debug log
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const newIndex = (currentIndex - 1 + cards.length) % cards.length;
    console.log('Moving to index:', newIndex); // Debug log

    setCurrentIndex(newIndex);
    setIsAutoPlaying(false);

    if (onCardSelect && cards[newIndex]) {
      onCardSelect(cards[newIndex], newIndex);
    }

    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getCardPosition = (index) => {
    const diff = index - currentIndex;
    const totalCards = cards.length;
    
    // Normalize the difference to be between -totalCards/2 and totalCards/2
    let normalizedDiff = diff;
    if (normalizedDiff > totalCards / 2) {
      normalizedDiff -= totalCards;
    } else if (normalizedDiff < -totalCards / 2) {
      normalizedDiff += totalCards;
    }
    
    return normalizedDiff;
  };

  const getCardStyle = (index) => {
    const position = getCardPosition(index);
    const isActive = index === currentIndex;
    
    // Calculate transform based on position
    const translateX = position * 120; // 120px spacing
    const translateZ = isActive ? 0 : -100 - Math.abs(position) * 50;
    const rotateY = position * 15; // Slight rotation
    const scale = isActive ? 1 : 0.8 - Math.abs(position) * 0.1;
    const opacity = Math.max(0.3, 1 - Math.abs(position) * 0.3);
    
    return {
      transform: `
        translateX(${translateX}px) 
        translateZ(${translateZ}px) 
        rotateY(${rotateY}deg) 
        scale(${scale})
      `,
      opacity,
      zIndex: isActive ? 10 : 10 - Math.abs(position),
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* 3D Perspective Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{ 
          perspective: '1000px',
          perspectiveOrigin: 'center center'
        }}
      >
        {/* Cards */}
        <div className="relative w-80 h-64">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="absolute inset-0 cursor-pointer"
              style={getCardStyle(index)}
              onClick={() => handleCardSelect(index)}
            >
              <SimpleCard3D
                cardData={card}
                theme={card.cardTheme?.background || 'cyber'}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={(e) => {
            console.log('Left arrow clicked');
            prevCard(e);
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-electric-purple to-neon-blue backdrop-blur-sm border-2 border-neon-blue/50 rounded-full flex items-center justify-center text-white font-bold text-xl hover:scale-110 hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 z-30 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          ←
        </button>

        <button
          type="button"
          onClick={(e) => {
            console.log('Right arrow clicked');
            nextCard(e);
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-neon-blue to-electric-purple backdrop-blur-sm border-2 border-neon-blue/50 rounded-full flex items-center justify-center text-white font-bold text-xl hover:scale-110 hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 z-30 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          →
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {cards.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={(e) => {
              console.log('Dot clicked:', index);
              e.preventDefault();
              e.stopPropagation();
              handleCardSelect(index);
            }}
            className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? 'bg-neon-blue scale-125 shadow-lg shadow-neon-blue/50 border-2 border-white/50'
                : 'bg-text-secondary/40 hover:bg-neon-blue/60 hover:scale-110 border border-white/20'
            }`}
            style={{ pointerEvents: 'auto' }}
          />
        ))}
      </div>

      {/* Auto-play Control */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-3 py-1 rounded-full text-xs border transition-all duration-300 ${
            isAutoPlaying
              ? 'border-cyber-green/50 bg-cyber-green/10 text-cyber-green'
              : 'border-text-secondary/30 bg-surface-dark/50 text-text-secondary'
          }`}
        >
          {isAutoPlaying ? '⏸️ Auto' : '▶️ Manual'}
        </button>
      </div>

      {/* Card Info */}
      <div className="absolute top-4 left-4 bg-dark-space/80 backdrop-blur-sm rounded-lg p-3 border border-electric-purple/30">
        <div className="text-sm text-text-primary font-semibold">
          {cards[currentIndex]?.name}
        </div>
        <div className="text-xs text-text-secondary">
          {cards[currentIndex]?.title}
        </div>
        <div className="text-xs text-electric-purple">
          {currentIndex + 1} of {cards.length}
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${cards[currentIndex]?.cardTheme?.primary || '#00f5ff'}, transparent 70%)`
          }}
        />
      </div>
    </div>
  );
};

export default SimpleCarousel;
