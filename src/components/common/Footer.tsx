import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || status === 'loading') return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Universal Footer' }),
      });
      const data = await res.json();
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('Subscription error:', err);
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <footer className="site-footer" id="footer-contact">
      <div className="footer-container">
        {/* Top Main Row: Brand & Newsletter + 4 Link Columns */}
        <div className="footer-main-grid">
          {/* Left Column: Brand, Tagline, Newsletter Pill, Locale Pill */}
          <div className="footer-brand-col">
            <a href="/" className="footer-brand-title">HODUCATION</a>
            <p className="footer-tagline">
              Engineering modern software, institutional ERPs, and automated workflows.
            </p>

            <form className="footer-newsletter-pill" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="you@email.com"
                className="footer-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <button type="submit" className="footer-submit-btn" disabled={status === 'loading'}>
                {status === 'loading' ? '...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>

            <div className="footer-locale-pill" role="button" aria-label="Region selector">
              <span className="locale-flag">🇮🇳</span>
              <span className="locale-name">IN</span>
              <i className="fa-solid fa-chevron-down locale-caret"></i>
            </div>
          </div>

          {/* Right 4 Nav Columns */}
          <div className="footer-links-grid">
            {/* Col 1: Explore */}
            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Explore</h4>
              <ul className="footer-nav-list">
                <li><a href="/#process">How it works</a></li>
                <li><a href="/#services">Features</a></li>
                <li><a href="/#services">ERP Systems</a></li>
                <li><a href="/#services">Automations</a></li>
                <li><a href="/faqs">FAQ</a></li>
              </ul>
            </div>

            {/* Col 2: Product */}
            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Product</h4>
              <ul className="footer-nav-list">
                <li><a href="/#acados">AcadOS Suite</a></li>
                <li><a href="/#acados">TestMaker &amp; OMR</a></li>
                <li><a href="/#acados">CBT Engine</a></li>
                <li><a href="/contact?service=acados">For institutions</a></li>
                <li><a href="/contact">Schedule demo</a></li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Company</h4>
              <ul className="footer-nav-list">
                <li><a href="/#about">Our story</a></li>
                <li><a href="/#leadership-section">Leadership</a></li>
                <li><a href="/#testimonials">Clients</a></li>
                <li><a href="/blog">Blog &amp; Insights</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>

            {/* Col 4: Legal */}
            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Legal</h4>
              <ul className="footer-nav-list">
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/faqs">Security</a></li>
                <li><a href="/contact">Support</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © 2026 Hoducation Technologies Pvt Ltd. All rights reserved.
          </p>

          <div className="footer-social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Twitter">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://wa.me/919660034117" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
