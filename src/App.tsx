import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import './App.css';

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <section className="strip">
          <div className="container strip-inner">
            <div className="strip-item"><span className="mono">01</span>Custom Software</div>
            <div className="strip-item"><span className="mono">02</span>Web &amp; Portals</div>
            <div className="strip-item"><span className="mono">03</span>Automation &amp; CRM/ERP</div>
            <div className="strip-item"><span className="mono">04</span>EdTech Products</div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container about-grid">
            <div>
              <p className="eyebrow">// about us</p>
              <h2>Building reliable software, one product at a time.</h2>
            </div>
            <div>
              <p className="lead-text">
                We're a technology company focused on shipping software that solves real
                operational problems — websites, portals, internal tools, and full products. Our
                engineering approach favors clean architecture, measurable outcomes, and
                long-term maintainability over quick fixes.
              </p>
            </div>
          </div>
        </section>

        <section id="products" className="section section-alt">
          <div className="container">
            <p className="eyebrow">// our products</p>
            <h2>Featured Product</h2>

            <div className="product-card">
              <div className="product-info">
                <span className="product-tag mono">EDTECH PLATFORM</span>
                <h3>AcadOS</h3>
                <p>
                  AcadOS is our flagship EdTech product — a unified academic operating system for
                  institutions to manage students, courses, staff, attendance, examinations and
                  communication in one place.
                </p>
                <a
                  href="http://acados.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Visit acados.app →
                </a>
              </div>
              <div className="product-visual">
                <div className="visual-frame">
                  <span className="mono">acados.app</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <p className="eyebrow">// what we do</p>
            <h2>Services</h2>
            <div className="services-grid">
              {[
                ['01', 'Automation', 'Workflow and process automation that removes repetitive manual work.'],
                ['02', 'CRM Systems', 'Customer relationship platforms built around your sales and support flow.'],
                ['03', 'ERP Systems', 'End-to-end resource planning to unify operations, inventory and finance.'],
                ['04', 'CMS & Websites', 'Content-managed websites and portals that are fast, secure and easy to update.'],
                ['05', 'Custom Software', 'Purpose-built applications and portals engineered around your exact workflow.'],
                ['06', 'Product Engineering', 'Full-cycle product design and development, like our own platform AcadOS.'],
              ].map(([num, title, desc]) => (
                <div className="service-card" key={num}>
                  <span className="service-num mono">{num}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" className="section section-alt">
          <div className="container">
            <p className="eyebrow">// where we work</p>
            <h2>Industries We Serve</h2>
            <div className="tags-grid">
              {[
                'Education', 'Healthcare', 'Retail & E-commerce', 'Manufacturing', 'Real Estate',
                'Logistics', 'Finance', 'Hospitality', 'Government', 'Startups',
              ].map((tag) => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-inner">
            <p className="eyebrow">// get in touch</p>
            <h2>Have a project in mind?</h2>
            <p className="lead-text">Tell us what you're building — we'll get back to you.</p>
            <a href="mailto:hello@hoducation.com" className="btn btn-primary">
              hello@hoducation.com
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="brand">
            <span className="brand-mark">HT</span>
            <span className="brand-name">
              Hoducation<span className="brand-sub">Technologies Pvt Ltd</span>
            </span>
          </div>
          <p className="mono footer-copy">© 2026 Hoducation Technologies Pvt Ltd. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
