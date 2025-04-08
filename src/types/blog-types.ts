// types/blog.ts

export interface Author {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    twitter?: string;
    github?: string;
    website?: string;
  }
  
  export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    description: string;
    excerpt: string;
    date: string;
    formattedDate: string;
    readTime: string;
    category: string;
    tags: string[];
    coverImage: string;
    author: Author;
    relatedArticles: string[];
    content: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    description: string;
  }