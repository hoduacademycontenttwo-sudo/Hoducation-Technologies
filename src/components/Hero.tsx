import { motion } from 'framer-motion';
import ShapeGrid from './ShapeGrid';
import './Hero.css';

const headline = ['We engineer software', 'that runs businesses.'];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const lineUp = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.7, ease: easeOut } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function Hero() {
  return (
    <section className="hero" id="top">
      <span className="hero-rule" aria-hidden="true" />

      <div className="hero-grid-bg" aria-hidden="true">
        <ShapeGrid
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#0d0a0a"
          hoverFillColor="#7a1128"
          shape="square"
          hoverTrailAmount={5}
        />
      </div>

      <motion.div
        className="container hero-inner"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="hero-badge" variants={fadeUp}>
          <span className="mono">Software &amp; Digital Products</span>
        </motion.div>

        <h1 className="hero-heading">
          {headline.map((line) => (
            <span className="hero-line-mask" key={line}>
              <motion.span className="hero-line" variants={lineUp}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p className="hero-lead" variants={fadeUp}>
          Hoducation Technologies Pvt Ltd designs and builds custom software, portals and
          platforms — from automation and CRMs to full-scale ERPs — for organizations across
          every industry.
        </motion.p>

        <motion.div className="hero-actions" variants={fadeUp}>
          <motion.a
            href="#products"
            className="btn btn-primary"
            whileHover={{ scale: 1.035 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Products
            <span className="btn-arrow">→</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="btn btn-outline"
            whileHover={{ scale: 1.035 }}
            whileTap={{ scale: 0.97 }}
          >
            Start a Project
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="hero-scroll-cue mono"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        Scroll
        <motion.span
          className="hero-scroll-arrow"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}
