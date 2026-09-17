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
  mockupType: 'testmaker' | 'cbt' | 'omr' | 'erp';
}

const MODULES: ModuleData[] = [
  {
    id: 'testmaker',
    badge: 'Question Bank & Paper Generator',
    title: 'Testmaker Paper Generator',
    description:
      'Generate balanced exam papers from 6 Lakh+ syllabus-aligned questions in minutes. Custom branding, difficulty mix, and downloadable PDFs.',
    stats: [
      { value: '600k+', label: 'Syllabus Questions' },
      { value: '< 60s', label: 'Generation Time' },
      { value: '100%', label: 'CBSE / JEE / NEET' },
    ],
    ctaText: 'Explore Testmaker',
    ctaLink: 'https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20want%20to%20know%20more%20about%20TestMaker%20Paper%20Generator.',
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
    ctaText: 'Explore CBT Platform',
    ctaLink: 'https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20want%20to%20know%20more%20about%20CBT%20Mock%20Exam%20Platform.',
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
    ctaText: 'Explore OMR Engine',
    ctaLink: 'https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20want%20to%20know%20more%20about%20OMR%20SmartPhone%20Evaluation.',
    mockupType: 'omr',
  },
  {
    id: 'erp',
    badge: 'Institute Operating System & CRM',
    title: 'Institute ERP and CRM suite',
    description:
      'Fee ledger, attendance, staff registers, enquiry CRM and academic schedule - all in one place. Saves 40% operational time.',
    stats: [
      { value: '40%', label: 'Hours Saved' },
      { value: '360°', label: 'Student Lifecycle' },
      { value: '24/7', label: 'WhatsApp Automation' },
    ],
    ctaText: 'Explore ERP & CRM',
    ctaLink: 'https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20want%20to%20know%20more%20about%20Institute%20ERP%20and%20CRM%20suite.',
    mockupType: 'erp',
  },
];

