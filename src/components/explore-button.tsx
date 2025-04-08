'use client'

import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { useState } from 'react'
import { CommandPalette } from './mobile-menu'

export function ExploreButton() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsCommandPaletteOpen(true)}
        type="button"
        className="group flex items-center gap-1 text-sm tracking-[.2em] opacity-60 hover:opacity-100 active:opacity-100"
      >
    <span className="hidden md:inline">Press</span>
      <kbd className="bg-neutral-100 p-1 dark:bg-neutral-950 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-500 leading-none hidden tracking-normal opacity-90 md:inline">
        Ctrl K
      </kbd>
      <span className="inline md:hidden">Click</span>
      <span>to explore</span>

      <ArrowRight
        size="1em"
        className="duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:-translate-x-full md:opacity-0"
      />
    </button>

      {/* Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        setIsOpen={setIsCommandPaletteOpen} 
      />
    </>
  )
}