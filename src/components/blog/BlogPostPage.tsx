import React, { useState, useEffect, useMemo } from 'react';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '../../content/blog/blogPosts';
import { BlogPost } from '../../content/blog/types';
import './BlogPostPage.css';

interface BlogPostPageProps {
  initialSlug?: string;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ initialSlug }) => {
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [openFaqIndexes, setOpenFaqIndexes] = useState<Record<number, boolean>>({});
  const [activeTocId, setActiveTocId] = useState<string>('');

  // Extract slug from prop, URL search param, or pathname
  const slug = useMemo(() => {
    if (initialSlug) return initialSlug;
    if (typeof window === 'undefined') return '';

    const urlParams = new URLSearchParams(window.location.search);
    const paramSlug = urlParams.get('slug');
    if (paramSlug) return paramSlug;

    const path = window.location.pathname;
    const match = path.match(/\/blog\/([^/?#]+)/);
    if (match && match[1]) {
      return match[1];
    }

    return '';
  }, [initialSlug]);

  const post: BlogPost | undefined = useMemo(() => {
    if (!slug) return undefined;
    return getPostBySlug(slug);
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return getRelatedPosts(post, 3);
  }, [post]);

  // Update Page Meta and Structured Data
  useEffect(() => {
    if (!post) return;

    // Document Title
    document.title = `${post.seoTitle} | Hoducation Technologies`;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', post.seoDescription);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('content', `https://hoducation.tech/blog/${post.slug}`);

    // OpenGraph Tags
    const updateOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOgTag('og:title', post.title);
    updateOgTag('og:description', post.seoDescription);
    updateOgTag('og:type', 'article');
    updateOgTag('og:url', `https://hoducation.tech/blog/${post.slug}`);
    updateOgTag('og:image', 'https://hoducation.tech/ht-logo.jpg');

    // JSON-LD Structured Data Schema (Article, BreadcrumbList, FAQPage)
    const scriptId = 'blog-post-schema-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemas: any[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.seoDescription,
        author: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Hoducation Technologies Pvt Ltd',
          url: 'https://hoducation.tech',
          logo: {
            '@type': 'ImageObject',
            url: 'https://hoducation.tech/ht-logo.jpg',
          },
        },
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://hoducation.tech/blog/${post.slug}`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://hoducation.tech/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://hoducation.tech/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://hoducation.tech/blog/${post.slug}`,
          },
        ],
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

    scriptTag.textContent = JSON.stringify(schemas);

    return () => {
      // Cleanup script on unmount
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [post]);

  // Track Reading Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, scrollPercent)));
      }

      // Track active heading for TOC
      if (post && post.tableOfContents) {
        const headings = post.tableOfContents.map((item) => document.getElementById(item.id));
        const scrollPos = window.scrollY + 140;

        for (let i = headings.length - 1; i >= 0; i--) {
          const heading = headings[i];
          if (heading && heading.offsetTop <= scrollPos) {
            setActiveTocId(post.tableOfContents[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndexes((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  if (!post) {
    return (
      <div className="post-page-root">
        <header className="contact-nav-header">
          <a href="/" className="contact-brand">
            <img src="/ht-logo.jpg" alt="Hoducation" width="34" height="34" />
            <span className="contact-brand-name">Hoducation Technologies</span>
          </a>
          <div className="contact-nav-actions">
            <a href="/blog" className="contact-back-link">
              <span>&larr; Back to Blog</span>
            </a>
          </div>
        </header>

        <main className="post-container" style={{ textAlign: 'center', padding: '120px 24px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Article Not Found</h1>
          <p style={{ color: '#94a3b8', marginBottom: '32px' }}>
            The requested article could not be located. It may have been relocated or updated.
          </p>
          <a href="/blog" className="btn-cta-primary" style={{ display: 'inline-flex' }}>
            Explore All Insights &rarr;
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="post-page-root">
      {/* Top Reading Progress Bar */}
      <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }} />

      {/* Top Ambient Glow */}
      <div className="post-ambient-glow" aria-hidden="true" />

      {/* Top Navigation */}
      <header className="contact-nav-header">
        <a href="/" className="contact-brand" aria-label="Return to Hoducation Home">
          <img src="/ht-logo.jpg" alt="Hoducation Technologies" className="contact-brand-logo" width="34" height="34" />
          <span className="contact-brand-name">Hoducation Technologies</span>
        </a>

        <div className="contact-nav-actions">
          <a href="/blog" className="contact-back-link">
            <span>&larr; All Articles</span>
          </a>
          <a href="/contact" className="contact-back-link">
            <span>Contact Us</span>
          </a>
          <a
            href="https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20have%20an%20inquiry%20regarding%20an%20article."
            target="_blank"
            rel="noopener noreferrer"
            className="contact-whatsapp-btn"
          >
            <i className="fa-brands fa-whatsapp"></i>
            <span>WhatsApp</span>
          </a>
        </div>
      </header>

      <main className="post-container">
        {/* Breadcrumb Navigation */}
        <nav className="post-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="separator">/</span>
          <a href="/blog">Blog</a>
          <span className="separator">/</span>
          <span className="current">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="post-header">
          <span className="post-category-tag">{post.category}</span>
          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta-strip">
            <div className="post-author-chip">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="post-author-avatar"
              />
              <span>{post.author.name}</span>
            </div>
            <span className="post-meta-dot">•</span>
            <span>{post.publishedAt}</span>
            <span className="post-meta-dot">•</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        {/* Executive Summary / Key Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <aside className="post-takeaways-card" aria-label="Key Takeaways">
            <h3 className="takeaways-heading">
              <i className="fa-solid fa-bolt" style={{ color: '#38bdf8' }}></i>
              Key Architectural &amp; Strategic Takeaways
            </h3>
            <ul className="takeaways-list">
              {post.keyTakeaways.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </aside>
        )}

        {/* Main Content Layout with Sticky Sidebar */}
        <div className="post-main-layout">
          {/* Sidebar TOC */}
          <aside className="post-sidebar">
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="toc-panel">
                <h4 className="toc-title">
                  <i className="fa-solid fa-list-ul"></i> Table of Contents
                </h4>
                <nav className="toc-nav">
                  {post.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`toc-link level-${item.level} ${activeTocId === item.id ? 'active' : ''}`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Sidebar Quick Action Card */}
            <div className="sidebar-cta-card">
              <h4 className="sidebar-cta-title">Need Custom Software?</h4>
              <p className="sidebar-cta-desc">
                Hoducation engineers enterprise ERPs, smart AI automations, and scalable web solutions.
              </p>
              <a href="/contact" className="sidebar-cta-btn">
                Talk to an Architect &rarr;
              </a>
            </div>
          </aside>

          {/* Article Prose Body */}
          <article className="post-prose">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* FAQ Accordion Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="post-faq-section" id="faq-section">
                <h3 className="faq-section-title">Frequently Asked Questions</h3>
                <div className="faq-accordion-group">
                  {post.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className={`faq-item ${openFaqIndexes[idx] ? 'open' : ''}`}
                    >
                      <button
                        type="button"
                        className="faq-trigger"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={Boolean(openFaqIndexes[idx])}
                      >
                        <span>{faq.question}</span>
                        <i className="fa-solid fa-chevron-down faq-icon" aria-hidden="true"></i>
                      </button>
                      {openFaqIndexes[idx] && (
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Author Bio Card */}
            <div className="post-author-card">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="author-card-avatar"
              />
              <div className="author-card-info">
                <h4>Written by {post.author.name}</h4>
                <div className="author-card-role">{post.author.role}</div>
                <p className="author-card-bio">
                  {post.author.bio ||
                    'Senior software engineer and systems architect specializing in distributed architectures, enterprise workflow automation, and educational operating systems.'}
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="post-related-section">
            <h3 className="related-heading">Related Engineering Guides</h3>
            <div className="related-grid">
              {relatedPosts.map((related) => (
                <a
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="blog-card"
                >
                  <div className="card-thumbnail-box">
                    <div className="card-grid-texture" />
                    <div className="card-center-badge-wrap">
                      <div className="card-badge-title">
                        {related.imageBadgeText || related.title.split(' ')[0]}
                      </div>
                      <span className="card-badge-sub">{related.category}</span>
                    </div>
                  </div>

                  <div className="card-info-box">
                    <div className="card-meta-row">
                      <span>{related.publishedAt}</span>
                      <span className="meta-dot">•</span>
                      <span>{related.readingTime}</span>
                    </div>
                    <h4 className="card-title">{related.title}</h4>
                    <p className="card-excerpt">{related.excerpt}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <section className="blog-cta-banner">
          <h2 className="cta-banner-title">Turn This Knowledge Into Competitive Advantage</h2>
          <p className="cta-banner-desc">
            Let our engineering team architect and build the custom software, ERP, or AI automation engine your business needs to scale effortlessly.
          </p>
          <div className="cta-banner-actions">
            <a href="/contact" className="btn-cta-primary">
              <span>Request Free Consultation</span>
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
            <a
              href="https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20am%20ready%20to%20discuss%20our%20software%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-secondary"
            >
              <i className="fa-brands fa-whatsapp"></i>
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </section>
      </main>

      {/* Global Site Footer */}
      <footer className="contact-site-footer">
        <div className="contact-footer-inner">
          <p>© 2026 Hoducation Technologies Pvt Ltd. All rights reserved.</p>
          <div className="contact-footer-links">
            <a href="/">Home</a>
            <a href="/blog">Blog &amp; Insights</a>
            <a href="/faqs">FAQs</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms &amp; Conditions</a>
            <a href="/contact">Contact</a>
            <a href="tel:+919660034117">+91 9660034117</a>
            <a href="mailto:hoducationtechnologies@gmail.com">hoducationtechnologies@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostPage;