export const AcadOSShowcase: React.FC = () => {
  return (
    <section className="acados-section" id="acados" aria-label="AcadOS Product Ecosystem">
      <div className="acados-container">
        {/* Section Top Header */}
        <div className="acados-header">
          <div className="acados-eyebrow">
            <span className="eyebrow-dot"></span>
            <span>AcadOS Institutional OS</span>
          </div>
          <h2 className="acados-main-title">
            Engineered To Power <span className="acados-title-accent">Modern Education.</span>
          </h2>
          <p className="acados-main-subtitle">
            Four specialized, integrated modules built to automate question authoring, live computer-based testing, instant optical grading, and campus administrative operations.
          </p>
        </div>

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

        {/* Bottom Centered Action Pill (matching reference design "All projects") */}
        <div className="acados-footer-cta">
          <a
            href="https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20would%20like%20to%20schedule%20a%20complete%20AcadOS%20demo%20for%20our%20institution."
            target="_blank"
            rel="noopener noreferrer"
            className="acados-all-pill"
          >
            <span>Request Full AcadOS Walkthrough</span>
            <i className="fa-solid fa-arrow-right pill-arrow" aria-hidden="true"></i>
          </a>
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
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`acados-row ${isReversed ? 'is-reversed' : ''} ${isVisible ? 'is-revealed' : ''}`}
      style={{ '--row-index': index } as React.CSSProperties}
    >
      {/* Content Column */}
      <div className="acados-content-col">
        <div className="acados-badge">
          <span className="acados-badge-dot">▪</span>
          <span className="acados-badge-text">{module.badge}</span>
        </div>

        <h3 className="acados-module-title">{module.title}</h3>

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

        {/* Minimalist Explore Action Link */}
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

      {/* Visual Mockup Column */}
      <div className="acados-visual-col">
        <div className="acados-card-frame">
          <MockupPlaceholder type={module.mockupType} />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Specialized High-Fidelity Mockup Placeholders matching reference style
// ============================================================================

interface MockupPlaceholderProps {
  type: 'testmaker' | 'cbt' | 'omr' | 'erp';
}

const MockupPlaceholder: React.FC<MockupPlaceholderProps> = ({ type }) => {
  switch (type) {
    case 'testmaker':
      return <TestMakerMockup />;
    case 'cbt':
      return <CBTMockup />;
    case 'omr':
      return <OMRMockup />;
    case 'erp':
      return <ERPMockup />;
    default:
      return null;
  }
};

/**
 * 1. TestMaker Paper Generator Mockup:
 * Sleek dark canvas showing exam question editor, subject chapters, difficulty mix, and printable paper preview
 */
const TestMakerMockup: React.FC = () => {
  return (
    <div className="mockup-screen testmaker-screen">
      {/* Studio Header Bar */}
      <div className="screen-header-bar">
        <div className="window-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="window-title">AcadOS TestMaker Studio • CBSE &amp; JEE Paper Builder</div>
        <div className="window-action-badge">6L+ Questions Active</div>
      </div>

      {/* Main Studio Body */}
      <div className="testmaker-body">
        {/* Left Controls Panel */}
        <div className="testmaker-sidebar">
          <div className="config-block">
            <span className="config-label">Target Curriculum</span>
            <div className="config-pill active-pill">Physics • Class XII (JEE-Adv)</div>
          </div>

          <div className="config-block">
            <span className="config-label">Selected Chapters (3)</span>
            <div className="chapter-tags">
              <span className="chap-tag">Electrostatics</span>
              <span className="chap-tag">Wave Optics</span>
              <span className="chap-tag">Modern Physics</span>
            </div>
          </div>

          <div className="config-block">
            <span className="config-label">Difficulty Distribution</span>
            <div className="difficulty-bars">
              <div className="diff-segment easy" style={{ width: '30%' }}>Easy 30%</div>
              <div className="diff-segment med" style={{ width: '50%' }}>Med 50%</div>
              <div className="diff-segment hard" style={{ width: '20%' }}>Hard 20%</div>
            </div>
          </div>

          <div className="config-metrics">
            <div className="metric-chip">Total Marks: <strong>120</strong></div>
            <div className="metric-chip">Time: <strong>90 Mins</strong></div>
          </div>
        </div>

        {/* Right Generated Paper Canvas */}
        <div className="testmaker-canvas">
          <div className="paper-header">
            <div className="paper-watermark">HODUCATION ACADEMY</div>
            <div className="paper-title-row">
              <span className="paper-exam-name">PHYSICS ADVANCED PERIODIC TEST — 04</span>
              <span className="paper-marks">MAX MARKS: 120</span>
            </div>
            <div className="paper-divider"></div>
          </div>

          {/* Sample Question Preview */}
          <div className="paper-question-item">
            <div className="q-number">Q.01</div>
            <div className="q-content">
              <p className="q-text">
                A non-conducting ring of radius <span className="formula-code">R</span> having uniform charge density <span className="formula-code">λ</span> rotates with angular velocity <span className="formula-code">ω</span>...
              </p>
              <div className="q-options-grid">
                <span className="opt-item"><strong className="opt-key">A)</strong> μ₀λωR / 2</span>
                <span className="opt-item opt-correct"><strong className="opt-key">B)</strong> μ₀λωR² / 4 ✓</span>
                <span className="opt-item"><strong className="opt-key">C)</strong> μ₀λω / 2π</span>
                <span className="opt-item"><strong className="opt-key">D)</strong> 2μ₀λωR</span>
              </div>
            </div>
          </div>

          {/* Bottom Floating Export Pill */}
          <div className="paper-export-badge">
            <i className="fa-solid fa-file-pdf"></i>
            <span>Ready to Print • Includes Solution Key &amp; Explanations</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. CBT Mock Exam Platform Mockup:
 * NTA-style CBT test portal with countdown timer, formula renderer, palette & instant rank
 */
