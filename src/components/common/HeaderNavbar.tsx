import React, { useState } from 'react';

interface HeaderNavbarProps {
  activePage?: 'home' | 'services' | 'process' | 'products' | 'clients' | 'about' | 'blog' | 'contact';
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({ activePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1) Unified Sticky Floating White Navbar matching Homepage */}
      <header className="header" style={{ position: 'sticky', top: '16px', pointerEvents: 'auto' }}>
        <div className="freehand-navbar">
          {/* Brand Logo & Name */}
          <a href="/" className="freehand-brand" aria-label="Hoducation Home">
            <span className="freehand-brand-icon">
              <img src="/ht-logo.jpg" alt="Hoducation Technologies Logo" className="brand-logo-img" width="34" height="34" />
            </span>
            <span className="freehand-brand-text">Hoducation Technologies</span>
          </a>

          {/* Nav Menu with Dropdown Chevrons */}
          <nav className="freehand-nav" aria-label="Main Navigation">
            <div className={`freehand-nav-item has-dropdown ${activePage === 'services' ? 'active' : ''}`}>
              <a href="/#services" className="freehand-nav-link">
                <span>Services</span>
                <i className="fa-solid fa-chevron-down nav-caret"></i>
              </a>
              <div className="freehand-dropdown">
                <a href="/#services" className="dropdown-row">
                  <i className="fa-solid fa-code"></i>
                  <div>
                    <span className="dd-title">Custom Software &amp; Portals</span>
                    <span className="dd-desc">Bespoke web apps &amp; internal tools</span>
                  </div>
                </a>
                <a href="/#services" className="dropdown-row">
                  <i className="fa-solid fa-layer-group"></i>
                  <div>
                    <span className="dd-title">Enterprise ERP Systems</span>
                    <span className="dd-desc">Fees, inventory, staff &amp; operations</span>
                  </div>
                </a>
                <a href="/#services" className="dropdown-row">
                  <i className="fa-solid fa-users"></i>
                  <div>
                    <span className="dd-title">CRM &amp; Admissions</span>
                    <span className="dd-desc">Lead pipelines &amp; WhatsApp API</span>
                  </div>
                </a>
                <a href="/#services" className="dropdown-row">
                  <i className="fa-solid fa-bolt-lightning"></i>
                  <div>
                    <span className="dd-title">Intelligent Automations</span>
                    <span className="dd-desc">Event-driven workflows &amp; 24/7 sync</span>
                  </div>
                </a>
                <a href="/#services" className="dropdown-row">
                  <i className="fa-solid fa-file-lines"></i>
                  <div>
                    <span className="dd-title">CMS &amp; Web Platforms</span>
                    <span className="dd-desc">Headless CMS &amp; digital publishing</span>
                  </div>
                </a>
                <a href="/#acados" className="dropdown-row">
                  <i className="fa-solid fa-graduation-cap"></i>
                  <div>
                    <span className="dd-title">EdTech Platform (AcadOS)</span>
                    <span className="dd-desc">5-in-1 institutional OS &amp; OMR grading</span>
                  </div>
                </a>
              </div>
            </div>

            <div className={`freehand-nav-item has-dropdown ${activePage === 'process' ? 'active' : ''}`}>
              <a href="/#process" className="freehand-nav-link">
                <span>Process</span>
                <i className="fa-solid fa-chevron-down nav-caret"></i>
              </a>
              <div className="freehand-dropdown">
                <a href="/#process" className="dropdown-row">
                  <i className="fa-solid fa-compass-drafting"></i>
                  <div>
                    <span className="dd-title">6-Stage Lifecycle</span>
                    <span className="dd-desc">Analysis, Validation, UI, Build &amp; Motion</span>
                  </div>
                </a>
              </div>
            </div>

            <div className={`freehand-nav-item has-dropdown ${activePage === 'products' ? 'active' : ''}`}>
              <a href="/#acados" className="freehand-nav-link">
                <span>Products</span>
                <i className="fa-solid fa-chevron-down nav-caret"></i>
              </a>
              <div className="freehand-dropdown">
                <a href="/#acados" className="dropdown-row">
                  <i className="fa-solid fa-graduation-cap"></i>
                  <div>
                    <span className="dd-title">AcadOS</span>
                    <span className="dd-desc">5-in-1 institutional OS</span>
                  </div>
                </a>
              </div>
            </div>

            <div className={`freehand-nav-item ${activePage === 'clients' ? 'active' : ''}`}>
              <a href="/#testimonials" className="freehand-nav-link">
                <span>Clients</span>
              </a>
            </div>

            <div className={`freehand-nav-item ${activePage === 'about' ? 'active' : ''}`}>
              <a href="/#about" className="freehand-nav-link">
                <span>About Us</span>
              </a>
            </div>

            <div className={`freehand-nav-item ${activePage === 'blog' ? 'active' : ''}`}>
              <a href="/blog" className={`freehand-nav-link ${activePage === 'blog' ? 'active' : ''}`}>
                <span>Blog</span>
              </a>
            </div>

            <div className={`freehand-nav-item ${activePage === 'contact' ? 'active' : ''}`}>
              <a href="/contact" className={`freehand-nav-link ${activePage === 'contact' ? 'active' : ''}`}>
                <span>Contact</span>
              </a>
            </div>
          </nav>

          {/* Right: Orange Action CTA & Mobile Burger */}
          <div className="freehand-actions">
            <a href="/contact" className="btn-orange-demo">
              REQUEST A DEMO
            </a>

            {/* Mobile / Compressed Action Button */}
            <button
              type="button"
              className={`burger-btn ${mobileMenuOpen ? 'is-active' : ''}`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <img src="/ht-logo.jpg" alt="Hoducation Logo" className="compressed-ht-logo" />
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-sheet-header">
              <div className="mobile-brand">
                <img src="/ht-logo.jpg" alt="Hoducation Logo" className="mobile-logo-img" />
                <span className="mobile-brand-title">Hoducation</span>
              </div>
              <button
                type="button"
                className="mobile-close-btn"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <nav className="mobile-nav">
              <a href="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Home
              </a>
              <a href="/#services" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Services
              </a>
              <a href="/#process" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Process
              </a>
              <a href="/#acados" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Products (AcadOS)
              </a>
              <a href="/#testimonials" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Clients
              </a>
              <a href="/#about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </a>
              <a href="/blog" className={`mobile-link ${activePage === 'blog' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                Blog
              </a>
              <a href="/contact" className={`mobile-link ${activePage === 'contact' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                Contact
              </a>
            </nav>
            <div style={{ marginTop: '16px' }}>
              <a
                href="/contact"
                className="btn-orange-demo"
                style={{ display: 'block', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                REQUEST A DEMO
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
