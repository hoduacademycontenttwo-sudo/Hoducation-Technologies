import React, { useEffect, useRef, useState } from 'react';
import './AcadOSShowcase.css';

interface ModuleStat {
  value: string;
  label: string;
}

interface ModuleData {
  id: string;
  badge: string;
  title: string;
  description: string;
  stats: ModuleStat[];
  ctaText: string;
  ctaLink: string;
  placeholderLabel: string;
  iconClass: string;
  imageSrc?: string;
}

const MODULES: ModuleData[] = [
  {
    id: 'testmaker',
    badge: 'Question Bank & Paper Generation',
    title: 'Testmaker Paper Generator',
    description:
      'Generate balanced exam papers from 6 Lakh+ syllabus-aligned questions in minutes. Custom branding, difficulty mix, and downloadable PDFs.',
    stats: [
      { value: '600k+', label: 'Syllabus Questions' },
      { value: '< 60s', label: 'Generation Time' },
      { value: '100%', label: 'CBSE / JEE / NEET' },
    ],
    ctaText: 'Explore',
    ctaLink: 'https://www.acados.app/#/modules/testmaker',
    placeholderLabel: 'TestMaker Interface Preview',
    iconClass: 'fa-solid fa-book-bookmark',
    imageSrc: '/acados-testmaker.png',
  },
  {
    id: 'cbt',
    badge: 'Live Assessment Platform',
    title: 'CBT Mock Exam Platform',
    description:
      'Live CBT portal with timers, instant analytics, and NTA-style interface for JEE, NEET & board exams. Real exam conditions, anywhere.',
    stats: [
      { value: 'NTA-Style', label: 'Exam Interface' },
      { value: '0ms', label: 'Live Test Lag' },
      { value: 'Instant', label: 'Score & Percentile' },
    ],
    ctaText: 'Explore',
    ctaLink: 'https://www.acados.app/#/modules/practice-cbt',
    placeholderLabel: 'CBT Portal Interface Preview',
    iconClass: 'fa-solid fa-laptop-code',
    imageSrc: '', // Placeholder ready for user-provided image
  },
  {
    id: 'omr',
    badge: 'Computer Vision Evaluation',
    title: 'OMR SmartPhone Evaluation',
    description:
      'Grade bubble answer sheets using any smartphone camera in seconds. 99.8% accuracy with instant result export.',
    stats: [
      { value: '99.8%', label: 'Vision Accuracy' },
      { value: '< 3s', label: 'Per Sheet Scan' },
      { value: '1-Click', label: 'Result CSV & SMS' },
    ],
    ctaText: 'Explore',
    ctaLink: 'https://www.acados.app/#/modules/omr-evaluation',
    placeholderLabel: 'OMR Smartphone Scanner Preview',
    iconClass: 'fa-solid fa-mobile-screen-button',
    imageSrc: '', // Placeholder ready for user-provided image
  },
  {
    id: 'erp',
    badge: 'Institutional OS & CRM',
    title: 'Institute ERP and CRM suite',
    description:
      'Fee ledger, attendance, staff registers, enquiry CRM and academic schedule - all in one place. Saves 40% operational time.',
    stats: [
      { value: '40%', label: 'Hours Saved' },
      { value: '360°', label: 'Student Lifecycle' },
      { value: '24/7', label: 'WhatsApp Automation' },
    ],
    ctaText: 'Explore',
    ctaLink: 'https://www.acados.app/#/modules/erp-crm',
    placeholderLabel: 'ERP & CRM Dashboard Preview',
    iconClass: 'fa-solid fa-chart-pie',
    imageSrc: '', // Placeholder ready for user-provided image
  },
];

