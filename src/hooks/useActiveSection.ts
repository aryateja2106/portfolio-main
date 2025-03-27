'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    // Only run on home page
    if (pathname !== '/') {
      return
    }

    const sections = ['#projects', '#blogs', '#about', '#contact']
    
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Remove the # from the ID to get the section name
            const sectionId = entry.target.id
            setActiveSection(`#${sectionId}`)
          }
        }
      },
      {
        rootMargin: '-80px 0px -30% 0px', // Adjust top margin to account for header height
        threshold: 0.1
      }
    )

    // Observe all sections
    for (const section of sections) {
      const element = document.querySelector(section)
      if (element) {
        observer.observe(element)
      }
    }

    // If we're at the top of the page and no section is in view, set Home as active
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('/')
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => {
      for (const section of sections) {
        const element = document.querySelector(section)
        if (element) {
          observer.unobserve(element)
        }
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return activeSection
}