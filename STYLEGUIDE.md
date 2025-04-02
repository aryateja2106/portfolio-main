# Portfolio Style Guide

This document outlines the design system, component patterns, and coding conventions used throughout the portfolio website. It serves as a reference for maintaining consistency during future development.

## Table of Contents

- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Components](#components)
- [Animations](#animations)
- [Code Conventions](#code-conventions)

## Colors

### Primary Palette

| Color Name | Hex Code | Tailwind Class | Usage |
|------------|----------|----------------|-------|
| Teal       | `#2dd4bf` | `text-teal-400` | Primary accent color, buttons, highlights |
| Dark Background | `#060606` | `bg-neutral-950` | Main background color |
| Light Text | `#f5f5f5` | `text-neutral-50` | Primary text on dark backgrounds |
| Neutral Gray | `#a3a3a3` | `text-neutral-400` | Secondary text, subtitles |
| Border Light | `rgba(255,255,255,0.1)` | `border-neutral-800/40` | Subtle borders and dividers |

### Semantic Colors

| Purpose | Hex Code | Tailwind Class |
|---------|----------|----------------|
| Success | `#10b981` | `text-emerald-500` |
| Error/Destructive | `#ef4444` | `text-red-500` |
| Warning | `#f59e0b` | `text-amber-500` |
| Info | `#3b82f6` | `text-blue-500` |

### Gradients

- **Background Gradients**: `bg-[conic-gradient(transparent,rgb(255,255,255))]` with `opacity-15 blur-2xl`
- **Button Hover**: Transition from teal to slightly darker teal
- **Glow Effects**: `drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]` for teal glow

## Typography

### Font Families

| Font | Usage | Tailwind Variable | Weights |
|------|-------|-------------------|---------|
| Inter | Primary body text | `--font-inter` | 200, 300, 400, 500, 600, 700, 900 |
| Poppins | Headings | `--font-poppins` | 400, 500, 600, 700 |
| Fira Code | Code blocks, monospace text | `--font-fira-code` | 400, 500, 600, 700 |

### Font Sizes

| Element | Size | Tailwind Class | Weight |
|---------|------|----------------|--------|
| Hero Name (First) | 3rem (48px) | `text-5xl` | Bold (700) |
| Hero Name (Last) | 4.5rem (72px) | `text-7xl` | Regular (400) |
| Section Headings | 2.25rem (36px) | `text-4xl` | Semibold (600) |
| Subheadings | 1.5rem (24px) | `text-2xl` | Medium (500) |
| Body Text | 1rem (16px) | `text-base` | Regular (400) |
| Small Text | 0.875rem (14px) | `text-sm` | Regular (400) |
| Code/Binary | 1rem (16px) | `text-base` | Monospace (400) |

### Text Styles

- **Selection**: Custom selection color using teal background with white text
- **Links**: Teal color with subtle hover effects
- **Typewriter**: Animated text with gradient underline
- **Emphasis**: Bold (700) weight in teal color

## Spacing

### Layout

- **Container Width**: `max-w-7xl` (1280px)
- **Section Padding**: `py-8 px-4 md:px-0`
- **Component Gap**: `gap-8 md:gap-12`
- **Hero Height**: `min-h-[85vh]`

### Margins & Padding

| Size | Tailwind Class | Usage |
|------|----------------|-------|
| Extra Small | `p-2` / `m-2` | Tight spacing, icons |
| Small | `p-4` / `m-4` | Component internal spacing |
| Medium | `p-6` / `m-6` | Section padding |
| Large | `p-8` / `m-8` | Section margins |
| Extra Large | `p-12` / `m-12` | Hero section spacing |

## Components

### Buttons

#### Primary Button
```jsx
<Link 
  href="/" 
  className="group relative px-6 py-3 bg-teal-400 text-neutral-900 font-medium rounded-md hover:bg-teal-500 transition-all duration-300 text-center overflow-hidden"
>
  <span className="relative z-10 group-hover:text-neutral-900">Button Text</span>
  <span className="absolute inset-0 w-0 bg-neutral-900/10 group-hover:w-full transition-all duration-300 ease-in-out" />
</Link>
```

#### Secondary Button
```jsx
<Link 
  href="/" 
  className="group relative px-6 py-3 border border-teal-400 text-teal-400 font-medium rounded-md hover:bg-neutral-800 transition-all duration-300 text-center"
>
  <span className="relative z-10">Button Text</span>
  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-teal-400 group-hover:w-full transition-all duration-300 ease-in-out" />
</Link>
```

### Cards

#### Glass Card
```jsx
<div className="relative backdrop-blur-md backdrop-brightness-50 bg-neutral-900/30 p-6 rounded-lg border border-neutral-800/40">
  <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-teal-400/5 to-transparent blur-xl" />
  <div className="relative z-10">
    {/* Card content */}
  </div>
</div>
```

### Section Layout

```jsx
<section className="py-16 px-4 md:px-0">
  <div className="mx-auto max-w-7xl">
    <h2 className="text-4xl font-semibold text-neutral-50 mb-8">Section Title</h2>
    {/* Section content */}
  </div>
</section>
```

## Animations

### Framer Motion Variants

#### Staggered Container
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};
```

#### Fade Up Item
```jsx
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
};
```

### CSS Animations

#### Binary Animation
```css
@keyframes float-out {
  0% {
    transform: translate(0, 0) scale(0.5) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: 
      translate(
        calc((var(--random-x) * 80px) + (var(--mouse-delta-x) * 15px)), 
        calc((var(--random-y) * 80px) + (var(--mouse-delta-y) * 15px))
      )
      scale(1)
      rotate(calc(var(--rotate) * 1deg));
    opacity: 0;
  }
}
```

#### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

#### Fade In Up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Code Conventions

### Component Structure

```tsx
'use client'; // Only when needed for client-side functionality

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ComponentProps {
  // Props definition
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // State and hooks
  const [state, setState] = useState(initialValue);
  
  // Effects
  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  }, [dependencies]);
  
  // Helper functions
  const handleSomething = () => {
    // Logic
  };
  
  // JSX
  return (
    <div className="component-container">
      {/* Component content */}
    </div>
  );
}
```

### Tailwind Practices

- Use `cn()` utility for conditional class names
- Mobile-first approach with responsive breakpoints
- Prefer Tailwind classes over inline styles
- Use consistent color classes from the palette
- Extract common patterns to components

### TypeScript Conventions

- Use interfaces for component props
- Export named components
- Use proper type annotations for all variables
- Avoid `any` type
- Use client-side wrappers for components that use browser APIs

### Animation Best Practices

- Use Framer Motion for complex animations
- Implement proper cleanup for animations
- Use CSS variables for dynamic animation values
- Keep animations subtle and purposeful
- Ensure animations don't impact performance
