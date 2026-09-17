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
    ctaLink: 'https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20want%20to%20know%20more%20about%20TestMaker%20Paper%20Generator.',
    placeholderLabel: 'TestMaker Interface Preview',
    iconClass: 'fa-solid fa-book-bookmark',
    imageSrc: '', // Placeholder: user will provide image
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
    ctaLink: 'https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20want%20to%20know%20more%20about%20CBT%20Mock%20Exam%20Platform.',
    placeholderLabel: 'CBT Portal Interface Preview',
    iconClass: 'fa-solid fa-laptop-code',
    imageSrc: '', // Placeholder: user will provide image
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
    ctaLink: 'https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20want%20to%20know%20more%20about%20OMR%20SmartPhone%20Evaluation.',
    placeholderLabel: 'OMR Smartphone Scanner Preview',
    iconClass: 'fa-solid fa-mobile-screen-button',
    imageSrc: '', // Placeholder: user will provide image
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
    ctaLink: 'https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20want%20to%20know%20more%20about%20Institute%20ERP%20and%20CRM%20suite.',
    placeholderLabel: 'ERP & CRM Dashboard Preview',
    iconClass: 'fa-solid fa-chart-pie',
    imageSrc: '', // Placeholder: user will provide image
  },
];

export const AcadOSShowcase: React.FC = () => {
  return (
    <section className="acados-section" id="acados" aria-label="AcadOS Product Ecosystem">
      <div className="acados-container">
        {/* Outer 2-Column Header sitting directly on the grey canvas */}
        <div className="acados-outer-header">
          <div className="acados-outer-left">
            <span className="acados-outer-bullet">•</span>
            <span className="acados-outer-label">AcadOS Platform</span>
          </div>
          <div className="acados-outer-right">
            <h2 className="acados-outer-heading">
              Four institutional engines engineered to power modern education.
            </h2>
          </div>
        </div>

        {/* The Big Curved White Box */}
        <div className="acados-white-card">
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

          {/* Bottom Centered Black Pill Button */}
          <div className="acados-footer-cta">
            <a
              href="https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20would%20like%20to%20schedule%20a%20complete%20AcadOS%20demo%20for%20our%20institution."
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
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`acados-row ${isReversed ? 'is-reversed' : ''} ${isVisible ? 'is-revealed' : ''}`}
    >
      {/* Content Column */}
      <div className="acados-content-col">
        {/* Category Dot Badge */}
        <div className="acados-badge">
          <span className="acados-badge-dot">•</span>
          <span className="acados-badge-text">{module.badge}</span>
        </div>

        {/* Headline */}
        <h3 className="acados-module-title">{module.title}</h3>

        {/* Subheading / Description */}
        <p className="acados-module-desc">{module.description}</p>

        {/* 3 Metrics Row */}
        <div className="acados-stats-row">
          {module.stats.map((stat, sIdx) => (
            <div key={sIdx} className="acados-stat-item">
              <span className="acados-stat-value">{stat.value}</span>
              <span className="acados-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Explore Link */}
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

      {/* Curved Image Placeholder Box */}
      <div className="acados-visual-col">
        <div className="acados-card-frame">
          {module.imageSrc ? (
            <img
              src={module.imageSrc}
              alt={module.title}
              className="acados-module-image"
              loading="lazy"
            />
          ) : (
            <div className="acados-placeholder-box">
              <div className="acados-placeholder-inner">
                <div className="placeholder-icon-wrap">
                  <i className={module.iconClass}></i>
                </div>
                <span className="placeholder-text">{module.placeholderLabel}</span>
                <span className="placeholder-subtext">Image Placeholder</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
