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
  cardTheme: string;
  mockupType: 'testmaker' | 'cbt' | 'omr' | 'erp';
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
    cardTheme: 'card-theme-testmaker',
    mockupType: 'testmaker',
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
    cardTheme: 'card-theme-cbt',
    mockupType: 'cbt',
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
    cardTheme: 'card-theme-omr',
    mockupType: 'omr',
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
    cardTheme: 'card-theme-erp',
    mockupType: 'erp',
  },
];

export const AcadOSShowcase: React.FC = () => {
  return (
    <section className="acados-section" id="acados" aria-label="AcadOS Product Ecosystem">
      <div className="acados-container">
        {/* Outer 2-Column Header sitting directly on the grey canvas (as shown in reference) */}
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

        {/* The Big Curved White Box (Matching left red arrow in screenshot) */}
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

          {/* Bottom Centered Black Pill Button (matching reference "All projects") */}
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

      {/* Curved Image Placeholder Box (Matching right red arrow in screenshot) */}
      <div className="acados-visual-col">
        <div className={`acados-card-frame ${module.cardTheme}`}>
          <MockupPlaceholder type={module.mockupType} />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Mockup Components Designed Specifically For Each Curved Placeholder Box
// ============================================================================

interface MockupPlaceholderProps {
  type: 'testmaker' | 'cbt' | 'omr' | 'erp';
}

const MockupPlaceholder: React.FC<MockupPlaceholderProps> = ({ type }) => {
  switch (type) {
    case 'testmaker':
      return <TestMakerLaptopMockup />;
    case 'cbt':
      return <CBTTitanMockup />;
    case 'omr':
      return <OMRPhoneMockup />;
    case 'erp':
      return <ERPBrowserMockup />;
    default:
      return null;
  }
};

/**
 * 1. TestMaker: Laptop Mockup with Magenta/Pink Screen & Ground Glow
 * (Direct replica of Card 1 Vertus AI laptop composition in screenshot)
 */
const TestMakerLaptopMockup: React.FC = () => {
  return (
    <div className="mockup-screen">
      <div className="laptop-mockup-wrap">
        <div className="laptop-lid">
          <div className="laptop-webcam"></div>
          <div className="laptop-display-screen">
            <div className="screen-app-top">
              <span className="screen-app-logo">AcadOS TestMaker</span>
              <span className="screen-app-tag">6L+ Questions</span>
            </div>
            <div className="screen-hero-text">
              <div className="screen-hero-title">Physics &amp; Chemistry<br />Question Studio</div>
              <div className="screen-hero-sub">Balanced CBSE &amp; JEE Paper Generator</div>
            </div>
            <div className="screen-app-actions">
              <span className="screen-pill-btn">Generate PDF</span>
              <span className="screen-pill-btn outline">Marking Scheme</span>
            </div>
          </div>
        </div>
        <div className="laptop-base">
          <div className="laptop-notch"></div>
        </div>
        <div className="laptop-ground-glow"></div>
      </div>
    </div>
  );
};

/**
 * 2. CBT Exam Platform: Dark Dashboard with Crimson Red Highlights
 * (Direct replica of Card 2 TitanX dark dashboard composition in screenshot)
 */
const CBTTitanMockup: React.FC = () => {
  return (
    <div className="mockup-screen">
      <div className="cbt-titan-mock">
        <div className="cbt-titan-nav">
          <div className="cbt-titan-dots">
            <span className="titan-dot"></span>
            <span className="titan-dot"></span>
            <span className="titan-dot"></span>
          </div>
          <span className="cbt-titan-meta">JEE Advanced CBT Simulator</span>
          <span className="cbt-titan-timer">02:44:18</span>
        </div>

        <div className="cbt-titan-grid">
          <div className="cbt-titan-card highlight-card">
            <span className="card-top-tag">LIVE TEST ENGINE</span>
            <span className="card-big-num">0ms</span>
            <span className="card-desc-mini">Zero latency buffer across 10,000+ concurrent students</span>
          </div>

          <div className="cbt-titan-card">
            <span className="card-top-tag">NTA PALETTE</span>
            <span className="card-big-num">99.4%</span>
            <span className="card-desc-mini">Instant score &amp; All-India percentile prediction</span>
          </div>
        </div>

        <div className="cbt-titan-footer">
          <span className="cbt-badge-status">
            <span className="pulse-green"></span>
            Server Sync Active
          </span>
          <button className="cbt-titan-btn">Next Question →</button>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. OMR Smartphone Evaluation: Sunset Pastel Card with Mobile Smartphone Mockup
 * (Direct replica of Card 3 Metapic pastel peach/pink composition with phone in screenshot)
 */
const OMRPhoneMockup: React.FC = () => {
  return (
    <div className="mockup-screen">
      <div className="phone-mockup-wrap">
        <div className="phone-shell">
          <div className="phone-dynamic-island"></div>
          <div className="phone-screen">
            <div className="phone-scanner-grid">
              <div className="phone-bubble-row">
                <span>Q1: A B [C] D</span>
                <span className="bubble-check">✓ Verified</span>
              </div>
              <div className="phone-bubble-row">
                <span>Q2: [A] B C D</span>
                <span className="bubble-check">✓ Verified</span>
              </div>
              <div className="phone-bubble-row">
                <span>Q3: A [B] C D</span>
                <span className="bubble-check">✓ Verified</span>
              </div>
            </div>

            <div className="phone-hud-card">
              <span className="hud-title">OMR SmartVision 3.0</span>
              <div className="hud-score">172 / 180</div>
              <div className="hud-badge">99.8% Accuracy • Evaluated in 0.8s</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 4. Institute ERP and CRM: White Browser Framing Dark Analytics Console
 * (Direct replica of Card 4 Alpha Ledger audit desktop browser composition in screenshot)
 */
const ERPBrowserMockup: React.FC = () => {
  return (
    <div className="mockup-screen">
      <div className="erp-browser-mock">
        <div className="browser-bar">
          <div className="browser-dots">
            <span className="browser-dot"></span>
            <span className="browser-dot"></span>
            <span className="browser-dot"></span>
          </div>
          <div className="browser-url-pill">app.acados.tech/erp/dashboard</div>
        </div>
        <div className="browser-view-content">
          <div className="erp-center-heading">Campus Operations &amp; Enquiry Audit</div>
          <div className="erp-dark-console">
            <div className="console-kpi-row">
              <div className="console-stat-box">
                <div className="stat-box-title">Fee Collected</div>
                <div className="stat-box-num">₹48.6 Lakh</div>
              </div>
              <div className="console-stat-box">
                <div className="stat-box-title">Attendance Sync</div>
                <div className="stat-box-num">98.2%</div>
              </div>
            </div>
            <div className="console-kpi-row">
              <div className="console-stat-box">
                <div className="stat-box-title">CRM Inquiries</div>
                <div className="stat-box-num">248 Leads</div>
              </div>
              <div className="console-stat-box">
                <div className="stat-box-title">Time Saved</div>
                <div className="stat-box-num">40%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
