import React, { useState, useMemo } from 'react';
import { BLOG_POSTS, BLOG_CATEGORIES, getFeaturedPost } from '../../content/blog/blogPosts';
import { BlogCategory, BlogPost } from '../../content/blog/types';
import { FreehandCardMedia } from './FreehandCardMedia';
import { Loader } from '../common/Loader';
import './BlogIndexPage.css';

export const BlogIndexPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  // Primary featured post for hero left side
  const featuredPost = useMemo(() => getFeaturedPost(), []);

  // 3 secondary featured posts for hero right stack
  const secondaryFeaturedPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => post.slug !== featuredPost.slug).slice(0, 3);
  }, [featuredPost]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.primaryKeyword.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category: BlogCategory) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsLoading(false), 150);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  // Convert category string to clean uppercase pill tag matching reference
  const getDisplayCategoryTag = (category: string) => {
    if (category.includes('Custom')) return 'CUSTOM SOFTWARE';
    if (category.includes('AI')) return 'AI SYSTEMS';
    if (category.includes('CRM') || category.includes('ERP')) return 'ENTERPRISE';
    if (category.includes('EdTech')) return 'EDTECH';
    if (category.includes('Web')) return 'ENGINEERING';
    return 'PRODUCT';
  };

  return (
    <div className="freehand-blog-root">
      {/* Top Floating Pill Navbar (Matching User Reference media_1789983701283.png) */}
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
            <a href="/#testimonials" className="freehand-nav-link">Clients</a>
            <a href="/#about" className="freehand-nav-link">About Us</a>
            <a href="/blog" className="freehand-nav-link active">Blog</a>
            <a href="/contact" className="freehand-nav-link">Contact</a>
          </div>

          <a href="/contact" className="freehand-nav-demo-btn">
            <span>REQUEST A DEMO</span>
          </a>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="freehand-main-wrapper">
        {/* ========================================================= */}
        {/* HERO SECTION: "Featured Blogs" (Exact Freehand Layout)    */}
        {/* ========================================================= */}
        <section className="freehand-hero-section">
          <div className="freehand-container">
            <div className="freehand-section-title-wrap">
              <h1 className="freehand-hero-heading">Featured Blogs</h1>
            </div>

            <div className="freehand-hero-split-grid">
              {/* Left Column: Primary Big Featured Card */}
              {featuredPost && (
                <div className="freehand-hero-primary-col">
                  <a
                    href={`/blog/${featuredPost.slug}`}
                    className="freehand-hero-primary-card"
                    id={`hero-featured-${featuredPost.slug}`}
                  >
                    <div className="freehand-hero-media-wrapper">
                      <FreehandCardMedia post={featuredPost} variant="hero" />
                    </div>

                    <div className="freehand-hero-primary-content">
                      <h2 className="freehand-hero-primary-title">
                        {featuredPost.title}
                      </h2>

                      <div className="freehand-hero-meta-row">
                        <span className="freehand-meta-date">
                          {featuredPost.publishedAt.toUpperCase()}
                        </span>
                        <span className="freehand-meta-sep">•</span>
                        <span className="freehand-meta-time">
                          {featuredPost.readingTime.toUpperCase()}
                        </span>
                      </div>

                      <div className="freehand-hero-card-footer">
                        <span className="freehand-category-badge">
                          {getDisplayCategoryTag(featuredPost.category)}
                        </span>
                        <span className="freehand-arrow-icon" aria-hidden="true">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              )}

              {/* Right Column: Stacked Secondary Cards */}
              <div className="freehand-hero-secondary-col">
                {secondaryFeaturedPosts.map((post) => (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="freehand-hero-secondary-card"
                    id={`hero-secondary-${post.slug}`}
                  >
                    <div className="freehand-secondary-media-wrapper">
                      <FreehandCardMedia post={post} variant="hero-secondary" />
                    </div>

                    <div className="freehand-secondary-content">
                      <h3 className="freehand-secondary-title">{post.title}</h3>

                      <div className="freehand-secondary-meta-row">
                        <span className="freehand-meta-date">
                          {post.publishedAt.toUpperCase()}
                        </span>
                        <span className="freehand-meta-sep">•</span>
                        <span className="freehand-meta-author">
                          {post.author.name.toUpperCase()}
                        </span>
                      </div>

                      <div className="freehand-secondary-card-footer">
                        <span className="freehand-category-badge">
                          {getDisplayCategoryTag(post.category)}
                        </span>
                        <span className="freehand-arrow-icon" aria-hidden="true">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* NEWSLETTER BANNER: "Stay close to our work."             */}
        {/* ========================================================= */}
        <section className="freehand-cta-section">
          <div className="freehand-container">
            <div className="freehand-cta-box">
              <div className="freehand-cta-info">
                <h2 className="freehand-cta-title">
                  Stay close to <span className="freehand-orange-text">our work.</span>
                </h2>
                <p className="freehand-cta-desc">
                  Company insights, technical blueprints, and enterprise case studies — delivered straight to your inbox.
                </p>
              </div>

              <div className="freehand-cta-form-area">
                {subscribed ? (
                  <div className="freehand-cta-success">
                    <span className="success-icon">✓</span>
                    <span>Thank you for subscribing! You're on the list.</span>
                  </div>
                ) : (
                  <form className="freehand-cta-form" onSubmit={handleNewsletterSubmit}>
                    <input
                      type="email"
                      className="freehand-cta-input"
                      placeholder="Enter your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className="freehand-cta-btn">
                      Submit
                    </button>
                  </form>
                )}
                <div className="freehand-cta-microcopy">
                  By subscribing you agree to our <a href="/privacy">Privacy Policy</a>.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* "ALL BLOGS" SECTION: Reference media_1789983787713.png     */}
        {/* ========================================================= */}
        <section className="freehand-listing-section">
          <div className="freehand-container">
            {/* Header & Search Bar Row */}
            <div className="freehand-listing-header">
              <h2 className="freehand-all-blogs-title">ALL BLOGS</h2>

              <div className="freehand-search-box">
                <svg
                  className="freehand-search-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  className="freehand-search-input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search all blogs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="freehand-search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="freehand-categories-bar" role="tablist" aria-label="Blog categories">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`freehand-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Loading Indicator */}
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
                <Loader size={60} />
              </div>
            ) : (
              <>
                {/* 3-Column Card Grid (Matching media_1789983787713.png) */}
                {filteredPosts.length > 0 ? (
                  <div className="freehand-cards-grid">
                    {filteredPosts.map((post) => (
                      <a
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="freehand-card"
                        id={`post-card-${post.slug}`}
                      >
                        {/* Branded Graphical Card Media Box */}
                        <div className="freehand-card-media-wrap">
                          <FreehandCardMedia post={post} variant="grid" />
                        </div>

                        {/* Card Content Information */}
                        <div className="freehand-card-content">
                          <div className="freehand-card-meta-row">
                            <span className="freehand-meta-date">
                              {post.publishedAt.toUpperCase()}
                            </span>
                            <span className="freehand-meta-sep">•</span>
                            <span className="freehand-meta-author">
                              {post.author.name.toUpperCase()}
                            </span>
                          </div>

                          <h3 className="freehand-card-title">{post.title}</h3>

                          <div className="freehand-card-footer">
                            <span className="freehand-category-badge">
                              {getDisplayCategoryTag(post.category)}
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
                ) : (
                  <div className="freehand-empty-state">
                    <h3 className="empty-title">No articles found</h3>
                    <p className="empty-desc">
                      No results matched "{searchQuery}". Try searching for terms like "ERP", "AI", "Custom Software", or "Costs".
                    </p>
                    <button
                      type="button"
                      className="empty-reset-btn"
                      onClick={() => {
                        setSelectedCategory('All');
                        setSearchQuery('');
                      }}
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      {/* Global Minimalist Footer */}
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

export default BlogIndexPage;