export const AcadOSShowcase: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHeaderRevealed, setIsHeaderRevealed] = useState(false);
  const [isCardRevealed, setIsCardRevealed] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsHeaderRevealed(true);
      setIsCardRevealed(true);
      return;
    }

    const headerEl = headerRef.current;
    const cardEl = cardRef.current;

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderRevealed(true);
          if (headerEl) headerObserver.unobserve(headerEl);
        }
      },
      { threshold: 0.1 }
    );

    const cardObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCardRevealed(true);
          if (cardEl) cardObserver.unobserve(cardEl);
        }
      },
      { threshold: 0.08 }
    );

    if (headerEl) headerObserver.observe(headerEl);
    if (cardEl) cardObserver.observe(cardEl);

    return () => {
      headerObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section className="acados-section" id="acados" aria-label="AcadOS Product Ecosystem">
      <div className="acados-container">
        {/* Outer Header: Code-Crafted AcadOS Brand Header Card (Reference-Accurate) */}
        <div
          ref={headerRef}
          className={`acados-outer-header ${isHeaderRevealed ? 'is-header-revealed' : ''}`}
        >
          <a
            href="https://www.acados.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="acados-header-card"
            title="Explore AcadOS - The Academic Operating System for Modern Institutions"
          >
            {/* Background Decorative Rings & Ambient Curves */}
            <div className="acados-header-decor" aria-hidden="true">
              <svg
                className="acados-header-decor-svg"
                viewBox="0 0 1000 240"
                preserveAspectRatio="none"
              >
                <g className="decor-arcs-left">
                  <circle cx="100" cy="40" r="70" stroke="#b46e82" strokeWidth="1" fill="none" opacity="0.18" />
                  <circle cx="100" cy="40" r="100" stroke="#b46e82" strokeWidth="1" fill="none" opacity="0.15" />
                  <circle cx="100" cy="40" r="130" stroke="#b46e82" strokeWidth="1" fill="none" opacity="0.12" />
                  <circle cx="100" cy="40" r="160" stroke="#b46e82" strokeWidth="1" fill="none" opacity="0.09" />
                  <circle cx="100" cy="40" r="190" stroke="#b46e82" strokeWidth="1" fill="none" opacity="0.06" />
                </g>
                <g className="decor-arcs-right">
                  <circle cx="920" cy="200" r="75" stroke="#b46e82" strokeWidth="1" fill="none" opacity="0.22" />
                  <circle cx="920" cy="200" r="110" stroke="#b46e82" strokeWidth="1" fill="none" opacity="0.18" />
                  <circle cx="920" cy="200" r="145" stroke="#b46e82" strokeWidth="1" fill="none" opacity="0.14" />
                  <circle cx="920" cy="200" r="180" stroke="#b46e82" strokeWidth="1" fill="none" opacity="0.10" />
                  <circle cx="920" cy="200" r="215" stroke="#b46e82" strokeWidth="1" fill="none" opacity="0.07" />
                </g>
              </svg>
            </div>

            {/* Inner Content Grid: Logo | Divider | Headings */}
            <div className="acados-header-content">
              <div className="acados-header-logo-wrap">
                <img
                  src="/acados-logo-clean.png"
                  alt="AcadOS Logo"
                  className="acados-header-logo"
                  width="100"
                  height="88"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className="acados-header-separator" aria-hidden="true" />

              <div className="acados-header-info">
                <h2 className="acados-header-heading">
                  The Academic Operating System<br className="heading-break" />
                  for Modern Institutions.
                </h2>
                <p className="acados-header-lead">
                  Four institutional engines engineered to power examinations, intelligent evaluations, and seamless campus administration.
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* The Big Curved White Box with Reveal Animation */}
        <div
          ref={cardRef}
          className={`acados-white-card ${isCardRevealed ? 'is-card-revealed' : ''}`}
        >
          {/* Alternating Modules List */}
          <div className="acados-modules-list">
            {MODULES.map((module, index) => {
              const isEven = index % 2 === 1; // 0: Text L, Card R | 1: Card L, Text R | 2: Text L, Card R | 3: Card L, Text R
              return (
                <ModuleRow
                  key={module.id}
                  module={module}
                  index={index}
                  isReversed={isEven}
                />
              );
            })}
          </div>

          {/* Bottom Centered Black Pill Button rendering to https://www.acados.app/ */}
          <div className="acados-footer-cta">
            <a
              href="https://www.acados.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="acados-all-pill"
            >
              <span>All modules</span>
              <span className="acados-arrow-icon">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ModuleRowProps {
  module: ModuleData;
  index: number;
  isReversed: boolean;
}

const ModuleRow: React.FC<ModuleRowProps> = ({ module, index, isReversed }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`acados-row ${isReversed ? 'is-reversed' : ''} ${isVisible ? 'is-revealed' : ''}`}
      style={{ '--row-idx': index } as React.CSSProperties}
    >
      {/* Content Column with Bottom-to-Top Wipe Reveal */}
      <div className="acados-content-col">
        {/* Category Dot Badge */}
        <div className="wipe-mask">
          <div className="wipe-content wipe-badge">
            <div className="acados-badge">
              <span className="acados-badge-dot">•</span>
              <span className="acados-badge-text">{module.badge}</span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="wipe-mask">
          <div className="wipe-content wipe-title">
            <h3 className="acados-module-title">{module.title}</h3>
          </div>
        </div>

        {/* Subheading / Description */}
        <div className="wipe-mask">
          <div className="wipe-content wipe-desc">
            <p className="acados-module-desc">{module.description}</p>
          </div>
        </div>

        {/* 3 Metrics Row */}
        <div className="wipe-mask">
          <div className="wipe-content wipe-stats">
            <div className="acados-stats-row">
              {module.stats.map((stat, sIdx) => (
                <div key={sIdx} className="acados-stat-item">
                  <span className="acados-stat-value">{stat.value}</span>
                  <span className="acados-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Explore Button with URL destination */}
        <div className="wipe-mask">
          <div className="wipe-content wipe-link">
            <a
              href={module.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="acados-explore-link"
            >
              <span>{module.ctaText}</span>
              <span className="acados-arrow-icon">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Curved Image Placeholder Box with Pan Animation */}
      <div className="acados-visual-col">
        <div className={`acados-card-frame ${module.imageSrc ? 'has-image' : ''}`}>
          {module.imageSrc ? (
            <div className="image-pan-viewport">
              <img
                src={module.imageSrc}
                alt={module.title}
                className="acados-module-image image-pan-target"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="acados-placeholder-box image-pan-target">
              <div className="acados-placeholder-inner">
                <div className="placeholder-icon-wrap">
                  <i className={module.iconClass}></i>
                </div>
                <span className="placeholder-text">{module.placeholderLabel}</span>
                <span className="placeholder-subtext">Awaiting Asset Upload</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
