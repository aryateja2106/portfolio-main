'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { getAllBlogs, getAllCategories, getBlogsByCategory, sortBlogsByDate} from '@/hooks/blog'
import type { BlogPost } from '@/types/blog-types'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  
  useEffect(() => {
    // Get all blogs and categories when component mounts
    const allBlogs = sortBlogsByDate(getAllBlogs())
    const allCategories = getAllCategories()
    
    setBlogs(allBlogs)
    setCategories(allCategories)
  }, [])
  
  // Handle category filter click
  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category)
    
    if (category === 'all') {
      setBlogs(sortBlogsByDate(getAllBlogs()))
    } else {
      const filteredBlogs = getBlogsByCategory(category)
      setBlogs(sortBlogsByDate(filteredBlogs))
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
        <div className="flex flex-wrap gap-3 mb-10">
          <button type="button" 
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
        
        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((post) => (
            <Link 
              href={`/blog/${post.id}`} 
              key={post.id}
              className="group flex flex-col rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-teal-500 dark:hover:border-teal-500 transition-all hover:shadow-md"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  {/* Replace with actual image */}
                  <div className="text-neutral-400">Image Placeholder</div>
                </div>
                <div className="absolute top-4 left-4 bg-neutral-900/70 text-white text-xs px-2 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                  <span>{post.formattedDate}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold mb-2 group-hover:text-teal-500 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-neutral-600 dark:text-neutral-400 text-sm flex-grow">
                  {post.description}
                </p>
                
                <div className="mt-4 text-teal-500 font-medium text-sm flex items-center">
                  Read more
                  <svg 
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}