import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '../../content/blog/blogPosts';
import { BlogPost } from '../../content/blog/types';
import { FreehandCardMedia } from './FreehandCardMedia';
import { Loader } from '../common/Loader';
import { HeaderNavbar } from '../common/HeaderNavbar';
import { Footer } from '../common/Footer';
import './BlogIndexPage.css';
import './BlogPostPage.css';

interface BlogPostPageProps {
  initialSlug?: string;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ initialSlug }) => {
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [openFaqIndexes, setOpenFaqIndexes] = useState<Record<number, boolean>>({});
  const [activeTocId, setActiveTocId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

  // 3-Second Visual Loader Timer (Full 3D Cube Construction Cycle)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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

    // Dynamic Meta Helper
    const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Meta Keywords
    const allKeywords = [post.primaryKeyword, ...(post.secondaryKeywords || [])].join(', ');
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', allKeywords);

    // OpenGraph Tags
    const fullImageUrl = `https://hoducation.tech${post.featuredImage}`;
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', post.seoTitle || post.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', post.seoDescription);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'article');
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', `https://hoducation.tech/blog/${post.slug}`);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', fullImageUrl);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Hoducation Technologies');
    setMetaTag('meta[property="article:published_time"]', 'property', 'article:published_time', '2026-03-21T08:00:00+05:30');
    setMetaTag('meta[property="article:modified_time"]', 'property', 'article:modified_time', '2026-03-21T08:00:00+05:30');
    setMetaTag('meta[property="article:author"]', 'property', 'article:author', post.author.name);
    setMetaTag('meta[property="article:section"]', 'property', 'article:section', post.category);

    // Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', post.seoTitle || post.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', post.seoDescription);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', fullImageUrl);

    // JSON-LD Structured Data Schema (TechArticle, BreadcrumbList, FAQPage, Speakable)
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
        '@type': 'TechArticle',
        '@id': `https://hoducation.tech/blog/${post.slug}#article`,
        isPartOf: {
          '@type': 'WebPage',
          '@id': `https://hoducation.tech/blog/${post.slug}`,
          url: `https://hoducation.tech/blog/${post.slug}`,
          name: post.seoTitle || post.title,
        },
        headline: post.title,
        description: post.seoDescription,
        image: [fullImageUrl],
        datePublished: '2026-03-21T08:00:00+05:30',
        dateModified: '2026-03-21T08:00:00+05:30',
        inLanguage: 'en-US',
        mainEntityOfPage: `https://hoducation.tech/blog/${post.slug}`,
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

    scriptTag.textContent = JSON.stringify(schemas);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [post]);

  // Track Reading Scroll Progress & Active TOC Section
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, scrollPercent)));
      }

      // Track active heading for TOC
      if (post && post.tableOfContents && post.tableOfContents.length > 0) {
        const headings = post.tableOfContents
          .map((item) => document.getElementById(item.id))
          .filter((el): el is HTMLElement => el !== null);

        const scrollPos = window.scrollY + 140;

        for (let i = headings.length - 1; i >= 0; i--) {
          const heading = headings[i];
          if (heading && heading.offsetTop <= scrollPos) {
            setActiveTocId(heading.id);
            return;
          }
        }

        if (headings.length > 0 && window.scrollY < 300) {
          setActiveTocId(headings[0].id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
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

  const handleCopyLink = useCallback(() => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    setIsSubscribing(true);
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newsletterEmail.trim(),
          source: post ? `Blog Post: ${post.title}` : 'Blog Post Page'
        }),
      });
    } catch (err) {
      console.warn('Subscription dispatch error:', err);
    } finally {
      setIsSubscribing(false);
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 8000);
    }
  };

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const topOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveTocId(id);
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://hoducation.tech/blog/${post?.slug || ''}`;
  const shareText = post ? `${post.title} via Hoducation Technologies` : '';

  if (pageLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f3f2ee',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
        }}
      >
        <Loader fullscreen maskBg="#f3f2ee" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-page-root">
        <HeaderNavbar activePage="blog" />

        <main className="post-container" style={{ textAlign: 'center', padding: '180px 24px 120px' }}>
          <div className="not-found-badge">404 ARTICLE</div>
          <h1 style={{ fontFamily: 'var(--fh-font-editorial)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', margin: '16px 0' }}>
            Article Not Located
          </h1>
          <p style={{ color: '#575653', maxWidth: '520px', margin: '0 auto 32px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            The requested technical guide could not be found. It may have been updated or moved into another category.
          </p>
          <a href="/blog" className="freehand-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <span>Explore All Engineering Insights</span> &rarr;
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="post-page-root">
      {/* Top Reading Progress Bar */}
      <div
        className="reading-progress-bar"
        style={{ width: `${readingProgress}%` }}
        aria-hidden="true"
      />

      {/* Floating Pill Navbar (Matching Freehand.ai and Hoducation Home) */}
      <HeaderNavbar activePage="blog" />

      <main className="post-container">
        {/* Breadcrumb Navigation & Category Bar */}
        <div className="post-breadcrumb-bar">
          <a href="/blog" className="post-back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>All blogs</span>
          </a>
          <span className="post-breadcrumb-sep">/</span>
          <span className="freehand-category-badge">{getDisplayCategoryTag(post.category)}</span>
        </div>

        {/* Editorial Article Header (Left-Aligned, Freehand Style) */}
        <header className="post-editorial-header">
          <h1 className="post-editorial-title">{post.title}</h1>

          {post.excerpt && (
            <p className="post-editorial-lead-desc">
              {post.excerpt}
            </p>
          )}

          {/* Author, Date, Reading Time & Share Bar */}
          <div className="post-meta-action-row">
            <div className="post-author-block">
              <img
                src={post.author.avatar || '/leader-abhishek.png'}
                alt={post.author.name}
                className="post-author-avatar-img"
              />
              <div className="post-author-meta">
                <span className="post-author-name">{post.author.name}</span>
                <span className="post-author-role-sub">{post.author.role}</span>
              </div>
              <div className="post-meta-details-pill">
                <span>{post.publishedAt.toUpperCase()}</span>
                <span className="dot-sep">•</span>
                <span>{post.readingTime.toUpperCase()}</span>
                {post.updatedAt && (
                  <>
                    <span className="dot-sep">•</span>
                    <span className="updated-tag">UPDATED {post.updatedAt.toUpperCase()}</span>
                  </>
                )}
              </div>
            </div>

            {/* Quick Header Share Pill */}
            <div className="post-header-share-group">
              <span className="share-label">SHARE</span>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-icon-btn"
                title="Share on X (Twitter)"
                aria-label="Share on X"
              >
                <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-icon-btn"
                title="Share on LinkedIn"
                aria-label="Share on LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} - ${currentUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-icon-btn"
                title="Share on WhatsApp"
                aria-label="Share on WhatsApp"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="share-icon-btn copy-btn"
                title="Copy Article Link"
                aria-label="Copy Article Link"
              >
                {copiedLink ? (
                  <i className="fa-solid fa-check" style={{ color: '#10b981' }} aria-hidden="true"></i>
                ) : (
                  <i className="fa-solid fa-link" aria-hidden="true"></i>
                )}
              </button>
              {copiedLink && <span className="copied-toast-bubble">Link copied!</span>}
            </div>
          </div>
        </header>

        {/* Hero Media Card Banner */}
        <div className="post-hero-banner-frame">
          <FreehandCardMedia post={post} variant="hero" />
        </div>

        {/* 2-Column Layout: Left = Main Prose Article, Right = Sticky Sidebar */}
        <div className="post-article-layout-grid">
          {/* Main Article Prose Column */}
          <div className="post-primary-content-col">
            <article className="post-prose-card">
              {/* Key Takeaways Callout Card */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <div className="post-takeaways-callout" aria-label="Key Takeaways">
                  <div className="takeaways-header-row">
                    <span className="takeaways-star-icon">✱</span>
                    <h3 className="takeaways-title">Key Architectural &amp; Strategic Takeaways</h3>
                  </div>
                  <ul className="takeaways-points-list">
                    {post.keyTakeaways.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Semantic HTML Article Body */}
              <div
                className="post-html-body"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* FAQ Accordion Section */}
              {post.faqs && post.faqs.length > 0 && (
                <section className="post-faq-accordion-block" id="faqs">
                  <div className="faq-block-header">
                    <span className="faq-tag-pill">KNOWLEDGE BASE</span>
                    <h3 className="faq-block-title">Frequently Asked Questions</h3>
                  </div>
                  <div className="faq-accordion-items">
                    {post.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className={`faq-card-item ${openFaqIndexes[idx] ? 'is-open' : ''}`}
                      >
                        <button
                          type="button"
                          className="faq-question-btn"
                          onClick={() => toggleFaq(idx)}
                          aria-expanded={Boolean(openFaqIndexes[idx])}
                        >
                          <span className="faq-question-text">{faq.question}</span>
                          <span className="faq-chevron-icon" aria-hidden="true">
                            <i className="fa-solid fa-chevron-down"></i>
                          </span>
                        </button>
                        {openFaqIndexes[idx] && (
                          <div className="faq-answer-pane">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* End of Article Author Bio Card */}
              <div className="post-author-bio-footer">
                <img
                  src={post.author.avatar || '/leader-abhishek.png'}
                  alt={post.author.name}
                  className="author-bio-avatar"
                />
                <div className="author-bio-text">
                  <div className="author-bio-head">
                    <h4>Written by {post.author.name}</h4>
                    <span className="author-verified-badge">
                      <i className="fa-solid fa-circle-check" aria-hidden="true"></i> Verified Engineering Lead
                    </span>
                  </div>
                  <div className="author-bio-role">{post.author.role} • Hoducation Technologies</div>
                  <p className="author-bio-desc">
                    {post.author.bio ||
                      'Senior software engineer and systems architect specializing in distributed architectures, enterprise ERP automation, and institutional operating systems.'}
                  </p>
                  <div className="author-bio-actions">
                    <a href="/contact" className="author-contact-link">
                      Schedule a Consultation with {post.author.name.split(' ')[0]} &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Social Share Bar */}
              <div className="post-bottom-share-strip">
                <div className="bottom-share-prompt">
                  <strong>Found this analysis valuable?</strong> Share it with your engineering and leadership team.
                </div>
                <div className="bottom-share-buttons">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bottom-share-pill linkedin"
                  >
                    <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i> LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bottom-share-pill twitter"
                  >
                    <i className="fa-brands fa-x-twitter" aria-hidden="true"></i> X
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} - ${currentUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bottom-share-pill whatsapp"
                  >
                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="bottom-share-pill copy"
                  >
                    {copiedLink ? (
                      <>
                        <i className="fa-solid fa-check" style={{ color: '#10b981' }} aria-hidden="true"></i> Copied!
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-link" aria-hidden="true"></i> Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <aside className="post-sticky-sidebar-col">
            {/* Table of Contents Card */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="sidebar-card toc-card">
                <div className="sidebar-card-header">
                  <span className="toc-dot-indicator"></span>
                  <span className="sidebar-card-title">ON THIS PAGE</span>
                </div>
                <nav className="sidebar-toc-nav" aria-label="Table of contents">
                  {post.tableOfContents.map((item) => {
                    const isActive = activeTocId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleTocClick(e, item.id)}
                        className={`sidebar-toc-link level-${item.level} ${isActive ? 'is-active' : ''}`}
                      >
                        <span className="toc-link-text">{item.title}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Quick Facts & Metadata Card */}
            <div className="sidebar-card metadata-card">
              <span className="sidebar-card-title">ARTICLE DETAILS</span>
              <div className="sidebar-meta-list">
                <div className="sidebar-meta-item">
                  <span className="meta-item-label">Category</span>
                  <span className="meta-item-value">{post.category}</span>
                </div>
                <div className="sidebar-meta-item">
                  <span className="meta-item-label">Published</span>
                  <span className="meta-item-value">{post.publishedAt}</span>
                </div>
                <div className="sidebar-meta-item">
                  <span className="meta-item-label">Read Time</span>
                  <span className="meta-item-value">{post.readingTime}</span>
                </div>
                <div className="sidebar-meta-item">
                  <span className="meta-item-label">Audience</span>
                  <span className="meta-item-value">Founders &amp; Tech Leads</span>
                </div>
              </div>
            </div>

            {/* Related Hoducation Capabilities */}
            {post.relatedServices && post.relatedServices.length > 0 && (
              <div className="sidebar-card services-card">
                <span className="sidebar-card-title">RELATED SOLUTIONS</span>
                <div className="sidebar-services-list">
                  {post.relatedServices.map((svc, sIdx) => (
                    <a key={sIdx} href={svc.href} className="sidebar-service-item">
                      <div className="service-item-name">
                        <span>{svc.name}</span>
                        <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                      </div>
                      <p className="service-item-desc">{svc.desc}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* High-Conversion Consultation CTA Card */}
            <div className="sidebar-card cta-banner-card">
              <span className="cta-card-badge">ENGINEERING CALL</span>
              <h4 className="cta-card-title">Need Custom Software in 2026?</h4>
              <p className="cta-card-desc">
                Hoducation builds bespoke ERPs, intelligent automations, and scalable cloud applications with 100% intellectual property ownership.
              </p>
              <div className="cta-card-buttons">
                <a href="/contact" className="cta-primary-action-btn">
                  Talk to an Architect &rarr;
                </a>
                <a
                  href="https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20would%20like%20to%20consult%20about%20custom%20software."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-whatsapp-action-btn"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp Chat
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Newsletter Subscription Banner ("Stay close to our work.") */}
        <section className="freehand-cta-section post-newsletter-section">
          <div className="freehand-cta-box">
            <div className="freehand-cta-info">
              <h2 className="freehand-cta-title">
                Stay close to <span className="freehand-orange-text">our work.</span>
              </h2>
              <p className="freehand-cta-desc">
                Receive monthly architectural breakdowns, engineering post-mortems, and enterprise tech insights directly to your inbox.
              </p>
            </div>
            <div className="freehand-cta-form-area">
              {newsletterSubscribed ? (
                <div className="newsletter-success-notice">
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i> Thank you! You are now subscribed to Hoducation Engineering Insights.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="freehand-cta-form">
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="freehand-cta-input"
                  />
                  <button type="submit" className="freehand-cta-btn" disabled={isSubscribing}>
                    {isSubscribing ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                  </button>
                </form>
              )}
              <span className="freehand-cta-microcopy">
                Zero spam. Curated engineering breakdowns only. Unsubscribe at any time.
              </span>
            </div>
          </div>
        </section>

        {/* Related Articles Section (Matching Freehand 3-Column Card Grid) */}
        {relatedPosts.length > 0 && (
          <section className="post-related-section">
            <div className="related-section-header">
              <div className="related-header-left">
                <span className="related-kicker-tag">ARCHITECTURAL PLAYBOOKS</span>
                <h3 className="related-heading">More Related Engineering Guides</h3>
              </div>
              <a href="/blog" className="related-view-all-link">
                View all articles &rarr;
              </a>
            </div>

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
      </main>

      {/* Universal Homepage-Style Footer */}
      <Footer />
    </div>
  );
};

export default BlogPostPage;
