// utils/blog.ts
import blogData from '@/lib/blogs.json';
import type { BlogPost, Author } from '@/types/blog-types';

// Get all blog posts
export function getAllBlogs(): BlogPost[] {
  return blogData.blogPosts;
}

// Get blog post by ID
export function getBlogById(id: string): BlogPost | undefined {
  return blogData.blogPosts.find(post => post.id === id);
}

// Get blog post by slug
export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogData.blogPosts.find(post => post.slug === slug);
}

// Get all authors (extract unique authors from blog posts)
export function getAllAuthors(): Author[] {
  const authorsMap = new Map<string, Author>();
  
  for (const post of blogData.blogPosts) {
    if (!authorsMap.has(post.author.id)) {
      authorsMap.set(post.author.id, post.author);
    }
  };
  
  return Array.from(authorsMap.values());
}

// Get author by ID
export function getAuthorById(id: string): Author | undefined {
  return getAllAuthors().find(author => author.id === id);
}

// Get all categories (extract unique categories from blog posts)
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  
  for (const post of blogData.blogPosts) {
    categories.add(post.category);
  }
  
  return Array.from(categories);
}

// Get blogs by category
export function getBlogsByCategory(categoryName: string): BlogPost[] {
  return blogData.blogPosts.filter(post => post.category === categoryName);
}

// Get blogs by tag
export function getBlogsByTag(tag: string): BlogPost[] {
  return blogData.blogPosts.filter(post => post.tags.includes(tag));
}

// Get blogs by author
export function getBlogsByAuthor(authorId: string): BlogPost[] {
  return blogData.blogPosts.filter(post => post.author.id === authorId);
}

// Get related blogs for a specific blog post
export function getRelatedBlogs(postId: string): BlogPost[] {
  const post = getBlogById(postId);
  if (!post) return [];
  
  return post.relatedArticles
    .map(id => getBlogById(id))
    .filter((post): post is BlogPost => !!post);
}

// Sort blogs by date (newest first)
export function sortBlogsByDate(blogs: BlogPost[]): BlogPost[] {
  return [...blogs].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}