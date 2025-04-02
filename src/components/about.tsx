'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        }
      },
      { threshold: 0.1 }
    );

    // Observe all cards
    const cards = document.querySelectorAll('.animate-card');
    for (const card of cards) {
      observer.observe(card);
    }

    // Draw connecting line animation when component mounts
    const container = containerRef.current;
    if (container) {
      drawConnectingLines();
    }

    // Redraw lines on window resize
    window.addEventListener('resize', drawConnectingLines);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', drawConnectingLines);
    };
  }, []);

  // Function to draw animated connecting lines between cards
  const drawConnectingLines = () => {
    const cards = document.querySelectorAll('.card-content');
    // Also select the intro card
    const introCard = document.querySelector('.animate-card:first-child');
    
    if (!cards.length || !introCard) return;

    // Remove any existing SVG
    const existingSvg = document.getElementById('connecting-lines');
    if (existingSvg) {
      existingSvg.remove();
    }
    
    const container = containerRef.current;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    
    // Create SVG element positioned behind the cards
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', 'connecting-lines');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.zIndex = '0';
    svg.style.pointerEvents = 'none';
    
    // Insert SVG as first child so it's behind the cards
    container.insertBefore(svg, container.firstChild);
    
    // Connect intro card to first card
    if (introCard && cards.length > 0) {
      const introRect = introCard.getBoundingClientRect();
      const firstCardRect = cards[0].getBoundingClientRect();
      
      // Calculate relative positions to the container
      const startX = introRect.left + introRect.width / 2 - containerRect.left;
      const startY = introRect.bottom - containerRect.top;
      const endX = firstCardRect.left + firstCardRect.width / 2 - containerRect.left;
      const endY = firstCardRect.top - containerRect.top;
      
      // Create dashed path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      
      // Create a path that curves between the cards
      const curveControl = (startY + endY) / 2;
      const pathData = `M ${startX},${startY} C ${startX},${curveControl} ${endX},${curveControl} ${endX},${endY}`;
      
      path.setAttribute('d', pathData);
      path.setAttribute('stroke', '#2dd4bf');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-dasharray', '5,5');
      
      // Add animation for dashed line
      const animateElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animateElement.setAttribute('attributeName', 'stroke-dashoffset');
      animateElement.setAttribute('from', '100');
      animateElement.setAttribute('to', '0');
      animateElement.setAttribute('dur', '15s');
      animateElement.setAttribute('repeatCount', 'indefinite');
      
      path.appendChild(animateElement);
      svg.appendChild(path);
      
      // Add moving dots along the path
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', '#2dd4bf');
      circle.setAttribute('filter', 'drop-shadow(0 0 3px rgba(45, 212, 191, 0.8))');
      
      const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
      animateMotion.setAttribute('path', pathData);
      animateMotion.setAttribute('dur', '3s');
      animateMotion.setAttribute('repeatCount', 'indefinite');
      
      circle.appendChild(animateMotion);
      svg.appendChild(circle);
    }
    
    // Connect cards with lines
    for (let i = 0; i < cards.length - 1; i++) {
      const currentCard = cards[i];
      const nextCard = cards[i + 1];
      
      const currentRect = currentCard.getBoundingClientRect();
      const nextRect = nextCard.getBoundingClientRect();
      
      // Calculate relative positions to the container
      const startX = (currentRect.left + currentRect.right) / 2 - containerRect.left;
      const startY = currentRect.bottom - containerRect.top;
      const endX = (nextRect.left + nextRect.right) / 2 - containerRect.left;
      const endY = nextRect.top - containerRect.top;
      
      // Create dashed path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      
      // Create a path that curves between the cards
      const curveControl = (startY + endY) / 2;
      const pathData = `M ${startX},${startY} C ${startX},${curveControl} ${endX},${curveControl} ${endX},${endY}`;
      
      path.setAttribute('d', pathData);
      path.setAttribute('stroke', '#2dd4bf');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-dasharray', '5,5');
      
      // Add animation for dashed line
      const animateElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animateElement.setAttribute('attributeName', 'stroke-dashoffset');
      animateElement.setAttribute('from', '100');
      animateElement.setAttribute('to', '0');
      animateElement.setAttribute('dur', '15s');
      animateElement.setAttribute('repeatCount', 'indefinite');
      
      path.appendChild(animateElement);
      svg.appendChild(path);
      
      // Add moving dots along the path
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', '4');
      circle.setAttribute('fill', '#2dd4bf');
      
      const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
      animateMotion.setAttribute('path', pathData);
      animateMotion.setAttribute('dur', `${3 + i}s`);
      animateMotion.setAttribute('repeatCount', 'indefinite');
      
      circle.appendChild(animateMotion);
      svg.appendChild(circle);
    }
  };

  return (
    <section id="about" className="w-full py-16">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-3 relative inline-block">
            Where It All Began
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-teal-400" />
          </h2>
          <p className="text-xl text-teal-400 mt-4">My journey from business to AI</p>
        </div>
        
        <div ref={containerRef} className="relative">
          {/* Intro Card */}
          <div className="animate-card opacity-0 transition-all duration-500 ease-out transform translate-y-8 bg-neutral-800/50 backdrop-blur-md rounded-xl p-8 border-l-4 border-t-4 border-r-4 border-l-teal-400 border-t-teal-400 border-r-teal-400 shadow-lg mb-16 relative z-10">
            <p className="text-lg text-center text-neutral-300">
              Late 2022, I found myself captivated by ChatGPT&apos;s capabilities. What began as curiosity quickly transformed into a realization that my business background provided a unique advantage in the AI landscape—the ability to bridge technical possibilities with practical business applications.
            </p>
          </div>
          
          <div className="space-y-24 relative"> {/* Increased spacing between cards */}
            {/* Card 1 */}
            <div className="animate-card card-wrapper opacity-0 transition-all duration-500 ease-out transform translate-y-8 relative z-10">
              <h3 className="text-xl font-semibold text-teal-400 mb-6 text-center">The Realization</h3>
              <div className="card-content bg-neutral-800/50 backdrop-blur-md rounded-xl p-6 border-t-4 border-teal-400 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2">
                <div className="text-3xl text-teal-400 mb-4 text-center">✨</div>
                <p className="text-neutral-300">
                  That evening in 2022 changed everything. Testing ChatGPT&apos;s limits, I witnessed something revolutionary—a system that mirrored human intuition with uncanny consistency. It wasn&apos;t just another algorithm; it represented a fundamental shift in what technology could achieve.
                </p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="animate-card card-wrapper opacity-0 transition-all duration-500 ease-out transform translate-y-8 relative z-10 delay-100">
              <h3 className="text-xl font-semibold text-teal-400 mb-6 text-center">The Fascination</h3>
              <div className="card-content bg-neutral-800/50 backdrop-blur-md rounded-xl p-6 border-t-4 border-teal-400 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2">
                <div className="text-3xl text-teal-400 mb-4 text-center">🧠</div>
                <p className="text-neutral-300">
                  For years I&apos;d wondered how our minds transform random thoughts into coherent decisions. Now I was witnessing a mathematical model that offered glimpses into our own cognitive processes, making me feel like we were beginning to understand the mechanics of thought itself.
                </p>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="animate-card card-wrapper opacity-0 transition-all duration-500 ease-out transform translate-y-8 relative z-10 delay-200">
              <h3 className="text-xl font-semibold text-teal-400 mb-6 text-center">The Possibilities</h3>
              <div className="card-content bg-neutral-800/50 backdrop-blur-md rounded-xl p-6 border-t-4 border-teal-400 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2">
                <div className="text-3xl text-teal-400 mb-4 text-center">🔍</div>
                <p className="text-neutral-300">
                  I envisioned blind individuals navigating independently, people with ADHD receiving perfectly timed reminders, and businesses automating creative processes. We were stepping into uncharted territory, but the potential to unlock human capability seemed limitless.
                </p>
              </div>
            </div>
            
            {/* Card 4 */}
            <div className="animate-card card-wrapper opacity-0 transition-all duration-500 ease-out transform translate-y-8 relative z-10 delay-300">
              <h3 className="text-xl font-semibold text-teal-400 mb-6 text-center">The Transformation</h3>
              <div className="card-content bg-neutral-800/50 backdrop-blur-md rounded-xl p-6 border-l-4 border-b-4 border-r-4 border-l-teal-400 border-b-teal-400 border-r-teal-400 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2">
                <div className="text-3xl text-teal-400 mb-4 text-center">🚀</div>
                <p className="text-neutral-300">
                  What started as curiosity evolved into obsession. I realized my business background wasn&apos;t a disadvantage—it was exactly what was needed: someone who could bridge technical capabilities with practical applications, translating AI potential into business value.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center relative z-10">
            <Link 
              href="/resume" 
              className="inline-block px-6 py-3 border-2 border-teal-400 text-teal-400 font-semibold rounded transition-all duration-300 hover:bg-teal-400 hover:text-neutral-900"
            >
              View My Résumé
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        /* Add delay classes for staggered animations */
        .delay-100 {
          transition-delay: 100ms;
        }
        
        .delay-200 {
          transition-delay: 200ms;
        }
        
        .delay-300 {
          transition-delay: 300ms;
        }
      `}</style>
    </section>
  );
};

// Support both named and default exports
export default About;