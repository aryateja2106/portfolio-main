'use client'

import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { useParams } from 'next/navigation'
import { getBlogById, getRelatedBlogs } from '@/hooks/blog'
import MarkdownRenderer from '@/components/markdowmRender'

export default function BlogPostPage() {
  const params = useParams()
  const postId = typeof params.blogId === 'string' ? params.blogId : '1'
  const post = getBlogById(postId)
  const relatedPosts = getRelatedBlogs(postId)
  
  if (!post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Header />
        <div className="w-full px-4 max-w-4xl mx-auto pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog post not found</h1>
          <p className="mb-8">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link 
            href="/blogs" 
            className="inline-flex items-center justify-center rounded-lg bg-teal-500 px-6 py-3 text-white hover:bg-teal-600 transition-colors"
          >
            Back to all blogs
          </Link>
        </div>
      </main>
    )
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      
      <article className="w-full px-4 max-w-4xl mx-auto pt-32 pb-20">
        {/* Back button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-teal-500 dark:hover:text-teal-500 mb-8"
        >
          <svg 
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all blogs
        </Link>
        
        {/* Post header */}
        <div className="mb-8">
          <div className="inline-block bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full px-3 py-1 text-sm mb-4">
            {post.category}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            <span>{post.formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <Link 
                href={`/blogs/tag/${tag}`} 
                key={tag}
                className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded-md hover:bg-teal-100 dark:hover:bg-teal-900 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
          
          {/* Author info */}
          <div className="flex items-center border-t border-b border-neutral-200 dark:border-neutral-800 py-4 mb-8">
            <div className="relative rounded-full bg-neutral-200 dark:bg-neutral-700 h-12 w-12 mr-4 overflow-hidden">
              {/* Replace with actual author image */}
              <div className="h-full w-full flex items-center justify-center text-xs text-neutral-500">
                Avatar
              </div>
            </div>
            <div>
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">{post.author.bio}</div>
            </div>
          </div>
        </div>
        
        {/* Post cover image */}
        <div className="w-full h-64 md:h-96 bg-neutral-100 dark:bg-neutral-800 rounded-lg mb-8 overflow-hidden">
          <div className="h-full w-full flex items-center justify-center text-neutral-400">
            Cover Image Placeholder
          </div>
        </div>
        
        {/* Post content - Markdown renderer */}
        <MarkdownRenderer content={post.content} />
        
        {/* Share and like section */}
        <div className="mt-12 flex justify-between items-center border-t border-neutral-200 dark:border-neutral-800 pt-6">
          <div className="flex space-x-4">
            <button type="button" className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-teal-500 dark:hover:text-teal-500">
              <svg 
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Like
            </button>
            <button type="button" className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-teal-500 dark:hover:text-teal-500">
              <svg 
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
          <button type="button" className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-teal-500 dark:hover:text-teal-500">
            <svg 
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Bookmark
          </button>
        </div>
      </article>
      
      {/* Related posts section */}
      {relatedPosts.length > 0 && (
        <div className="w-full bg-neutral-50 dark:bg-neutral-900 py-16">
          <div className="w-full px-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.slice(0, 3).map(relatedPost => (
                <Link 
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group"
                >
                  <div className="h-40 bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-4 overflow-hidden">
                    <div className="h-full w-full flex items-center justify-center text-neutral-400 text-xs">
                      Image Placeholder
                    </div>
                  </div>
                  <h3 className="font-medium group-hover:text-teal-500 transition-colors mb-1">
                    {relatedPost.title}
                  </h3>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {relatedPost.formattedDate}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </main>
  )
}