const CBTMockup: React.FC = () => {
  return (
    <div className="mockup-screen cbt-screen">
      {/* NTA Top Bar */}
      <div className="cbt-top-bar">
        <div className="cbt-brand-col">
          <span className="cbt-logo-badge">NTA SIMULATOR</span>
          <span className="cbt-test-name">JEE (Advanced) 2026 - Paper 1 (PCM)</span>
        </div>
        <div className="cbt-timer-badge">
          <i className="fa-regular fa-clock"></i>
          <span>02:44:18 Left</span>
        </div>
      </div>

      {/* Main CBT Workspace */}
      <div className="cbt-main-grid">
        {/* Left Question Area */}
        <div className="cbt-question-pane">
          <div className="cbt-pane-header">
            <span className="q-badge">Section 2: Chemistry (Numerical Value)</span>
            <span className="q-marks-scheme">+4 for correct, 0 for wrong</span>
          </div>

          <div className="cbt-question-card">
            <div className="cbt-q-number">Question 18:</div>
            <p className="cbt-q-desc">
              Calculate the elevation in boiling point (in K) when 4.5 g of glucose (C₆H₁₂O₆) is dissolved in 250 g of solvent having ebullioscopic constant K_b = 0.52 K·kg·mol⁻¹.
            </p>
            <div className="cbt-input-simulator">
              <span className="input-prompt">Enter Numerical Answer:</span>
              <span className="input-mock-box">0.052</span>
              <span className="input-cursor"></span>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="cbt-actions-row">
            <button className="cbt-btn btn-secondary">Clear</button>
            <button className="cbt-btn btn-review">Mark for Review</button>
            <button className="cbt-btn btn-primary">Save &amp; Next →</button>
          </div>
        </div>

        {/* Right Palette Panel */}
        <div className="cbt-palette-pane">
          <div className="candidate-info">
            <div className="cand-avatar">AJ</div>
            <div className="cand-meta">
              <span className="cand-name">A. Jaiswal</span>
              <span className="cand-roll">Roll: #JEE-98104</span>
            </div>
          </div>

          <div className="palette-legend">
            <span className="leg-item"><span className="leg-dot dot-ans"></span> Ans (16)</span>
            <span className="leg-item"><span className="leg-dot dot-rev"></span> Rev (4)</span>
            <span className="leg-item"><span className="leg-dot dot-unv"></span> Left (10)</span>
          </div>

          {/* Question Number Buttons Matrix */}
          <div className="palette-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num) => {
              let state = 'unvisited';
              if ([1, 2, 3, 4, 5, 7, 8, 10, 11, 13, 14, 16].includes(num)) state = 'answered';
              else if ([6, 12, 17].includes(num)) state = 'review';
              else if (num === 18) state = 'active';
              return (
                <div key={num} className={`pal-box ${state}`}>
                  {num}
                </div>
              );
            })}
          </div>

          {/* Live AI Score Prediction */}
          <div className="ai-score-pill">
            <span className="sparkle-icon">✦</span>
            <span>Live Predicted Percentile: <strong>99.4%</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. OMR SmartPhone Evaluation Mockup:
 * Computer vision scanning viewfinder detecting optical bubble grid with instant 99.8% precision result
 */
