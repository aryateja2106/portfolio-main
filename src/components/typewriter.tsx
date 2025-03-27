'use client'

import React from 'react'
import { Typewriter as TypewriterEffect, useTypewriter } from 'react-simple-typewriter'

interface TypewriterProps {
  words: string[]
  loop?: boolean
  typeSpeed?: number
  deleteSpeed?: number
  delaySpeed?: number
}

export function Typewriter({ 
  words, 
  loop = true, 
  typeSpeed = 80, 
  deleteSpeed = 50, 
  delaySpeed = 1500 
}: TypewriterProps) {
  return (
    <TypewriterEffect
      words={words}
      loop={loop}
      cursor
      cursorStyle='|'
      typeSpeed={typeSpeed}
      deleteSpeed={deleteSpeed}
      delaySpeed={delaySpeed}
    />
  )
}

// Also export the hook for more flexibility
export { useTypewriter }