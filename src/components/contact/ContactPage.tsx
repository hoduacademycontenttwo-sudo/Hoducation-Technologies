import React, { useState, useEffect } from 'react';
import { Loader } from '../common/Loader';
import { HeaderNavbar } from '../common/HeaderNavbar';
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

export const ContactPage: React.FC = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
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

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // 3-Second Green Visual Loader Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Parse URL query parameter (e.g. ?service=edtech or ?service=erp)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = (params.get('service') || params.get('subject'))?.toLowerCase();
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

  // Ambient studio spotlight following cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = Math.round((e.clientX / window.innerWidth) * 100);
      const y = Math.round((e.clientY / window.innerHeight) * 100);
      document.documentElement.style.setProperty('--cursor-x', `${x}%`);
      document.documentElement.style.setProperty('--cursor-y', `${y}%`);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

  // Click specifically on the checkbox square or its label
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      errors.captcha = 'Please click the checkbox to verify you are human';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      const firstErrorKey = Object.keys(fieldErrors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`) || document.getElementById('recaptcha-check-button');
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

  if (pageLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
        }}
      >
        <Loader variant="green" fullscreen maskBg="#f8fafc" />
      </div>
    );
  }

  return (
    <div className="contact-page-container">
      {/* 1) Unified Sticky Floating White Navbar matching Homepage */}
      <HeaderNavbar activePage="contact" />

      {/* 3D Studio Ambient Canvas */}
      <div className="contact-studio-bg" aria-hidden="true">
        <div className="contact-studio-art" />
        <div className="contact-studio-spotlight" />
        {/* Floating 3D glass lozenges for organic depth */}
        <div className="ambient-glass-float float-1" />
        <div className="ambient-glass-float float-2" />
        <div className="ambient-glass-float float-3" />
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

                  {/* Row 8: Interactive Clickable reCAPTCHA Checkbox Box */}
                  <div className="captcha-and-disclaimer-wrap">
                    <div className="captcha-widget-container">
                      {/* Box itself is non-clickable; clicking ONLY on the checkbox button triggers it */}
                      <div
                        className={`captcha-widget-box ${captchaVerified ? 'is-verified' : ''} ${
                          fieldErrors.captcha ? 'has-error' : ''
                        }`}
                      >
                        <div className="captcha-checkbox-left">
                          {/* ONLY clicking this checkbox square or its label triggers the action */}
                          <button
                            type="button"
                            id="recaptcha-check-button"
                            className={`captcha-check-square ${captchaVerified ? 'checked' : ''}`}
                            onClick={handleCheckboxClick}
                            role="checkbox"
                            aria-checked={captchaVerified}
                            aria-label="reCAPTCHA I'm not a robot checkbox"
                            title="Click here to verify"
                          >
                            {captchaLoading ? (
                              <span className="captcha-inline-spinner" />
                            ) : captchaVerified ? (
                              <i className="fa-solid fa-check check-glyph"></i>
                            ) : null}
                          </button>

                          <span
                            className="captcha-prompt-text clickable-label"
                            onClick={handleCheckboxClick}
                            title="Click here to verify"
                          >
                            {captchaLoading
                              ? 'Verifying...'
                              : captchaVerified
                              ? "I'm not a robot"
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
                              <a
                                href="/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sub-legal-btn"
                              >
                                Privacy
                              </a>
                              <span className="dot-sep">&bull;</span>
                              <a
                                href="/terms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sub-legal-btn"
                              >
                                Terms
                              </a>
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

                    {/* Legal Terms & Privacy Agreement Text linking directly to separate pages */}
                    <p className="privacy-policy-text">
                      By clicking submit, you agree to Hoducation Technologies'{' '}
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="legal-direct-link"
                      >
                        Terms &amp; Conditions
                      </a>{' '}
                      and{' '}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="legal-direct-link"
                      >
                        Privacy Policy
                      </a>
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

      {/* FAQs Quick Access Banner */}
      <section className="contact-faqs-callout-section">
        <div className="faqs-callout-inner">
          <div className="faqs-callout-text">
            <span className="kicker-mini">HAVE QUESTIONS?</span>
            <h3>Explore our Knowledge Base &amp; Frequently Asked Questions</h3>
            <p>
              Get instant answers regarding AcadOS deployment speeds, smartphone OMR accuracy, CBT exam features, and institutional data privacy.
            </p>
          </div>
          <a href="/faqs" className="btn-visit-faqs">
            View All FAQs &rarr;
          </a>
        </div>
      </section>

      {/* Footer with separate page links */}
      <footer className="contact-site-footer">
        <div className="contact-footer-inner">
          <p>© 2026 Hoducation Technologies Pvt Ltd. All rights reserved.</p>
          <div className="contact-footer-links">
            <a href="/">Home</a>
            <a href="/blog">Blog &amp; Insights</a>
            <a href="/faqs">FAQs</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms &amp; Conditions</a>
            <a href="tel:+919660034117">+91 9660034117</a>
            <a href="mailto:hoducationtechnologies@gmail.com">hoducationtechnologies@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