const OMRMockup: React.FC = () => {
  return (
    <div className="mockup-screen omr-screen">
      {/* Viewfinder Target Area */}
      <div className="omr-camera-viewport">
        {/* Corner alignment crosshairs */}
        <div className="corner-bracket top-left"></div>
        <div className="corner-bracket top-right"></div>
        <div className="corner-bracket bottom-left"></div>
        <div className="corner-bracket bottom-right"></div>

        {/* Optical Scanning Line */}
        <div className="scanner-laser-line"></div>

        {/* Detected OMR Sheet Layer */}
        <div className="omr-sheet-mock">
          <div className="omr-meta-bar">
            <span className="omr-sheet-id">OMR SHEET: 180 QUESTIONS (NEET MOCK 12)</span>
            <span className="omr-batch">BATCH: MEDICAL TOPPERS 2026</span>
          </div>

          {/* Bubble Grid with Green Detection Rings */}
          <div className="bubble-rows-sample">
            {[
              { q: '01', picked: 'B', valid: true },
              { q: '02', picked: 'A', valid: true },
              { q: '03', picked: 'C', valid: true },
              { q: '04', picked: 'D', valid: true },
              { q: '05', picked: 'B', valid: true },
              { q: '06', picked: 'C', valid: true },
            ].map((row) => (
              <div key={row.q} className="bubble-row-line">
                <span className="bubble-q-num">{row.q}</span>
                {['A', 'B', 'C', 'D'].map((opt) => (
                  <span
                    key={opt}
                    className={`omr-bubble ${row.picked === opt ? 'bubble-filled detected' : ''}`}
                  >
                    {opt}
                  </span>
                ))}
                <span className="vision-lock-tag">100% Match</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instant Vision AI Overlay Result Card */}
        <div className="omr-result-overlay">
          <div className="omr-result-header">
            <span className="status-indicator"></span>
            <span>Evaluated in 0.82 Seconds • 99.8% Accuracy</span>
          </div>

          <div className="omr-score-metrics">
            <div className="score-stat">
              <span className="stat-title">Candidate</span>
              <strong className="stat-val">Aryan Sharma</strong>
            </div>
            <div className="score-stat">
              <span className="stat-title">Score</span>
              <strong className="stat-val highlight-stat">172 / 180</strong>
            </div>
            <div className="score-stat">
              <span className="stat-title">Rank</span>
              <strong className="stat-val">AIR 03</strong>
            </div>
          </div>

          <div className="omr-export-actions">
            <span className="export-pill"><i className="fa-solid fa-file-excel"></i> Export Excel</span>
            <span className="export-pill green-pill"><i className="fa-brands fa-whatsapp"></i> WhatsApp Report Sent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 4. Institute ERP & CRM Suite Mockup:
 * Multi-metric operational dashboard showing fee collections, student lifecycle, and automated logs
 */
const ERPMockup: React.FC = () => {
  return (
    <div className="mockup-screen erp-screen">
      {/* ERP Top Header */}
      <div className="erp-top-nav">
        <div className="erp-campus-badge">
          <i className="fa-solid fa-building-columns"></i>
          <span>AcadOS Enterprise ERP • Main Campus</span>
        </div>
        <div className="erp-sync-badge">
          <span className="sync-pulse"></span>
          <span>Live Sync 24/7 Active</span>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="erp-kpi-row">
        <div className="kpi-card">
          <span className="kpi-title">Fee Collection (Q1)</span>
          <div className="kpi-val-row">
            <span className="kpi-number">₹48.6 Lakh</span>
            <span className="kpi-badge positive">+14.2%</span>
          </div>
          <div className="kpi-progress">
            <div className="kpi-bar" style={{ width: '94%' }}></div>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Attendance Rate</span>
          <div className="kpi-val-row">
            <span className="kpi-number">98.2%</span>
            <span className="kpi-badge neutral">Biometric</span>
          </div>
          <div className="kpi-progress">
            <div className="kpi-bar" style={{ width: '98%' }}></div>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Active Inquiries</span>
          <div className="kpi-val-row">
            <span className="kpi-number">248 Leads</span>
            <span className="kpi-badge crm-badge">WhatsApp API</span>
          </div>
          <div className="kpi-progress">
            <div className="kpi-bar" style={{ width: '82%' }}></div>
          </div>
        </div>
      </div>

      {/* Bottom 2-col workflow view */}
      <div className="erp-workflow-grid">
        {/* CRM Admissions Funnel */}
        <div className="crm-funnel-card">
          <span className="subcard-title">Admissions CRM Funnel</span>
          <div className="funnel-steps">
            <div className="funnel-step">
              <span className="step-name">Inquiry Received</span>
              <span className="step-count">184</span>
            </div>
            <div className="funnel-step">
              <span className="step-name">Counselled</span>
              <span className="step-count">128</span>
            </div>
            <div className="funnel-step">
              <span className="step-name">Demo Attended</span>
              <span className="step-count">92</span>
            </div>
            <div className="funnel-step highlight-step">
              <span className="step-name">Admission Enrolled</span>
              <span className="step-count">74</span>
            </div>
          </div>
        </div>

        {/* Live Operational Activity Log */}
        <div className="erp-log-card">
          <span className="subcard-title">Live Automation Feed</span>
          <div className="log-items">
            <div className="log-row">
              <span className="log-dot green"></span>
              <span className="log-text">Fee receipt PDF generated &amp; sent to parent WhatsApp</span>
              <span className="log-time">Just now</span>
            </div>
            <div className="log-row">
              <span className="log-dot blue"></span>
              <span className="log-text">1,420 biometric student attendance punches recorded</span>
              <span className="log-time">1m ago</span>
            </div>
            <div className="log-row">
              <span className="log-dot purple"></span>
              <span className="log-text">New CRM lead assigned to senior counsellor Rohit</span>
              <span className="log-time">3m ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
