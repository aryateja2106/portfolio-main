"use client";
import { getAllBlogs } from "@/hooks/blog";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type BlogPostProps = {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	category: string;
	readTime: string;
	imagePath?: string;
	featured?: boolean;
	slug?: string;
};

// BlogCard component for displaying blog posts in different styles
const BlogCard = ({ post, variant = 'default', className = '' }: { 
  post: BlogPostProps; 
  variant?: 'default' | 'compact' | 'featured'; 
  className?: string 
}) => {
  // Default placeholder for image
  const ImagePlaceholder = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 text-teal-400/40">
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg xmlns="http://www.w3.org/2000/svg" width={variant === 'compact' ? "32" : "48"} height={variant === 'compact' ? "32" : "48"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Document placeholder">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M10 13a1 1 0 0 0 0 2 1 1 0 0 0 0-2z" />
        <path d="M6 20v-8l3 3 2-2 3 3 2-2 2 2v4" />
      </svg>
    </div>
  );

  // Generate slug from id if not provided
  const slug = post.slug || post.id;

  // Determine card style based on variant
  if (variant === 'featured') {
    return (
      <Link href={`/blog/${slug}`} className={`block group ${className}`}>
        <div className="relative overflow-hidden rounded-xl border border-neutral-800 transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/10 hover:border-teal-500/20 bg-gradient-to-b from-neutral-900 to-neutral-950">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="relative h-64 md:h-auto bg-neutral-800 overflow-hidden">
              {post.imagePath ? (
                <>
                  <Image 
                    src={post.imagePath} 
                    alt={post.title} 
                    fill 
                    className="object-cover opacity-60"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-neutral-900/80 mix-blend-multiply" />
                </>
              ) : (
                <ImagePlaceholder />
              )}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neutral-900 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="p-6 py-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-teal-400/20 text-teal-300 px-3 py-1 rounded-full text-xs font-medium">Featured</span>
                <span className="text-teal-400 text-sm font-medium">{post.category}</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-teal-400 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-neutral-400 mb-6">{post.excerpt}</p>
              
              <div className="flex justify-between items-center mt-auto">
                <div className="flex items-center text-sm text-neutral-500">
                  <span className="mr-3">{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                
                <span className="inline-flex items-center text-teal-400 group-hover:text-teal-300 transition-colors">
                  Read article
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 transform group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      d="M3.33334 8H12.6667"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 3.33331L12.6667 7.99998L8 12.6666"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  if (variant === 'compact') {
    return (
      <Link href={`/blog/${slug}`} className={`block group ${className}`}>
        <div className="bg-neutral-900/60 rounded-lg overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all duration-300 h-full">
          <div className="relative w-full h-40 bg-neutral-800 overflow-hidden">
            {post.imagePath ? (
              <Image 
                src={post.imagePath} 
                alt={post.title} 
                fill 
                className="object-cover opacity-70"
                sizes="100vw"
              />
            ) : (
              <ImagePlaceholder />
            )}
          </div>
          
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-teal-400 text-xs font-medium">{post.category}</span>
              <span className="text-xs text-neutral-500">{post.readTime}</span>
            </div>
            
            <h3 className="text-base font-bold mb-2 group-hover:text-teal-400 transition-colors">
              {post.title}
            </h3>
            
            <p className="text-neutral-400 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
            
            <div className="flex items-center justify-between mt-auto pt-2">
              <span className="text-xs text-neutral-500">{post.date}</span>
              <span className="text-teal-400 text-sm group-hover:text-teal-300 transition-colors flex items-center">
                Read
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 transform group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  <path
                    d="M3.33334 8H12.6667"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 3.33331L12.6667 7.99998L8 12.6666"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  // Default variant
  return (
    <Link href={`/blog/${slug}`} className={`block group ${className}`}>
      <div className="bg-neutral-900/60 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all duration-300 h-full flex flex-col">
        <div className="relative w-full h-48 bg-neutral-800 overflow-hidden">
          {post.imagePath ? (
            <>
              <Image 
                src={post.imagePath} 
                alt={post.title} 
                fill 
                className="object-cover opacity-70"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl text-teal-400/30">
              {post.category === "TypeScript" && "🔷"}
              {post.category === "React" && "⚛️"}
              {post.category === "CSS" && "🎨"}
              {post.category === "Web Development" && "🌐"}
              {post.category === "AI" && "🤖"}
              {post.category === "Performance" && "⚡"}
              {post.category === "Cloud" && "☁️"}
              {post.category === "Career" && "💼"}
            </div>
          )}
        </div>
        
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-teal-400 text-xs font-medium">{post.category}</span>
            <div className="flex items-center text-xs text-neutral-400">
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold mb-2 group-hover:text-teal-400 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-neutral-400 text-sm mb-4 flex-grow">{post.excerpt}</p>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs text-neutral-500">{post.date}</span>
            <span className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors text-sm">
              Read more
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 transform group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              >
                <path
                  d="M3.33334 8H12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 3.33331L12.6667 7.99998L8 12.6666"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const Blogs = () => {
	// Get blog posts from the hook
	const blogData = getAllBlogs();

	// Map the blog data to the format expected by this component
	const blogPosts: BlogPostProps[] = blogData.map((post) => ({
		id: post.id,
		title: post.title,
		excerpt: post.excerpt,
		date: post.formattedDate,
		category: post.category,
		readTime: post.readTime,
		imagePath: post.coverImage,
		featured: post.id === "1", // Mark the first post as featured
	}));

	// Separate featured post from regular posts
	const featuredPost = blogPosts.find((post) => post.featured);
	// Only get the first 2 non-featured posts (for a total of 3 blogs including featured)
	const regularPosts = blogPosts.filter((post) => !post.featured).slice(0, 2);

	return (
		<section id="blogs" className="w-full mt-28">
			<div className="flex items-center mb-6">
				<svg
					aria-hidden="true"
					width="28"
					height="28"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="text-teal-400 mr-3"
				>
					<path
						d="M8 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H16"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M8 7H16"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M8 11H16"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M8 15H12"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<h2 className="text-3xl font-bold mr-4">My blogs</h2>
				<div className="h-px bg-gray-600 flex-grow" />
			</div>
			<p className="text-gray-400 mb-12 text-lg">
				Insights on AI implementation, marketing automation, and technology
				innovation.
			</p>

			<div className="space-y-10">
				{/* Featured blog post */}
				{featuredPost && (
					<BlogCard post={featuredPost} variant="featured" />
				)}

				{/* Regular blog posts grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{regularPosts.map((post) => (
						<BlogCard key={post.id} post={post} variant="default" />
					))}
				</div>

				{/* View all blogs */}
				<div className="text-center mt-12">
					<Link
						href="/blog"
						className="inline-flex items-center justify-center rounded-lg bg-teal-500 px-6 py-3 text-white hover:bg-teal-600 transition-colors"
					>
						View all articles
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Blogs;
