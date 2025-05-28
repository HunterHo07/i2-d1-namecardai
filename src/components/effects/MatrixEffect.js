'use client';

import { useEffect, useRef } from 'react';

const MatrixEffect = ({ 
  className = '',
  density = 0.8,
  speed = 50,
  color = '#00ff41',
  fontSize = 14,
  opacity = 0.8
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters (mix of katakana, numbers, and symbols)
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';
    const charArray = chars.split('');

    // Calculate columns
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    // Animation function
    const animate = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = `rgba(10, 10, 15, ${1 - opacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Calculate position
        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize;

        // Add glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        
        // Draw character
        ctx.fillText(char, x, y);
        
        // Reset shadow
        ctx.shadowBlur = 0;

        // Reset drop to top randomly or when it reaches bottom
        if (y > canvas.height && Math.random() > density) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }

      // Continue animation
      animationRef.current = setTimeout(animate, speed);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [density, speed, color, fontSize, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  );
};

export default MatrixEffect;
