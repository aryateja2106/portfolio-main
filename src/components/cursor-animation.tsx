'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { CSSProperties } from 'react';

interface AnimationInstance {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  randomValues: { id: number; x: number; y: number; rotate: number; delay: number }[];
}

const CursorAnimation = () => {
  const [animations, setAnimations] = useState<AnimationInstance[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationDuration = 2500; // Increased duration for smoother transitions
  const previousMousePos = useRef({ x: 0, y: 0 });

  // Generate random values for each binary digit
  const generateRandomValues = useCallback(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i, // Ensure each value has a unique ID
      x: Math.random() * 2 - 1, // -1 to 1
      y: Math.random() * 2 - 1, // -1 to 1
      rotate: Math.random() * 360, // 0 to 360 degrees
      delay: Math.random() * 0.5, // 0 to 0.5 seconds
    }));
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Create a new animation instance at the click position
      const newAnimation: AnimationInstance = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
        randomValues: generateRandomValues(),
      };
      
      setAnimations(prev => [...prev, newAnimation]);
      previousMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listeners
    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup animations that have played through
    const cleanupInterval = setInterval(() => {
      const currentTime = Date.now();
      setAnimations(prev => 
        prev.filter(anim => (currentTime - anim.timestamp) < animationDuration)
      );
    }, 500);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, [generateRandomValues]);

  return (
    <>
      {animations.map((anim) => (
        <div
          key={anim.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: anim.x - 75, // Center animation on cursor
            top: anim.y - 75,
            width: '150px',
            height: '150px',
          }}
        >
          <div className="binary-animation">
            {/* Generate random binary digits with different animations */}
            {anim.randomValues.map((value) => (
              <div 
                key={value.id} 
                className={`binary ${value.id % 2 === 0 ? 'one' : 'zero'}`} 
                style={{
                  '--random-x': value.x,
                  '--random-y': value.y,
                  '--rotate': value.rotate,
                  '--delay': value.delay,
                  '--mouse-delta-x': (mousePosition.x - anim.x) / 100,
                  '--mouse-delta-y': (mousePosition.y - anim.y) / 100,
                } as CSSProperties}
              >
                {value.id % 2 === 0 ? '1' : '0'}
              </div>
            ))}
          </div>
        </div>
      ))}

      <style jsx>{`
        .binary-animation {
          position: absolute;
          width: 150px;
          height: 150px;
          pointer-events: none;
          transform-origin: center center;
        }

        .binary {
          position: absolute;
          font-family: monospace;
          font-weight: bold;
          font-size: 16px;
          color: #2dd4bf;
          text-shadow: 0 0 5px rgba(45, 212, 191, 0.5);
          animation: float-out 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
          will-change: transform, opacity;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .one {
          font-size: 22px;
        }

        /* Position the binary digits in various locations */
        .binary:nth-child(1) { 
          left: 50%;
          top: 30%;
          animation-delay: calc(var(--delay) * 1s);
        }
        .binary:nth-child(2) {
          left: 30%;
          top: 40%;
          animation-delay: calc(var(--delay) * 1s + 0.05s);
        }
        .binary:nth-child(3) {
          left: 70%;
          top: 40%;
          animation-delay: calc(var(--delay) * 1s + 0.1s);
        }
        .binary:nth-child(4) {
          left: 40%;
          top: 60%;
          animation-delay: calc(var(--delay) * 1s + 0.15s);
        }
        .binary:nth-child(5) {
          left: 60%;
          top: 60%;
          animation-delay: calc(var(--delay) * 1s + 0.2s);
        }
        .binary:nth-child(6) {
          left: 25%;
          top: 70%;
          animation-delay: calc(var(--delay) * 1s + 0.25s);
        }
        .binary:nth-child(7) {
          left: 75%;
          top: 50%;
          animation-delay: calc(var(--delay) * 1s + 0.05s);
        }
        .binary:nth-child(8) {
          left: 55%;
          top: 35%;
          animation-delay: calc(var(--delay) * 1s + 0.1s);
        }
        .binary:nth-child(9) {
          left: 45%;
          top: 80%;
          animation-delay: calc(var(--delay) * 1s + 0.15s);
        }
        .binary:nth-child(10) {
          left: 20%;
          top: 50%;
          animation-delay: calc(var(--delay) * 1s + 0.2s);
        }
        .binary:nth-child(11) {
          left: 80%;
          top: 70%;
          animation-delay: calc(var(--delay) * 1s + 0.1s);
        }
        .binary:nth-child(12) {
          left: 65%;
          top: 25%;
          animation-delay: calc(var(--delay) * 1s + 0.15s);
        }
        .binary:nth-child(13) {
          left: 35%;
          top: 25%;
          animation-delay: calc(var(--delay) * 1s + 0.2s);
        }
        .binary:nth-child(14) {
          left: 85%;
          top: 40%;
          animation-delay: calc(var(--delay) * 1s + 0.1s);
        }
        .binary:nth-child(15) {
          left: 15%;
          top: 60%;
          animation-delay: calc(var(--delay) * 1s + 0.05s);
        }

        @keyframes float-out {
          0% {
            transform: translate(0, 0) scale(0.5) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: 
              translate(
                calc((var(--random-x) * 80px) + (var(--mouse-delta-x) * 15px)), 
                calc((var(--random-y) * 80px) + (var(--mouse-delta-y) * 15px))
              )
              scale(1)
              rotate(calc(var(--rotate) * 1deg));
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default CursorAnimation;
