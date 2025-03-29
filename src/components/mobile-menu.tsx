import {type ComponentProps, useState, useEffect } from 'react'
import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import type { Icon as PhosphorIcon } from '@phosphor-icons/react'
import {
  List,
  X,
  House,
  ArrowUpRight,
  File,
  GithubLogo,
  RssSimple,
  TreeStructure,
  MagnifyingGlass,
  Note,
  User,
  Briefcase,
  Book
} from '@phosphor-icons/react/dist/ssr'
import { Command } from 'cmdk'
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

// Define command types
type CommandItem = {
  id: string
  name: string
  shortcut?: string[]
  keywords?: string[]
  section?: string
  icon?: PhosphorIcon
  perform?: () => void
  href?: string
  external?: boolean
}

interface LinkProps extends NextLinkProps {
  title: string
  icon: PhosphorIcon
}

interface OutLinkProps extends ComponentProps<'a'> {
  title: string
  icon: PhosphorIcon
}

// Command palette component
export function CommandPalette({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean
  setIsOpen: (open: boolean) => void 
}) {
  const [search, setSearch] = useState('')
  
  // Define commands
  const commands: CommandItem[] = [
    {
      id: 'home',
      name: 'Home',
      icon: House,
      href: '/',
      section: 'Navigation',
      keywords: ['homepage', 'main']
    },
    {
      id: 'blog',
      name: 'Blog',
      icon: Note,
      href: '/blog',
      section: 'Navigation',
      keywords: ['posts', 'articles']
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: Briefcase,
      href: '/projects',
      section: 'Navigation',
      keywords: ['work', 'portfolio']
    },
    {
      id: 'about',
      name: 'About',
      icon: User,
      href: '/about',
      section: 'Navigation',
      keywords: ['me', 'info', 'profile']
    },
    {
      id: 'guestbook',
      name: 'Guestbook',
      icon: Book,
      href: '/guestbook',
      section: 'Navigation',
      keywords: ['sign', 'comment']
    },
    {
      id: 'sitemap',
      name: 'Sitemap',
      icon: TreeStructure,
      href: '/sitemap',
      section: 'Navigation',
      keywords: ['map', 'structure']
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: GithubLogo,
      href: 'https://github.com/mateusfg7/mateusf.com/?ref=https://mateusf.com',
      external: true,
      section: 'Links',
      keywords: ['code', 'repository', 'source']
    },
    {
      id: 'rss',
      name: 'RSS Feed',
      icon: RssSimple,
      href: '/blog/feed',
      section: 'Links',
      keywords: ['subscribe', 'feed']
    }
  ]

  // Handle command selection
  const onSelect = (id: string) => {
    const command = commands.find(c => c.id === id)
    if (command) {
      if (command.perform) {
        command.perform()
      } else if (command.href) {
        if (command.external) {
          window.open(command.href, '_blank')
        } else {
          window.location.href = command.href
        }
      }
    }
    setIsOpen(false)
  }

  // Close on escape
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
      
      // Toggle command palette on Cmd+K/Ctrl+K
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }
    
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setIsOpen, isOpen])

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-neutral-100 p-4 shadow-lg dark:bg-neutral-950">
          <VisuallyHidden.Root>
            <Dialog.Title className="text-2xl font-bold">Menu</Dialog.Title>
          </VisuallyHidden.Root>
          <Command className="w-full" shouldFilter={true}>
            <div className="flex items-center border-b border-neutral-200 pb-2 dark:border-neutral-800">
              <MagnifyingGlass className="mr-2 h-5 w-5 text-neutral-500" />
              <Command.Input 
                value={search}
                onValueChange={setSearch}
                className="w-full bg-transparent text-base outline-none placeholder:text-neutral-500"
                placeholder="Search commands..."
              />
              <Dialog.Close asChild>
                <button title='close-btn' type="button" className="rounded-full p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>
            
            <Command.List className="mt-2 max-h-80 overflow-y-auto">
              <Command.Empty className="py-6 text-center text-sm text-neutral-500">
                No results found.
              </Command.Empty>
              
              {['Navigation', 'Links'].map(section => (
                <Command.Group key={section} heading={section} className="py-2 text-xs text-neutral-500">
                  {commands
                    .filter(command => command.section === section)
                    .map(command => {
                      const Icon = command.icon as PhosphorIcon
                      return (
                        <Command.Item
                          key={command.id}
                          value={command.id}
                          onSelect={onSelect}
                          className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-neutral-200 aria-selected:bg-neutral-200 dark:hover:bg-neutral-800 dark:aria-selected:bg-neutral-800"
                        >
                          {Icon && <Icon className="h-4 w-4" weight="duotone" />}
                          <span>{command.name}</span>
                          {command.external && (
                            <ArrowUpRight className="ml-auto h-3 w-3 text-neutral-500" />
                          )}
                        </Command.Item>
                      )
                    })}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function MobileMenu() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  const Link = ({ title, icon, ...props }: LinkProps) => {
    const Icon = icon

    return (
      <NextLink
        {...props}
        onClick={() => setIsDialogOpen(false)}
        className="flex items-center gap-7 px-7 py-4 leading-none active:bg-neutral-200 active:dark:bg-neutral-1000"
      >
        <Icon size="1em" weight="duotone" />
        <span>{title}</span>
      </NextLink>
    )
  }

  const OutLink = ({ title, icon, ...props }: OutLinkProps) => {
    const Icon = icon

    return (
      <a {...props} className="flex items-center gap-7 px-7 py-4 leading-none active:bg-neutral-200 active:dark:bg-neutral-1000" target="_blank">
        <Icon size="1em" weight="duotone" />
        <span className="flex items-end gap-px">
          <span>{title}</span>
          <ArrowUpRight size="1em" className="text-xs" />
        </span>
      </a>
    )
  }

  const Search = () => {
    return (
      <button
        type="button"
        onClick={() => {
          setIsDialogOpen(false)
          setIsCommandPaletteOpen(true)
        }}
        className="flex items-center gap-7 px-7 py-4 leading-none active:bg-neutral-200 active:dark:bg-neutral-1000"
      >
        <MagnifyingGlass size="1em" weight="duotone" />
        <span className="flex items-end gap-px">
          <span>Search</span>
        </span>
      </button>
    )
  }

  // Set up keyboard shortcut for command palette
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsCommandPaletteOpen(!isCommandPaletteOpen)
      }
    }
    
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [isCommandPaletteOpen])

  return (
    <>
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger asChild className="md:hidden">
          <button type="button" className="px-4 py-3" aria-label="Open menu">
            <List size="1em" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed bottom-0 right-0 top-0 z-50 w-3/4 data-[state=closed]:animate-slide-right data-[state=open]:animate-slide-left">
            <Dialog.Title className="text-2xl font-bold">Menu</Dialog.Title>
            <div className="relative flex h-dvh w-full">
              <Dialog.Close
                asChild
                className="absolute left-2 top-2 rounded-full p-2 backdrop-blur-lg active:bg-red-300/20 active:text-red-500 active:dark:bg-red-300/10 active:dark:text-red-400"
              >
                <button type="button" aria-label="Close">
                  <X size="1em" weight="bold" />
                </button>
              </Dialog.Close>
              <div className="flex flex-1 flex-col overflow-y-scroll rounded-bl-[2rem] rounded-tl-[2rem] bg-neutral-100 py-10 text-xl dark:bg-neutral-950">
                <Link title="Home" icon={House} href="/" />
                <Link title="Blog" icon={Note} href="/blog" />
                <Link title="Projects" icon={Briefcase} href="/projects" />
                <Link title="About" icon={User} href="/about" />
                <Link title="Guestbook" icon={Book} href="/guestbook" />
                <Link title="Sitemap" icon={TreeStructure} href="/sitemap" />
                <Search />
                <OutLink
                  title="License"
                  icon={File}
                  rel="license"
                  href="https://github.com/mateusfg7/mateusf.com/blob/main/LICENSE/?ref=https://mateusf.com"
                />
                <OutLink
                  title="Github"
                  icon={GithubLogo}
                  rel="external"
                  href="https://github.com/mateusfg7/mateusf.com/?ref=https://mateusf.com"
                />
                <OutLink
                  title="RSS"
                  icon={RssSimple}
                  rel="noreferrer"
                  href="/blog/feed"
                />
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      
      {/* Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        setIsOpen={setIsCommandPaletteOpen} 
      />
    </>
  )
}