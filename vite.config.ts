import path from 'node:path';
import fs from 'node:fs';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { BLOG_POSTS } from './src/content/blog/blogPosts';

function blogSeoPrerenderPlugin(): Plugin {
  return {
    name: 'blog-seo-prerender',
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, 'dist');
      const blogPostHtmlPath = path.join(distDir, 'blog-post.html');
      if (!fs.existsSync(blogPostHtmlPath)) return;

      const baseHtml = fs.readFileSync(blogPostHtmlPath, 'utf8');

      // Create dist/blog directory if not exists
      const distBlogDir = path.join(distDir, 'blog');
      if (!fs.existsSync(distBlogDir)) {
        fs.mkdirSync(distBlogDir, { recursive: true });
      }

      BLOG_POSTS.forEach((post) => {
        const fullImageUrl = `https://hoducation.tech${post.featuredImage}`;
        const canonicalUrl = `https://hoducation.tech/blog/${post.slug}`;
        const allKeywords = [post.primaryKeyword, ...(post.secondaryKeywords || [])].join(', ');

        const schemas = [
          {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            '@id': `${canonicalUrl}#article`,
            isPartOf: {
              '@type': 'WebPage',
              '@id': canonicalUrl,
              url: canonicalUrl,
              name: post.seoTitle || post.title,
            },
            headline: post.title,
            description: post.seoDescription,
            image: [fullImageUrl],
            datePublished: '2026-03-21T08:00:00+05:30',
            dateModified: '2026-03-21T08:00:00+05:30',
            inLanguage: 'en-US',
            mainEntityOfPage: canonicalUrl,
            author: {
              '@type': 'Person',
              name: post.author.name,
              jobTitle: post.author.role,
              url: 'https://hoducation.tech/#about',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Hoducation Technologies Pvt Ltd',
              url: 'https://hoducation.tech/',
              logo: {
                '@type': 'ImageObject',
                url: 'https://hoducation.tech/ht-logo.jpg',
              },
            },
            keywords: allKeywords,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hoducation.tech/' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://hoducation.tech/blog' },
              { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'SpeakableSpecification',
            cssSelector: ['.post-editorial-title', '.post-editorial-lead-desc', '.post-takeaways-callout'],
          },
        ];

        if (post.faqs && post.faqs.length > 0) {
          schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          });
        }

        const pageTitle = post.seoTitle
          ? (post.seoTitle.toLowerCase().includes('hoducation') ? post.seoTitle : `${post.seoTitle} | Hoducation Technologies`)
          : `${post.title} | Hoducation Technologies`;

        const pageDesc = (post.seoDescription || post.excerpt).replace(/"/g, '&quot;');

        const headMetaTags = `
    <title>${pageTitle}</title>
    <meta name="description" content="${pageDesc}" />
    <meta name="keywords" content="${allKeywords.replace(/"/g, '&quot;')}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph Meta -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${pageTitle.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${pageDesc}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${fullImageUrl}" />
    <meta property="og:site_name" content="Hoducation Technologies" />
    <meta property="article:published_time" content="2026-03-21T08:00:00+05:30" />
    <meta property="article:modified_time" content="2026-03-21T08:00:00+05:30" />
    <meta property="article:author" content="${post.author.name}" />
    <meta property="article:section" content="${post.category}" />

    <!-- Twitter Card Meta -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${pageDesc}" />
    <meta name="twitter:image" content="${fullImageUrl}" />

    <!-- Structured Data Multi-Schema -->
    <script type="application/ld+json">
${JSON.stringify(schemas, null, 2)}
    </script>
`;

        // Pre-rendered semantic content for search crawlers (Googlebot, Bing, Perplexity, GPTBot)
        const preRenderedBody = `
    <div id="blog-post-root">
      <article class="post-seo-prerender" style="max-width: 1200px; margin: 0 auto; padding: 120px 24px 60px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <nav aria-label="Breadcrumb" style="font-size: 14px; margin-bottom: 20px; color: #666;">
          <a href="/" style="color: #666; text-decoration: none;">Home</a> / 
          <a href="/blog" style="color: #666; text-decoration: none;">Blog</a> / 
          <span style="color: #111; font-weight: 600;">${post.title}</span>
        </nav>
        <header style="margin-bottom: 30px;">
          <span style="display: inline-block; background: #fde8d7; color: #8b3214; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 12px;">${post.category}</span>
          <h1 class="post-editorial-title" style="font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 800; line-height: 1.2; margin: 0 0 16px; color: #111;">${post.title}</h1>
          <p class="post-editorial-lead-desc" style="font-size: 1.15rem; color: #555; line-height: 1.6; margin: 0 0 20px;">${post.excerpt}</p>
          <div style="font-size: 14px; color: #777;">
            By <strong>${post.author.name}</strong> (${post.author.role}) • Published on ${post.publishedAt} • ${post.readingTime}
          </div>
        </header>
        <div style="margin-bottom: 40px; border-radius: 14px; overflow: hidden; aspect-ratio: 16/9; max-height: 520px; background: #111;">
          <img src="${post.featuredImage}" alt="${post.title}" width="1200" height="675" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        ${post.keyTakeaways && post.keyTakeaways.length > 0 ? `
        <div class="post-takeaways-callout" style="background: #f8fafc; border-left: 4px solid #fe6200; padding: 20px 24px; border-radius: 8px; margin-bottom: 40px;">
          <h3 style="margin-top: 0; font-size: 1.1rem; color: #111;">Key Takeaways</h3>
          <ul style="margin: 0; padding-left: 20px; color: #333; line-height: 1.7;">
            ${post.keyTakeaways.map((k) => `<li>${k}</li>`).join('')}
          </ul>
        </div>` : ''}
        <div class="post-content-body" style="font-size: 1.1rem; line-height: 1.8; color: #222;">
          ${post.content}
        </div>
        ${post.faqs && post.faqs.length > 0 ? `
        <section style="margin-top: 60px; padding-top: 40px; border-top: 1px solid #e5e7eb;">
          <h2 style="font-size: 1.8rem; margin-bottom: 24px;">Frequently Asked Questions</h2>
          ${post.faqs.map((f) => `
            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 1.2rem; color: #111; margin-bottom: 8px;">${f.question}</h3>
              <p style="color: #444; line-height: 1.7;">${f.answer}</p>
            </div>
          `).join('')}
        </section>` : ''}
      </article>
    </div>
`;

        // Inject into base HTML
        let finalHtml = baseHtml;

        // Clean out default fallback meta tags from base template
        finalHtml = finalHtml.replace(/<title>[\s\S]*?<\/title>/i, '');
        finalHtml = finalHtml.replace(/<meta\s+name="description"[\s\S]*?>/gi, '');
        finalHtml = finalHtml.replace(/<!-- Open Graph Default Fallbacks[\s\S]*?-->/gi, '');
        finalHtml = finalHtml.replace(/<meta\s+property="og:[^>]*>/gi, '');

        // Inject new SEO meta tags and multi-schema into <head>
        finalHtml = finalHtml.replace(/<\/head>/i, `${headMetaTags}\n</head>`);

        // Replace loader inside #blog-post-root with semantic pre-rendered HTML
        finalHtml = finalHtml.replace(/<div id="blog-post-root">[\s\S]*?<\/body>/i, `${preRenderedBody.trim()}\n  </body>`);

        // Write to dist/blog/${slug}.html
        fs.writeFileSync(path.join(distBlogDir, `${post.slug}.html`), finalHtml, 'utf8');

        // Write to dist/blog/${slug}/index.html (for directory URLs)
        const slugDir = path.join(distBlogDir, post.slug);
        if (!fs.existsSync(slugDir)) {
          fs.mkdirSync(slugDir, { recursive: true });
        }
        fs.writeFileSync(path.join(slugDir, 'index.html'), finalHtml, 'utf8');

        // Write alias static files if applicable
        const SLUG_ALIASES: Record<string, string> = {
          'modern-school-erp-features': 'what-should-a-modern-school-erp-include',
          'business-processes-automate-with-ai': '10-business-processes-you-can-automate-with-ai',
          'signs-outgrown-excel-spreadsheets': '7-signs-your-business-has-outgrown-excel-spreadsheets',
          'crm-automation-sales-follow-ups': 'how-crm-automation-can-improve-sales-follow-ups',
          'website-crm-lead-machine': 'website-crm-integration-lead-machine',
          'ai-automation-transforming-business-2026': 'how-ai-automation-is-transforming-modern-businesses-in-2026',
        };

        Object.entries(SLUG_ALIASES).forEach(([aliasSlug, targetSlug]) => {
          if (targetSlug === post.slug) {
            fs.writeFileSync(path.join(distBlogDir, `${aliasSlug}.html`), finalHtml, 'utf8');
            const aliasDir = path.join(distBlogDir, aliasSlug);
            if (!fs.existsSync(aliasDir)) {
              fs.mkdirSync(aliasDir, { recursive: true });
            }
            fs.writeFileSync(path.join(aliasDir, 'index.html'), finalHtml, 'utf8');
          }
        });
      });

      console.log(`[SEO] Successfully generated pre-rendered static HTML for all ${BLOG_POSTS.length} blog posts and aliases!`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), blogSeoPrerenderPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        contact: path.resolve(import.meta.dirname, 'contact.html'),
        privacy: path.resolve(import.meta.dirname, 'privacy.html'),
        terms: path.resolve(import.meta.dirname, 'terms.html'),
        faqs: path.resolve(import.meta.dirname, 'faqs.html'),
        blog: path.resolve(import.meta.dirname, 'blog.html'),
        blogPost: path.resolve(import.meta.dirname, 'blog-post.html'),
      },
    },
  },
});
