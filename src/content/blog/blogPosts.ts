import { BlogPost, BlogCategory } from './types';
import { postCustomSoftwareVsReadyMade } from './posts/custom-software-vs-ready-made';
import { postCustomSoftwareCostIndia } from './posts/custom-software-development-cost-india';
import { postCrmVsErpDifference } from './posts/crm-vs-erp-difference';
import { postBusinessProcessesAutomateWithAi } from './posts/business-processes-automate-with-ai';
import { postAiAgentsVsTraditionalAutomation } from './posts/ai-agents-vs-traditional-automation';
import { postModernSchoolErpFeatures } from './posts/modern-school-erp-features';
import { postSignsOutgrownExcelSpreadsheets } from './posts/signs-outgrown-excel-spreadsheets';
import { postCrmAutomationSalesFollowUps } from './posts/crm-automation-sales-follow-ups';
import { postWebsiteCrmLeadMachine } from './posts/website-crm-lead-machine';
import { postAiAutomationTransformingBusiness2026 } from './posts/ai-automation-transforming-business-2026';

export const BLOG_POSTS: BlogPost[] = [
  postCustomSoftwareVsReadyMade,
  postCustomSoftwareCostIndia,
  postCrmVsErpDifference,
  postBusinessProcessesAutomateWithAi,
  postAiAgentsVsTraditionalAutomation,
  postModernSchoolErpFeatures,
  postSignsOutgrownExcelSpreadsheets,
  postCrmAutomationSalesFollowUps,
  postWebsiteCrmLeadMachine,
  postAiAutomationTransformingBusiness2026,
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  'All',
  'AI & Automation',
  'Custom Software',
  'CRM & ERP',
  'EdTech & School Tech',
  'Web Development',
  'Business Technology',
];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getFeaturedPost(): BlogPost {
  return BLOG_POSTS.find((post) => post.isFeatured) || BLOG_POSTS[0];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const normalized = slug.trim().toLowerCase().replace(/^\/blog\//, '').replace(/\/$/, '');
  return BLOG_POSTS.find((post) => post.slug === normalized);
}

export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
  // First prioritize explicitly related slugs
  if (currentPost.relatedSlugs && currentPost.relatedSlugs.length > 0) {
    const explicitRelated = currentPost.relatedSlugs
      .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
      .filter((p): p is BlogPost => Boolean(p));
    if (explicitRelated.length >= limit) {
      return explicitRelated.slice(0, limit);
    }
  }

  // Fallback to same category
  return BLOG_POSTS.filter(
    (post) => post.slug !== currentPost.slug && post.category === currentPost.category
  ).slice(0, limit);
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}
