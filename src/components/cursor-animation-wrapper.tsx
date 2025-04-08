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
      if (!canvasRef.current) return; // Check if canvas exists
      const currentTarget = element || document.body; // Use consistent target
      canvasRef.current.width = element
        ? currentTarget.clientWidth
        : window.innerWidth;
      canvasRef.current.height = element
        ? currentTarget.clientHeight
        : window.innerHeight;
    };

    const createBinaryImages = () => {
      const possibleDigits = ['0', '1'];

      // Clear existing images if re-initializing
      canvImages.current = [];

      for (const digit of possibleDigits) {
        const bgCanvas = document.createElement('canvas');
        const bgContext = bgCanvas.getContext('2d');
        if (!bgContext) continue; // Use continue instead of return

        // Make canvas larger for binary digits
        bgCanvas.width = 20;
        bgCanvas.height = 20;

        // Style the text - make it more visible
        bgContext.fillStyle = '#2dd4bf'; // Teal color
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

    // --- Renamed for clarity ---
    const addParticleAtPosition = (x: number, y: number) => {
      if (!canvImages.current.length) return; // Don't add if images aren't ready

      const randomImage =
        canvImages.current[
          Math.floor(Math.random() * canvImages.current.length)
        ];
      particles.current.push(new Particle(x, y, randomImage));
    };

    const onMouseMove = (e: MouseEvent) => {
      // Add particles at a controlled rate for mousemove
       if (Math.random() > 0.3) return; // Only add particle ~30% of the time

      const currentTarget = element || document.body; // Use consistent target
      const rect = currentTarget.getBoundingClientRect();
      const x = element ? e.clientX - rect.left : e.clientX;
      const y = element ? e.clientY - rect.top : e.clientY;
      addParticleAtPosition(x, y);
    };

    // --- NEW: Handler for click events ---
    const onClick = (e: MouseEvent) => {
      const currentTarget = element || document.body; // Use consistent target
      const rect = currentTarget.getBoundingClientRect();
      const x = element ? e.clientX - rect.left : e.clientX;
      const y = element ? e.clientY - rect.top : e.clientY;

      // Add one or more particles reliably on click
      // Add one particle directly at the click point:
      addParticleAtPosition(x, y);

      // Optional: Add a small burst effect on click
      for (let i = 0; i < 2; i++) { // Add 2 extra particles slightly offset
        addParticleAtPosition(
            x + (Math.random() - 0.5) * 15,
            y + (Math.random() - 0.5) * 15
        );
      }
    };

    const updateParticles = () => {
      if (!context || !canvasRef.current) return;

      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // Iterate backwards for safe removal
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const particle = particles.current[i];
        particle.update(context);
        if (particle.lifeSpan < 0) {
          particles.current.splice(i, 1);
        }
      }
    };

    const animationLoop = () => {
      updateParticles();
      animationFrame.current = requestAnimationFrame(animationLoop);
    };

    const init = () => {
      if (prefersReducedMotion.current?.matches) return;
      if (!targetElement) return; // Ensure targetElement is available

      // Ensure canvas exists before setting size/creating images
      if (!canvasRef.current) return;

      setCanvasSize();
      createBinaryImages(); // Create images needed for particles

      targetElement.addEventListener('mousemove', onMouseMove);
      targetElement.addEventListener('click', onClick); // <-- Add click listener
      window.addEventListener('resize', setCanvasSize);

      // Start animation loop only if not already running
      if (!animationFrame.current) {
          animationLoop();
      }
    };

    const destroy = () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
      if (canvasRef.current) {
        canvasRef.current.remove();
        canvasRef.current = null; // Clear the ref
      }
       // Check if targetElement was defined before removing listeners
      if (targetElement) {
          targetElement.removeEventListener('mousemove', onMouseMove);
          targetElement.removeEventListener('click', onClick); // <-- Remove click listener
      }
      window.removeEventListener('resize', setCanvasSize);
      particles.current = []; // Clear particles array
    };

    // --- Refined prefers-reduced-motion handling ---
    const handleMotionChange = () => {
        if (prefersReducedMotion.current?.matches) {
            destroy(); // Clean up if motion is reduced
        } else {
            // Re-initialize only if canvas isn't already there
            if (!canvasRef.current && typeof window !== 'undefined') {
                 // Recreate canvas and context if destroyed
                const newCanvas = document.createElement('canvas');
                const newContext = newCanvas.getContext('2d');
                if (!newContext) return;

                newCanvas.style.position = element ? 'absolute' : 'fixed';
                newCanvas.style.top = '0';
                newCanvas.style.left = '0';
                newCanvas.style.pointerEvents = 'none';
                newCanvas.style.zIndex = '9999';

                (element || document.body).appendChild(newCanvas);
                canvasRef.current = newCanvas;
                // context variable needs to be accessible or re-established if needed elsewhere
            }
             init(); // Initialize listeners and animation
        }
    }

    prefersReducedMotion.current.addEventListener('change', handleMotionChange);


    // Initial setup
    init();

    // Cleanup function
    return () => {
        destroy();
        prefersReducedMotion.current?.removeEventListener('change', handleMotionChange);
    };
  }, [element]); // Dependency array includes element

  // This component doesn't render anything itself, it manages the canvas effect
  return null;
};

/**
 * Particle Class (Unchanged)
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
      y: 0.5 + Math.random(), // Start moving slightly downwards/floating up
    };

    // Longer lifespan for binary digits
    this.lifeSpan = Math.floor(Math.random() * 120 + 120); // ~2-4 seconds at 60fps
    this.initialLifeSpan = this.lifeSpan;
    this.canv = canvasItem;

    // Add rotation
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.05;

    // Vary the sizes slightly
    this.size = 0.8 + Math.random() * 0.4; // 0.8 to 1.2 size multiplier
  }

  update(context: CanvasRenderingContext2D) {
    // Update position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.lifeSpan--;

    // Add some slight wandering movement horizontally
    this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;

    // Slight gravity/floating effect adjustment (slow down upward/downward motion over time)
     this.velocity.y *= 0.99; // Dampen vertical velocity slightly
     this.velocity.y -= 0.005; // Apply slight upward force (or reduce downward force)


    // Update rotation
    this.rotation += this.rotationSpeed;

    // Calculate opacity and scale based on lifespan (fade out and shrink)
    const lifeRatio = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
    const opacity = lifeRatio;
    const scale = this.size * lifeRatio; // Scale down as it fades

    // Ensure scale is not negative or NaN
    if (scale <= 0 || Number.isNaN(scale)) return;

    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation);
    context.scale(scale, scale);
    context.globalAlpha = opacity;
    // Draw centered image
    context.drawImage(this.canv, -this.canv.width / 2, -this.canv.height / 2);
    context.restore();
  }
}

export default BinaryCursor;