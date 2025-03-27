import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { useState } from 'react'
import { CommandPalette } from './mobile-menu'

export function Search() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsCommandPaletteOpen(true)}
        className="flex flex-1 cursor-text items-center gap-5 rounded-xl bg-neutral-200/20 p-2 text-sm leading-none backdrop-blur-3xl dark:bg-neutral-800/20"
      >
        <span className="flex items-center gap-3">
          <MagnifyingGlass size="1em" />
          <span className="text-neutral-600 dark:text-neutral-400">
            Search...
          </span>
        </span>
        <kbd className="bg-neutral-100 p-1 dark:bg-neutral-950 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-500 leading-none hidden md:flex">Ctrl K</kbd>
      </button>

      {/* Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        setIsOpen={setIsCommandPaletteOpen} 
      />
    </>
  )
}