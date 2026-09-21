import React, { useState, useEffect } from 'react';
import { TESTIMONIALS_DATA, TestimonialItem } from './testimonialsData';
import './TestimonialsSection.css';

export const TestimonialsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'school' | 'coaching'>('all');
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialItem | null>(null);

  // Filter items based on selected tab
  const filteredTestimonials = TESTIMONIALS_DATA.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const schoolCount = TESTIMONIALS_DATA.filter((i) => i.type === 'school').length;
  const coachingCount = TESTIMONIALS_DATA.filter((i) => i.type === 'coaching').length;

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTestimonial(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        {/* Section Header */}
        <header className="testimonials-header">
          <div className="section-badge-row">
            <span className="testimonials-eyebrow">
              <i className="fa-solid fa-shield-halved"></i>
              INSTITUTIONAL SOCIAL PROOF
            </span>
          </div>

          <h2 className="testimonials-main-title">
            Trusted by Leading <span className="title-accent">Organizations</span>
          </h2>

          <p className="testimonials-subtitle">
            See how premier schools, test preparation academies, and educational institutions power their examinations, ERP workflows, and learner apps with AcadOS.
          </p>

          {/* Filter Tabs */}
          <nav className="testimonials-filter-tabs" aria-label="Filter organizations by category">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Organizations ({TESTIMONIALS_DATA.length})
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'school' ? 'active' : ''}`}
              onClick={() => setActiveTab('school')}
            >
              K-12 Schools ({schoolCount})
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'coaching' ? 'active' : ''}`}
              onClick={() => setActiveTab('coaching')}
            >
              Coaching Academies ({coachingCount})
            </button>
          </nav>
        </header>

        {/* 8 Cards Responsive Grid */}
        <div className="testimonials-grid">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="testimonial-card-wrapper"
              style={{ ['--card-accent' as string]: item.color || '#0a3cff' }}
            >
              <div className="card">
                <div className="content">
                  {/* Top Metadata & Logo */}
                  <div className="card-top-section">
                    <div className="card-top-bar">
                      <span className={`category-badge badge-${item.type}`}>
                        {item.type === 'school' ? 'School' : 'Coaching'}
                      </span>
                      <span className="card-city-tag">{item.city}</span>
                    </div>

                    <div className="card-logo-box">
                      <img
                        src={item.image}
                        alt={`${item.name} Logo`}
                        className="client-logo-img"
                        loading="lazy"
                      />
                    </div>

                    <div className="header">
                      <strong>{item.name}</strong>
                      <p className="para-role">
                        {item.person} · {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Quote & Action */}
                  <div className="footer">
                    <svg
                      viewBox="0 0 24 24"
                      className="quotes"
                      style={{ color: item.color || '#0a3cff' }}
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M4.58341 17.3211C3.55316 16.2274 3 15 3 13.0103C3 9.51086 5.45651 6.37366 9.03059 4.82318L9.92328 6.20079C6.58804 8.00539 5.93618 10.346 5.67564 11.822C6.21263 11.5443 6.91558 11.4466 7.60471 11.5105C9.40908 11.6778 10.8312 13.159 10.8312 15C10.8312 16.933 9.26416 18.5 7.33116 18.5C6.2581 18.5 5.23196 18.0095 4.58341 17.3211ZM14.5834 17.3211C13.5532 16.2274 13 15 13 13.0103C13 9.51086 15.4565 6.37366 19.0306 4.82318L19.9233 6.20079C16.588 8.00539 15.9362 10.346 15.6756 11.822C16.2126 11.5443 16.9156 11.4466 17.6047 11.5105C19.4091 11.6778 20.8312 13.159 20.8312 15C20.8312 16.933 19.2642 18.5 17.3312 18.5C16.2581 18.5 15.232 18.0095 14.5834 17.3211Z"
                      />
                    </svg>

                    <p className="para para-feedback">"{item.feedback}"</p>

                    <button
                      type="button"
                      className="button"
                      onClick={() => setSelectedTestimonial(item)}
                      aria-label={`Read full feedback from ${item.name}`}
                    >
                      <span>Read feedback &rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Verification Stats */}
        <div className="testimonials-bottom-banner">
          <div className="banner-stats-wrap">
            <div className="stat-item">
              <span className="stat-num">50,000+</span>
              <span className="stat-desc">Exams Evaluated</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">99.8%</span>
              <span className="stat-desc">OMR Accuracy</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">48 Hours</span>
              <span className="stat-desc">Average Onboarding</span>
            </div>
          </div>

          <div className="banner-cta-wrap">
            <div className="banner-mascot-wrap">
              <img src="/ht-logo.jpg" alt="Hoducation Mascot" className="banner-mascot-img" />
            </div>
            <a href="/contact?service=acados" className="btn-testimonial-demo">
              <span>Schedule Institutional Demo</span>
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Modal for Full Feedback */}
      {selectedTestimonial && (
        <div
          className="testimonial-modal-backdrop"
          onClick={() => setSelectedTestimonial(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="testimonial-modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{ ['--card-accent' as string]: selectedTestimonial.color }}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedTestimonial(null)}
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="modal-header-row">
              <div className="modal-logo-box">
                <img
                  src={selectedTestimonial.image}
                  alt={selectedTestimonial.name}
                  className="modal-logo-img"
                />
              </div>
              <div className="modal-org-details">
                <span className={`category-badge badge-${selectedTestimonial.type}`}>
                  {selectedTestimonial.type.toUpperCase()}
                </span>
                <h3>{selectedTestimonial.name}</h3>
                <p className="modal-person-role">
                  {selectedTestimonial.person} · {selectedTestimonial.role}
                </p>
              </div>
            </div>

            <div className="modal-quote-wrap">
              <svg
                viewBox="0 0 24 24"
                className="modal-quote-icon"
                style={{ color: selectedTestimonial.color }}
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M4.58341 17.3211C3.55316 16.2274 3 15 3 13.0103C3 9.51086 5.45651 6.37366 9.03059 4.82318L9.92328 6.20079C6.58804 8.00539 5.93618 10.346 5.67564 11.822C6.21263 11.5443 6.91558 11.4466 7.60471 11.5105C9.40908 11.6778 10.8312 13.159 10.8312 15C10.8312 16.933 9.26416 18.5 7.33116 18.5C6.2581 18.5 5.23196 18.0095 4.58341 17.3211ZM14.5834 17.3211C13.5532 16.2274 13 15 13 13.0103C13 9.51086 15.4565 6.37366 19.0306 4.82318L19.9233 6.20079C16.588 8.00539 15.9362 10.346 15.6756 11.822C16.2126 11.5443 16.9156 11.4466 17.6047 11.5105C19.4091 11.6778 20.8312 13.159 20.8312 15C20.8312 16.933 19.2642 18.5 17.3312 18.5C16.2581 18.5 15.232 18.0095 14.5834 17.3211Z"
                />
              </svg>
              <p className="modal-feedback-text">"{selectedTestimonial.feedback}"</p>
            </div>

            <div className="modal-actions-row">
              {selectedTestimonial.highlightMetric && (
                <span className="modal-metric-badge">
                  <i className="fa-solid fa-circle-check"></i>
                  {selectedTestimonial.highlightMetric}
                </span>
              )}

              <a
                href={`https://wa.me/919660034117?text=Hello%20Hoducation,%20we%20are%20interested%20in%20learning%20more%20about%20your%20work%20with%20${encodeURIComponent(
                  selectedTestimonial.name
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-demo-btn"
              >
                <i className="fa-brands fa-whatsapp"></i>
                <span>Ask About This Case</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
