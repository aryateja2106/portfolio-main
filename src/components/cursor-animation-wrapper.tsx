'use client';

import { useEffect, useRef } from 'react';

interface BinaryCursorOptions {
  element?: HTMLElement;
}

const BinaryCursor: React.FC<BinaryCursorOptions> = ({ element }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const canvImages = useRef<HTMLCanvasElement[]>([]);
  const animationFrame = useRef<number | null>(null);
  
  const prefersReducedMotion = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    // Check if window is defined (to ensure code runs on client-side)
    if (typeof window === 'undefined') return;

    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    const targetElement = element || document.body;

    canvas.style.position = element ? 'absolute' : 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';

    targetElement.appendChild(canvas);
    canvasRef.current = canvas;

    const setCanvasSize = () => {
      canvas.width = element ? targetElement.clientWidth : window.innerWidth;
      canvas.height = element ? targetElement.clientHeight : window.innerHeight;
    };

    const createBinaryImages = () => {
      const possibleDigits = ['0', '1'];

      for (const digit of possibleDigits) {
        const bgCanvas = document.createElement('canvas');
        const bgContext = bgCanvas.getContext('2d');
        if (!bgContext) return;

        // Make canvas larger for binary digits
        bgCanvas.width = 20;
        bgCanvas.height = 20;

        // Style the text - make it more visible
        bgContext.fillStyle = '#2dd4bf'; // Teal color to match your theme
        bgContext.font = 'bold 16px monospace';
        bgContext.textAlign = 'center';
        bgContext.textBaseline = 'middle';
        
        // Draw the binary digit
        bgContext.fillText(
          digit,
          bgCanvas.width / 2,
          bgCanvas.height / 2
        );

        // Add a glow effect
        bgContext.shadowColor = 'rgba(45, 212, 191, 0.5)';
        bgContext.shadowBlur = 5;
        bgContext.fillText(
          digit,
          bgCanvas.width / 2,
          bgCanvas.height / 2
        );

        canvImages.current.push(bgCanvas);
      }
    };

    const addParticle = (x: number, y: number) => {
      // Add particles at a controlled rate (not on every mousemove event)
      if (Math.random() > 0.3) return; // Only add a particle ~30% of the time
      
      const randomImage =
        canvImages.current[
          Math.floor(Math.random() * canvImages.current.length)
        ];
      particles.current.push(new Particle(x, y, randomImage));
    };

    const onMouseMove = (e: MouseEvent) => {
      const x = element
        ? e.clientX - targetElement.getBoundingClientRect().left
        : e.clientX;
      const y = element
        ? e.clientY - targetElement.getBoundingClientRect().top
        : e.clientY;
      addParticle(x, y);
    };

    const updateParticles = () => {
      if (!context || !canvas) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle, index) => {
        particle.update(context);
        if (particle.lifeSpan < 0) {
          particles.current.splice(index, 1);
        }
      });
    };

    const animationLoop = () => {
      updateParticles();
      animationFrame.current = requestAnimationFrame(animationLoop);
    };

    const init = () => {
      if (prefersReducedMotion.current?.matches) return;

      setCanvasSize();
      createBinaryImages();

      targetElement.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', setCanvasSize);

      animationLoop();
    };

    const destroy = () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      targetElement.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', setCanvasSize);
    };

    prefersReducedMotion.current.onchange = () => {
      if (prefersReducedMotion.current?.matches) {
        destroy();
      } else {
        init();
      }
    };

    init();
    return () => destroy();
  }, [element]);

  return null;
};

/**
 * Particle Class
 */
class Particle {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  lifeSpan: number;
  initialLifeSpan: number;
  canv: HTMLCanvasElement;
  rotationSpeed: number;
  rotation: number;
  size: number;

  constructor(x: number, y: number, canvasItem: HTMLCanvasElement) {
    this.position = { x, y };
    
    // More random movement
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random()),
      y: 0.5 + Math.random(),
    };
    
    // Longer lifespan for binary digits
    this.lifeSpan = Math.floor(Math.random() * 120 + 120);
    this.initialLifeSpan = this.lifeSpan;
    this.canv = canvasItem;
    
    // Add rotation
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.05;
    
    // Vary the sizes slightly
    this.size = 0.8 + Math.random() * 0.8; // 0.8 to 1.2 size multiplier
  }

  update(context: CanvasRenderingContext2D) {
    // Update position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.lifeSpan--;

    // Add some slight wandering movement
    this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
    
    // Slight gravity/floating effect
    this.velocity.y -= Math.random() / 300;
    
    // Update rotation
    this.rotation += this.rotationSpeed;

    // Calculate opacity based on lifespan
    const opacity = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
    const scale = this.size * Math.max(this.lifeSpan / this.initialLifeSpan, 0);

    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation);
    context.scale(scale, scale);
    context.globalAlpha = opacity;
    context.drawImage(this.canv, -this.canv.width / 2, -this.canv.height / 2);
    context.restore();
  }
}

export default BinaryCursor;