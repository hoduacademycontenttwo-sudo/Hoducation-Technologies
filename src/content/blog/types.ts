export type BlogCategory =
  | 'All'
  | 'AI & Automation'
  | 'Custom Software'
  | 'CRM & ERP'
  | 'EdTech & School Tech'
  | 'Web Development'
  | 'Business Technology';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number; // 2 for h2, 3 for h3
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedService {
  name: string;
  href: string;
  desc: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<BlogCategory, 'All'>;
  author: Author;
  publishedAt: string; // e.g. "21 Mar 2026"
  updatedAt: string;
  readingTime: string; // e.g. "8 min read"
  featuredImage: string;
  imageBadgeText?: string;
  imageBadgeStyle?: 'code' | 'roundup' | 'gradient' | 'minimal' | 'stats';
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  tableOfContents: TableOfContentsItem[];
  content: string; // Semantic HTML formatted content
  faqs?: FAQItem[];
  keyTakeaways: string[];
  relatedServices: RelatedService[];
  relatedSlugs: string[];
  isFeatured?: boolean;
}
