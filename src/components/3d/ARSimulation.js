'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Html, useTexture, Plane } from '@react-three/drei';
import * as THREE from 'three';

// AR Camera Feed Simulation
const ARCameraFeed = ({ onFaceDetected, isScanning }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [faceDetected, setFaceDetected] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (isScanning) {
      // Simulate face detection process
      const detectFace = () => {
        setScanProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            setFaceDetected(true);
            onFaceDetected && onFaceDetected({
              confidence: 0.95,
              position: { x: 0.3, y: 0.2 },
              size: { width: 0.4, height: 0.6 }
            });
            return 100;
          }
          return newProgress;
        });
      };

      const interval = setInterval(detectFace, 50);
      return () => clearInterval(interval);
    } else {
      setScanProgress(0);
      setFaceDetected(false);
    }
  }, [isScanning, onFaceDetected]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-midnight-blue to-deep-purple rounded-lg overflow-hidden">
      {/* Simulated Camera Feed */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-space/80 to-midnight-blue/80">
        {/* Grid overlay for AR feel */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f5ff" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Face Detection Overlay */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Scanning Frame */}
            <div className="relative w-64 h-80 border-2 border-neon-blue/50 rounded-lg">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-blue"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-blue"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-blue"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-blue"></div>

              {/* Scanning line */}
              <div 
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent transition-all duration-100"
                style={{ 
                  top: `${scanProgress}%`,
                  boxShadow: '0 0 10px #00f5ff'
                }}
              />

              {/* Face detected indicator */}
              {faceDetected && (
                <div className="absolute inset-4 border-2 border-cyber-green rounded-lg bg-cyber-green/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">👤</div>
                    <div className="text-cyber-green text-sm font-semibold">FACE DETECTED</div>
                    <div className="text-cyber-green text-xs">Confidence: 95%</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AR UI Elements */}
        <div className="absolute top-4 left-4 text-neon-blue text-sm font-mono">
          <div>AR MODE: ACTIVE</div>
          <div>SCAN PROGRESS: {scanProgress}%</div>
          <div>STATUS: {faceDetected ? 'FACE DETECTED' : isScanning ? 'SCANNING...' : 'READY'}</div>
        </div>

        {/* Center crosshair */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 border border-neon-blue/50 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3D AR Card Overlay
const ARCardOverlay = ({ cardData, position = [0, 0, 0], visible = false }) => {
  const groupRef = useRef();
  const [scale, setScale] = useState(0);

  useFrame((state) => {
    if (groupRef.current && visible) {
      // Entrance animation
      setScale(prev => Math.min(prev + 0.05, 1));
      
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    } else {
      setScale(0);
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Card Background */}
      <Plane args={[2, 1.2]} position={[0, 0, -0.01]}>
        <meshStandardMaterial
          color="#0a0a0f"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </Plane>

      {/* Card Border */}
      <Plane args={[2.1, 1.3]} position={[0, 0, -0.02]}>
        <meshStandardMaterial
          color="#00f5ff"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </Plane>

      {/* Card Content */}
      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          width: '200px',
          height: '120px',
          background: 'linear-gradient(135deg, rgba(0,245,255,0.1), rgba(139,92,246,0.1))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,245,255,0.3)',
          borderRadius: '8px',
          padding: '12px',
          color: 'white',
          fontSize: '10px',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ fontSize: '16px' }}>{cardData.avatar}</div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{cardData.name}</div>
            <div style={{ opacity: 0.8, fontSize: '9px' }}>{cardData.title}</div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div style={{ fontWeight: 'bold', color: '#00f5ff' }}>{cardData.company}</div>
        </div>
        
        <div style={{ fontSize: '8px', opacity: 0.7 }}>
          <div>{cardData.email}</div>
          <div>{cardData.phone}</div>
        </div>

        {/* Action buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '4px', 
          marginTop: '8px',
          justifyContent: 'center'
        }}>
          <button style={{
            background: 'rgba(0,245,255,0.2)',
            border: '1px solid #00f5ff',
            borderRadius: '4px',
            color: '#00f5ff',
            fontSize: '8px',
            padding: '2px 6px',
            cursor: 'pointer'
          }}>
            Connect
          </button>
          <button style={{
            background: 'rgba(139,92,246,0.2)',
            border: '1px solid #8b5cf6',
            borderRadius: '4px',
            color: '#8b5cf6',
            fontSize: '8px',
            padding: '2px 6px',
            cursor: 'pointer'
          }}>
            Save
          </button>
        </div>
      </Html>

      {/* Particle effects */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={20}
            array={new Float32Array(Array.from({ length: 60 }, () => (Math.random() - 0.5) * 3))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#00f5ff"
          transparent
          opacity={0.6}
        />
      </points>
    </group>
  );
};

// Main AR Simulation Component
const ARSimulation = ({ cardData, isActive = false, onCardDetected }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [detectedFace, setDetectedFace] = useState(null);

  const handleStartScan = () => {
    setIsScanning(true);
    setCardVisible(false);
  };

  const handleFaceDetected = (faceData) => {
    setDetectedFace(faceData);
    setTimeout(() => {
      setCardVisible(true);
      setIsScanning(false);
      onCardDetected && onCardDetected(cardData);
    }, 1000);
  };

  const handleStopScan = () => {
    setIsScanning(false);
    setCardVisible(false);
    setDetectedFace(null);
  };

  return (
    <div className="relative w-full h-96 bg-dark-space rounded-2xl overflow-hidden">
      {/* AR Camera Feed */}
      <ARCameraFeed 
        onFaceDetected={handleFaceDetected}
        isScanning={isScanning}
      />

      {/* 3D AR Overlay */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
          
          <ARCardOverlay
            cardData={cardData}
            position={[0, 0, 0]}
            visible={cardVisible}
          />
        </Canvas>
      </div>

      {/* Control Panel */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        {!isScanning && !cardVisible && (
          <button
            onClick={handleStartScan}
            className="px-6 py-2 bg-neon-blue/20 border border-neon-blue rounded-lg text-neon-blue hover:bg-neon-blue/30 transition-colors"
          >
            Start AR Scan
          </button>
        )}
        
        {(isScanning || cardVisible) && (
          <button
            onClick={handleStopScan}
            className="px-6 py-2 bg-hologram-pink/20 border border-hologram-pink rounded-lg text-hologram-pink hover:bg-hologram-pink/30 transition-colors"
          >
            Stop Scan
          </button>
        )}
      </div>

      {/* Status Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${
          cardVisible ? 'bg-cyber-green animate-pulse' :
          isScanning ? 'bg-neon-blue animate-ping' :
          'bg-text-secondary/50'
        }`} />
        <span className="text-sm text-text-secondary">
          {cardVisible ? 'Card Detected' :
           isScanning ? 'Scanning...' :
           'AR Ready'}
        </span>
      </div>
    </div>
  );
};

export default ARSimulation;
