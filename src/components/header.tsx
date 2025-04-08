'use client'

import type React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { MobileMenu } from './mobile-menu'
import { Search } from './search'
import { useActiveSection } from '@/hooks/useActiveSection' // Import the new hook

const MenuItem: React.FC<{ name: string; path: string }> = ({ name, path }) => {
  const pathname = usePathname()
  const activeSection = useActiveSection()
  const isHome = path === '/'
  
  // Update the active check to include both pathname and sections
  const isActive = 
    isHome ? 
      (path === pathname && activeSection === '/') : 
      (pathname === '/' && activeSection === path) || pathname.startsWith(path)

  return (
    <Link
      href={path}
      data-active={isActive}
      className="rounded-lg p-2 leading-none text-neutral-500 data-[active='true']:text-neutral-900 hover:bg-neutral-200/50 hover:text-neutral-900 dark:text-neutral-400 data-[active='true']:dark:text-teal-400 hover:dark:bg-neutral-950 dark:hover:text-neutral-200"
    >
      {name}
    </Link>
  )
}

export function Header() {
  return (
    <header className="fixed top-0 z-40 w-full p-3">
      <div className="w-full px-4 md:max-w-4xl lg:px-0 m-auto flex items-center justify-between rounded-xl border p-0 backdrop-blur-3xl transition-all border-neutral-900 bg-neutral-1000/80 md:px-10">
        <Link
          href="/"
          className="px-10 py-3 font-handwrite text-2xl font-bold drop-shadow-lg md:px-10"
        >
          ATR
        </Link>
        <div className="hidden w-full items-center gap-8 md:flex md:w-auto">
          <nav className="flex-wrap items-center justify-center gap-5">
            <MenuItem name="Home" path="/" />
            <MenuItem name="About" path="#about" />
            <MenuItem name="Projects" path="#projects" />
            <MenuItem name="Blog" path="#blogs" />
            <MenuItem name="Contact" path="#contact" />
          </nav>
          <Search />
        </div>
        <MobileMenu />
      </div>
    </header>
  )
}