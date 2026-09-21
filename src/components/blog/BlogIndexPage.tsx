import React, { useState, useMemo } from 'react';
import { BLOG_POSTS, BLOG_CATEGORIES, getFeaturedPost } from '../../content/blog/blogPosts';
import { BlogCategory, BlogPost } from '../../content/blog/types';
import { Loader } from '../common/Loader';
import './BlogIndexPage.css';

export const BlogIndexPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const featuredPost = useMemo(() => getFeaturedPost(), []);

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
        post.primaryKeyword.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category: BlogCategory) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsLoading(false), 200);
  };

  return (
    <div className="blog-page-root">
      {/* Top Ambient Glow */}
      <div className="blog-ambient-glow-top" aria-hidden="true" />

      {/* Global Header / Nav */}
      <header className="contact-nav-header">
        <a href="/" className="contact-brand" aria-label="Hoducation Home">
          <img src="/ht-logo.jpg" alt="Hoducation Technologies" className="contact-brand-logo" width="34" height="34" />
          <span className="contact-brand-name">Hoducation Technologies</span>
        </a>

        <div className="contact-nav-actions">
          <a href="/" className="contact-back-link">
            <span>Home</span>
          </a>
          <a href="/faqs" className="contact-back-link">
            <span>FAQs</span>
          </a>
          <a href="/contact" className="contact-back-link">
            <span>Contact</span>
          </a>
          <a
            href="https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20am%20interested%20in%20your%20software%20solutions."
            target="_blank"
            rel="noopener noreferrer"
            className="contact-whatsapp-btn"
          >
            <i className="fa-brands fa-whatsapp"></i>
            <span>WhatsApp Chat</span>
          </a>
        </div>
      </header>

      {/* Main Blog Container */}
      <main className="blog-container">
        {/* Hero Section */}
        <section className="blog-hero">
          <div className="blog-eyebrow">
            <span>Engineering Insights &amp; Strategy</span>
          </div>
          <h1 className="blog-hero-title">
            <span className="blog-title-gradient">Insights, Systems &amp; Technology</span>
          </h1>
          <p className="blog-hero-desc">
            Deep technical guides, architectural breakdowns, and strategic playbooks on custom software development, AI automation, ERP systems, and modern digital infrastructure.
          </p>
        </section>

        {/* Search & Category Filter Controls */}
        <section className="blog-controls-wrap" aria-label="Search and category filters">
          <div className="blog-search-bar">
            <i className="fa-solid fa-magnifying-glass blog-search-icon" aria-hidden="true"></i>
            <input
              type="text"
              className="blog-search-input"
              placeholder="Search articles by topic, keyword, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search articles"
            />
          </div>

          <div className="blog-category-pills" role="tablist" aria-label="Filter by category">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Loader Display during fast filter change */}
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <Loader size={70} />
          </div>
        ) : (
          <>
            {/* Featured Article Card (Shown when on 'All' and no search query) */}
            {selectedCategory === 'All' && !searchQuery && featuredPost && (
              <section className="blog-featured-wrap">
                <a href={`/blog/${featuredPost.slug}`} className="featured-article-card">
                  <div className="featured-media-box">
                    <div className="featured-center-badge">
                      <span>{featuredPost.imageBadgeText || 'Enterprise Tech 2026'}</span>
                    </div>
                  </div>

                  <div className="featured-content-box">
                    <div className="featured-tag-row">
                      <span className="featured-badge-pill">Featured Guide</span>
                      <span className="featured-date">{featuredPost.publishedAt}</span>
                      <span className="featured-date">•</span>
                      <span className="featured-date">{featuredPost.readingTime}</span>
                    </div>

                    <h2 className="featured-title">{featuredPost.title}</h2>
                    <p className="featured-excerpt">{featuredPost.excerpt}</p>

                    <div className="featured-author-row">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="featured-author-avatar"
                      />
                      <div>
                        <div className="featured-author-name">{featuredPost.author.name}</div>
                        <div className="featured-read-time">{featuredPost.author.role}</div>
                      </div>
                    </div>
                  </div>
                </a>
              </section>
            )}

            {/* Articles Grid (Exact Match to User Reference Screenshot) */}
            {filteredPosts.length > 0 ? (
              <section className="blog-grid" aria-label="Blog posts list">
                {filteredPosts.map((post: BlogPost) => (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="blog-card"
                    id={`post-card-${post.slug}`}
                  >
                    {/* Visual Card Thumbnail Box */}
                    <div className="card-thumbnail-box">
                      <div className="card-grid-texture" />
                      <div className="card-center-badge-wrap">
                        <div className="card-badge-title">
                          {post.imageBadgeText || post.title.split(' ')[0]}
                        </div>
                        <span className="card-badge-sub">{post.category}</span>
                      </div>
                    </div>

                    {/* Meta & Summary Information */}
                    <div className="card-info-box">
                      <div className="card-meta-row">
                        <span>{post.publishedAt}</span>
                        <span className="meta-dot">•</span>
                        <span className="meta-author">{post.author.name}</span>
                        <span className="meta-dot">•</span>
                        <span>{post.readingTime}</span>
                      </div>

                      <h3 className="card-title">{post.title}</h3>

                      <p className="card-excerpt">{post.excerpt}</p>
                    </div>
                  </a>
                ))}
              </section>
            ) : (
              <div className="blog-empty-state">
                <h3 className="empty-title">No articles found</h3>
                <p className="empty-desc">
                  No articles matched your criteria "{searchQuery || selectedCategory}". Try adjusting your filters or search keywords.
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

        {/* Conversion CTA Banner */}
        <section className="blog-cta-banner">
          <h2 className="cta-banner-title">Build High-Performance Software for Your Organization</h2>
          <p className="cta-banner-desc">
            Whether you need bespoke ERP architecture, autonomous AI agents, or automated exam portals—Hoducation delivers end-to-end digital solutions tailored to your operational workflows.
          </p>
          <div className="cta-banner-actions">
            <a href="/contact" className="btn-cta-primary">
              <span>Schedule Architecture Review</span>
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
            <a
              href="https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-secondary"
            >
              <i className="fa-brands fa-whatsapp"></i>
              <span>Direct WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      {/* Global Footer */}
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

export default BlogIndexPage;
