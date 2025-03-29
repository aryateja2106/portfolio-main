"use client";
import { getAllBlogs } from "@/hooks/blog";
import Link from "next/link";
import React from "react";

type BlogPostProps = {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	category: string;
	readTime: string;
	imagePath?: string;
	featured?: boolean;
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
					<div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden border border-slate-800 hover:border-teal-900/50 transition-all duration-300">
						<div className="relative w-full h-64">
							<div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
							<div className="absolute top-4 left-4 z-20 bg-teal-900/80 text-teal-100 px-3 py-1 rounded-full text-xs font-medium">
								Featured
							</div>
							{/* Replace with actual image */}
							<div className="absolute inset-0 bg-slate-800" />
							<div className="absolute inset-0 flex items-center justify-center text-5xl text-teal-400/30">
								📊
							</div>
						</div>

						<div className="p-6">
							<div className="flex items-center justify-between mb-3">
								<span className="text-teal-400 text-sm font-medium">
									{featuredPost.category}
								</span>
								<div className="flex items-center text-sm text-gray-400">
									<span className="mr-3">{featuredPost.date}</span>
									<span>{featuredPost.readTime}</span>
								</div>
							</div>

							<h3 className="text-2xl font-bold mb-3">{featuredPost.title}</h3>
							<p className="text-gray-300 mb-4">{featuredPost.excerpt}</p>

							<Link
								href={`/blog/${featuredPost.id}`}
								className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors group"
							>
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
							</Link>
						</div>
					</div>
				)}

				{/* Regular blog posts grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{regularPosts.map((post) => (
						<div
							key={post.id}
							className="bg-slate-900/60 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col h-full"
						>
							<div className="relative w-full h-48">
								{/* Replace with actual image */}
								<div className="absolute inset-0 bg-slate-800" />
								<div className="absolute inset-0 flex items-center justify-center text-4xl text-teal-400/30">
									{post.category === "TypeScript" && "🔷"}
									{post.category === "React" && "⚛️"}
									{post.category === "CSS" && "🎨"}
									{post.category === "Web Development" && "🌐"}
									{post.category === "AI" && "🤖"}
									{post.category === "Performance" && "⚡"}
									{post.category === "Cloud" && "☁️"}
									{post.category === "Career" && "�"}
								</div>
							</div>

							<div className="p-5 flex-grow flex flex-col">
								<div className="flex items-center justify-between mb-3">
									<span className="text-teal-400 text-xs font-medium">
										{post.category}
									</span>
									<div className="flex items-center text-xs text-gray-400">
										<span>{post.readTime}</span>
									</div>
								</div>

								<h3 className="text-lg font-bold mb-2">{post.title}</h3>
								<p className="text-gray-400 text-sm mb-4 flex-grow">
									{post.excerpt}
								</p>

								<div className="flex items-center justify-between mt-auto">
									<span className="text-xs text-gray-500">{post.date}</span>
									<Link
										href={`/blog/${post.id}`}
										className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors text-sm group"
									>
										Read more
										<svg
											aria-hidden="true"
											width="14"
											height="14"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="ml-1 transform group-hover:translate-x-1 transition-transform"
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
									</Link>
								</div>
							</div>
						</div>
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
