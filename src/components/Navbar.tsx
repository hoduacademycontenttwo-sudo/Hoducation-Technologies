import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import './Navbar.css';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#products', label: 'Products' },
  { href: '#services', label: 'Services' },
  { href: '#industries', label: 'Industries' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s as Element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = linkRefs.current[active];
    if (el) {
      setPill({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    } else {
      setPill((p) => ({ ...p, opacity: 0 }));
    }
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container navbar-inner">
          <motion.a
            href="#top"
            className="brand"
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            <motion.span
              className="brand-mark"
              variants={{
                rest: { rotate: 0, scale: 1 },
                hover: { rotate: -8, scale: 1.08 },
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              HT
            </motion.span>
            <span className="brand-name">
              Hoducation
              <span className="brand-sub">Technologies</span>
            </span>
          </motion.a>

          <nav className="nav">
            <div className="nav-pill-track">
              <motion.div
                className="nav-pill"
                animate={{ left: pill.left, width: pill.width, opacity: pill.opacity }}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    linkRefs.current[link.href] = el;
                  }}
                  className={`nav-link ${active === link.href ? 'nav-link-active' : ''}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <motion.a
              href="#contact"
              className="nav-cta"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Contact Us
            </motion.a>
          </nav>

          <button
            className={`nav-toggle ${menuOpen ? 'nav-toggle-open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="mobile-menu"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.nav
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
                  closed: {},
                }}
              >
                {[...LINKS, { href: '#contact', label: 'Contact Us' }].map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`mobile-link ${link.href === '#contact' ? 'mobile-link-cta' : ''}`}
                    onClick={() => setMenuOpen(false)}
                    variants={{
                      closed: { opacity: 0, y: 24 },
                      open: { opacity: 1, y: 0 },
                    }}
                  >
                    <span className="mono mobile-link-num">0{i + 1}</span>
                    {link.label}
                  </motion.a>
                ))}
              </motion.nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
