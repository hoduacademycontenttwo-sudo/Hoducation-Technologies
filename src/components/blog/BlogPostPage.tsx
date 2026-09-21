import React, { useState, useEffect, useMemo } from 'react';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '../../content/blog/blogPosts';
import { BlogPost } from '../../content/blog/types';
import { FreehandCardMedia } from './FreehandCardMedia';
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
        image: ['https://hoducation.tech/ht-logo.jpg'],
        datePublished: '2026-03-21T08:00:00+05:30',
        dateModified: '2026-03-21T08:00:00+05:30',
        author: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Hoducation Technologies Pvt Ltd',
          logo: {
            '@type': 'ImageObject',
            url: 'https://hoducation.tech/ht-logo.jpg',
          },
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

  const getDisplayCategoryTag = (category: string) => {
    if (category.includes('Custom')) return 'CUSTOM SOFTWARE';
    if (category.includes('AI')) return 'AI SYSTEMS';
    if (category.includes('CRM') || category.includes('ERP')) return 'ENTERPRISE';
    if (category.includes('EdTech')) return 'EDTECH';
    if (category.includes('Web')) return 'ENGINEERING';
    return 'PRODUCT';
  };

  if (!post) {
    return (
      <div className="post-page-root">
        <header className="freehand-nav-wrapper">
          <nav className="freehand-pill-navbar" aria-label="Main Navigation">
            <a href="/" className="freehand-nav-brand">
              <img src="/ht-logo.jpg" alt="Hoducation Technologies" className="freehand-nav-logo" />
              <span className="freehand-nav-brand-text">Hoducation Technologies</span>
            </a>
            <div className="freehand-nav-links">
              <a href="/blog" className="freehand-nav-link active">All Blogs</a>
            </div>
            <a href="/contact" className="freehand-nav-demo-btn">
              <span>REQUEST A DEMO</span>
            </a>
          </nav>
        </header>

        <main className="post-container" style={{ textAlign: 'center', padding: '160px 24px 100px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Article Not Found</h1>
          <p style={{ color: '#575653', marginBottom: '32px' }}>
            The requested article could not be located. It may have been relocated or updated.
          </p>
          <a href="/blog" className="freehand-nav-demo-btn" style={{ display: 'inline-flex' }}>
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

      {/* Floating Pill Navbar */}
      <header className="freehand-nav-wrapper">
        <nav className="freehand-pill-navbar" aria-label="Main Navigation">
          <a href="/" className="freehand-nav-brand">
            <img src="/ht-logo.jpg" alt="Hoducation Technologies" className="freehand-nav-logo" />
            <span className="freehand-nav-brand-text">Hoducation Technologies</span>
          </a>

          <div className="freehand-nav-links">
            <a href="/#services" className="freehand-nav-link">Services</a>
            <a href="/#process" className="freehand-nav-link">Process</a>
            <a href="/#products" className="freehand-nav-link">Products</a>
            <a href="/#about" className="freehand-nav-link">About Us</a>
            <a href="/blog" className="freehand-nav-link active">Blog</a>
            <a href="/contact" className="freehand-nav-link">Contact</a>
          </div>

          <a href="/contact" className="freehand-nav-demo-btn">
            <span>REQUEST A DEMO</span>
          </a>
        </nav>
      </header>

      <main className="post-container">
        {/* Breadcrumb Navigation */}
        <nav className="post-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="separator">/</span>
          <a href="/blog">All Blogs</a>
          <span className="separator">/</span>
          <span className="current">{post.category}</span>
        </nav>

        {/* Article Header */}
        <header className="post-header">
          <div className="post-header-tag-wrap">
            <span className="freehand-category-badge">{getDisplayCategoryTag(post.category)}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta-strip">
            <div className="post-author-chip">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="post-author-avatar"
              />
              <span>{post.author.name.toUpperCase()}</span>
            </div>
            <span className="post-meta-dot">•</span>
            <span>{post.publishedAt.toUpperCase()}</span>
            <span className="post-meta-dot">•</span>
            <span>{post.readingTime.toUpperCase()}</span>
          </div>
        </header>

        {/* Hero Visual Card Banner */}
        <div className="post-hero-media-wrapper">
          <FreehandCardMedia post={post} variant="hero" />
        </div>

        {/* Executive Summary / Key Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <aside className="post-takeaways-card" aria-label="Key Takeaways">
            <h3 className="takeaways-heading">
              <span className="takeaways-icon">✱</span>
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
                <h4 className="toc-title">TABLE OF CONTENTS</h4>
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
                Hoducation engineers enterprise ERPs, smart AI automations, and scalable software solutions.
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

        {/* Related Articles Section (Matching Freehand Card Grid) */}
        {relatedPosts.length > 0 && (
          <section className="post-related-section">
            <h3 className="related-heading">Related Engineering Guides</h3>
            <div className="freehand-cards-grid">
              {relatedPosts.map((related) => (
                <a
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="freehand-card"
                >
                  <div className="freehand-card-media-wrap">
                    <FreehandCardMedia post={related} variant="grid" />
                  </div>

                  <div className="freehand-card-content">
                    <div className="freehand-card-meta-row">
                      <span className="freehand-meta-date">{related.publishedAt.toUpperCase()}</span>
                      <span className="freehand-meta-sep">•</span>
                      <span className="freehand-meta-author">{related.author.name.toUpperCase()}</span>
                    </div>

                    <h4 className="freehand-card-title">{related.title}</h4>

                    <div className="freehand-card-footer">
                      <span className="freehand-category-badge">
                        {getDisplayCategoryTag(related.category)}
                      </span>
                      <span className="freehand-arrow-icon" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <section className="freehand-cta-section" style={{ marginTop: '60px' }}>
          <div className="freehand-cta-box">
            <div className="freehand-cta-info">
              <h2 className="freehand-cta-title">
                Ready to architect <span className="freehand-orange-text">your solution?</span>
              </h2>
              <p className="freehand-cta-desc">
                Hoducation engineers enterprise ERPs, intelligent automations, and custom web applications that scale effortlessly.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="/contact" className="freehand-cta-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                Schedule Consultation
              </a>
              <a
                href="https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20am%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="freehand-nav-demo-btn"
                style={{ background: '#25d366', color: '#ffffff', textDecoration: 'none' }}
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Global Site Footer */}
      <footer className="freehand-site-footer">
        <div className="freehand-container">
          <div className="freehand-footer-top">
            <div className="freehand-footer-brand">
              <a href="/" className="footer-brand-title">HODUCATION</a>
              <p className="footer-brand-desc">
                Engineering bespoke software, institutional ERPs, and automated workflows for mission-critical operations.
              </p>
            </div>

            <div className="freehand-footer-links-grid">
              <div className="footer-links-col">
                <span className="footer-col-title">COMPANY</span>
                <a href="/#about">About Us</a>
                <a href="/#services">Services</a>
                <a href="/#products">Products</a>
                <a href="/contact">Careers</a>
              </div>
              <div className="footer-links-col">
                <span className="footer-col-title">RESOURCES</span>
                <a href="/blog">All Blogs</a>
                <a href="/faqs">FAQs</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms &amp; Conditions</a>
              </div>
              <div className="footer-links-col">
                <span className="footer-col-title">CONNECT</span>
                <a href="tel:+919660034117">+91 9660034117</a>
                <a href="mailto:hoducationtechnologies@gmail.com">hoducationtechnologies@gmail.com</a>
                <a href="https://wa.me/919660034117" target="_blank" rel="noopener noreferrer">WhatsApp Chat</a>
              </div>
            </div>
          </div>

          <div className="freehand-footer-bottom">
            <p>© 2026 Hoducation Technologies Pvt Ltd. All rights reserved.</p>
            <div className="footer-meta-pill">Made with precision in Jaipur, India</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostPage;
