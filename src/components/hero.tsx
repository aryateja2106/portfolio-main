import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Typewriter } from './typewriter'
import { ExploreButton } from './explore-button'

import Robot from '../../public/assets/Robot.png'

export function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [binaryDigits, setBinaryDigits] = useState<Array<{opacity: number, value: string, transform: string}>>([])

  // Generate binary digits data on client-side only
  useEffect(() => {
    const digits = Array.from({ length: 100 }).map((_, i) => ({
      opacity: Math.random() * 0.8 + 0.2,
      value: i % 2 ? '1' : '0',
      transform: `translateY(${i % 5 * 20}px) rotate(${i % 2 ? '0deg' : '90deg'})`
    }))
    setBinaryDigits(digits)
    setIsMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <div className="relative flex min-h-[85vh] w-full flex-col items-center md:justify-center py-8 px-4 md:px-0">
      {/* Background effects */}
      <div className="absolute -z-50 h-64 w-64 top-20 left-0 bg-[conic-gradient(transparent,rgb(0,0,0))] opacity-15 blur-2xl dark:bg-[conic-gradient(transparent,rgb(255,255,255))] md:left-36" />
      
      {/* Binary digits background effect (subtle) - Client-side only to prevent hydration mismatch */}
      {isMounted && (
        <div className="absolute inset-0 -z-40 overflow-hidden opacity-5">
          <div className="absolute left-0 top-0 h-full w-full flex flex-wrap justify-center content-start gap-3 md:gap-5">
            {binaryDigits.map((digit, i) => (
              <div 
                key={`binary-${i}-${digit.value}`}
                className="text-teal-400 text-opacity-30 text-xs md:text-sm"
                style={{ 
                  transform: digit.transform,
                  opacity: digit.opacity
                }}
              >
                {digit.value}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile robot background */}
      <div className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 opacity-10 dark:opacity-5 md:hidden">
        <Image
          src={Robot}
          alt="Deconstructed Robot Light"
          className="w-96 object-cover"
          priority
        />
      </div>

      {/* Main content */}
      <motion.div 
        className="flex w-full max-w-7xl flex-col-reverse md:flex-row items-center gap-8 md:gap-12 md:justify-between"
        variants={containerVariants}
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"}
      >
        {/* Left column: Name, typewriter, value prop, CTAs */}
        <motion.div className="flex w-full flex-col items-center gap-5 md:w-3/5 md:items-start" variants={itemVariants}>
          {/* Name with sparkle effect */}
          <div className="relative">
            <motion.span 
              className="w-min font-bold text-black drop-shadow-2xl dark:text-neutral-50 md:w-max"
              variants={itemVariants}
            >
              <span className="relative text-5xl text-teal-400">
                Arya Teja
                <span className="absolute -right-2 -top-2 text-xs animate-ping text-teal-300">✨</span>
              </span> 
              <br /> 
              <span className="text-7xl text-neutral-400">Rudraraju</span>
            </motion.span>
          </div>
          
          {/* Typewriter with gradient underline */}
          <motion.div variants={itemVariants} className="relative">
            <span className="flex w-full items-center justify-center text-center text-2xl text-neutral-400 md:min-h-fit md:justify-start md:text-left md:text-3xl">
              <Typewriter
                words={[
                  'Aspiring AI Engineer',
                  'AI Solution Provider',
                  'From Business to Binary',
                  'AI Tool Navigator',
                  'MCP Builder & Expert',
                  'AI Workflow Optimizer',
                  'Cutting-Edge Tool Curator'
                ]}
                loop
              />
            </span>
            <div className="mt-1 h-[2px] w-32 bg-gradient-to-r from-teal-400 to-transparent hidden md:block" />
          </motion.div>
          
          {/* Value Proposition with animated reveal */}
          <motion.p 
            className="text-neutral-300 text-lg max-w-lg text-center md:text-left backdrop-blur-sm backdrop-brightness-50 md:backdrop-brightness-100 p-2 md:p-0 rounded-lg border border-neutral-800/40 md:border-0"
            variants={itemVariants}
          >
           Helping you navigate the AI tool landscape to find the perfect solutions for your unique needs.
          </motion.p>
          
          {/* Call to Action Buttons with hover effects */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto"
            variants={itemVariants}
          >
            {/* Primary CTA */}
            <Link 
              href="/" 
              className="group relative px-6 py-3 bg-teal-400 text-neutral-900 font-medium rounded-md hover:bg-teal-500 transition-all duration-300 text-center overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-neutral-900">Schedule a Discovery Call</span>
              <span className="absolute inset-0 w-0 bg-neutral-900/10 group-hover:w-full transition-all duration-300 ease-in-out" />
            </Link>
            
            {/* Secondary CTA */}
            <Link 
              href="/" 
              className="group relative px-6 py-3 border border-teal-400 text-teal-400 font-medium rounded-md hover:bg-neutral-800 transition-all duration-300 text-center"
            >
              <span className="relative z-10">Access Free AI Resources</span>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-teal-400 group-hover:w-full transition-all duration-300 ease-in-out" />
            </Link>
          </motion.div>
          
          {/* Unified explore button - visible on both mobile and desktop */}
          <motion.div 
            className="mt-4"
            variants={itemVariants}
          >
            <ExploreButton />
          </motion.div>
        </motion.div>
        
   
      </motion.div>
    </div>
  )
}