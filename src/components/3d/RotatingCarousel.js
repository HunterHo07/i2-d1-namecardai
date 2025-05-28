'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Float, Html, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Individual Card in Carousel
const CarouselCard = ({ cardData, position, rotation, isActive, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation animation
      meshRef.current.rotation.y = rotation;
      
      // Scale effect for active card
      const targetScale = isActive ? 1.2 : hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Box
          ref={meshRef}
          args={[2.5, 1.6, 0.1]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
        >
          {/* Card Material */}
          <meshStandardMaterial
            color={isActive ? '#00f5ff' : '#1a1a2e'}
            transparent
            opacity={0.9}
            roughness={0.1}
            metalness={0.8}
            emissive={isActive ? '#00f5ff' : '#000000'}
            emissiveIntensity={isActive ? 0.2 : 0}
          />
          
          {/* Card Content */}
          <Html
            transform
            occlude
            position={[0, 0, 0.06]}
            style={{
              width: '250px',
              height: '160px',
              background: `linear-gradient(135deg, ${cardData.cardTheme?.primary || '#00f5ff'}20, ${cardData.cardTheme?.secondary || '#8b5cf6'}20)`,
              backdropFilter: 'blur(10px)',
              border: `2px solid ${isActive ? '#00f5ff' : cardData.cardTheme?.primary || '#8b5cf6'}40`,
              borderRadius: '12px',
              padding: '16px',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transform: isActive ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                fontSize: '24px',
                filter: `drop-shadow(0 0 8px ${cardData.cardTheme?.primary || '#00f5ff'})`
              }}>
                {cardData.avatar}
              </div>
              <div>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  fontWeight: 'bold',
                  color: cardData.cardTheme?.primary || '#00f5ff'
                }}>
                  {cardData.name}
                </h3>
                <p style={{ 
                  margin: 0, 
                  fontSize: '10px', 
                  opacity: 0.8,
                  color: '#ffffff'
                }}>
                  {cardData.title}
                </p>
              </div>
            </div>

            {/* Company */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                margin: '4px 0', 
                fontSize: '12px', 
                fontWeight: 'bold',
                color: cardData.cardTheme?.secondary || '#8b5cf6'
              }}>
                {cardData.company}
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '8px', 
                fontStyle: 'italic',
                opacity: 0.7,
                lineHeight: '1.2'
              }}>
                {cardData.aiPersonality?.voiceIntro?.substring(0, 60)}...
              </p>
            </div>

            {/* Stats */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              fontSize: '8px',
              opacity: 0.8
            }}>
              <div>
                <div style={{ color: '#00ff88' }}>
                  {cardData.cardAnalytics?.totalViews?.toLocaleString()} views
                </div>
              </div>
              <div>
                <div style={{ color: '#ffd700' }}>
                  {cardData.cardAnalytics?.engagementRate}% engagement
                </div>
              </div>
            </div>

            {/* Active Indicator */}
            {isActive && (
              <div style={{ 
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#00f5ff',
                animation: 'pulse 2s infinite',
                boxShadow: '0 0 10px #00f5ff'
              }} />
            )}
          </Html>
        </Box>
      </Float>
    </group>
  );
};

// Main Rotating Carousel Component
const RotatingCarousel = ({ cards, onCardSelect, activeCardIndex = 0 }) => {
  const groupRef = useRef();
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(activeCardIndex);

  const radius = 4;
  const cardCount = cards.length;

  useFrame((state) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.005;
      setRotation(groupRef.current.rotation.y);
    }
  });

  const handleCardClick = (index) => {
    setSelectedIndex(index);
    setAutoRotate(false);
    onCardSelect && onCardSelect(cards[index], index);
    
    // Resume auto-rotation after 5 seconds
    setTimeout(() => setAutoRotate(true), 5000);
  };

  const getCardPosition = (index) => {
    const angle = (index / cardCount) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    return [x, 0, z];
  };

  const getCardRotation = (index) => {
    const angle = (index / cardCount) * Math.PI * 2;
    return angle + Math.PI;
  };

  return (
    <group ref={groupRef}>
      {cards.map((card, index) => (
        <CarouselCard
          key={card.id}
          cardData={card}
          position={getCardPosition(index)}
          rotation={getCardRotation(index)}
          isActive={index === selectedIndex}
          onClick={() => handleCardClick(index)}
        />
      ))}
      
      {/* Center glow effect */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[3, 3, 0.1, 32]} />
        <meshStandardMaterial
          color="#00f5ff"
          transparent
          opacity={0.1}
          emissive="#00f5ff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

// Container Component
const CarouselContainer = ({ cards, onCardSelect, className = '' }) => {
  const [selectedCard, setSelectedCard] = useState(0);

  const handleCardSelect = (card, index) => {
    setSelectedCard(index);
    onCardSelect && onCardSelect(card, index);
  };

  return (
    <div className={`relative w-full h-96 ${className}`}>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#ffffff"
        />
        
        <Environment preset="night" />
        
        <RotatingCarousel
          cards={cards}
          onCardSelect={handleCardSelect}
          activeCardIndex={selectedCard}
        />
        
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.3}
          scale={10}
          blur={2}
          far={4}
        />
      </Canvas>
      
      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCardSelect(cards[index], index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedCard
                ? 'bg-neon-blue scale-125 shadow-lg shadow-neon-blue/50'
                : 'bg-text-secondary/30 hover:bg-text-secondary/60'
            }`}
          />
        ))}
      </div>
      
      {/* Card Info */}
      <div className="absolute top-4 left-4 bg-dark-space/80 backdrop-blur-sm rounded-lg p-3 border border-electric-purple/30">
        <div className="text-sm text-text-primary font-semibold">
          {cards[selectedCard]?.name}
        </div>
        <div className="text-xs text-text-secondary">
          {cards[selectedCard]?.title}
        </div>
        <div className="text-xs text-electric-purple">
          Click cards to interact
        </div>
      </div>
    </div>
  );
};

export default CarouselContainer;
