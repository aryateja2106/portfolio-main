'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import * as MatterJS from 'matter-js'

interface GravityProps {
  children: React.ReactNode
  className?: string
  attractorStrength?: number
  cursorStrength?: number
  cursorFieldRadius?: number
}

interface MatterBodyProps {
  children: React.ReactNode
  x: string | number
  y: string | number
  matterBodyOptions?: MatterJS.IBodyDefinition
}

export function MatterBody({
  children,
  x,
  y,
  matterBodyOptions,
}: MatterBodyProps) {
  const bodyRef = useRef<HTMLDivElement>(null)

  // Position the element with inline styles
  const initialX = typeof x === 'string' ? x : `${x}px`
  const initialY = typeof y === 'string' ? y : `${y}px`

  return (
    <div
      ref={bodyRef}
      className="absolute"
      style={{
        left: initialX,
        top: initialY,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
      }}
      data-matter-body={JSON.stringify(matterBodyOptions)}
    >
      {children}
    </div>
  )
}

export function Gravity({
  children,
  className,
  attractorStrength = 0.0,
  cursorStrength = 0.0004,
  cursorFieldRadius = 200,
}: GravityProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<MatterJS.Engine | null>(null)
  const runnerRef = useRef<MatterJS.Runner | null>(null)
  const bodiesRef = useRef<MatterJS.Body[]>([])
  const animationFrameIdRef = useRef<number | null>(null)
  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const cursorBodyRef = useRef<MatterJS.Body | null>(null)
  const [isClicked, setIsClicked] = useState(false)

  // Initialize physics engine
  useEffect(() => {
    if (!containerRef.current) return

    // Create an engine with options
    const engineOptions: MatterJS.IEngineDefinition = {
      gravity: { x: 0, y: 0.05, scale: 0.001 },
      enableSleeping: false,
    }
    
    const engine = MatterJS.Engine.create(engineOptions)
    engineRef.current = engine

    // Create walls
    const container = containerRef.current.getBoundingClientRect()
    const wallThickness = 50
    const walls = [
      // Bottom
      MatterJS.Bodies.rectangle(
        container.width / 2,
        container.height + wallThickness / 2,
        container.width,
        wallThickness,
        { isStatic: true },
      ),
      // Left
      MatterJS.Bodies.rectangle(
        -wallThickness / 2,
        container.height / 2,
        wallThickness,
        container.height,
        { isStatic: true },
      ),
      // Right
      MatterJS.Bodies.rectangle(
        container.width + wallThickness / 2,
        container.height / 2,
        wallThickness,
        container.height,
        { isStatic: true },
      ),
      // Top
      MatterJS.Bodies.rectangle(
        container.width / 2,
        -wallThickness / 2,
        container.width,
        wallThickness,
        { isStatic: true },
      ),
    ]
    MatterJS.Composite.add(engine.world, walls)

    // Create attractor
    if (attractorStrength > 0) {
      const attractor = MatterJS.Bodies.circle(
        container.width / 2,
        container.height / 2,
        5,
        {
          isStatic: true,
          plugin: {
            attractors: [
              (bodyA: MatterJS.Body, bodyB: MatterJS.Body) => {
                return {
                  x: (bodyA.position.x - bodyB.position.x) * attractorStrength,
                  y: (bodyA.position.y - bodyB.position.y) * attractorStrength,
                }
              },
            ],
          },
        },
      )
      MatterJS.Composite.add(engine.world, attractor)
    }

    // Create cursor attractor body
    if (cursorStrength > 0) {
      const cursorBody = MatterJS.Bodies.circle(0, 0, 5, {
        isStatic: true,
        plugin: {
          attractors: [
            (bodyA: MatterJS.Body, bodyB: MatterJS.Body) => {
              // Skip if not clicked and it's a binary particle
              if (!isClicked && bodyB.label === 'binary') {
                return { x: 0, y: 0 }
              }

              const dx = bodyA.position.x - bodyB.position.x
              const dy = bodyA.position.y - bodyB.position.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < cursorFieldRadius) {
                return {
                  x: dx * cursorStrength,
                  y: dy * cursorStrength,
                }
              }
              return { x: 0, y: 0 }
            },
          ],
        },
      })
      cursorBodyRef.current = cursorBody
      MatterJS.Composite.add(engine.world, cursorBody)
    }

    // Create a runner with options
    const runnerOptions: MatterJS.IRunnerOptions = {
      delta: 1000 / 60,
      isFixed: true,
      enabled: true,
    }
    
    const runner = MatterJS.Runner.create(runnerOptions)
    runnerRef.current = runner
    
    // Run the engine with the runner
    MatterJS.Runner.run(runner, engine)

    // Track cursor movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      cursorRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    // Handle mouse clicks to show binary particles
    const handleMouseDown = () => {
      if (!containerRef.current) return
      setIsClicked(true)
    }

    const handleMouseUp = () => {
      setIsClicked(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      
      if (runnerRef.current) {
        MatterJS.Runner.stop(runnerRef.current)
      }
      if (engineRef.current) {
        MatterJS.Engine.clear(engineRef.current)
      }
      if (animationFrameIdRef.current !== null && animationFrameIdRef.current !== undefined) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
  }, [attractorStrength, cursorFieldRadius, cursorStrength, isClicked])

  // Handle DOM bodies and update their positions
  useEffect(() => {
    if (!containerRef.current || !engineRef.current) return

    // Find all elements with data-matter-body attribute
    const bodyElements = Array.from(
      containerRef.current.querySelectorAll('[data-matter-body]'),
    )

    // Clear existing bodies
    if (bodiesRef.current.length > 0 && engineRef.current) {
      MatterJS.Composite.remove(engineRef.current.world, bodiesRef.current)
      bodiesRef.current = []
    }

    // Create bodies for each element
    bodiesRef.current = bodyElements.map((element) => {
      const rect = element.getBoundingClientRect()
      const containerRect = containerRef.current?.getBoundingClientRect()
      if (!containerRect) return MatterJS.Bodies.circle(0, 0, 0, {})
      
      const x = rect.left - containerRect.left + rect.width / 2
      const y = rect.top - containerRect.top + rect.height / 2

      // Parse options
      let options = {}
      const optionsString = element.getAttribute('data-matter-body')
      if (optionsString) {
        try {
          options = JSON.parse(optionsString)
        } catch (e) {
          console.error('Invalid matter-body options', e)
        }
      }

      // Create the body
      return MatterJS.Bodies.circle(x, y, rect.width / 2, {
        ...options,
        label: 'binary',
      })
    })

    // Add bodies to the world
    if (engineRef.current) {
      MatterJS.Composite.add(engineRef.current.world, bodiesRef.current)
    }

    // Update element positions based on physics
    const updatePositions = () => {
      bodiesRef.current.forEach((body, index) => {
        const element = bodyElements[index] as HTMLElement
        if (element) {
          // Get offset relative to the container
          const offsetLeft = body.position.x
          const offsetTop = body.position.y
          const angle = body.angle
          
          // Apply transform directly to the element
          element.style.transform = `translate(-50%, -50%) translate(${offsetLeft}px, ${offsetTop}px) rotate(${angle}rad)`
        }
      })

      // Update cursor attractor position
      if (cursorBodyRef.current) {
        MatterJS.Body.setPosition(cursorBodyRef.current, {
          x: cursorRef.current.x,
          y: cursorRef.current.y,
        })
      }

      animationFrameIdRef.current = requestAnimationFrame(updatePositions)
    }

    updatePositions()

    return () => {
      if (animationFrameIdRef.current !== null && animationFrameIdRef.current !== undefined) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
