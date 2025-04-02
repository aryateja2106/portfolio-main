'use client'

import type React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Gravity, MatterBody } from '@/fancy/components/physics/cursor-attractor-and-gravity'
import { useTheme } from 'next-themes'

interface BinaryGravityProps {
  className?: string
}

export function BinaryGravity({ className = '' }: BinaryGravityProps) {
  const [, setIsClicked] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const lastTrailTime = useRef(0)
  const trailIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isMobileRef = useRef(false)

  // Check screen size once on mount
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768
    
    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 768
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mousePosRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (trailIntervalRef.current) {
        clearInterval(trailIntervalRef.current)
      }
    }
  }, [])
  
  // Generate trail of particles when moving
  useEffect(() => {
    const generateTrail = () => {
      const now = Date.now()
      if (now - lastTrailTime.current > 150) { // Limit rate of particle creation
        const newParticle = {
          id: now + Math.random(),
          x: mousePosRef.current.x + (Math.random() * 4 - 2), // Small random offset
          y: mousePosRef.current.y + (Math.random() * 4 - 2), // Small random offset
        }
        
        setParticles(prev => {
          const updated = [...prev, newParticle]
          // Limit total particles for performance
          return updated.length > 80 ? updated.slice(-80) : updated
        })
        
        lastTrailTime.current = now
      }
    }
    
    // Start generating trail particles
    trailIntervalRef.current = setInterval(generateTrail, 100)
    
    return () => {
      if (trailIntervalRef.current) {
        clearInterval(trailIntervalRef.current)
      }
    }
  }, [])

  // Handle click to create particles
  const handleInteraction = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (!containerRef.current) return
    
    let clientX: number
    let clientY: number
    
    if ('clientX' in e) {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    } else {
      // Keyboard event - use container center
      const rect = containerRef.current.getBoundingClientRect()
      clientX = rect.left + rect.width / 2
      clientY = rect.top + rect.height / 2
    }
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    
    // Create 10-15 particles at the click position with more spread
    const count = Math.floor(Math.random() * 6) + 10
    const newParticles = Array(count).fill(0).map((_, i) => ({
      id: Date.now() + i,
      // Add larger random offset for explosion effect
      x: x + (Math.random() * 20 - 10),
      y: y + (Math.random() * 20 - 10),
    }))
    
    setParticles(prev => [...prev, ...newParticles])
    setIsClicked(true)
    
    // Auto-reset after a while to prevent too many particles
    setTimeout(() => {
      if (particles.length > 100) {
        setParticles(prev => prev.slice(Math.max(0, prev.length - 50)))
      }
    }, 5000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleInteraction(e)
    }
  }

  // Remove particles when unmounting
  useEffect(() => {
    return () => {
      setParticles([])
      if (trailIntervalRef.current) {
        clearInterval(trailIntervalRef.current)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full absolute inset-0 overflow-hidden ${className}`}
    >
      <button 
        className="w-full h-full absolute inset-0 cursor-default bg-transparent"
        onClick={handleInteraction}
        onKeyDown={handleKeyDown}
        aria-label="Click to create binary animation"
        type="button"
      />
      
      <Gravity
        attractorStrength={0.0}
        cursorStrength={0.0008} // Increased cursor attraction strength
        cursorFieldRadius={200}
        className="w-full h-full absolute inset-0 pointer-events-none"
      >
        {particles.map(particle => {
          // Adjust size based on screen
          const maxSize = isMobileRef.current ? 20 : 30
          const minSize = isMobileRef.current ? 12 : 16
          const size = Math.max(minSize, Math.random() * maxSize)
          
          // Random binary digit (0 or 1)
          const digit = Math.random() > 0.5 ? '1' : '0'
          
          return (
            <MatterBody
              key={particle.id}
              matterBodyOptions={{ 
                friction: 0.05,  // Reduced friction for smoother movement
                restitution: 0.8, // Increased bounciness
                density: 0.005,  // Lighter particles for more floating feel
                label: 'binary'  // Label for cursor attraction
              }}
              x={`${particle.x}%`}
              y={`${particle.y}%`}
            >
              <div
                className="flex items-center justify-center text-teal-400 font-mono font-bold opacity-80"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  fontSize: `${size * 0.75}px`,
                  textShadow: isDark ? '0 0 5px rgba(45, 212, 191, 0.5)' : 'none'
                }}
              >
                {digit}
              </div>
            </MatterBody>
          )
        })}
      </Gravity>
    </div>
  )
}
