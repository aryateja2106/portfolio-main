'use client'

import { useCallback, useEffect, useState } from 'react'

interface ScreenSize {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  lessThan: (breakpoint: string) => boolean
  greaterThan: (breakpoint: string) => boolean
  between: (minBreakpoint: string, maxBreakpoint: string) => boolean
}

// Define breakpoints in pixels
const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

type Breakpoint = keyof typeof breakpoints

/**
 * Custom hook to track screen size and provide responsive utility functions
 */
export default function useScreenSize(): ScreenSize {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
      
      // Set initial size
      handleResize()
      
      // Add event listener
      window.addEventListener('resize', handleResize)
      
      // Cleanup
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Check if screen size is less than specified breakpoint
  const lessThan = useCallback(
    (breakpoint: string) => {
      const breakpointValue = breakpoints[breakpoint as Breakpoint] || Number.POSITIVE_INFINITY
      return windowSize.width < breakpointValue
    },
    [windowSize.width],
  )

  // Check if screen size is greater than specified breakpoint
  const greaterThan = useCallback(
    (breakpoint: string) => {
      const breakpointValue = breakpoints[breakpoint as Breakpoint] || 0
      return windowSize.width >= breakpointValue
    },
    [windowSize.width],
  )

  // Check if screen size is between two breakpoints
  const between = useCallback(
    (minBreakpoint: string, maxBreakpoint: string) => {
      const minValue = breakpoints[minBreakpoint as Breakpoint] || 0
      const maxValue = breakpoints[maxBreakpoint as Breakpoint] || Number.POSITIVE_INFINITY
      return windowSize.width >= minValue && windowSize.width < maxValue
    },
    [windowSize.width],
  )

  return {
    ...windowSize,
    isMobile: windowSize.width < breakpoints.md,
    isTablet: windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg,
    isDesktop: windowSize.width >= breakpoints.lg,
    lessThan,
    greaterThan,
    between,
  }
}
