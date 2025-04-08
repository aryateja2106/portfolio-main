'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { getAllBlogs, getAllCategories, getBlogsByCategory, sortBlogsByDate} from '@/hooks/blog'
import type { BlogPost } from '@/types/blog-types'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    try {
      // Get all blogs and categories when component mounts
      const allBlogs = sortBlogsByDate(getAllBlogs())
      const allCategories = getAllCategories()
      
      setBlogs(allBlogs)
      setCategories(allCategories)
      setIsLoading(false)
    } catch (err) {
      setError('Failed to load blog data')
      setIsLoading(false)
      console.error('Error loading blog data:', err)
    }
  }, [])
  
  // Handle category filter click
  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category)
    
    try {
      if (category === 'all') {
        setBlogs(sortBlogsByDate(getAllBlogs()))
      } else {
        const filteredBlogs = getBlogsByCategory(category)
        setBlogs(sortBlogsByDate(filteredBlogs))
      }
    } catch (err) {
      setError('Failed to filter blogs')
      console.error('Error filtering blogs:', err)
    }
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      
      <div className="w-full px-4 max-w-4xl mx-auto pt-32 pb-20">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Thoughts, stories, and ideas about web development, design, and technology.
          </p>
        </div>
        
        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-10" role="tablist" aria-label="Blog categories">
          <button 
            type="button" 
            role="tab"
            aria-selected={activeCategory === 'all'}
            aria-controls="blog-posts"
            id="tab-all"
            className={`rounded-full px-4 py-1 text-sm ${
              activeCategory === 'all' 
                ? 'bg-teal-500 text-white' 
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-teal-500 hover:text-white transition-colors'
            }`}
            onClick={() => handleCategoryFilter('all')}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button 
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls="blog-posts"
              id={`tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
              className={`rounded-full px-4 py-1 text-sm ${
                activeCategory === category 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-teal-500 hover:text-white transition-colors'
              }`}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-700 rounded mb-4" />
              <div className="h-4 w-48 bg-neutral-200 dark:bg-neutral-700 rounded" />
            </div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">{error}</div>
            <button 
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* Empty state */}
        {!isLoading && !error && blogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 dark:text-neutral-400 mb-4">
              No blog posts found in this category.
            </p>
            <button 
              type="button"
              onClick={() => handleCategoryFilter('all')}
              className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
            >
              View All Posts
            </button>
          </div>
        )}
        
        {/* Blog posts grid */}
        {!isLoading && !error && blogs.length > 0 && (
          <div id="blog-posts" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((post) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.id}
                className="group flex flex-col rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-teal-500 dark:hover:border-teal-500 transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  {post.coverImage ? (
                    <div className="relative w-full h-full">
                      <Image 
                        src={post.coverImage}
                        alt={`Cover image for ${post.title}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                        priority={Number.parseInt(post.id) <= 4} // Prioritize loading for first 4 images
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                      <div className="text-neutral-400">Image Placeholder</div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-neutral-900/70 text-white text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                    <span>{post.formattedDate}</span>
                    <span className="mx-2" aria-hidden="true">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2 group-hover:text-teal-500 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center text-teal-500 text-sm font-medium">
                    Read article
                    <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <title>Arrow right</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}