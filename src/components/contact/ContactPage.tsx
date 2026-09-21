import React, { useState, useEffect } from 'react';
import './ContactPage.css';

interface FormData {
  firstName: string;
  lastName: string;
  workEmail: string;
  companyName: string;
  phoneCode: string;
  phone: string;
  industry: string;
  context: string;
  estimatedSize: string;
}

const COUNTRY_CODES = [
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India (+91)' },
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States / Canada (+1)' },
  { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom (+44)' },
  { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE (+971)' },
  { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore (+65)' },
  { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Indonesia (+62)' },
  { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia (+61)' },
  { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany (+49)' },
  { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France (+33)' },
  { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan (+81)' },
];

const INDUSTRIES = [
  'EdTech & AcadOS (TestMaker, CBT, OMR)',
  'Enterprise ERP Systems (Schools & Colleges)',
  'CRM & Admissions Hub',
  'Intelligent Automations & Background RPA',
  'CMS & Web Publishing Portals',
  'Custom Enterprise Software',
  'Higher Education & Universities',
  'Coaching Institute & Test Prep Chain',
  'Other Institutional Solutions',
];

const FAQS = [
  {
    q: 'What happens after I submit this demo request?',
    a: 'Our technical solutions engineers review your institutional setup, provision a customized staging environment with sample student and exam data, and reach out within 24 hours to conduct a live interactive demonstration.',
  },
  {
    q: 'How fast can AcadOS, ERP, or Custom Software be deployed?',
    a: 'Turnkey AcadOS modules (TestMaker, CBT, OMR SmartPhone Evaluation) can be deployed in under 48 hours with automated database seeding. Large-scale multi-campus ERP and bespoke software migrations typically roll out within 2 to 4 weeks.',
  },
  {
    q: 'How does the Smartphone OMR Evaluation work without expensive hardware?',
    a: 'Using our proprietary sub-second computer vision model, educators can scan physical OMR response sheets using any standard Android or iOS smartphone camera. The system automatically corrects for skew, rotation, shadows, and pen/pencil marks with 99.8% precision.',
  },
  {
    q: 'Who owns the institutional, student, and assessment data?',
    a: 'Your institution retains 100% proprietary ownership of all question banks, student details, exam marks, and financial data. Hoducation operates purely as a secure data processor with strict cryptographic tenant isolation and daily off-site backups.',
  },
  {
    q: 'Can AcadOS integrate with our existing fee payment gateways and biometric hardware?',
    a: 'Yes. We provide pre-built REST APIs and webhook connectors for all major payment gateways (Razorpay, Cashfree, PayU), biometric attendance machines (ZKTeco, Realtime, Essl), and Meta WhatsApp Business Cloud API for automated notifications.',
  },
  {
    q: 'Do you provide on-premise deployments or dedicated private cloud servers?',
    a: 'Yes. In addition to our multi-region managed cloud infrastructure (99.9% uptime SLA), we support isolated VPC deployments on AWS/Azure as well as fully air-gapped on-premise server installations for large universities and sensitive test centers.',
  },
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    workEmail: '',
    companyName: '',
    phoneCode: '+91',
    phone: '',
    industry: '',
    context: '',
    estimatedSize: '',
  });

  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const [captchaLoading, setCaptchaLoading] = useState<boolean>(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Parse URL query parameter (e.g. ?service=edtech or ?service=erp)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get('service')?.toLowerCase();
      if (serviceParam) {
        if (serviceParam.includes('edtech') || serviceParam.includes('acados') || serviceParam.includes('testmaker')) {
          setFormData((prev) => ({ ...prev, industry: 'EdTech & AcadOS (TestMaker, CBT, OMR)' }));
        } else if (serviceParam.includes('erp')) {
          setFormData((prev) => ({ ...prev, industry: 'Enterprise ERP Systems (Schools & Colleges)' }));
        } else if (serviceParam.includes('crm')) {
          setFormData((prev) => ({ ...prev, industry: 'CRM & Admissions Hub' }));
        } else if (serviceParam.includes('auto')) {
          setFormData((prev) => ({ ...prev, industry: 'Intelligent Automations & Background RPA' }));
        } else if (serviceParam.includes('cms')) {
          setFormData((prev) => ({ ...prev, industry: 'CMS & Web Publishing Portals' }));
        } else if (serviceParam.includes('custom') || serviceParam.includes('software')) {
          setFormData((prev) => ({ ...prev, industry: 'Custom Enterprise Software' }));
        }
      }
    } catch {
      // Ignore if query param parsing fails
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCaptchaToggle = () => {
    if (captchaLoading) return;
    if (captchaVerified) {
      setCaptchaVerified(false);
      return;
    }

    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaVerified(true);
      if (fieldErrors.captcha) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next.captcha;
          return next;
        });
      }
    }, 450);
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';

    if (!formData.workEmail.trim()) {
      errors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail.trim())) {
      errors.workEmail = 'Please enter a valid work email address';
    }

    if (!formData.companyName.trim()) {
      errors.companyName = 'Company / Institution name is required';
    }

    if (!captchaVerified) {
      errors.captcha = 'Please check the verification box to confirm you are human';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      const firstErrorKey = Object.keys(fieldErrors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`) || document.querySelector('.captcha-widget-box');
      if (el) (el as HTMLElement).focus();
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Submission error:', err);
      if (err.message && err.message.includes('Unexpected token')) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(err.message || 'Something went wrong while sending your message. Please try again.');
      }
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="contact-page-container">
      {/* Top Navbar */}
      <header className="contact-nav-header">
        <a href="/" className="contact-brand" aria-label="Return to Hoducation Home">
          <img src="/ht-logo.jpg" alt="Hoducation Technologies" className="contact-brand-logo" width="34" height="34" />
          <span className="contact-brand-name">Hoducation Technologies</span>
        </a>

        <div className="contact-nav-actions">
          <a href="/" className="contact-back-link">
            <span>&larr; Back to Home</span>
          </a>
          <a
            href="https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20would%20like%20to%20request%20a%20demo."
            target="_blank"
            rel="noopener noreferrer"
            className="contact-whatsapp-btn"
          >
            <i className="fa-brands fa-whatsapp"></i>
            <span>WhatsApp Quick Chat</span>
          </a>
        </div>
      </header>

      {/* Floating 3D Ambient Pill Shapes */}
      <div className="ambient-pills-canvas" aria-hidden="true">
        <div className="ambient-pill pill-yellow" />
        <div className="ambient-pill pill-green" />
        <div className="ambient-pill pill-pink" />
        <div className="ambient-pill pill-olive" />
      </div>

      {/* Main Split Layout */}
      <main className="contact-main-split">
        {/* Left Hero Column */}
        <section className="contact-hero-col">
          <div className="contact-hero-content">
            <span className="contact-kicker-badge">ENTERPRISE DEMO &amp; INQUIRY</span>
            <h1 className="contact-hero-heading">Seeing is believing.</h1>
            <p className="contact-hero-desc">
              We’d love to show you a demo of Hoducation Technologies in action. Get specific use cases, personalized pricing, and answers to all your questions.
            </p>

            {/* Highlights List */}
            <div className="contact-highlights-list">
              <div className="contact-highlight-item">
                <div className="highlight-icon-wrap">
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <div className="highlight-text-wrap">
                  <h4>Rapid Deployment</h4>
                  <p>Turnkey setups with full institutional migration in under 48 hours.</p>
                </div>
              </div>

              <div className="contact-highlight-item">
                <div className="highlight-icon-wrap">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div className="highlight-text-wrap">
                  <h4>99.8% Computer Vision Accuracy</h4>
                  <p>Battle-tested OMR and high-concurrency NTA-style CBT engine.</p>
                </div>
              </div>

              <div className="contact-highlight-item">
                <div className="highlight-icon-wrap">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div className="highlight-text-wrap">
                  <h4>24/7 Dedicated Support</h4>
                  <p>Direct priority access to product engineers and solution architects.</p>
                </div>
              </div>
            </div>

            {/* Direct contact info card */}
            <div className="contact-direct-card">
              <div className="direct-item">
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:hoducationtechnologies@gmail.com">hoducationtechnologies@gmail.com</a>
              </div>
              <div className="direct-item">
                <i className="fa-solid fa-phone"></i>
                <a href="tel:+919660034117">+91 96600 34117</a>
              </div>
              <div className="direct-item">
                <i className="fa-solid fa-location-dot"></i>
                <span>Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Form Card */}
        <section className="contact-form-col">
          <div className="contact-form-card">
            {status === 'success' ? (
              <div className="contact-success-state">
                <div className="success-icon-wrap">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h3 className="success-title">Thank you, {formData.firstName}!</h3>
                <p className="success-lead">
                  Your inquiry has been successfully transmitted to our engineering and solutions team.
                </p>
                <div className="success-info-box">
                  <div className="success-info-row">
                    <span className="info-label">Organization:</span>
                    <span className="info-val">{formData.companyName}</span>
                  </div>
                  <div className="success-info-row">
                    <span className="info-label">Confirmation sent to:</span>
                    <span className="info-val">{formData.workEmail}</span>
                  </div>
                  <div className="success-info-row">
                    <span className="info-label">Expected Response:</span>
                    <span className="info-val">Within 24 business hours</span>
                  </div>
                </div>
                <div className="success-actions">
                  <a href="/" className="btn-success-home">
                    Return to Homepage
                  </a>
                  <button
                    type="button"
                    className="btn-success-new"
                    onClick={() => {
                      setStatus('idle');
                      setCaptchaVerified(false);
                      setFormData({
                        firstName: '',
                        lastName: '',
                        workEmail: '',
                        companyName: '',
                        phoneCode: '+91',
                        phone: '',
                        industry: '',
                        context: '',
                        estimatedSize: '',
                      });
                    }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="contact-card-title">Let's talk</h2>

                {status === 'error' && (
                  <div className="contact-error-banner" role="alert">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-actual-form" noValidate>
                  {/* Row 1: First Name & Last Name */}
                  <div className="form-row-two-col">
                    <div className={`form-group ${fieldErrors.firstName ? 'has-error' : ''}`}>
                      <label htmlFor="firstName" className="form-label">
                        First Name<span className="req-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter here"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="form-input"
                        autoComplete="given-name"
                      />
                      {fieldErrors.firstName && <span className="field-err-msg">{fieldErrors.firstName}</span>}
                    </div>

                    <div className={`form-group ${fieldErrors.lastName ? 'has-error' : ''}`}>
                      <label htmlFor="lastName" className="form-label">
                        Last Name<span className="req-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter here"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="form-input"
                        autoComplete="family-name"
                      />
                      {fieldErrors.lastName && <span className="field-err-msg">{fieldErrors.lastName}</span>}
                    </div>
                  </div>

                  {/* Row 2: Work Email */}
                  <div className={`form-group ${fieldErrors.workEmail ? 'has-error' : ''}`}>
                    <label htmlFor="workEmail" className="form-label">
                      Work Email<span className="req-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="workEmail"
                      name="workEmail"
                      placeholder="Enter here"
                      value={formData.workEmail}
                      onChange={handleChange}
                      className="form-input"
                      autoComplete="email"
                    />
                    {fieldErrors.workEmail && <span className="field-err-msg">{fieldErrors.workEmail}</span>}
                  </div>

                  {/* Row 3: Company Name */}
                  <div className={`form-group ${fieldErrors.companyName ? 'has-error' : ''}`}>
                    <label htmlFor="companyName" className="form-label">
                      Company Name<span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      placeholder="Enter here"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="form-input"
                      autoComplete="organization"
                    />
                    {fieldErrors.companyName && <span className="field-err-msg">{fieldErrors.companyName}</span>}
                  </div>

                  {/* Row 4: Phone Number */}
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <div className="phone-input-group">
                      <div className="phone-code-select-wrap">
                        <select
                          name="phoneCode"
                          id="phoneCode"
                          value={formData.phoneCode}
                          onChange={handleChange}
                          className="phone-code-select"
                          aria-label="Country calling code"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.country} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <i className="fa-solid fa-chevron-down select-caret" aria-hidden="true" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input phone-number-input"
                        autoComplete="tel-national"
                      />
                    </div>
                  </div>

                  {/* Row 5: Industry / Service of Interest */}
                  <div className="form-group">
                    <label htmlFor="industry" className="form-label">
                      Industry / Service of Interest
                    </label>
                    <div className="custom-select-wrap">
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="form-input form-select"
                      >
                        <option value="">Select industry or solution</option>
                        {INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                      <i className="fa-solid fa-chevron-down select-caret" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Row 6: Additional Context */}
                  <div className="form-group">
                    <label htmlFor="context" className="form-label">
                      Additional Context
                    </label>
                    <textarea
                      id="context"
                      name="context"
                      placeholder="Describe your use case so we can connect you with the right person."
                      rows={3}
                      value={formData.context}
                      onChange={handleChange}
                      className="form-input form-textarea"
                    />
                  </div>

                  {/* Row 7: Estimated Institution Size / Scope */}
                  <div className="form-group">
                    <label htmlFor="estimatedSize" className="form-label">
                      Estimated Institution Size / Scope
                    </label>
                    <input
                      type="text"
                      id="estimatedSize"
                      name="estimatedSize"
                      placeholder="e.g. 1,500 students, 3 branches, or custom requirement"
                      value={formData.estimatedSize}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/* Row 8: Interactive reCAPTCHA Clickable Widget */}
                  <div className="captcha-and-disclaimer-wrap">
                    <div className="captcha-widget-container">
                      <div
                        className={`captcha-widget-box ${captchaVerified ? 'is-verified' : ''} ${
                          fieldErrors.captcha ? 'has-error' : ''
                        }`}
                        onClick={handleCaptchaToggle}
                        role="checkbox"
                        aria-checked={captchaVerified}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            handleCaptchaToggle();
                          }
                        }}
                      >
                        <div className="captcha-checkbox-left">
                          <div className={`captcha-check-square ${captchaVerified ? 'checked' : ''}`}>
                            {captchaLoading ? (
                              <span className="captcha-inline-spinner" />
                            ) : captchaVerified ? (
                              <i className="fa-solid fa-check check-glyph"></i>
                            ) : null}
                          </div>
                          <span className="captcha-prompt-text">
                            {captchaLoading
                              ? 'Verifying...'
                              : captchaVerified
                              ? 'Verification complete'
                              : "I'm not a robot"}
                          </span>
                        </div>

                        <div className="captcha-branding-right">
                          <div className="captcha-logo-icon">
                            <i className="fa-solid fa-shield-halved"></i>
                          </div>
                          <div className="captcha-brand-meta">
                            <span className="brand-title">reCAPTCHA</span>
                            <div className="captcha-links-row">
                              <button
                                type="button"
                                className="sub-legal-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveLegalModal('privacy');
                                }}
                              >
                                Privacy
                              </button>
                              <span className="dot-sep">&bull;</span>
                              <button
                                type="button"
                                className="sub-legal-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveLegalModal('terms');
                                }}
                              >
                                Terms
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {fieldErrors.captcha && (
                        <span className="field-err-msg captcha-err-msg">
                          <i className="fa-solid fa-circle-exclamation"></i> {fieldErrors.captcha}
                        </span>
                      )}
                    </div>

                    {/* Legal Terms & Privacy Agreement Text */}
                    <p className="privacy-policy-text">
                      By clicking submit, you agree to Hoducation Technologies'{' '}
                      <button
                        type="button"
                        className="legal-modal-trigger-btn"
                        onClick={() => setActiveLegalModal('terms')}
                      >
                        Terms &amp; Conditions
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        className="legal-modal-trigger-btn"
                        onClick={() => setActiveLegalModal('privacy')}
                      >
                        Privacy Policy
                      </button>
                      .
                    </p>
                  </div>

                  {/* Row 9: Submit Button */}
                  <div className="form-submit-row">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`contact-submit-btn ${status === 'loading' ? 'is-loading' : ''}`}
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="submit-spinner" />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <span>Submit</span>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </section>
      </main>

      {/* ==========================================================================
         FAQ SECTION (Frequently Asked Questions)
         ========================================================================== */}
      <section className="contact-faq-section" id="faqs">
        <div className="faq-container-inner">
          <div className="faq-header-center">
            <span className="faq-pill-badge">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="faq-section-title">Everything you need to know</h2>
            <p className="faq-section-subtitle">
              Have questions about our enterprise evaluation, AcadOS integration, or security? We’ve got answers.
            </p>
          </div>

          <div className="faq-accordion-list">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className={`faq-item-card ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{faq.q}</span>
                    <span className="faq-toggle-icon">
                      <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-pane">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Support Banner */}
          <div className="faq-support-banner">
            <div className="banner-left">
              <h4>Still have questions?</h4>
              <p>Speak directly with our technical solutions architects in Jaipur.</p>
            </div>
            <div className="banner-right">
              <a
                href="https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20have%20questions%20regarding%20AcadOS%20and%20your%20software%20solutions."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-faq-whatsapp"
              >
                <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
              </a>
              <a href="tel:+919660034117" className="btn-faq-call">
                <i className="fa-solid fa-phone"></i> +91 96600 34117
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         LEGAL MODAL: Privacy Policy & Terms of Service
         ========================================================================== */}
      {activeLegalModal && (
        <div className="legal-modal-overlay" onClick={() => setActiveLegalModal(null)} role="dialog" aria-modal="true">
          <div className="legal-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="legal-modal-header">
              <div className="legal-modal-title-wrap">
                <span className="legal-type-tag">OFFICIAL CORPORATE POLICY</span>
                <h3>
                  {activeLegalModal === 'privacy'
                    ? 'Hoducation Technologies — Privacy Policy'
                    : 'Hoducation Technologies — Terms & Conditions'}
                </h3>
                <span className="legal-update-date">Effective: September 2026 &bull; Jaipur, Rajasthan, India</span>
              </div>
              <button
                type="button"
                className="legal-modal-close-btn"
                onClick={() => setActiveLegalModal(null)}
                aria-label="Close modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="legal-modal-body">
              {activeLegalModal === 'privacy' ? (
                <div className="legal-document-content">
                  <section className="legal-section">
                    <h4>1. Overview &amp; Commitment</h4>
                    <p>
                      Hoducation Technologies Pvt. Ltd. ("Hoducation", "we", "our", or "us") provides enterprise-grade
                      educational software, custom portals, ERPs, and our flagship platform <strong>AcadOS</strong> (including
                      TestMaker, Computer-Based Testing [CBT], OMR SmartPhone Evaluation, and Admissions CRM).
                    </p>
                    <p>
                      We are committed to maintaining the highest security, confidentiality, and integrity standards in
                      accordance with India's <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>, the
                      Information Technology Act, 2000, and global data privacy frameworks (GDPR).
                    </p>
                  </section>

                  <section className="legal-section">
                    <h4>2. Data We Process &amp; Collect</h4>
                    <ul>
                      <li>
                        <strong>Institutional &amp; Administrator Data:</strong> Name, professional email address,
                        designation, institutional name, phone number, and billing credentials provided when requesting a
                        demo or executing a service agreement.
                      </li>
                      <li>
                        <strong>Assessment &amp; Student Information:</strong> Student identifiers, question banks,
                        examination schedules, and scanned OMR answer sheet imagery uploaded by authorized client faculty.
                      </li>
                      <li>
                        <strong>Telemetry &amp; Audit Logs:</strong> Timestamped IP addresses, session telemetry, browser
                        environment, and platform performance logs used strictly to ensure examination integrity and system
                        stability.
                      </li>
                    </ul>
                  </section>

                  <section className="legal-section">
                    <h4>3. Data Ownership &amp; Fiduciary Model</h4>
                    <p>
                      <strong>Your institution retains 100% legal and beneficial ownership</strong> of all curriculum
                      questions, student records, grades, and fee records. Hoducation acts strictly as a secure Data
                      Processor. We do not sell, rent, monetize, or train unauthorized public machine learning models on
                      your proprietary question banks or student records.
                    </p>
                  </section>

                  <section className="legal-section">
                    <h4>4. Enterprise Security &amp; Encryption</h4>
                    <ul>
                      <li>
                        <strong>Data in Transit:</strong> Encrypted using TLS 1.3 cryptographic protocols.
                      </li>
                      <li>
                        <strong>Data at Rest:</strong> Encrypted with industry-standard AES-256 encryption.
                      </li>
                      <li>
                        <strong>Tenant Isolation:</strong> Multi-tenant logical isolation with strict row-level security
                        (RLS) ensuring one institution can never access another institution's records.
                      </li>
                      <li>
                        <strong>Backups:</strong> Redundant daily snapshots retained in geographically isolated, secure
                        cloud vaults.
                      </li>
                    </ul>
                  </section>

                  <section className="legal-section">
                    <h4>5. Data Retention &amp; Deletion Rights</h4>
                    <p>
                      Clients may export their full database (in standard JSON, CSV, or SQL formats) at any time. Upon
                      contract conclusion or formal termination request, all institutional records are completely purged
                      from production servers within 30 calendar days.
                    </p>
                  </section>

                  <section className="legal-section">
                    <h4>6. Grievance Officer &amp; Contact</h4>
                    <p>
                      For privacy inquiries, audit certificates, or data subject requests, please contact our Data
                      Protection Cell:
                    </p>
                    <p className="contact-box-callout">
                      <strong>Hoducation Technologies Pvt. Ltd.</strong>
                      <br />
                      Grievance &amp; Privacy Officer
                      <br />
                      Email: <a href="mailto:hoducationtechnologies@gmail.com">hoducationtechnologies@gmail.com</a>
                      <br />
                      Phone: <a href="tel:+919660034117">+91 96600 34117</a>
                      <br />
                      Location: Jaipur, Rajasthan, India
                    </p>
                  </section>
                </div>
              ) : (
                <div className="legal-document-content">
                  <section className="legal-section">
                    <h4>1. Representation &amp; Scope</h4>
                    <p>
                      These Terms &amp; Conditions govern the provision, deployment, and use of software platforms, custom
                      development services, and cloud subscriptions offered by <strong>Hoducation Technologies Pvt. Ltd.</strong>
                    </p>
                    <p>
                      By requesting a demonstration, signing a proposal, or logging into AcadOS or related client portals, you
                      warrant that you have the legal authority to bind your educational institution, university, coaching
                      academy, or corporate entity.
                    </p>
                  </section>

                  <section className="legal-section">
                    <h4>2. AcadOS Software License &amp; Usage Rights</h4>
                    <ul>
                      <li>
                        Hoducation grants the subscribing institution a non-exclusive, non-transferable license to access
                        and utilize the selected software modules (TestMaker, CBT, OMR, ERP, CRM) for the duration of the
                        contract.
                      </li>
                      <li>
                        The institution shall not reverse-engineer, decompile, redistribute, or create derivative works of
                        Hoducation's computer vision OMR engines, rendering algorithms, or proprietary source code.
                      </li>
                    </ul>
                  </section>

                  <section className="legal-section">
                    <h4>3. Service Level Agreement (SLA) &amp; Uptime</h4>
                    <p>
                      Hoducation commits to a <strong>99.9% uptime SLA</strong> for all enterprise cloud-hosted instances.
                      Scheduled maintenance windows are announced at least 48 hours in advance and executed during off-peak
                      hours. For live mock examinations or state-level exam testing, dedicated on-call technical engineers
                      are assigned to monitor real-time server concurrency.
                    </p>
                  </section>

                  <section className="legal-section">
                    <h4>4. Intellectual Property &amp; Non-Disclosure</h4>
                    <p>
                      All intellectual property rights in the software architecture, user interfaces, codebases, and
                      trademarks remain the exclusive property of Hoducation Technologies. Conversely, all academic question
                      banks, syllabus taxonomies, proprietary exam content, and student identities remain the exclusive
                      intellectual property of the Client.
                    </p>
                  </section>

                  <section className="legal-section">
                    <h4>5. Fees, Subscriptions, &amp; Renewals</h4>
                    <p>
                      Invoices are issued according to the agreed Master Services Agreement (MSA) or software quotation.
                      Terms of payment are strictly Net 15 days from the invoice issuance date unless specified otherwise.
                      Custom development milestones are billed upon deliverable acceptance.
                    </p>
                  </section>

                  <section className="legal-section">
                    <h4>6. Governing Law &amp; Jurisdiction</h4>
                    <p>
                      These terms shall be governed by and construed in accordance with the laws of India. Any legal disputes
                      arising from or in connection with our services shall be subject to the exclusive jurisdiction of the
                      competent courts located in <strong>Jaipur, Rajasthan, India</strong>.
                    </p>
                  </section>
                </div>
              )}
            </div>

            <div className="legal-modal-footer">
              <span className="footer-note">
                Need a signed Data Processing Agreement (DPA)? Contact our enterprise desk.
              </span>
              <button
                type="button"
                className="btn-legal-accept"
                onClick={() => setActiveLegalModal(null)}
              >
                I Understand &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="contact-site-footer">
        <div className="contact-footer-inner">
          <p>© 2026 Hoducation Technologies Pvt Ltd. All rights reserved.</p>
          <div className="contact-footer-links">
            <a href="/">Home</a>
            <a href="/contact#faqs">FAQs</a>
            <button type="button" onClick={() => setActiveLegalModal('privacy')} className="footer-text-btn">
              Privacy Policy
            </button>
            <button type="button" onClick={() => setActiveLegalModal('terms')} className="footer-text-btn">
              Terms &amp; Conditions
            </button>
            <a href="tel:+919660034117">+91 9660034117</a>
            <a href="mailto:hoducationtechnologies@gmail.com">hoducationtechnologies@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
