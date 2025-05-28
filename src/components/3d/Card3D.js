'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Box, Sphere, MeshDistortMaterial, Float, Html, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Advanced 3D Business Card Component
const BusinessCard3D = ({ cardData, isActive = true, theme = 'cyber' }) => {
  const meshRef = useRef();
  const particlesRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Animation loop
  useFrame((state) => {
    if (meshRef.current && isActive) {
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Hover effects
      if (hovered) {
        meshRef.current.scale.setScalar(1.05);
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      } else {
        meshRef.current.scale.setScalar(1);
        meshRef.current.rotation.z = 0;
      }
    }

    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.01;
    }
  });

  // Theme configurations
  const themes = {
    cyber: {
      primary: '#00f5ff',
      secondary: '#8b5cf6',
      accent: '#ff006e',
      background: '#0a0a0f'
    },
    matrix: {
      primary: '#00ff41',
      secondary: '#008f11',
      accent: '#00ff88',
      background: '#000000'
    },
    neon: {
      primary: '#ff0080',
      secondary: '#8000ff',
      accent: '#00ffff',
      background: '#1a0033'
    }
  };

  const currentTheme = themes[theme] || themes.cyber;

  // Particle system for background effects
  const ParticleField = () => {
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return (
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={currentTheme.primary}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    );
  };

  // Holographic card surface
  const CardSurface = () => (
    <Box
      ref={meshRef}
      args={[3.4, 2.1, 0.1]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      <MeshDistortMaterial
        color={currentTheme.background}
        transparent
        opacity={0.8}
        distort={hovered ? 0.3 : 0.1}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
      
      {/* Card Content Overlay */}
      <Html
        transform
        occlude
        position={[0, 0, 0.06]}
        style={{
          width: '340px',
          height: '210px',
          background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${currentTheme.primary}40`,
          borderRadius: '12px',
          padding: '16px',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            fontSize: '32px',
            filter: `drop-shadow(0 0 10px ${currentTheme.primary})`
          }}>
            {cardData.avatar}
          </div>
          <div>
            <h3 style={{ 
              margin: 0, 
              fontSize: '18px', 
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${currentTheme.primary}, ${currentTheme.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {cardData.name}
            </h3>
            <p style={{ 
              margin: 0, 
              fontSize: '12px', 
              opacity: 0.8,
              color: currentTheme.secondary
            }}>
              {cardData.title}
            </p>
          </div>
        </div>

        {/* Company & Intro */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ 
            margin: '8px 0', 
            fontSize: '14px', 
            fontWeight: 'bold',
            color: currentTheme.primary
          }}>
            {cardData.company}
          </p>
          <p style={{ 
            margin: 0, 
            fontSize: '10px', 
            fontStyle: 'italic',
            opacity: 0.7
          }}>
            {cardData.intro}
          </p>
        </div>

        {/* Contact Info */}
        <div style={{ fontSize: '10px', opacity: 0.8 }}>
          <div>{cardData.email}</div>
          <div>{cardData.phone}</div>
        </div>

        {/* AI Status Indicator */}
        <div style={{ 
          position: 'absolute',
          top: '8px',
          right: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '8px',
          color: currentTheme.primary
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: currentTheme.primary,
            animation: 'pulse 2s infinite'
          }} />
          AI ACTIVE
        </div>
      </Html>
    </Box>
  );

  // Floating accent elements
  const AccentElements = () => (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[0.1]} position={[2, 1, 0.5]}>
          <meshStandardMaterial
            color={currentTheme.primary}
            emissive={currentTheme.primary}
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <Sphere args={[0.05]} position={[-2, -1, 0.3]}>
          <meshStandardMaterial
            color={currentTheme.accent}
            emissive={currentTheme.accent}
            emissiveIntensity={0.8}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
        <Sphere args={[0.08]} position={[1.5, -1.2, 0.4]}>
          <meshStandardMaterial
            color={currentTheme.secondary}
            emissive={currentTheme.secondary}
            emissiveIntensity={0.6}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </Float>
    </>
  );

  return (
    <group>
      <ParticleField />
      <CardSurface />
      <AccentElements />
      
      {/* Contact shadows for realism */}
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={5}
        blur={2}
        far={2}
      />
    </group>
  );
};

// Main 3D Card Container
const Card3D = ({ cardData, className = '', theme = 'cyber', ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time for dramatic effect
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full h-96 ${className}`} {...props}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-space/50 backdrop-blur-sm rounded-2xl">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-text-secondary">Initializing 3D Card...</p>
          </div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ 
          background: 'transparent',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Environment preset="night" />
        
        <BusinessCard3D cardData={cardData} theme={theme} />
      </Canvas>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Card3D;
